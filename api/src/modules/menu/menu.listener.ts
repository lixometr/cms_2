import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ListenerItemBlueprint } from "src/blueprints";
import { ID, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { getCustomRepository } from "typeorm";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { MenuItem } from "./entities/menu-item.entity";
import { Menu } from "./entities/menu.entity";
import { MenuName } from "./menu.constants";
import { MenuService } from "./menu.service";
import { MenuItemRepository } from "./repository/menu-item.repository";

@Injectable()
export class MenuListenerService extends ListenerItemBlueprint {
    public name = MenuName
    constructor(private itemService: MenuService,) {
        super(itemService)
    }
    @OnEvent(`${MenuName}.${EventName.beforeCreate}`)
    async preCreate({ data, payload }: { data: CreateMenuDto, payload: RequestPayload }) {
        return super.preCreate({ data, payload })
    }
    @OnEvent(`${MenuName}.${EventName.beforeUpdate}`)
    async preUpdate({ data, id, payload }: { data: CreateMenuDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate({ data, id, payload })
    }

    @OnEvent(`${MenuName}.${EventName.afterUpdate}`)
    async afterUpdate({ result, payload }: { result: Menu, payload: RequestPayload }) {
        const toDelete = []
        const checkMenuItem = (item: MenuItem) => {
            if (item.parentId === null && item.itemId === null) {
                toDelete.unshift(item)
                return null
            }
            if (item.children) {
                let newChildren = item.children.map(child => checkMenuItem(child))
                newChildren = newChildren.filter(child => !!child)
            }
            return item
        }
        if (!result.items) return
        const resolvers = result.items.map(async item => {
            await item.serialize(payload)
            return checkMenuItem(item)
        })
        let newItems = await Promise.all(resolvers)
        const menuItemRep = getCustomRepository(MenuItemRepository)
        const deleteItem = async (item: MenuItem) => {
            if(item.children) {
                const resolvers = item.children.map(async child => deleteItem(child))
                await Promise.all(resolvers)
            }
            await menuItemRep.deleteById({ id: item.id })

        }
        for(let i = 0; i < toDelete.length; i++) {
            await deleteItem(toDelete[i])
        }
        newItems = newItems.filter(item => !!item)
        result.items = newItems
    }

}
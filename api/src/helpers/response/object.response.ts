import { EntityBase } from "src/internal"
import { RequestPayload } from "src/internal"

export interface ObjectResponse<T> {
    new(item: { [key: string]: any }): T
}
export class ObjectResponse<T> extends EntityBase {
    constructor(item: { [key: string]: any }) {
        super()
        Object.assign(this, item)
    }
    async serialize(payload: RequestPayload) {
        const recursiveSerialize = async (item: any): Promise<any> => {
            if (Array.isArray(item)) {
                const resolvers = item.map(itm => recursiveSerialize(itm))
                const items = await Promise.all(resolvers)
                return items
            } else if (item instanceof EntityBase) {
                return await item.serialize(payload)
            } else if (typeof item === 'object') {
                const resolvers = Object.keys(item).map(async key => {
                    item[key] = await recursiveSerialize(item[key])
                })
                await Promise.all(resolvers)
                return item
            } else {
                return item
            }
        }
        const resolvers = Object.keys(this).map(async key => {
            this[key] = await recursiveSerialize(this[key])
        })
        await Promise.all(resolvers)
        return this
    }

}
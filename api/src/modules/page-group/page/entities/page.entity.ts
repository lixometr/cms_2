import { Expose } from 'class-transformer';
import { CASCADE_NOT_INSERT } from 'src/constants';
import { EntitySeo, PageTemplateField, RequestPayload } from 'src/internal';
import { EntityLocaleItemBlueprint, PageLocale } from 'src/internal';
import { PageTemplate } from 'src/internal';
import { ID, SerializeGroup } from 'src/internal';
import { PublishStatus } from 'src/internal';
import { Entity, Column, OneToMany, ManyToOne, getCustomRepository } from 'typeorm';
import { PageTemplateRepository } from '../../page-template/repository/page-template.repository';
import * as _ from "lodash"
import { ProductCategoryRepository } from 'src/internal';
import { ProductRepository } from 'src/internal';
@Entity()
export class Page extends EntityLocaleItemBlueprint {

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => PageLocale, pageLocale => pageLocale.item, { cascade: true, eager: true })
    locale: PageLocale[];

    name: string;

    values: any;

    @Column({ nullable: true })
    templateId: ID

    @Expose({ groups: [SerializeGroup.AdminFull, SerializeGroup.Full] })
    @ManyToOne(() => PageTemplate, pageTemplate => pageTemplate.pages, { cascade: CASCADE_NOT_INSERT, onDelete: 'SET NULL', eager: true })
    template: PageTemplate

    @Column({ default: PublishStatus.Published })
    status: PublishStatus
    async setupValues({ templateId, values }: { templateId: ID, values: any }, payload: RequestPayload): Promise<Page> {
        const pageTemplateRepository = getCustomRepository(PageTemplateRepository)
        const categoryRepository = getCustomRepository(ProductCategoryRepository)
        const productRepository = getCustomRepository(ProductRepository)
        const groups = payload.getGroups()
        if (groups.includes(SerializeGroup.Admin)) return values
        const template = await pageTemplateRepository.findById({ id: templateId }, payload)
        const setuper = async (field: PageTemplateField, path = '') => {
            if (path) {
                path += `.${field.varName}`
            } else {
                path = `${field.varName}`
            }
            const currentValue = _.get(values, path)
            if (field.type === 'products') {
                if (_.isArray(currentValue)) {
                    const resolvers = currentValue.map(async idDto => {
                        const item = await productRepository.findById({ id: idDto.id }, payload)
                        if(item) {
                            await item.serialize(payload)
                        }
                        return item
                    })
                    let products = await Promise.all(resolvers)
                    products = products.filter(item => !!item)
                    _.set(values, path, products)
                } else {
                    _.set(values, path, [])
                }
            }
            if (field.type === 'categories') {
                if (_.isArray(currentValue)) {
                    const resolvers = currentValue.map(async idDto => {
                        const item =await categoryRepository.findById({ id: idDto.id }, payload)
                        if(item) {
                            await item.serialize(payload)
                        }
                        return item
                    })
                    let categories = await Promise.all(resolvers)
                    categories = categories.filter(item => !!item)
                    _.set(values, path, categories)
                } else {
                    _.set(values, path, [])
                }
            }
            if (field.type === 'block') {
                const resolvers = field.settings.fields.map(async (f: PageTemplateField) => {
                    await setuper(f, path)
                })
                await Promise.all(resolvers)
            }
            if (field.type === 'repeater') {
                const resolvers = field.settings.fields.map(async (f: PageTemplateField) => {
                    await setuper(f, path)
                })
                await Promise.all(resolvers)

            }
        }
        const resolvers = template.fields.map((field) => setuper(field))
        await Promise.all(resolvers)
        return values
    }
    async serialize(payload: RequestPayload) {
        await super.serialize(payload)
        this.values = await this.setupValues({ templateId: this.templateId, values: this.values }, payload)
        return this
    }
}

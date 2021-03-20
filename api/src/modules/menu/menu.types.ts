import { DefaultRepository } from "src/blueprints";
import { PageRepository } from "../page-group/page/repository/page.repository";
import { SectionPageRepository } from "../page-group/section-page/repository/section-page.repository";
import { SectionRepository } from "../page-group/section/repository/section.repository";
import {  ProductCategoryRepository } from "../product-group/product-category";
import { ProductRepository } from "../product-group/product/repositories/product.repository";

export enum MenuItemType {
    model = 'model',
    custom = 'custom'
}

export enum MenuItemModelNames {
    category = 'category',
    product = 'product',
    page = 'page',
    section = 'section',
    sectionPage = 'sectionPage'
    
}
interface  IMenuItemsModels {
    [key: string]: any
}
export const MenuItemModels: IMenuItemsModels = {
    [MenuItemModelNames.category]: ProductCategoryRepository,
    [MenuItemModelNames.product]: ProductRepository,
    [MenuItemModelNames.page]: PageRepository,
    [MenuItemModelNames.section]: SectionRepository,
    [MenuItemModelNames.sectionPage]: SectionPageRepository,
}
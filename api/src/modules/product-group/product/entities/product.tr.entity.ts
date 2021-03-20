import { EntitySeo, EntityTranslationBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Product } from 'src/internal';
import { ProductDescription } from './product-description.entity';
import { LOCALE_REL_OPTIONS } from 'src/constants';

@Entity({})
export class ProductLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => Product, (product) => product.locale, LOCALE_REL_OPTIONS)
  item: Product;

  @Column()
  name: string;

  @OneToMany(() => ProductDescription, pDescription => pDescription.locale, { cascade: true, eager: true })
  description: ProductDescription[];

  @Column(type => EntitySeo)
  seo: EntitySeo

}

import { ID, Locale } from "src/internal";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as _ from "lodash"
import { DELETE_OPTIONS } from "src/constants";
export class EntityTranslationBlueprint {

    @PrimaryGeneratedColumn()
    id: ID;

    @Column()
    localeId: ID;

    @ManyToOne(() => Locale, { nullable: false, ...DELETE_OPTIONS})
    locale: Locale;

    // @Column({ type: 'json', nullable: true })
    // values: any;

} 



import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SettingSideSection {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        unique: true,
    })
    title!: string;

    @OneToMany(() => SettingSideSectionItem, (item) => item.section)
    items!: SettingSideSectionItem[];
}

@Entity()
@Index(["section", "title"], { unique: true })
export class SettingSideSectionItem {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @ManyToOne(() => SettingSideSection, (section) => section.items, {
        cascade: true,
        onDelete: "CASCADE",
    })
    section!: SettingSideSection;

    @OneToMany(() => SettingContentSection, (subItem) => subItem.sideSectionItem)
    contentSections!: SettingContentSection[];
}

@Entity()
@Index(["sideSectionItem", "title"], { unique: true })
export class SettingContentSection {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @OneToMany(() => SettingContentSectionItem, (item) => item.section)
    items!: SettingContentSectionItem[];

    @ManyToOne(() => SettingSideSectionItem, (subItem) => subItem.contentSections, {
        cascade: true,
        onDelete: "CASCADE",
    })
    sideSectionItem!: SettingSideSectionItem;
}

@Entity()
@Index(["section", "title"], { unique: true })
export class SettingContentSectionItem {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column({
        default: "",
    })
    description!: string;

    @Column({
        default: "",
    })
    value!: string;


    @ManyToOne(() => SettingContentSection, (section) => section.items, {
        cascade: true,
        onDelete: "CASCADE",
    })
    section!: SettingContentSection;
}

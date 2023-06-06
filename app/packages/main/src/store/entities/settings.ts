import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SettingSideSection {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    id!: number;

    @Column({
        unique: true,
        type: "text",
    })
    title!: string;

    @OneToMany(() => SettingSideSectionItem, (item) => item.section, {
        nullable: true
    })
    items?: SettingSideSectionItem[];
}

@Entity()
@Index(["section", "title"], { unique: true })
export class SettingSideSectionItem {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    id!: number;

    @Column({
        type: "text",
    })
    title!: string;

    @ManyToOne(() => SettingSideSection, (section) => section.items, {
        cascade: true,
        onDelete: "CASCADE",
    })
    section!: SettingSideSection;

    @OneToMany(() => SettingContentSection, (subItem) => subItem.sideSectionItem, {
        nullable: true
    })
    contentSections?: SettingContentSection[];
}

@Entity()
@Index(["sideSectionItem", "title"], { unique: true })
export class SettingContentSection {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    id!: number;

    @Column({
        type: "text",
    })
    title!: string;

    @OneToMany(() => SettingContentSectionItem, (item) => item.section, {
        nullable: true
    })
    items?: SettingContentSectionItem[];

    @ManyToOne(() => SettingSideSectionItem, (subItem) => subItem.contentSections, {
        cascade: true,
        onDelete: "CASCADE",
    })
    sideSectionItem!: SettingSideSectionItem;
}

@Entity()
@Index(["section", "title"], { unique: true })
export class SettingContentSectionItem {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    id!: number;

    @Column({
        type: "text",
    })
    title!: string;

    @Column({
        default: "",
        type: "text",
    })
    description!: string;

    @Column({
        default: "",
        type: "text",
    })
    value!: string;


    @ManyToOne(() => SettingContentSection, (section) => section.items, {
        cascade: true,
        onDelete: "CASCADE",
    })
    section!: SettingContentSection;
}

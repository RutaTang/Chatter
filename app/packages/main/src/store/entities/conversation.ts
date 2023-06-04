import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message";

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    title!: string;

    @Column({
        nullable: true
    })
    description!: string;

    @Column({
        type: "datetime",
        default: new Date().getTime()
    })
    createdAt!: number;

    @Column({
        type: "datetime",
        default: new Date().getTime()
    })
    updatedAt!: number;

    // Model used to generate messages
    @Column({
        default: ""
    })
    model!: string;


    @OneToMany(() => Message, message => message.conversation)
    messages?: Message[]
}

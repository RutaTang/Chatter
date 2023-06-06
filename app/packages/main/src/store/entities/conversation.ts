import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message";

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    id!: number;

    @Column({
        type: "text",
    })
    title!: string;

    @Column({
        nullable: true,
        type: "text",
    })
    description?: string;

    @Column({
        type: "numeric",
        default: new Date().getTime()
    })
    createdAt!: number;

    @Column({
        type: "numeric",
        default: new Date().getTime()
    })
    updatedAt!: number;

    // Model used to generate messages
    @Column({
        default: "",
        type: "text"
    })
    model!: string;


    @OneToMany(() => Message, message => message.conversation, {
        nullable: true
    })
    messages?: Message[]
}

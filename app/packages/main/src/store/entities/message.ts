import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./conversation";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column()
    role!: string;

    @Column()
    content!: string;

    @ManyToOne(() => Conversation, conversation => conversation.messages, {
        cascade: true,
        onDelete: "CASCADE"
    })
    conversation!: Conversation;
}

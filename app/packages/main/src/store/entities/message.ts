import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from "./conversation";

@Entity()
export class Message {
    @PrimaryGeneratedColumn({
        type: "integer"
    })
    id!: number;

    @Column({
        type: "text",
    })
    role!: string;

    @Column({
        type: "text",
    })
    content!: string;

    // Order the messages in a conversation, default to -1 means the message is not ordered
    @Column({
        default: -1,
        type: "integer"
    })
    order!: number;

    @ManyToOne(() => Conversation, conversation => conversation.messages, {
        cascade: true,
        onDelete: "CASCADE"
    })
    conversation!: Conversation;
}

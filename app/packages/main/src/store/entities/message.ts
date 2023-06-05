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

    // Order the messages in a conversation, default to -1 means the message is not ordered
    @Column({
        default: -1
    })
    order!: number;

    @ManyToOne(() => Conversation, conversation => conversation.messages, {
        cascade: true,
        onDelete: "CASCADE"
    })
    conversation!: Conversation;
}

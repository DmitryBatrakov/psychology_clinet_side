import { UUID } from "crypto";


export interface Inbox  {
    to: UUID; 
    atouchment: UUID[];
    message: string;
    cratedAt: Date;  
    state: boolean; //reed | unread
}

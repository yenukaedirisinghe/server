import * as mongodb from "mongodb";


export interface Ticket {
    
    username: string;
    total:string
    seats: string;
    _id?: mongodb.ObjectId;
 }
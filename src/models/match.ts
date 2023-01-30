import * as mongodb from "mongodb";


export interface Match {
    _id?: mongodb.ObjectId;
    title: string;
    time:string;
    date: string;
    series:string;
    url:string;
    ticket_price:string;    
 }
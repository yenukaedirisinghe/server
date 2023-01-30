import * as mongodb from "mongodb";


export interface User {
    first_name: string;
    username: string;
    phoneNumber:string
    email: string;
    password:string;
    _id?: mongodb.ObjectId;
 }
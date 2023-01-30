import * as mongodb from "mongodb";
import {Employee} from "./employee";
import {User} from "./models/user";
import {Match} from "./models/match";
import {Ticket} from "./models/ticket";
 
export const collections: {
   employees?: mongodb.Collection<Employee>;
   users?: mongodb.Collection<User>;
   matches?: mongodb.Collection<Match>;
   tickets?: mongodb.Collection<Ticket>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("LordsdataDb");
   await applySchemaValidation(db);
 
   const employeesCollection = db.collection<Employee>("employees");
   const usersCollection = db.collection<User>("users");
   const matchesCollection = db.collection<Match>("matches");
   const ticketsCollection = db.collection<Ticket>("ticket");

   collections.employees = employeesCollection;
   collections.users = usersCollection;
   collections.matches = matchesCollection;
   collections.tickets = ticketsCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "username", "email" , "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                username: {
                    bsonType: "string",
                    description: "'username' is required and is a string",
                    minLength: 5
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is ",
                    
                },
                password: {
                    bsonType: "string",
                    description: "'password' is required and is ",
                    
                },
            },
        },
    };

       // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
    collMod: "users",
    validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === 'NamespaceNotFound') {
        await db.createCollection("users", {validator: jsonSchema});
    }
});

 };
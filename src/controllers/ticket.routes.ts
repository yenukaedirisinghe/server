import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";

export const ticketRouter = express.Router();
ticketRouter.use(express.json());

ticketRouter.get("/", async (_req, res) => {
    try {
        const tickets = await collections.tickets.find({}).toArray();
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
 });
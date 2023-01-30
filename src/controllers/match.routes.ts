import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "../database";

export const matchRouter = express.Router();
matchRouter.use(express.json());

matchRouter.get("/", async (_req, res) => {
    try {
        const matches = await collections.matches.find({}).toArray();
        res.status(200).send(matches);
    } catch (error) {
        res.status(500).send(error.message);
    }
 });

 matchRouter.get("/:date", async (req, res) => {
    try {
        //const date = new Date(req.params.date);
        const query = { date: { $eq: req.params.date } };
        const shedule = await collections.matches.find(query).toArray();
        res.status(200).send(shedule);
    } catch (error) {
        res.status(500).send(error.message);
    }
 });
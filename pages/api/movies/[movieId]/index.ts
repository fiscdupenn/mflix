import clientPromise from "../../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
export default async (req: NextApiRequest, res: NextApiResponse) => {


    const { movieId } = req.query;
    console.log("id get from movieId ",movieId);
    try {
        const client = await clientPromise;
        const db = client.db("sample_mflix");
        const movies = await db
            .collection("movies")
            .find({ _id: new ObjectId(movieId as string) }).toArray();
        res.json(movies);
    } catch (e) {
        console.error(e);
    }
}
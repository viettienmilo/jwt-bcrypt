import Class from './../../../models/Class.js';

export default async function createOne(req, res) {
    try {
        const data = req.body;

        const newItem = new Class(data);
        await newItem.save();

        if (!newItem) return res.status(400).json({ error: "Create failed." });

        return res.status(200).json();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error." });
    }
}
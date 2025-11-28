import Course from './../../../models/Course.js';

export default async function fetchOne(req, res) {

    try {
        const id = req.params.id;
        const item = await Course.findById(id);
        if (!item) return res.status(401).json({ error: "Not found." });

        res.status(200).json({ item });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
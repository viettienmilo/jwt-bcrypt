import Course from './../../../models/Course.js';

export default async function updateOne(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;

        const updated = await Course.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        )

        if (!updated) return res.status(400).json({ error: "Not found." });

        return res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." })
    }
}
import Class from './../../../models/Class.js';

export default async function deleteOne(req, res) {
    try {
        const { id } = req.params;
        const deletedItem = await Class.findByIdAndUpdate(
            id,
            { status: "inactive" }
        );

        if (!deletedItem) return res.status(401).json({ error: "Not found." });
        return res.status(200).json();

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error." });
    }
}
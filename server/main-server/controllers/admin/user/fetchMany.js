import UserProfile from '../../../models/UserProfile.js';
import OPERATOR_MAP from '../../../utils/operatorMap.js';
import { formatToDDMMYYYY } from './../../../utils/dateFormat.js';


export default async function fetchMany(req, res) {
    try {
        // --- Pagination ---
        const page = parseInt(req.query.page ?? 0);
        const pageSize = parseInt(req.query.pageSize ?? 10);

        // --- Sorting ---
        const sort = req.query.sort ? JSON.parse(req.query.sort) : [];

        // --- Filter model (quick search + advanced rules) ---
        const rawFilter = req.query.filter ? JSON.parse(req.query.filter) : {};
        const quickValues = rawFilter.quickFilterValues ?? [];
        const ruleFilters = rawFilter.items ?? [];

        // --- OR conditions (quick search) ---
        const orConditions = [];
        quickValues.forEach(val => {
            const regex = new RegExp(val, "i");
            orConditions.push({ studentCode: regex });
            orConditions.push({ firstname: regex });
            orConditions.push({ lastname: regex });
            orConditions.push({ role: regex });
            orConditions.push({ status: regex });
        });

        // --- AND conditions (advanced filters) ---
        const andConditions = [];
        ruleFilters.forEach(rule => {
            const { field, operator, value } = rule;
            const mapper = OPERATOR_MAP[operator];
            if (mapper) {
                andConditions.push(mapper(field, value));
            }
        });

        // --- Final combined filter ---
        let mongoFilter = {};
        if (orConditions.length > 0) mongoFilter.$or = orConditions;
        if (andConditions.length > 0) mongoFilter.$and = andConditions;

        // --- Query ---
        let mongoQuery = UserProfile.find(mongoFilter);

        // --- Sorting ---
        if (sort.length > 0) {
            const sortObj = {};
            sort.forEach(s => {
                sortObj[s.field] = s.sort === "asc" ? 1 : -1;
            });
            mongoQuery = mongoQuery.sort(sortObj);
        }

        // --- Count total for pagination ---
        const itemCount = await UserProfile.countDocuments(mongoFilter);

        // --- Apply pagination ---
        const users = await mongoQuery
            .skip(page * pageSize)
            .limit(pageSize);

        const items = users.map(user => ({
            ...user.toObject(),
            fullName: `${user.lastname} ${user.firstname}`,
            birthdate: formatToDDMMYYYY(user.birthdate),
        }));

        res.status(200).json({ items, itemCount });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}

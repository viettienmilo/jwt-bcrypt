const OPERATOR_MAP = {
    eq: (f, v) => ({ [f]: v }),
    ne: (f, v) => ({ [f]: { $ne: v } }),
    gt: (f, v) => ({ [f]: { $gt: v } }),
    gte: (f, v) => ({ [f]: { $gte: v } }),
    lt: (f, v) => ({ [f]: { $lt: v } }),
    lte: (f, v) => ({ [f]: { $lte: v } }),
    in: (f, v) => ({ [f]: { $in: v } }),
    nin: (f, v) => ({ [f]: { $nin: v } }),
    contains: (f, v) => ({ [f]: new RegExp(v, "i") }),
};

export default OPERATOR_MAP
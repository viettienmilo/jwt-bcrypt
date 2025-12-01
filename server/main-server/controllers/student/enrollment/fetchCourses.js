import Course from './../../../models/Course.js';

export default async function fetchCourses(req, res) {

    const items = await Course.aggregate([
        // find all classes has same courseId
        {
            $lookup: {
                from: 'classes',
                localField: '_id',
                foreignField: 'courseId',
                as: 'classes'
            },
        },
        // unwind classes to get teacher
        {
            $unwind: {
                path: '$classes',
                preserveNullAndEmptyArrays: true,  // keep courses with no classes
            }
        },
        // look up teacher of each class
        {
            $lookup: {
                from: 'userprofiles',
                localField: 'classes.teacherId',
                foreignField: '_id',
                as: 'classes.teacher'
            }
        },
        // flatten teacher array to single object
        {
            $unwind: {
                path: '$classes.teacher',
                preserveNullAndEmptyArrays: true,
            }
        },
        // group back class per course
        {
            $group: {
                _id: '$_id',
                courseCode: { $first: '$courseCode' },
                courseName: { $first: '$courseName' },
                credits: { $first: '$credits' },
                description: { $first: '$description' },
                classes: { $push: '$classes' }
            }
        },
        // sort
        {
            $sort: { courseName: 1 } // 1 = ascending, -1 = descending
        },
    ]);




    res.status(200).json({ items });
}
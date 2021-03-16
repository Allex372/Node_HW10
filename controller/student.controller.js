const { studentService } = require('../service');
const { errorMessages } = require('../error');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const students = await studentService.findAll();

            res.json(students);
        } catch (e) {
            next(e);
        }
    },

    createStudent: async (req, res, next) => {
        try {
            await studentService.createStudent(req.body);

            res.json(errorMessages.USER_IS_CREATED);
        } catch (e) {
            next(e);
        }
    }
};

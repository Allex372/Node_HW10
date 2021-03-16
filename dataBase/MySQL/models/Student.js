// module.exports = (client, DataTypes) => {
//     const Student = client.define(
//         'Student',
//         {
//             id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//             name: { type: DataTypes.STRING },
//             age: { type: DataTypes.INTEGER, defaultValue: 18 },
//             gender: { type: DataTypes.STRING }
//         },
//         {
//             tableName: 'students',
//             timestamps: false
//         }
//     );
//     return Student;
// };

const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../index');

class Student extends Model {}

Student.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 18
    },
    gender: {
        type: DataTypes.STRING
    }
},
{
    sequelize,
    timestamp: true
});

module.exports = Student;

const User = require('../dataBase/models/User');
require('../dataBase/models/Car');
const { queryInfo: { queryInfoUser } } = require('../helper');

module.exports = {
    findUsers: async (query) => {
        const {
            skip, keys, filterObject, sort, limit, page, filter
        } = queryInfoUser(query);

        keys.forEach((key) => {
            switch (key) {
                case 'price_Gte':
                    filterObject.price = { ...filterObject.price, $gte: filter.price_Gte };
                    break;
                case 'price_Lte':
                    filterObject.price = { ...filterObject.price, $lte: filter.price_Lte };
                    break;
                case 'category':
                    const categories = filter.category.split(';');
                    filterObject.category = { $in: categories };
                    break;
                default:
                    filterObject[key] = filter[key];
            }
        });
        const users = await User.find(filterObject).limit(+limit).skip(skip).sort(sort);
        const count = await User.countDocuments(filterObject);

        return {
            data: users,
            page,
            limit,
            count,
            pages: Math.ceil(count / limit)
        };
    },

    findUserById: (userId) => (User.findById(userId)),

    createUser: (userObject) => User.create(userObject),

    updateUser: (userId, updateObject) => User.updateOne({ _id: userId }, { $set: updateObject }),

    deleteSingleUser: (userId) => User.findByIdAndDelete(userId)
};

import userModel from '../models/user.js';

class UserManager {

    getUsers() {
        return userModel.find().lean();
    }

    getBy(param) {
        return userModel.findOne(param).lean();
    }

    create(user) {
        return userModel.create(user);
    }
}

export default UserManager;
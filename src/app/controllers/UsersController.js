const Users = require('../models/Users');
const {mutipleMongooseToObject} = require('../../util/moogose');

class UsersController {
    // [GET] /users
    index (req, res, next){
        Users.find({
            //fullname: { $regex: 'Văn' }
        })
        .then(Users => res.render('users', {
            Users: mutipleMongooseToObject(Users)
        }))
        .catch(next);

        //res.render('users');
    }
}

module.exports = new UsersController;
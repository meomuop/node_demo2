const Users = require('../models/Users');
const {mutipleMongooseToObject} = require('../../util/moogose');
const {mongooseToObject} = require('../../util/moogose');

class UsersController {
    // [GET] /users
    index (req, res, next){
        Users.find({
            //fullname: { $regex: 'Văn' }
        })
        .then(Users => res.render('admin/users/list', {
            layout: 'admin',
            Users: mutipleMongooseToObject(Users)
        }))
        .catch(next);
    }

    // [GET]/users/edit/:id
    edit (req, res, next){
        Users.findOne({_id: req.params.id})
        .then(
            Users => res.render('admin/users/edit', {
                layout: 'admin',
                Users: mongooseToObject(Users)
            }),
        )
        .catch(next);
    }

    // [PUT]/users/:id
    update (req, res, next){
        Users.updateOne({_id: req.params.id},req.body)
        .then(()=>res.redirect('/admin/users'))
        .catch(next);
    }

    // [GET]/users/create
    create (req, res, next){
        res.render('admin/users/create',{layout: 'admin'});
    }

    // [POST]/users/save
    save (req, res, next){
        Users.create(req.body)
        .then(()=>res.redirect('/admin/users'))
        .catch(next);
    }

    // [GET]/users/delete
    delete (req, res, next){
        Users.deleteOne({_id: req.params.id})
        .then(()=>res.redirect('/admin/users'))
        .catch(next);
    }

    // [GET]/users/inactive
    inactive (req, res, next){
        Users.updateOne({_id: req.params.id},{status:0})
        .then(()=>res.redirect('/admin/users'))
        .catch(next);
    }

    // [GET]/users/active
    active (req, res, next){
        Users.updateOne({_id: req.params.id},{status:1})
        .then(()=>res.redirect('/admin/users'))
        .catch(next);
    }
}

module.exports = new UsersController;
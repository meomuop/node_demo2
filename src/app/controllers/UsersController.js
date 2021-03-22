const Users = require('../models/Users');
const {mutipleMongooseToObject} = require('../../util/moogose');
const {mongooseToObject} = require('../../util/moogose');
const { count } = require('../models/Users');

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
        var errorArr = new Array;
        // Validate data posted
        Users.countDocuments({ username: req.body.username, _id: { $ne: req.params.id } }, function (err, count) {
            if (err){
                errorArr.push('Có lỗi khi thực hiện truy vấn!');
            }
            if(count > 0){
                errorArr.push('Tên đăng nhập đã tồn tại!');
                console.log('loi:', errorArr);
                console.log('so luong loi:', errorArr.length);
            }
            if(req.body.fullname == ''){
                errorArr.push('Họ tên là bắt buộc!');
            }
            if(req.body.username == ''){
                errorArr.push('Tên đăng nhập là bắt buộc!');
            }
            if(req.body.password.length < 6){
                errorArr.push('Mật khẩu cần ít nhất 6 ký tự!');
            }
            //Check if error detected
            if(errorArr.length > 0){
                Users.findOne({_id: req.params.id})
                .then(
                    Users => res.render('admin/users/edit', {
                        layout: 'admin',
                        Users: mongooseToObject(Users),
                        errors: errorArr
                    }),
                )
                .catch(next);
            }else{
                //upload file
                var userArr = req.body;
                var avatar;
                if (req.files) {
                    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                    avatar = req.files.avatar;
                    // Use the mv() method to place the file somewhere on your server
                    avatar.mv('src/public/uploads/users/'+avatar.name, function(err) {
                        if (err){
                            console.log('Erro upload file: '+err);
                        }
                    });
                    userArr.avatar = 'uploads/users/'+avatar.name;
                }
                //console.log(userArr);
                Users.updateOne({_id: req.params.id},userArr)
                .then(()=>res.redirect('/admin/users'))
                .catch(next);
            }
        });
        
    }

    // [GET]/users/create
    create (req, res, next){
        res.render('admin/users/create',{layout: 'admin'});
    }

    // [POST]/users/save
    save (req, res, next){
        var errorArr = new Array;
        // Validate data posted
        if(req.body.fullname == ''){
            errorArr.push('Họ tên là bắt buộc!');
        }
        if(req.body.username == ''){
            errorArr.push('Tên đăng nhập là bắt buộc!');
        }
        if(req.body.password.length < 6){
            errorArr.push('Mật khẩu cần ít nhất 6 ký tự!');
        }
        if(Users.find({username: req.body.username}).length > 0){
            errorArr.push('Tên đăng nhập đã tồn tại!');
        }
        //Check if error detected
        if(errorArr.length > 0){
            res.render('admin/users/create',{
                layout: 'admin',
                errors: errorArr
            });
        }else{
            //upload file
            var userArr = req.body;
            var avatar;
            if (req.files) {
                // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
                avatar = req.files.avatar;
                // Use the mv() method to place the file somewhere on your server
                avatar.mv('src/public/uploads/users/'+avatar.name, function(err) {
                    if (err){
                        console.log('Erro upload file: '+err);
                    }
                });
                userArr.avatar = 'uploads/users/'+avatar.name;
            }
            //console.log(userArr);
            Users.create(userArr)
                .then(()=>res.redirect('/admin/users'))
                .catch(next);
        }
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
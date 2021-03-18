class AdminController {
    // [GET] /admin/home
    index (req, res){
        res.render('admin/home',{layout: 'admin'});
    }
}

module.exports = new AdminController;
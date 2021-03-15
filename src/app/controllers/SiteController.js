class SiteController {
    // [GET] /home
    index (req, res){
        res.render('home');
    }

    // [GET] /contact
    contact (req, res){
        res.render('contact');
    }

    // [GET] /sitemap
    sitemap (req, res){
        res.render('sitemap');
    }
}

module.exports = new SiteController;
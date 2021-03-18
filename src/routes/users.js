const express = require('express');
const router = express.Router();

const usersController = require('../app/controllers/UsersController');

router.get('/create', usersController.create);
router.post('/save', usersController.save);
router.get('/edit/:id', usersController.edit);
router.put('/:id', usersController.update);
router.get('/delete/:id', usersController.delete);
router.get('/inactive/:id', usersController.inactive);
router.get('/active/:id', usersController.active);
router.get('/', usersController.index);

module.exports = router;
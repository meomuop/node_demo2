const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Users = new Scheme({
    fullname: { type: String, default: '' },
    phone: { type: String, default: '' },
    avatar: { type: String, default: '' },
    username: { type: String, default: '' },
    password: { type: String, default: '' },
    status: { type: Number, max: 1 , default: 1 },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: String, default: Date.now },
});

module.exports = mongoose.model('Users', Users);
const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
    userId:{
        type: Number,
        default: -1
    },
    timestemp:{
        type: Date,
        defual: Date.now()
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);
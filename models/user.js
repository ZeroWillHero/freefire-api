const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login_id: {
        type: String,
        
    },

    nickname : {
        type: String,
        
    
    },

    expires_in : {
        type:Date,
        expires: 30,
        default: Date.now
    }


})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    address: { city: String, state: String, detail: String },
    status: Boolean
}, {
    timestamps: true
});

//   USER_REF: { type: mongoose.Schema.Types.ObjectId, ref: 'user', index: true },


module.exports = mongoose.model('Customer', CustomerSchema);
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contactSchema =  new schema({
    phoneNumber: String,
    email: String,
    linkedId: [{
        type: schema.Types.ObjectId,
        ref: 'Contact'
    }],
    linkPrecedence: { type: String, enum: ['primary', 'secondary'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: Date,
  });
  

  module.exports = Contact = mongoose.model('Contact', contactSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    url: {
      type: String,
      required: [true, 'Please enter REST request url'],
      lowercase: true,
    },
    fnName: {
      type: String,
      required: [true, 'Please enter a valid function name'],
    },

    params: {
        type:[String],
        }
  
  });

  const ClientAction = mongoose.model('client-action', userSchema);

module.exports = ClientAction;

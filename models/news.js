const mongoose = require('mongoose');
const { Schema } = mongoose;

const newsSchema = new Schema({
    title:  {type: String, required: [true, 'Title is required,please']}, // String is shorthand for {type: String}
    description:{type: String, required: [true,'Description is required, please']},
    created: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('News', newsSchema);
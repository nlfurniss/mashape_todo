var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var TodoSchema = new Schema({
    title: String,
    desc: String,
    done: {type: Boolean, default: false},
    updated_at: {type: Date, default: Date.now}
});
 
mongoose.model('Todo', TodoSchema);
mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://localhost/mashape');
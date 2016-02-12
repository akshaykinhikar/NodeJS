var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var bookModel  = new Schema({
	title:{ type : String },
	author:{ type : String },
	gender:{ type : String },
	read:{ type : String, default : false}
});

module.exports = mongoose.model('Book', bookModel);
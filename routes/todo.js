var mongoose = require('mongoose');
var Todo = mongoose.model('Todo');
var Twilio = require('../twilio_api').twilio;

exports.index = function(req, res) {
	Todo.find(function(err, todos, count){
		res.render( 'index', {
			title : 'Mashape Todo',
			todos : todos
		});
	});
}

exports.create = function(req, res) {
	new Todo({
		title: req.body.title,
		desc: req.body.desc,
		done: req.body.done,
		updated_at: Date.now()
	}).save( function(err, todo, count){
		res.redirect('/');
	});
}

exports.update = function(req, res) {
	Todo.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, todo) {
		if (req.body.done == true) { Twilio.sendSMS(todo.title); }
  	 	res.send(200);
  	});
}

exports.delete = function(req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    todo.remove( function (err, todo) {
      res.send(200);
    });
  });
}
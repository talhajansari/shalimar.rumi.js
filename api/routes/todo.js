var Todo = require('./../models/TodoModel');

module.exports = function (router) {

	router.get('/todos', function(req, res) {
	  // use mongoose to get all todos in the database
	  Todo.find(function(err, todos) {
	      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
	      if (err)
	          router.methods.responseError(res, err)
	      router.methods.responseData(res, todos); // return all todos in JSON format
	  });
	});
}
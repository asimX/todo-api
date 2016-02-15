var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;

// todos is the collection, each element is the model
var todos = [{}];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req,res){
	res.send('Todo API Root');
});

//GET /todos
app.get('/todos', function(req,res){
	res.json(todos);
})

//GET /todos/:id : represents variable

app.get('/todos/:id', function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	// todos.forEach(function(todo){
	// 	if (todoId === todo.id){
	// 		matchedTodo=todo;
	// 	}
	// });

	if (matchedTodo){
		res.json(matchedTodo);
	}
	else{
		res.status(404).send();
	}
	
	//res.send('Asking for todo with id of ' + req.params.id);
});

//  POST /todos

app.post('/todos', function(req,res){
	var body = _.pick(req.body, 'description', 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0){
		return res.status(400).send();
	}

	console.log('description' + body.description);

	body.id = todoNextId++;
	
	body.description = body.description.trim();
	todos.push(body);

	//todoId++;

	res.json(body);
});

// DELETE /todos/:id

app.delete('/todos/:id', function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoId});
	if(!matchedTodo){
		return res.status(404).json({"error": "no todo found with that id"});
	}
	else{
		todos = _.without(todos,matchedTodo);
		res.json(matchedTodo)
	}
});

// PUT /todos/:id

app.put('/todos/:id', function(req,res){
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(!matchedTodo){
		return res.status(404).send();
	}
	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	}
	else if(body.hasOwnProperty('completed')){
		//something went wrong
		return res.status(400).send();
	}
	
	if(body.hasOwnProperty('description') && _.isString(body.description) || body.description.trim().length===0){
		validAttributes.description = body.description;
	}
	else if (body.hasOwnProperty('description')){
		return res.status(400).send();
	}

	_.extend(matchedTodo,validAttributes);
	res.json(matchedTodo);

});

app.listen(PORT, function(){
	console.log('Express listening on port' + PORT + '!');
})

////some text here to refresh push to  remote
///
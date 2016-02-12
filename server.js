var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

// todos is the collection, each element is the model
var todos = [{
	id: 1,
	description: 'Meet mom for lunch',
	completed: false
}, {
	id: 2,
	description: 'Go to market',
	completed: false
}, {
	id: 3,
	description: 'Feed the cat',
	completed: true
}];

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
	var matchedTodo;

	todos.forEach(function(todo){
		if (todoId === todo.id){
			matchedTodo=todo;
		}
	});

	if (matchedTodo){
		res.json(matchedTodo);
	}
	else{
		res.status(404).send();
	}
	
	//res.send('Asking for todo with id of ' + req.params.id);
});



app.listen(PORT, function(){
	console.log('Express listening on port' + PORT + '!');
})

////some text here to refresh push to  remote
///
// Code goes here

let todoList=
{
  todos:[],
  addTodos:function(todoText){
    this.todos.push({
      todoText:todoText,
      completed:false
    });
  },
  changeTodos:function(position,todoText){
    this.todos[position].todoText=todoText;
  },
  deleteTodos:function(position){
    this.todos.splice(position,1);
  },
  toggleCompleted:function(position){
    let todo=this.todos[position];
    todo.completed=!todo.completed;
  },
  toggleAll:function(){
    let completedTodos=0;
    let totalTodos=this.todos.length;

    this.todos.forEach(function(todo){
      if(todo.completed===true){
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo){
      if(completedTodos===totalTodos)
      {
        todo.completed=false;
      }else{
        todo.completed=true;
      }
    });
  }
};
let handlers={
  toggleAll:function(){
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodos:function(){
    var addTodosTextInput=document.getElementById('addTodosTextInput');
    todoList.addTodos(addTodosTextInput.value);
    addTodosTextInput.value='';
    view.displayTodos();
  },
  changeTodos:function(){
    let changeTodoPositionInput=document.getElementById('changeTodoPositionInput');
    let changeTodoText=document.getElementById('changeTodoText');
    todoList.changeTodos(changeTodoPositionInput.valueAsNumber,changeTodoText.value);
    changeTodoPositionInput.value='';
    changeTodoText.value='';
    view.displayTodos();
  },
  deleteTodos:function(position){
    todoList.deleteTodos(position);
    view.displayTodos();
  },
  toggleCompleted:function(){
    let toggleTodoPositionInput=document.getElementById('toggleTodoPositionInput');
    todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
    toggleTodoPositionInput.value="";
    view.displayTodos();
  }
};

let view={
  displayTodos:function(){
    let todoUl=document.querySelector('ul');
    todoUl.innerHTML='';
    todoList.todos.forEach(function(todo,position){
      let todoLi=document.createElement('li');
      let todoTextWithCompletion="";
      if(todo.completed===true)
      {
        todoTextWithCompletion="(x) "+todo.todoText+" ";
      }else
      {
        todoTextWithCompletion="( ) "+todo.todoText+" ";
      }
      todoLi.id=position;
      todoLi.textContent=todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoUl.appendChild(todoLi);
    },this);
  },
  createDeleteButton:function(){
    let deleteButton=document.createElement('button');
    deleteButton.textContent='Delete';
    deleteButton.className='deleteButton';
    return deleteButton;
  },
  delete:function(){
    let todoUl=document.querySelector('ul');
    todoUl.addEventListener('click',function(event){
      let elementClicked=event.target;
      if(elementClicked.className='deleteButton')
      {
        handlers.deleteTodos(parseInt(elementClicked.parentNode.id));
      }
    });
  }
  
};
view.delete();


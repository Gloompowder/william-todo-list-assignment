const url = "http://localhost:3000/todos";
const dashboard = document.querySelector(".dashboard");
const submit = document.querySelector(".submit-button");
const inputBar = document.querySelector(".input-field");
const inputForm = document.querySelector(".input-form");
const deleteButton = document.querySelectorAll("delete");

var todoArr = [];

const fetchTodos = fetch(url)
.then(res=>res.json())
.then(data=> {return data});

function getTodos(){
    fetch(url)
    .then(result=>result.json())
    .then(data=>{
        const todoData = data.map(todo=>{
            return todo.completed ?
            `<form key=${todo.id} class="todo-item" >
            <div class="completed-task">${todo.title}
            <div/>
            <input onclick="handleDelete(${todo.id})" class = "delete" type ="button" value = "trash">
            </form>`
            :`<form onClick="divToForm(${todo.id})" key=${todo.id} class="todo-item">
            <div  class="todo-item-text">${todo.title} 
            <div/>
            <input onclick="handleUpdate(${todo.id})" class="edit" type ="submit" value="edit">
            <input onclick="handleDelete(${todo.id})" class="delete" type ="button" value = "trash">
            </form>`
        }).join("");
    todoArr = todoData;
    dashboard.innerHTML = todoArr;
    });
};
getTodos();

        // handling inputs
function handleInput(e){
    e.preventDefault();
    inputBar.value = e.target.value;
}
inputBar.addEventListener("input", handleInput);


// handle submit
function createTodo(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputBar.value, completed:false})
    };
    fetch(url, requestOptions)
    .then(res=>res.json())
    .then(data=>todoArr+=(data))
    .then(dashboard.innerHTML=todoArr);
}

function handleSubmit(e){
    e.preventDefault();
    createTodo()
}

inputForm.addEventListener("submit", handleSubmit);


// DELETE call

function handleDelete(id){

fetch(url+`/${id}`, { method: 'DELETE' })
    .then(() => console.log(`id at : ${id} deleted.`))
    .then(getTodos());
};


// POST completed call 

function handleComplete(id){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true })
    };
    fetch(url+`/${id}`, requestOptions)
    .then(res=>res.json())
    .then(data=>console.log(data, `id at : ${id} completed.`))
    .then(getTodos());
    };
    
// editing title process

// div changed to text input 

function divToForm(){
};

// input value saved
function handleTaskRename(){
    console.log("type in the form")
};

// fetch post request
function handleUpdate(id, changes){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: changes})
    };
    fetch(url+`/${id}`, requestOptions)
    .then(res=>res.json())
    .then(data=>console.log(data, `id at : ${id} completed.`));
};









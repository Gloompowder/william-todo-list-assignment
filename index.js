const url = "http://localhost:3000/todos";
const dashboard = document.querySelector(".dashboard");
const submit = document.querySelector(".submit-button");
const inputBar = document.querySelector(".input-field");

const fetchTodos = fetch(url)
.then(res=>res.json())
.then(data=> {return data});

function getTodos(){
    fetch(url)
    .then(result=>result.json())
    .then(data=>{
        const todoData = data.map(todo=>{
            return todo.completed ?
            `<form key=${todo.id} class="todo-item">
            <div class="todo-item-text">${todo.title}
            <div/>
            <input class = "delete-button" type ="submit" value = "trash">
            </form>`
            :`<form key=${todo.id} class="todo-item">
            <div class="todo-item-text">${todo.title}
            <div/>
            <input class="edit" type ="submit" value="edit">
            <input class="delete" type ="submit" value = "trash">
            </form>`
        }).join("");
        dashboard.innerHTML = todoData;})};
        getTodos();




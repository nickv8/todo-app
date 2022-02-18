import uuidv4 from 'uuid'


// Setup the empty todos array
let todos = []

// loadTodos
// Arguments: none
// Return value: none
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
 }

// saveTodos
// Arguments: none
// Return value: none
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// getTodos
// Arguments: none
// Return value: todos array
const getTodos = () => todos

// createTodo
// Arguments: todo text
// Return value: none
const createTodo = (text) => {
    const id = uuidv4()
    // const text = e.target.elements.text.value.trim()
     if (text.length > 0) {
        todos.push({
            id: id,
            text,
            completed: false
         })
        saveTodos()
     } else {
        return alert("Please add a ToDo")
     }
}

// removeTodo
// Arguments: id of todo to remove
// Return value: none
const removeTodo = (id) => {
    const todoIndex = todos.findIndex(function (todo) {
        return todo.id === id
    })

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
    saveTodos()
}

// toggleTodo
// Arguments: id of todo to toggle
// Return value: none
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    if (todo) {
        todo.completed = !todo.completed
    }
    saveTodos()
}

// Make sure to call loadTodos and setup the exports
loadTodos()

export { getTodos, createTodo, removeTodo, toggleTodo, loadTodos }
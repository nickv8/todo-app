
// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports

// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler

// Bonus: Add a watcher for local storage

import { createTodo, loadTodos } from './todos'
import { renderTodos } from './views'
import { setFilters } from './filters'


renderTodos()

document.querySelector('#show-completed').addEventListener('change',  (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

document.querySelector('#todos').innerHTML = ''

renderTodos()



//Listen for todo text change
document.querySelector('#new-search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

//get a trimmed version of the input
//only add a new todo if it has content

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.text.value = ''
    } else {
        return alert("Please add a ToDo")
    }
   
    
})

window.addEventListener('storage', () => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})
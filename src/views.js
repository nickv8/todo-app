import { getFilters } from './filters'
import { getTodos, toggleTodo, removeTodo } from './todos.js'



// renderTodos
// Arguments: none
// Return value: none

const renderTodos = () => {
    const { searchText, hideCompleted} = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompleteMatch = !hideCompleted || !todo.completed

        return searchTextMatch && hideCompleteMatch
    })

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos))

  //if todos to show, render them
    //else, p with class "empty-message" and message "no to-dos to show"
    
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            document.querySelector('#todos').appendChild(generateTodoDOM(todo))  
         })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        document.querySelector('#todos').appendChild(messageEl)
        
    }
  
}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element

//Setup a root div, Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkBox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    //setup todo checkbox
    checkBox.setAttribute('type', 'checkbox')
    checkBox.checked = todo.completed 
    containerEl.appendChild(checkBox)
    checkBox.addEventListener('change', ()  => {
        toggleTodo(todo.id)
        renderTodos()
    })

    //setup todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    //Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //setup remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click',  () => {
        removeTodo(todo.id)
        renderTodos()
    })
    
    return todoEl
    
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element

// Get the DOM elements for list summary
// generateSummaryDOM
const generateSummaryDOM =  (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')

    if (incompleteTodos.length === 1) { 
        summary.textContent = `You have ${incompleteTodos.length} To-Do left`
    } else {
        summary.textContent = `You have ${incompleteTodos.length} To-Dos left`
    }
    return summary
}

// Make sure to set up the exports

export { generateTodoDOM, generateSummaryDOM, renderTodos }
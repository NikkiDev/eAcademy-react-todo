import React from 'react'
// import Todolist from './Components/TodoUsingHooks/Todolist'
// import '../src/Components/TodoUsingHooks/Todo.scss'
import Todolist from './Components/TodoUsingClasses/Todolist'
import '../src/Components/TodoUsingClasses/Todo.css'

function App() {
  return (
    <div className='app-container'>
      <Todolist />
    </div>
  )
}

export default App

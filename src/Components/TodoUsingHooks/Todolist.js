import React, { useState } from 'react'
import Todotask from './Todotask'
import { FaPlus } from 'react-icons/fa'
import { v4 as uuidv4 } from 'uuid'
const Todolist = () => {
  const [error, setError] = useState('')
  const [inputText, setInputText] = useState('')
  const [inputEditText, setEditInputText] = useState(null)
  const [addTodo, setAddTodo] = useState([])
  const [stateID, setStateID] = useState(null)

  // Input Control <<<<
  const handleChange = (e) => {
    setInputText(e.target.value)
  }
  const handleClick = () => {
    if (!inputText) {
      setError('theres nothing to do')
      return
    } else if (addTodo.filter((todo) => todo.text === inputText).length > 0) {
      setError('you already have this task')
      return
    }
    if (inputText) {
      setAddTodo([
        ...addTodo,
        { text: inputText, id: uuidv4(), isDone: false, checked: false },
      ])
    }
    setInputText('')
    setError('')
  }
  // Todo Item Control<<<<<
  const handleCheck = (id) => {
    setAddTodo(
      addTodo.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isDone: !item.isDone,
          }
        }
        return item
      })
    )
  }
  const handleDelete = (id) => {
    let someArr = addTodo.filter((item) => item.id !== id)
    setAddTodo(someArr)
  }
  const handleEdit = (id) => {
    if (stateID === null) {
      setStateID(id)
    } else {
      setStateID(null)
    }
  }
  const handleEditChange = (value) => {
    setEditInputText(value)
  }
  const handleEditSave = (index, todo) => {
    if (!inputEditText) {
      setStateID(null)
      setEditInputText(null)
      return
    }
    if (
      addTodo.filter(
        (todo, idx) => todo.text === inputEditText && idx !== index
      ).length > 0
    ) {
      setError('you already have this task')
      setEditInputText(null)
      setStateID(null)
      return
    }
    setAddTodo(
      addTodo.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            text: inputEditText,
          }
        }
        return item
      })
    )
    setEditInputText(null)
    setError('')
    setStateID(null)
  }
  const handleCkeckbox = (id) => {
    setAddTodo(
      addTodo.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
          }
        }
        return item
      })
    )
  }
  const handleUp = (index) => {
    if (index === 0) {
      setError('no more way up')
      return
    }
    const upArr = [...addTodo]
    let temp = upArr[index]
    upArr[index] = upArr[index - 1]
    upArr[index - 1] = temp
    setAddTodo(upArr)
    setError('')
  }
  const handleDown = (index) => {
    if (index === addTodo.length - 1) {
      setError('no more way down')
      return
    }
    const upArr = [...addTodo]
    let temp = upArr[index]
    upArr[index] = upArr[index + 1]
    upArr[index + 1] = temp
    setAddTodo(upArr)
    setError('')
  }
  // Global Buttons Start <<<<<
  const clearAll = () => {
    setAddTodo([])
    setError('')
  }
  const clearDone = () => {
    const done = addTodo.filter((item) => item.isDone === false)
    if (addTodo.filter((item) => item.isDone === true).length === 0) {
      setError("you haven't done any tasks yet")
      return
    }
    setAddTodo([...done])
    setError('')
  }
  const clearChecked = () => {
    const done = addTodo.filter((item) => item.checked === false)
    if (addTodo.filter((item) => item.checked === true).length === 0) {
      setError('you didnt checked any task yet')
      return
    }
    setAddTodo([...done])
    setError('')
  }
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      handleClick()
    }
  }

  return (
    <div className='todo-list'>
      <div className='error'>
        <p>{error}</p>
      </div>
      <div className='list-container'>
        <input
          type='text'
          placeholder='Enter your task here'
          value={inputText}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
        />
        <span>
          <button className='btn' type='button' onClick={handleClick}>
            <FaPlus />
          </button>
        </span>
      </div>
      <div className='todo-container'>
        <ul className='todo'>
          {addTodo.map((todo, index) => (
            <Todotask
              key={todo.id}
              id={todo.id}
              todo={todo}
              index={index}
              text={todo.text}
              isDone={todo.isDone}
              handleCheck={handleCheck}
              handleDelete={handleDelete}
              handleEditChange={handleEditChange}
              handleEditSave={handleEditSave}
              handleEdit={handleEdit}
              stateID={stateID}
              handleCkeckbox={handleCkeckbox}
              handleUp={handleUp}
              handleDown={handleDown}
              inputEditText={inputEditText}
            />
          ))}
        </ul>
      </div>
      {/* Global buttons */}
      <div className='global-container'>
        <button className='btn gbtn' type='button' onClick={clearAll}>
          Clear All
        </button>
        <button className='btn gbtn' type='button' onClick={clearDone}>
          Clear Done
        </button>
        <button className='btn gbtn' type='button' onClick={clearChecked}>
          Clear Checked
        </button>
      </div>
    </div>
  )
}

export default Todolist

import React from 'react'
import { FaArrowDown } from 'react-icons/fa'
import { FaArrowUp } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa'
import { GiSaveArrow } from 'react-icons/gi'
const Todo = (props) => {
  const {
    text,
    id,
    todo,
    index,
    isDone,
    handleCheck,
    handleDelete,
    handleEditChange,
    handleEditSave,
    handleEdit,
    stateID,
    handleCkeckbox,
    handleUp,
    handleDown,
    inputEditText,
  } = props

  return (
    <li className='list-item'>
      <div className='left'>
        <button className='btn' type='button' onClick={() => handleUp(index)}>
          <FaArrowUp />
        </button>
        <button className='btn' type='button' onClick={() => handleDown(index)}>
          <FaArrowDown />
        </button>
        <input type='checkbox' onClick={() => handleCkeckbox(id)} />

        {id === stateID ? (
          <span>
            <input
              type='text'
              value={inputEditText === null ? text : inputEditText}
              onChange={(e) => handleEditChange(e.target.value)}
            />
            <button
              className='btn'
              type='button'
              onClick={() => handleEditSave(index, todo)}
            >
              <GiSaveArrow />
            </button>
          </span>
        ) : (
          <p className={isDone ? 'checked' : ''}>{text}</p>
        )}
      </div>

      <div className='right'>
        <button
          className='btn'
          type='button'
          onClick={() => handleEdit(id, text)}
        >
          <MdEdit />
        </button>
        <button className='btn' type='button' onClick={() => handleCheck(id)}>
          <FaCheck />
        </button>
        <button className='btn' type='button' onClick={() => handleDelete(id)}>
          <FaTrashAlt />
        </button>
      </div>
    </li>
  )
}

export default Todo

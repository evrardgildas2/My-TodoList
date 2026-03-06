import { useState } from 'react'
import './todoitem.css'

function TodoItem({ task, toggleTask, deleteTask, editTask }) {
  const [isCompleted, setIsCompleted] = useState(task.completed)
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(task.title)

  const handletoggle = () => {
    setIsCompleted(!isCompleted)
    toggleTask(task.id)
  }

  const handleSave = () => {
    if (newTitle.trim() === '') {
      alert('Le titre ne peut pas être vide.')
      return
    }
    editTask(task.id, newTitle.trim())
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') {
      setNewTitle(task.title)
      setIsEditing(false)
    }
  }

  return (
    <div className='task'>
      <div
        className={`toggle ${isCompleted ? 'toggle-on' : 'toggle-off'}`}
        onClick={handletoggle}
      >
        <div className='toggle-circle'></div>
      </div>

      {/* Titre ou champ d'édition */}
      {isEditing ? (
        <input
          className='task-edit-input'
          type='text'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span className={`task-title ${isCompleted ? 'completed' : ''}`}>
          {task.title}
        </span>
      )}

      {/* Date de création */}
      <span className='task-date'>{task.createdAt}</span>

      {/* Boutons */}
      <div className='task-actions'>
        {isEditing ? (
          <button className='btn-modifier' onClick={handleSave}>
            Sauver
          </button>
        ) : (
          <button className='btn-modifier' onClick={() => setIsEditing(true)}>
            Modifier
          </button>
        )}
        <button className='btn-supprimer' onClick={() => deleteTask(task.id)}>
          Supprimer
        </button>
      </div>
    </div>
  )
}

export default TodoItem

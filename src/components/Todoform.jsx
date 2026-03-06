import { useState } from 'react'
import './todoform.css'

function TodoForm({ addTask }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation : champ vide
    if (title.trim() === '') {
      alert('Veuillez entrer un titre pour la tâche.')
      return
    }

    addTask(title.trim())
    setTitle('')
  }

  return (
    <form className="todoform" onSubmit={handleSubmit}>
      <input
        className="todoinput"
        type="text"
        placeholder="Ajouter une tâche..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  )
}

export default TodoForm

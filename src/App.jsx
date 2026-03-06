import { useState, useEffect } from 'react'
import './index.css'

import TodoForm from './components/Todoform'
import Filter from './components/Filter'
import TodoItem from './components/TodoItem'

function App() {
  // ── État principal ──────────────────────────────
  const [tasks, setTasks] = useState(() => {
    // Charge les tâches depuis localStorage au démarrage
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })

  const [filter, setFilter] = useState('Toutes')

  // ── Sauvegarde automatique dans localStorage ────
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // ── Ajouter une tâche ───────────────────────────
  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
      createdAt: new Date().toLocaleString('fr-FR'),
    }
    setTasks([...tasks, newTask])
  }

  // ── Supprimer une tâche ─────────────────────────
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // ── Cocher / décocher une tâche ─────────────────
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // ── Modifier le titre d'une tâche ───────────────
  const editTask = (id, newTitle) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    )
  }

  // ── Filtrage des tâches ─────────────────────────
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Actives') return !task.completed
    if (filter === 'Terminées') return task.completed
    return true // 'Toutes'
  })

  // ── Compteur de tâches actives ──────────────────
  const activeCount = tasks.filter((task) => !task.completed).length

  // ── Rendu ──────────────────────────────────────
  return (
    <div className="container">
      <h1 className="titre">My TodoList</h1>

      <TodoForm addTask={addTask} />

      <Filter filter={filter} setFilter={setFilter} />

      <p className="active-count">{activeCount} tâche(s) active(s)</p>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="empty-message">Aucune tâche disponible.</p>
        ) : (
          filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App

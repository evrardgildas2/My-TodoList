import './filter.css'

function Filter({ filter, setFilter }) {
  const filters = ['Toutes', 'Actives', 'Terminées']

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={filter === f ? 'active' : ''}
        >
          {f}
        </button>
      ))}
    </div>
  )
}

export default Filter

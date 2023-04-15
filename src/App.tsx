import { useEffect, useRef, useState } from 'react'
import './App.css'
import { type User } from './types.d'
import { UsersList } from './components/UsersList'

function App () {
  const [user, setUser] = useState<User[]>([])
  const [showColor, setShowColor] = useState<boolean>(false)
  const [sortByCountry, setSortByCountry] = useState<boolean>(false)
  const originalUsers = useRef<User[]>([])

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUser(res.results)
        originalUsers.current = res.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const toggleColor = () => {
    setShowColor(!showColor)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry)
  }

  const handleDelete = (id: string) => {
    const newUsers = user.filter(u => u.login.uuid !== id)
    setUser(newUsers)
  }

  const handleReset = () => {
    setUser(originalUsers.current)
  }

  const sortedUsers = sortByCountry
    ? user.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    : originalUsers.current

  return (
    <div className="App">
      <header>
        <h1>Lista de usuarios</h1>
        <button onClick={toggleColor}>Mostrar color</button>
        <button onClick={toggleSortByCountry}>Ordenar por pais</button>
        <button onClick={handleReset}>Reset</button>
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showcolor={showColor} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App

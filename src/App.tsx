import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UsersList } from './components/UsersList'

function App () {
  const [user, setUser] = useState<User[]>([])
  const [showColor, setShowColor] = useState<boolean>(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
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

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const toggleColor = () => {
    setShowColor(!showColor)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (id: string) => {
    const newUsers = user.filter(u => u.login.uuid !== id)
    setUser(newUsers)
  }

  const handleReset = () => {
    setUser(originalUsers.current)
  }

  const filteredUsers = useMemo(() => {
    console.log('filtering')
    return filterCountry != null && filterCountry.length > 0
      ? user.filter(u => u.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : user
  }, [filterCountry, user])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers
    if (sorting === SortBy.NAME) return filteredUsers.toSorted((a, b) => a.name.first.localeCompare(b.name.first))
    if (sorting === SortBy.LAST) return filteredUsers.toSorted((a, b) => a.name.last.localeCompare(b.name.last))
    return sorting === SortBy.COUNTRY
      ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
      : filteredUsers
  }, [filteredUsers, sorting])

  return (
    <div className="App">
      <header>
        <h1>Lista de usuarios</h1>
        <button onClick={toggleColor}>Mostrar color</button>
        <button onClick={toggleSortByCountry}>Ordenar por pais</button>
        <button onClick={handleReset}>Reset</button>
        <input placeholder='Filtrar por pais' onChange={e => { setFilterCountry(e.target.value) }} />
      </header>
      <main>
        <UsersList changeSorting ={handleChangeSort} deleteUser={handleDelete} showcolor={showColor} users={sortedUsers} />
      </main>
    </div>
  )
}

export default App

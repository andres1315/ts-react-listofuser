import { SortBy, type User } from '../types.d'

export function UsersList ({ users, showcolor, deleteUser, changeSorting }: Props) {
  return (
    <>
      <table width='100%'>
        <thead>
          <tr >
            <th>Foto</th>
            <th className='pointer' onClick={() => { changeSorting(SortBy.NAME) }}>Nombre</th>
            <th className='pointer' onClick={() => { changeSorting(SortBy.LAST) }}>Apellido</th>
            <th className='pointer' onClick={() => { changeSorting(SortBy.COUNTRY) }}>Pais</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className ={showcolor ? 'table-color' : ''}>
          {users.map((user) => {
            return (
            <tr key={user.login.uuid} >
              <td><img src={user.picture.thumbnail} /></td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => { deleteUser(user.login.uuid) }}>Eliminar</button>
              </td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

interface Props {
  users: User[]
  showcolor: boolean
  deleteUser: (id: string) => void
  changeSorting: (sort: SortBy) => void
}

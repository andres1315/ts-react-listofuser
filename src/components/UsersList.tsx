import { type User } from '../types'

export function UsersList ({ users, showcolor, deleteUser }: Props) {
  return (
    <>
      <table width='100%'>
        <thead>
          <tr >
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Pais</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            const colorBg = i % 2 === 0 ? '#333' : '#555'
            const color = showcolor ? colorBg : 'transparent'
            return (
            <tr key={user.login.uuid} style={{ backgroundColor: color }}>
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
}

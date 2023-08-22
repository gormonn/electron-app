import { FC } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import css from './todo-page.module.scss'

export const TodoPage: FC = () => {
  return <div className={css.list}>
    <div className={css.menu}>
      <NavLink to={'/'}>Todo List</NavLink>
      <NavLink to={'/history'}>History</NavLink>
    </div>
    <Outlet/>
  </div>
}

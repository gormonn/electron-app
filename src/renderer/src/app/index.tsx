import {  RouterProvider } from 'react-router-dom'
import 'normalize.css'
import { router } from './router'
import css from './layout.module.scss'
import './reset.css'


function App(): JSX.Element {
  return (
    <div className={css.app}>
      <div className={css.content}>
        <RouterProvider router={router}/>
      </div>
    </div>
  )
}

export default App

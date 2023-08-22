import { createHashRouter } from 'react-router-dom';
import { RouteObject } from 'react-router/dist/lib/context';
import {
  TodoList,
  History,
  TodoPage,
  todoListLoader,
} from '@renderer/pages/todo';

const routes: RouteObject[] = [
  {
    path: '/',
    Component: TodoPage,
    children: [
      {
        index: true,
        Component: TodoList,
        loader: todoListLoader,
      },
      {
        path: 'history',
        Component: History,
        loader: todoListLoader,
      },
    ],
  },
];

export const router = createHashRouter(routes);

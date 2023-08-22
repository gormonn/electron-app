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
    // loader: rootLoader,
    children: [
      {
        index: true,
        Component: TodoList,
        loader: todoListLoader,
      },
      {
        // index: true,
        path: 'history',
        Component: History,
        // loader: teamLoader,
      },
    ],
  },
];

export const router = createHashRouter(routes);

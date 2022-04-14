//import { v4 } from "https://deno.land/std@0.134.0/uuid/mod.ts";
import Todo from '../interfaces/Todo.ts'; 

const todos: Todo[] = [
  {
    id: crypto.randomUUID(),
    title: 'Learn Deno',
    isCompleted: true,
  },
  {
    id: crypto.randomUUID(),
    title: 'Learn TypeScript',
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title: 'Learn Oak',
    isCompleted: true,
  },
  {
    id: crypto.randomUUID(),
    title: 'Learn GraphQL',
    isCompleted: false,
  }
];

export default todos;
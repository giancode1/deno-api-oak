import Todo from "../interfaces/Todo.ts";
import todos from "../utils/todos.examples.ts";

export function getAllTodos({ response }: { response: any }) {
  response.status = 200
  response.body = todos
}

export async function createTodo({ request, response }: { request: any; response: any }) {
  const body = await request.body();
  const todo = await body.value;
  const title = todo.title;

  if (!request.hasBody) {
    response.status = 400
    response.body = {
      message: 'No data provided'
    }
    return;
  }
  if (!title) {
    response.status = 422
    response.body = {
      message: 'Incorrect data'
    }
    return;
  }

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    isCompleted: false
  }
  todos.push(newTodo)

  response.status = 201;
  response.body = {
    success: true,
    message: "todo created",
  };
}

export function getTodoById({ params, response }: { params: { id: string }; response: any }) {
  const todo: Todo | undefined = todos.find((t) => t.id === params.id);
  if (!todo) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No todo found",
    };
    return;
  }
  response.status = 200;
    response.body = {
      success: true,
      data: todo,
  };
}

export async function updateTodoById({ params, request, response }: {params: { id: string }, request: any, response: any,}) {
  const todo: Todo | undefined = todos.find((t) => t.id === params.id);
  if (!todo) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No todo found",
    };
    return;
  }

  const body = await request.body();
    const updatedData = body.value;
    const newTodos = todos.map((t) => {
      return t.id === params.id ? { ...t, ...updatedData } : t;
    });
    response.status = 200;
    response.body = {
      success: true,
      data: newTodos,

    };
}


export function deleteTodoById({ params, response }: { params: { id: string }; response: any }) {
  const allTodos = todos.filter((t) => t.id == params.id);
  console.log('allTodos', allTodos)
  if(allTodos.length === 0) {
    response.status = 404;
    response.body = {
      success: false,
      message: "No todo found",
    };
    return;
  }
  response.status = 200;
  response.body = {
    success: true,
    message: "todo deleted",
  };
}

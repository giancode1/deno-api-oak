export function getAllTodos(context: any) {
  context.response.status = 200;
  context.response.body = {
    message: "todos",
  };
}
  
export async function createTodo(context: any){
  const body = await context.request.body();
  // console.log("body:", body);
  const todo = await body.value;
  // console.log("todo:", todo);
  context.response.status = 200;
  context.response.body = {
    message: "todo created",
    todo,
  };
}
export function getTodoById(context: any){
  const id = context.params.id ;
  context.response.status = 200;
  context.response.body = {
    message: "todo",
    id: id
  };
}

export async function updateTodoById(){

}

export function deleteTodoById(){

}

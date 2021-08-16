
export default function useDeleteTodo(todosRef) {

    const deleteTodo = (todo) => {
        todosRef.value.splice(todosRef.value.indexOf(todo), 1)
    }

    const deleteCompletedTodos = () => {
        todosRef.value = todosRef.value.filter(it => !it.completed)
    }

    return {
        deleteTodo,
        deleteCompletedTodos,
    }
}
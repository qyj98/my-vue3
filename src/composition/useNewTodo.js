// !新增一个任务数据
import { ref } from "vue"
import { generateId } from "../utills/todoStorage";
//!把另一个聚合任务的响应式数据(任务列表from useTodoList)传过来
export default function useNewTodo(todoRef) {
    const newTodoRef = ref("") //! 新任务的标题 data
    const addTodo = () => {//! 将新任务添加到任务列表 data/methods
        // 新增一个任务
        // console.log(newTodoRef.value);
        const value = newTodoRef.value && newTodoRef.value.trim();
        if (!value) {
            return
        }
        //生成一个任务对象，加入到任务列表中
        const todo = {
            id: generateId(),
            title: value,
            completed: false, //任务是否完成
        }
        // console.log(todo,todoRef.value);
        todoRef.value.unshift(todo); //! 将新增的任务对象加入到任务列表中
        newTodoRef.value = "" //!加入以后将新增任务数据清空，以此来清空表单中的数据
    }
    return {
        newTodoRef,
        addTodo,
    }
}
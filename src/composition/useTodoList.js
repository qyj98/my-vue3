// !任务列表
import { ref, watchEffect } from "vue";
import { fetch, save } from "../utills/todoStorage";

export default function useTodoList() {
    const todoRef = ref(fetch());//! data 从当前localStorage中获取所有任务，保存为任务列表
    // window.todoRef = todoRef; //测试
    watchEffect(() => { //! 监听任务列表的变化，重新保存到localStorage中
        save(todoRef.value);
    });
    return { todoRef }//! 返回data 任务列表
}

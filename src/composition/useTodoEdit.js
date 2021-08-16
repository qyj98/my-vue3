import { ref, computed } from "vue";

export default function useTodoEdit(todosRef) {
    const editTodoRef = ref(null); //! 需要修改的任务 data
    let curtodo = null;  //! 任务初始内容
    const edit = (todo) => { //!点击那个任务就把这个任务设置成 需要修改的任务
        editTodoRef.value = todo
        curtodo = todo.title //!保存最开始的任务内容，以便取消

    }
    const editDone = (todo) => {
        const title = todo.title.trim()
        if (title) {
            todo.title = title;
        } else {
            todosRef.value.splice(todosRef.value.indexOf(todo), 1)
        }
        editTodoRef.value = null
    }
    const cancelEdit = (todo) => {
        editTodoRef.value = null
        todo.title = curtodo
    }

    /** 通过函数设置一键任务全部完成 缺点：刷新后checkbox的选中状态又会变为初始状态-未选择
     *  const setCheck = (completed) => {
        todosRef.value.forEach((todo) => {
            todo.completed = completed;
        });
    }
    对应的输入框需要
      <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          @keyup.enter="addTodo"
          //!$event.target.checked 点击时调用setCheck函数，传递事件参数中的目标元素:文本框中的checked属性，true/false
          @click(setCheck($event.target.checked))
        />
     */

    // ! 计算属性，与一键任务全部完成的input框内容checked双向绑定，
    const allDoneRef = computed({
        get() { //! 读取时 如果所谓未完成的任务数组长度为0 就返回true 即设置input框的内容checked--->true
            var val = todosRef.value.filter((it) => !it.completed).length === 0;
            return val;
        },
        set(checked) { //! 点击一键完成时，将所有任务的completed属性设置成input框的内容checked--->true/false
            todosRef.value.forEach((todo) => {
                todo.completed = checked;
            });
        },
    });
    return {
        editTodoRef,
        edit,
        editDone,
        cancelEdit,
        allDoneRef,
    }
}
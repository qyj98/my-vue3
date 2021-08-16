<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todoRef.length > 0">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          v-model="allDoneRef"
        />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            class="todo"
            :class="{
              completed: todo.completed,
              editing: todo === editTodoRef,
            }"
            v-for="todo in todosFilter"
            :key="todo.id"
          >
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              <label @dblclick="edit(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="deleteTodo(todo)"></button>
            </div>
            <input
              v-model="todo.title"
              @blur="editDone(todo)"
              @keyup.enter="editDone(todo)"
              @keyup.esc="cancelEdit(todo)"
              class="edit"
              type="text"
            />
          </li>
          <!-- <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>投递50封简历</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li>
          <li class="todo">
            <div class="view">
              <input class="toggle" type="checkbox" />
              <label>上午10:30 参加面试</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" type="text" />
          </li> -->
        </ul>
      </section>
      <footer class="footer" v-show="todoRef.length > 0">
        <span class="todo-count">
          <strong>{{ leftTodos }}</strong>
          <span>item{{ leftTodos > 1 ? "s" : "" }} left</span>
        </span>
        <ul class="filters">
          <li>
            <a href="#/all" :class="{ selected: visibleRef === 'all' }">All</a>
          </li>
          <li>
            <a href="#/active" :class="{ selected: visibleRef === 'active' }"
              >Active</a
            >
          </li>
          <li>
            <a
              href="#/completed"
              :class="{ selected: visibleRef === 'completed' }"
              >Completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          v-if="leftTodos !== todoRef.length"
          @click="deleteCompletedTodos"
        >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import useTodoList from "./composition/useTodoList";
import useNewTodo from "./composition/useNewTodo";
import useFilter from "./composition/useFilter";
import useTodoEdit from "./composition/useTodoEdit";
import useDeleteTodo from "./composition/useDeleteTodo";
export default {
  setup() {
    const { todoRef } = useTodoList(); //解构
    const { newTodoRef, addTodo } = useNewTodo(todoRef); //!把响应式数据:任务列表传递给这个聚合任务
    const { visibleRef, todosFilter, leftTodos } = useFilter(todoRef);
    const { editTodoRef, edit, editDone, cancelEdit, allDoneRef } =
      useTodoEdit(todoRef);
    const { deleteTodo, deleteCompletedTodos } = useDeleteTodo(todoRef);
    return {
      todoRef, //!总的任务列表 对象速写 todoref: todoref,
      newTodoRef, //!新增任务对象 v-model与表单交互
      addTodo, //!将新增任务对象push到任务列表todoRef中
      visibleRef, //!当前展示的任务列表
      todosFilter, //!筛选后的任务列表
      leftTodos, //!当前未完成的任务 active正在进行中的
      editTodoRef, //!当前编辑的任务
      edit, //!把当前任务设置成修改状态
      editDone, //!修改完成
      cancelEdit, //!取消修改
      allDoneRef, //!计算属性，设置一键任务全部完成
      deleteTodo,
      deleteCompletedTodos,
    };
  },
};
</script>

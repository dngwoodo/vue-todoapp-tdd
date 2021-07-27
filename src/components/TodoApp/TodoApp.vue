<template>
  <div>
    <h1>Todo-App</h1>
    <div class="todo-control">
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        :value="todo"
        @input="onChange"
      />
      <button type="button" @click="onClickAddTodo" data-testid="add-todo">
        추가
      </button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <p @click="onClickToggle(todo)" :class="todo.done ? 'done' : ''">
          {{ todo.text }}
        </p>
        <button
          type="button"
          @click="onClickDeleteTodo(todo.id)"
          data-testid="delete-todo"
        >
          삭제
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TodoApp",
  props: [
    "todo",
    "onChange",
    "todos",
    "onClickAddTodo",
    "onClickDeleteTodo",
    "onClickToggle",
  ],
};
</script>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
  color: grey;
}
</style>

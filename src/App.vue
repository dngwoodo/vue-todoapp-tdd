<template>
  <div>
    <h1>Todo-App</h1>
    <div class="todo-control">
      <input type="text" placeholder="할 일을 입력해주세요" v-model="todo" />
      <button type="button" @click="handleClickAddTodo" data-testid="add-todo">
        추가
      </button>
    </div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <p @click="handleClickToggle(todo)" :class="todo.done ? 'done' : ''">
          {{ todo.text }}
        </p>
        <button
          type="button"
          @click="handleClickDeleteTodo(todo.id)"
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
  name: "App",
  data() {
    return {
      todo: "",
      todos: [],
    };
  },
  methods: {
    handleClickAddTodo() {
      if (!this.todo.trim()) {
        return;
      }

      this.todos.push({
        id: +new Date(),
        text: this.todo,
        done: false,
      });
      this.todo = "";
    },
    handleClickDeleteTodo(todoId) {
      this.todos = this.todos.filter(({ id }) => id !== todoId);
    },
    handleClickToggle(todo) {
      todo.done = !todo.done;
    },
  },
};
</script>

<style lang="scss" scoped>
.done {
  text-decoration: line-through;
  color: grey;
}
</style>

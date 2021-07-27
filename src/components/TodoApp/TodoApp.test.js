import { shallowMount } from "@vue/test-utils";
import given from "given2";

import TodoApp from "./TodoApp.vue";

describe("TodoApp.vue", () => {
  const handleChange = jest.fn();
  const handleClickAddTodo = jest.fn();
  const handleClickDeleteTodo = jest.fn();
  const handleClickToggle = jest.fn();

  function renderTodoApp() {
    const wrapper = shallowMount(TodoApp, {
      propsData: {
        todo: "",
        todos: given.todos,
        onChange: handleChange,
        onClickAddTodo: handleClickAddTodo,
        onClickDeleteTodo: handleClickDeleteTodo,
        onClickToggle: handleClickToggle,
      },
    });

    function queryBySelector(selector) {
      return wrapper.find(selector);
    }

    return {
      wrapper,
      queryBySelector,
    };
  }

  it("renders title, input, button", () => {
    given("todos", () => []);

    const { queryBySelector } = renderTodoApp();

    expect(queryBySelector("h1").text()).toMatch("Todo-App");
    expect(queryBySelector("input").attributes("placeholder")).toMatch(
      "할 일을 입력해주세요"
    );
    expect(queryBySelector("[data-testid=add-todo]").text()).toMatch("추가");
  });

  it("listens '추가' click event", async () => {
    given("todos", () => []);

    const { queryBySelector } = renderTodoApp();

    queryBySelector("[placeholder='할 일을 입력해주세요']").setValue(
      "아무것도 안하기"
    );

    await queryBySelector("[data-testid=add-todo]").trigger("click");

    expect(handleClickAddTodo).toHaveBeenCalled();
  });

  it("listens '삭제' click event", async () => {
    given("todos", () => [
      {
        id: 0,
        text: "과일 먹기",
        done: false,
      },
    ]);

    const { queryBySelector } = renderTodoApp();

    await queryBySelector("[data-testid=delete-todo]").trigger("click");

    expect(handleClickDeleteTodo).toHaveBeenCalledWith(0);
  });

  it("listens 'todo' click event", async () => {
    given("todos", () => [
      {
        id: 0,
        text: "과일 먹기",
        done: false,
      },
    ]);

    const { queryBySelector } = renderTodoApp();

    await queryBySelector("p").trigger("click");

    expect(handleClickToggle).toHaveBeenCalledWith({
      id: 0,
      text: "과일 먹기",
      done: false,
    });
  });
});

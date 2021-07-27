import { mount } from "@vue/test-utils";

import TodoAppContainer from "./TodoAppContainer.vue";

describe("App.vue", () => {
  function renderTodoAppContainer() {
    const wrapper = mount(TodoAppContainer);

    function queryBySelector(selector) {
      return wrapper.find(selector);
    }

    return {
      wrapper,
      queryBySelector,
    };
  }

  it("listens '추가' click event", async () => {
    const { queryBySelector } = renderTodoAppContainer();

    queryBySelector("[placeholder='할 일을 입력해주세요']").setValue(
      "아무것도 안하기"
    );

    await queryBySelector("[data-testid=add-todo]").trigger("click");

    expect(queryBySelector("p").text()).toMatch("아무것도 안하기");
  });

  it("listens '삭제' click event", async () => {
    const { queryBySelector, wrapper } = renderTodoAppContainer();

    queryBySelector("[placeholder='할 일을 입력해주세요']").setValue(
      "아무것도 안하기"
    );

    await queryBySelector("[data-testid=add-todo]").trigger("click");
    await queryBySelector("[data-testid=delete-todo]").trigger("click");

    expect(wrapper.text()).not.toContain("아무것도 안하기");
  });

  it("listens 'todo' click event", async () => {
    const { queryBySelector } = renderTodoAppContainer();

    queryBySelector("[placeholder='할 일을 입력해주세요']").setValue(
      "아무것도 안하기"
    );

    await queryBySelector("[data-testid=add-todo]").trigger("click");
    await queryBySelector("p").trigger("click");

    expect(queryBySelector("p").attributes("class")).toContain("done");
  });
});

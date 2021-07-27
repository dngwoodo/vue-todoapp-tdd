import { mount } from "@vue/test-utils";

import App from "./App.vue";

describe("App.vue", () => {
  function renderApp() {
    const wrapper = mount(App);

    function queryBySelector(selector) {
      return wrapper.find(selector);
    }

    return {
      wrapper,
      queryBySelector,
    };
  }

  it("renders title, input, button", () => {
    const { queryBySelector } = renderApp();

    expect(queryBySelector("h1").text()).toMatch("Todo-App");
    expect(queryBySelector("input").attributes("placeholder")).toMatch(
      "할 일을 입력해주세요"
    );
    expect(queryBySelector("[data-testid=add-todo]").text()).toMatch("추가");
  });
});

import { render, fireEvent } from "@testing-library/react";
import App from "../src/components/App";
import { _saveQuestion, _saveQuestionAnswer } from "./utils/_DATA";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import Leaderboard from "./components/Leaderboard";
import NewPoll from "./components/NewPoll";
import Login from "./components/Login";
//test("renders App", () => {
//  render(<App />);
//  screen.debug();
//});

describe("async unit test for _saveQuestion", () => {
  it("verify that the saved question is returned with all expected fields ", async () => {
    const optionOneText = "Eat Pizza";
    const optionTwoText = "Eat Burger";
    const author = "mtsamis";
    const question = {
      optionOneText,
      optionTwoText,
      author,
    };
    const answer = await _saveQuestion(question);
    expect(answer.author).toEqual("mtsamis");
    expect(answer.optionOne.text).toEqual(optionOneText);
    expect(answer.optionTwo.text).toEqual(optionTwoText);
  });
});

describe("async unit test for _saveQuestion", () => {
  it("verify that an error is returned if incorrect data is passed", async () => {
    const optionOneText = "Eat Pizza";
    const optionTwoText = "Eat Burger";
    const question = {
      optionOneText,
      optionTwoText,
    };
    await expect(_saveQuestion(question)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("async unit test for _saveQuestionAnswer", () => {
  it("verify that the saved question answer is returned with all expected fields ", async () => {
    const authedUser = "sarahedo";
    const qid = "vthrdm985a262al8qx3do";
    const answer = "optionTwo";
    return await expect(
      _saveQuestionAnswer({
        authedUser,
        qid,
        answer,
      })
    ).resolves.toBe(true);
  });
});

describe("async unit test for _saveQuestionAnswer", () => {
  it("verify that an error is returned if incorrect data is passed", async () => {
    const authedUser = "sarahedo";
    const answer = "optionOne";
    await expect(
      _saveQuestionAnswer({
        authedUser,
        answer,
      })
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});

const store = createStore(reducer, applyMiddleware(thunk));

describe("a snapshot test for app component", () => {
  it("verify that app component renders properly and matches with the snapshot", () => {
    const component = render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

describe("a snapshot test for login component", () => {
  test("verify that login component renders properly and matches with the snapshot ", () => {
    const component = render(
      <Provider store={store} dispatch={store.dispatch}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });
});

describe("a DOM query test ", () => {
  test("verify that login component renders dropdown menu to select user", () => {
    const component = render(
      <Provider store={store} dispatch={store.dispatch}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    var user = component.getByTestId("login_select");
    expect(user).toBeInTheDocument();
  });
});

describe("a DOM query test", () => {
  test("verifies that when login submit button is pressed, home is rendered.", () => {
    const component = render(
      <Provider store={store} dispatch={store.dispatch}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    fireEvent.click(component.getByTestId("login_submit"));
    expect(global.window.location.pathname).toEqual("/");
  });
});

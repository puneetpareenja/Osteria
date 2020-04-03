import { ApiAiClient } from "api-ai-javascript";
import { applyMiddleware, createStore } from "redux";

const accessToken = "4ae81959da654de6940b185e723bdb96";
const client = new ApiAiClient({ accessToken });

const ON_MESSAGE = "ON_MESSAGE";

export const sendMessage = (text, id = 0) => ({
  type: ON_MESSAGE,
  payload: { text, id }
});

const messageMiddleware = () => next => action => {
  next(action);
  if (action.type === ON_MESSAGE) {
    const { text } = action.payload;
    client.textRequest(text).then(onSuccess);

    function onSuccess(response) {
      console.log(response);
      const {
        result: { fulfillment }
      } = response;

      fulfillment.messages.forEach(element => {
        next(sendMessage(element.speech, 1));
      });
    }
  }
};

const initState = [{ text: "Say Hi", id: 1 }];
const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case ON_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const store2 = createStore(
  messageReducer,
  applyMiddleware(messageMiddleware)
);

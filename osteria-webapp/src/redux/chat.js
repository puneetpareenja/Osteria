import { ApiAiClient } from "api-ai-javascript";
import { applyMiddleware, createStore } from "redux";

const accessToken = "4ae81959da654de6940b185e723bdb96";
const client = new ApiAiClient({ accessToken });

const ON_MESSAGE = "ON_MESSAGE";

export const sendMessage = (text, sender = "user") => ({
  type: ON_MESSAGE,
  payload: { text, sender }
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
      if (fulfillment.speech !== "") {
        next(sendMessage(fulfillment.speech, "Bot"));
      } else {
        fulfillment.messages.forEach(element => {
          next(sendMessage(element.speech, "Bot"));
        });
      }
    }
  }
};

const initState = [{ text: "hey" }];
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

import { SET_ORDERS, COMPLETE_ORDER } from "../types";

const initialState = {
  orders: [],
  order: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case COMPLETE_ORDER:
      let orderIndex = state.orders.findIndex(
        (order) => order.id === action.payload
      );
      state.orders[orderIndex].completed = true;
      return {
        ...state,
      };
    default:
      return state;
  }
}

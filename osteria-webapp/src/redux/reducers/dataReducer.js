import {
  SET_ITEMS,
  SET_SPECIAL,
  SET_REGULAR,
  LOADING_DATA,
  DELETE_ITEM,
  ADD_ITEM,
  SET_ITEM
} from "../types";

const initialState = {
  items: [],
  item: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case SET_ITEM:
      return {
        ...state,
        item: action.payload
      };
    case SET_SPECIAL:
    case SET_REGULAR:
      let index = state.items.findIndex(
        item => item.itemId === action.payload.itemId
      );
      state.items[index] = action.payload;
      if (state.item.itemId === action.payload.itemId) {
        state.item = action.payload;
      }
      return {
        ...state
      };
    case DELETE_ITEM:
      index = state.items.findIndex(item => item.itemId === action.payload);
      state.items.splice(index, 1);
      return {
        ...state
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    default:
      return state;
  }
}

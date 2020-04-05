import {
  SET_ITEMS,
  SET_SPECIAL,
  SET_REGULAR,
  LOADING_DATA,
  DELETE_ITEM,
  ADD_ITEM,
  SET_ITEM,
  UPLOAD_ITEM_IMAGE,
} from "../types";

const initialState = {
  items: [],
  item: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case SET_ITEM:
      return {
        ...state,
        item: action.payload,
      };
    case SET_SPECIAL:
      let specialIndex = state.items.findIndex(
        (item) => item.itemId === action.payload
      );
      state.items[specialIndex].special = true;
      return {
        ...state,
      };
    case SET_REGULAR:
      let regularIndex = state.items.findIndex(
        (item) => item.itemId === action.payload
      );
      state.items[regularIndex].special = false;
      return {
        ...state,
      };
    case DELETE_ITEM:
      let deleteIndex = state.items.findIndex(
        (item) => item.itemId === action.payload
      );
      state.items.splice(deleteIndex, 1);
      return {
        ...state,
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };
    case UPLOAD_ITEM_IMAGE:
      let uploadIndex = state.items.findIndex(
        (item) => item.itemId === action.payload.itemid
      );
      state.items[uploadIndex].imageUrl = action.payload.imageUrl;
      return {
        ...state,
      };

    default:
      return state;
  }
}

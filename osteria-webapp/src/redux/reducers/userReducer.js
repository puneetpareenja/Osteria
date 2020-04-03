import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  GET_EMPLOYEES,
  ACTIVATE,
  DEACTIVATE,
  ADD_EMPLOYEE
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  employees: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED: {
      return initialState;
    }
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case GET_EMPLOYEES: {
      return {
        ...state,
        employees: action.payload,
        loading: false
      };
    }
    case ADD_EMPLOYEE: {
      return {
        ...state,
        employees: [action.payload, ...state.employees]
      };
    }
    case ACTIVATE: {
      let emailIndex = state.employees.findIndex(
        employee => employee.email === action.payload
      );
      state.employees[emailIndex].active = true;
      return {
        ...state
      };
    }
    case DEACTIVATE: {
      let emailIndex = state.employees.findIndex(
        employee => employee.email === action.payload
      );
      state.employees[emailIndex].active = false;
      return {
        ...state
      };
    }
    default: {
      return state;
    }
  }
}

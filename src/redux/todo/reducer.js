import {
  ADD_TODO,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  CLEAR_TODO_SYNC,
  DELETE_TODO,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  GET_TODO_FAILURE,
  GET_TODO_REQUEST,
  GET_TODO_SUCCESS,
  TOGGLE_TODO,
  UPDATE_TODO,
  UPDATE_TODO_STATUS_REQUEST,
} from "./types";

const initialState = {
  todoListLoading: false,
  todoList: [],
  todoListSyncing: [],
  todoListError: false,

  todoAddLoading: false,
  todoRemoveLoading: false,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todoList: [...state.todoList, action.payload] };

    case DELETE_TODO:
      return {
        ...state,
        todoListSyncing: [...state.todoListSyncing, action.payload],
      };

    case TOGGLE_TODO:
      const index = state.todoList.findIndex(
        (todo) => todo._id === action.payload
      );
      state.todoList[index].done = !state.todoList[index].done;

      return { ...state, todoList: [...state.todoList] };

    case UPDATE_TODO:
      const updateIndex = state.todoList.findIndex(
        (todo) => todo._id === action.payload._id
      );

      const newTodoList = state.todoList;
      newTodoList[updateIndex] = action.payload;

      return {
        ...state,
        todoList: newTodoList,
        todoListSyncing: [...state.todoListSyncing, action.payload._id],
      };

    case GET_TODO_REQUEST:
      return { ...state, todoListLoading: true, todoListError: false };

    case GET_TODO_SUCCESS:
      return {
        ...state,
        todoListLoading: false,
        todoListError: false,
        todoList: action.payload,
        todoListSync: [],
      };

    case GET_TODO_FAILURE:
      return { ...state, error: action.payload, todoList: [] };

    case ADD_TODO_REQUEST:
      return {
        ...state,
        todoAddLoading: true,
      };

    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todoAddLoading: false,
      };

    case DELETE_TODO_REQUEST:
      return {
        ...state,
        todoRemoveLoading: true,
      };

    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todoRemoveLoading: false,
      };

    case UPDATE_TODO_STATUS_REQUEST:
      return {
        ...state,
        todoListSyncing: [...state.todoListSyncing, action.payload._id],
      };

    case CLEAR_TODO_SYNC:
      return { ...state, todoListSyncing: [] };

    default:
      return state;
  }
};

export default todoReducer;

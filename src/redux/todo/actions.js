import axios from "axios";
import {
  ADD_TODO,
  ADD_TODO_FAILURE,
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  CLEAR_TODO_SYNC,
  DELETE_TODO,
  DELETE_TODO_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  GET_TODO_FAILURE,
  GET_TODO_REQUEST,
  GET_TODO_SUCCESS,
  TOGGLE_TODO,
  UPDATE_TODO,
  UPDATE_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_STATUS_FAILURE,
  UPDATE_TODO_STATUS_REQUEST,
  UPDATE_TODO_STATUS_SUCCESS,
  UPDATE_TODO_SUCCESS,
} from "./types";

const baseUrl = process.env.REACT_APP_API_URL;

export const addTodoPlaceholder = (todo) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const deleteTodoPlaceHolder = (todoId) => {
  return {
    type: DELETE_TODO,
    payload: todoId,
  };
};

export const updateTodoPlaceHolder = (todo) => {
  return {
    type: UPDATE_TODO,
    payload: todo,
  };
};

export const toggleTodo = (todoId) => {
  return {
    type: TOGGLE_TODO,
    payload: todoId,
  };
};

export const fetchTodoListRequest = () => {
  return {
    type: GET_TODO_REQUEST,
  };
};

export const fetchTodoListSuccess = (todos, listId) => {
  return {
    type: GET_TODO_SUCCESS,
    payload: { todos, list: listId },
  };
};

export const fetchTodoListFailure = (error) => {
  return {
    type: GET_TODO_FAILURE,
    payload: error,
  };
};

export const clearTodoSync = () => {
  return {
    type: CLEAR_TODO_SYNC,
  };
};

export const getTodos = (listId) => {
  return (dispatch) => {
    dispatch(fetchTodoListRequest());
    axios
      .get(`${baseUrl}/todo/${listId}`)
      .then((res) => {
        const todos = res.data;
        dispatch(fetchTodoListSuccess(todos, listId));

        dispatch(clearTodoSync());
      })
      .catch((err) => {
        dispatch(fetchTodoListFailure(err));
        dispatch(clearTodoSync());
      });
  };
};

export const addTodoListRequest = () => {
  return {
    type: ADD_TODO_REQUEST,
  };
};

export const addTodoListSuccess = (todos) => {
  return {
    type: ADD_TODO_SUCCESS,
    payload: todos,
  };
};

export const addTodoListFailure = (error) => {
  return {
    type: ADD_TODO_FAILURE,
    payload: error,
  };
};

export const addTodo = (todo) => {
  return (dispatch) => {
    dispatch(addTodoPlaceholder(todo));
    dispatch(addTodoListRequest());
    axios
      .post(`${baseUrl}/todo`, todo)
      .then((res) => {
        const todos = res.data;
        dispatch(addTodoListSuccess(todos));

        dispatch(getTodos(todo.list));
      })
      .catch((err) => {
        dispatch(addTodoListFailure(err));
      });
  };
};

export const deleteTodoListRequest = () => {
  return {
    type: DELETE_TODO_REQUEST,
  };
};

export const deleteTodoListSuccess = (todos) => {
  return {
    type: DELETE_TODO_SUCCESS,
  };
};

export const deleteTodoListFailure = (error) => {
  return {
    type: DELETE_TODO_FAILURE,
    payload: error,
  };
};

export const deleteTodo = (todo) => {
  return (dispatch) => {
    dispatch(deleteTodoPlaceHolder(todo._id));
    dispatch(deleteTodoListRequest());
    axios
      .delete(`${baseUrl}/todo/${todo._id}`)
      .then((res) => {
        const todos = res.data;
        dispatch(deleteTodoListSuccess(todos));

        dispatch(getTodos(todo.list));
      })
      .catch((err) => {
        dispatch(deleteTodoListFailure(err));
      });
  };
};

export const updateTodoListRequest = () => {
  return {
    type: UPDATE_TODO_REQUEST,
  };
};

export const updateTodoListSuccess = (todos) => {
  return {
    type: UPDATE_TODO_SUCCESS,
    payload: todos,
  };
};

export const updateTodoListFailure = (error) => {
  return {
    type: UPDATE_TODO_FAILURE,
    payload: error,
  };
};

export const updateTodo = (todo) => {
  return (dispatch) => {
    dispatch(updateTodoPlaceHolder(todo));
    dispatch(updateTodoListRequest());
    axios
      .patch(`${baseUrl}/todo/${todo._id}`, todo)
      .then((res) => {
        const todos = res.data;
        dispatch(updateTodoListSuccess(todos));

        dispatch(getTodos(todo.list));
      })
      .catch((err) => {
        dispatch(addTodoListFailure(err));
      });
  };
};

export const updateTodoStatusRequest = (todo) => {
  return {
    type: UPDATE_TODO_STATUS_REQUEST,
    payload: todo,
  };
};

export const updateTodoStatusSuccess = (todos) => {
  return {
    type: UPDATE_TODO_STATUS_SUCCESS,
    payload: todos,
  };
};

export const updateTodoStatusFailure = (error) => {
  return {
    type: UPDATE_TODO_STATUS_FAILURE,
    payload: error,
  };
};

export const updateTodoStatus = (todo) => {
  return (dispatch) => {
    //   dispatch(updateTodoPlaceHolder(todo));
    dispatch(updateTodoStatusRequest(todo));
    axios
      .patch(`${baseUrl}/todo/${todo._id}/status`, todo)
      .then((res) => {
        const todos = res.data;
        dispatch(updateTodoStatusSuccess(todos));

        dispatch(getTodos(todo.list));
      })
      .catch((err) => {
        dispatch(updateTodoStatusFailure(err));
      });
  };
};

export const updateTodosStatusRequest = (todos) => {
  return {
    type: UPDATE_TODO_STATUS_REQUEST,
    payload: todos,
  };
};

export const updateTodosStatusSuccess = (todos) => {
  return {
    type: UPDATE_TODO_STATUS_SUCCESS,
    payload: todos,
  };
};

export const updateTodosStatusFailure = (error) => {
  return {
    type: UPDATE_TODO_STATUS_FAILURE,
    payload: error,
  };
};

export const updateTodosStatus = (todos, status, listId) => {
  console.log("sdf")
  return (dispatch) => {
    //   dispatch(updateTodoPlaceHolder(todo));
    dispatch(updateTodosStatusRequest(todos));
    axios
        .patch(`${baseUrl}/todo/status`, {todos, status, listId})
        .then((res) => {
          const todos = res.data;
          dispatch(updateTodosStatusSuccess(todos));

          dispatch(getTodos(listId));
        })
        .catch((err) => {
          dispatch(updateTodosStatusFailure(err));
        });
  };
};

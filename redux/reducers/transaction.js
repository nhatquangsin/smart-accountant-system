import {
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE,
  GET_TRANSACTION_BY_ID_REQUEST,
  GET_TRANSACTION_BY_ID_SUCCESS,
  GET_TRANSACTION_BY_ID_FAILURE,
  DELETE_TRANSACTION_BY_ID_REQUEST,
  DELETE_TRANSACTION_BY_ID_SUCCESS,
  DELETE_TRANSACTION_BY_ID_FAILURE,
  CHOOSE_TRANSACTION,
} from '../actions';

const INITIAL_STATE = {
  transactions: null,
  currentTransaction: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        error: null,
      };
    case GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CHOOSE_TRANSACTION:
      return {
        ...state,
        currentTransaction: action.payload,
      };
    case GET_TRANSACTION_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case GET_TRANSACTION_BY_ID_SUCCESS:
      return {
        ...state,
        currentTransaction: action.payload,
        error: null,
      };
    case GET_TRANSACTION_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_TRANSACTION_BY_ID_REQUEST:
      return {
        ...state,
        error: null,
      };
    case DELETE_TRANSACTION_BY_ID_SUCCESS:
      return {
        ...state,
        transactions: {
          total: state.transactions.total - 1,
          transactions: state.transactions.transactions.filter(
            transaction => transaction._id !== action.payload._id
          ),
        },
        error: null,
      };
    case DELETE_TRANSACTION_BY_ID_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

import {
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAILURE,
  GET_TRANSACTION_BY_ID_REQUEST,
  GET_TRANSACTION_BY_ID_SUCCESS,
  GET_TRANSACTION_BY_ID_FAILURE,
  POST_TRANSACTION_REQUEST,
  POST_TRANSACTION_SUCCESS,
  POST_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_BY_ID_REQUEST,
  DELETE_TRANSACTION_BY_ID_SUCCESS,
  DELETE_TRANSACTION_BY_ID_FAILURE,
  CHOOSE_TRANSACTION,
  ADD_RECEIPT_TO_TRANSACTION,
  ADD_CREDIT_ACCOUNT_TO_TRANSACTION,
  ADD_DEBIT_ACCOUNT_TO_TRANSACTION,
  GET_RECEIPTS_FOR_TRANSACTION_REQUEST,
  GET_RECEIPTS_FOR_TRANSACTION_SUCCESS,
  GET_RECEIPTS_FOR_TRANSACTION_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  transactions: null,
  receiptsInTransaction: null,
  currentTransaction: null,
  currentReceiptInTransactionAddition: null,
  currentCreditAccountInTransactionAddition: null,
  currentDebitAccountInTransactionAddition: null,
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
    case POST_TRANSACTION_REQUEST:
    case GET_RECEIPTS_FOR_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
        error: null,
      };
    case GET_TRANSACTIONS_FAILURE:
    case POST_TRANSACTION_FAILURE:
    case GET_RECEIPTS_FOR_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
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
    case ADD_RECEIPT_TO_TRANSACTION:
      return {
        ...state,
        currentReceiptInTransactionAddition: action.payload,
      };
    case ADD_CREDIT_ACCOUNT_TO_TRANSACTION:
      return {
        ...state,
        currentCreditAccountInTransactionAddition: action.payload,
      };
    case ADD_DEBIT_ACCOUNT_TO_TRANSACTION:
      return {
        ...state,
        currentDebitAccountInTransactionAddition: action.payload,
      };
    case POST_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: {
          transactions: [action.payload, ...state.transactions.transactions],
          total: state.transactions.total + 1,
        },

        currentDebitAccountInTransactionAddition: null,
        currentCreditAccountInTransactionAddition: null,
        currentReceiptInTransactionAddition: null,
        error: null,
      };
    case GET_RECEIPTS_FOR_TRANSACTION_SUCCESS:
      return {
        ...state,
        receiptsInTransaction: action.payload,
      };
    default:
      return state;
  }
};

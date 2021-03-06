/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-case-declarations */
/* eslint-disable eqeqeq */
import {
  GET_INVOICES_REQUEST,
  GET_INVOICES_SUCCESS,
  GET_INVOICES_FAILURE,
  GET_INVOICE_BY_ID_REQUEST,
  GET_INVOICE_BY_ID_SUCCESS,
  GET_INVOICE_BY_ID_FAILURE,
  POST_INVOICE_REQUEST,
  POST_INVOICE_SUCCESS,
  POST_INVOICE_FAILURE,
  DELETE_INVOICE_REQUEST,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE,
  GET_PAYMENTS_FOR_INVOICE_REQUEST,
  GET_PAYMENTS_FOR_INVOICE_SUCCESS,
  GET_PAYMENTS_FOR_INVOICE_FAILURE,
  POST_PAYMENT_REQUEST,
  POST_PAYMENT_SUCCESS,
  POST_PAYMENT_FAILURE,
  DELETE_PAYMENT_REQUEST,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  invoices: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_PAYMENT_REQUEST:
    case POST_PAYMENT_REQUEST:
    case GET_PAYMENTS_FOR_INVOICE_REQUEST:
    case GET_INVOICES_REQUEST:
    case GET_INVOICE_BY_ID_REQUEST:
    case POST_INVOICE_REQUEST:
    case DELETE_INVOICE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case GET_PAYMENTS_FOR_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: {
          total: state.invoices.total,
          invoices: state.invoices.invoices.map(invoice =>
            invoice._id == action.payload.invoice
              ? {
                  ...invoice,
                  payments: {
                    payments: action.payload.payments,
                    total: action.payload.total,
                  },
                }
              : invoice
          ),
        },
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload,
        error: null,
      };
    case GET_INVOICE_BY_ID_SUCCESS:
      let res = false;
      for (let i = 0; i <= state.invoices.invoices.length; i++) {
        if (state.invoices.invoices[i]._id == action.payload._id) {
          res = true;
          break;
        }
      }
      return res
        ? {
            ...state,
            invoices: {
              total: state.invoices.total,
              invoices: state.invoices.invoices.map(invoice =>
                invoice._id == action.payload._id ? action.payload : invoice
              ),
            },
            error: null,
          }
        : {
            ...state,
            invoices: {
              total: state.invoices.total + 1,
              invoices: [...state.invoices.invoices, action.payload],
            },
          };

    case POST_PAYMENT_SUCCESS:
      return {
        ...state,
        invoices: {
          total: state.invoices.total,
          invoices: state.invoices.invoices.map(invoice =>
            invoice._id == action.payload.invoice
              ? {
                  ...invoice,
                  payments: {
                    total: invoice.payments.total + 1,
                    payments: [
                      action.payload.payment,
                      ...invoice.payments.payments,
                    ],
                  },
                }
              : invoice
          ),
        },
        error: null,
      };

    case DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        invoices: {
          total: state.invoices.total,
          invoices: state.invoices.invoices.map(invoice =>
            invoice._id == action.payload.invoice
              ? {
                  ...invoice,
                  payments: {
                    total: invoice.payments.total - 1,
                    payments: invoice.payments.payments.filter(
                      payment => payment._id !== action.payload.payment._id
                    ),
                  },
                }
              : invoice
          ),
        },
        error: null,
      };
    case POST_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: {
          invoices: [action.payload, ...state.invoices.invoices],
          total: state.invoices.total + 1,
        },
        error: null,
      };
    case DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: {
          total: state.invoices.total - 1,
          invoices: state.invoices.invoices.filter(
            invoice => invoice._id !== action.payload._id
          ),
        },
        error: null,
      };

    case DELETE_PAYMENT_FAILURE:
    case POST_PAYMENT_FAILURE:
    case GET_PAYMENTS_FOR_INVOICE_FAILURE:
    case GET_INVOICES_FAILURE:
    case GET_INVOICE_BY_ID_FAILURE:
    case POST_INVOICE_FAILURE:
    case DELETE_INVOICE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

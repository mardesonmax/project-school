import { toast } from 'react-toastify';
import * as types from '../types';

const initialState = {
  isLoggedIn: null,
  token: null,
  user: {},
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      return { ...state, isLoading: true };
    }

    case types.LOGIN_FAILURE: {
      toast('E-mail ou senha inválidos.', {
        className: 'msg-error',
      });
      return { ...initialState };
    }

    case types.LOGIN_SUCCESS: {
      toast('Login realizado com sucesso.', {
        className: 'msg-success',
      });
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: action.payload.user,
        isLoading: false,
      };
    }

    // USER
    case types.USER_REQUEST: {
      return { ...state, isLoading: true };
    }

    case types.USER_FAILURE: {
      const { errors, status } = action.payload;

      if (status === 401) {
        toast('Faça login para continuar.', {
          className: 'msg-error',
        });
        return { ...initialState };
      }

      errors.map((err) =>
        toast(err, {
          className: 'msg-error',
        })
      );
      return { ...state, isLoading: false };
    }

    case types.USER_SUCCESS: {
      const { user, msg, req } = action.payload;

      toast(msg, {
        className: 'msg-success',
      });

      if (req === 'post') {
        return { ...initialState };
      }
      return { ...state, user, isLoading: false };
    }

    case types.USER_LOGOUT: {
      return { ...initialState };
    }

    default: {
      return state;
    }
  }
};

export default reducer;

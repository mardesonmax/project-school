import { toast } from 'react-toastify';
import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;

      toast('Sucesso, solicitação bem sucedida', {
        className: 'msg-success',
      });

      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      toast('Erro, solicitação não foi concluída', {
        className: 'msg-error',
      });

      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      toast('Iniciando solicitação...', {
        className: 'msg-warning',
      });
      return state;
    }

    default: {
      return state;
    }
  }
};

export default reducer;

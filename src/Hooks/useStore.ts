import { Action, FromLanguage, Languages, State } from '../types';
import { useReducer } from 'react';

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};
const reducer = (state: State, action: Action) => {
  const { type } = action;
  if (type === 'SET_FROM_LANGUAGE') {
    if (state.fromText === '') {
      return {
        ...state,
        fromLanguage: action.payload,
      };
    }
    return {
      ...state,
      loading: true,
      fromLanguage: action.payload,
      result: '',
    };
  }
  if (type === 'SET_TO_LANGUAGE') {
    if (state.fromText === '') {
      return {
        ...state,
        toLanguage: action.payload,
      };
    }
    return {
      ...state,
      loading: true,
      toLanguage: action.payload,
      result: '',
    };
  }
  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage === state.toLanguage) {
      return { ...state };
    }
    if (state.fromLanguage === 'auto') {
      return { ...state };
    }
    if (state.fromText === '') {
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
        result: '',
      };
    }
    return {
      ...state,
      loading: true,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
      result: '',
    };
  }
  if (type === 'SET_FROM_TEXT') {
    if (state.fromText === '') {
      return {
        ...state,
        loading: false,
        fromText: action.payload,
        result: '',
      };
    }
    return {
      ...state,
      loading: true,
      fromText: action.payload,
    };
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
};

export const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LANGUAGE', payload });
  };
  const setToLanguage = (payload: Languages) => {
    dispatch({ type: 'SET_TO_LANGUAGE', payload });
  };
  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload });
  };
  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' });
  };
  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload });
  };
  return {
    state,
    setFromLanguage,
    setToLanguage,
    setFromText,
    interchangeLanguages,
    setResult,
  };
};

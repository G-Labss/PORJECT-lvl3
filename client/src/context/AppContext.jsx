import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { lessonAPI, userAPI } from '../services/api';

const AppContext = createContext();

const initialState = {
  lessons: [],
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const ACTIONS = {
  SET_LESSONS: 'SET_LESSONS',
  ADD_LESSON: 'ADD_LESSON',
  UPDATE_LESSON: 'UPDATE_LESSON',
  DELETE_LESSON: 'DELETE_LESSON',
  SET_USERS: 'SET_USERS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LESSONS:
      return { ...state, lessons: action.payload, loading: false, error: null };
    
    case ACTIONS.ADD_LESSON:
      return { 
        ...state, 
        lessons: [action.payload, ...state.lessons],
        loading: false 
      };
    
    case ACTIONS.UPDATE_LESSON:
      return {
        ...state,
        lessons: state.lessons.map(lesson =>
          lesson._id === action.payload._id ? action.payload : lesson
        ),
        loading: false,
      };
    
    case ACTIONS.DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson._id !== action.payload),
        loading: false,
      };
    
    case ACTIONS.SET_USERS:
      return { ...state, users: action.payload, loading: false };
    
    case ACTIONS.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    fetchLessons();
    fetchUsers();
  }, []);

  const fetchLessons = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      console.log('Fetching lessons...');
      const response = await lessonAPI.getAll();
      console.log('Lessons response:', response);
      dispatch({ type: ACTIONS.SET_LESSONS, payload: response.data || [] });
    } catch (error) {
      console.error('Error fetching lessons:', error);
      // Don't crash - just set empty array
      dispatch({ type: ACTIONS.SET_LESSONS, payload: [] });
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      const response = await userAPI.getAll();
      console.log('Users response:', response);
      dispatch({ type: ACTIONS.SET_USERS, payload: response.data || [] });
      if (response.data && response.data.length > 0) {
        dispatch({ type: ACTIONS.SET_CURRENT_USER, payload: response.data[0] });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Don't crash - just set empty array
      dispatch({ type: ACTIONS.SET_USERS, payload: [] });
    }
  };

  const addLesson = async (lessonData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await lessonAPI.create(lessonData);
      dispatch({ type: ACTIONS.ADD_LESSON, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const updateLesson = async (id, lessonData) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const response = await lessonAPI.update(id, lessonData);
      dispatch({ type: ACTIONS.UPDATE_LESSON, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const deleteLesson = async (id) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      await lessonAPI.delete(id);
      dispatch({ type: ACTIONS.DELETE_LESSON, payload: id });
    } catch (error) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      throw error;
    }
  };

  const value = {
    state,
    fetchLessons,
    addLesson,
    updateLesson,
    deleteLesson,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
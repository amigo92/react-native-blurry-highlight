import {useContext} from 'react';
import {AppContext} from '../context/appContext';

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

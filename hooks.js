import {
  loadProducts,
  loadCategories,
} from './store/actions';
import { useDispatch } from 'react-redux';

export const useProducts = (query) => {
  const dispatch = useDispatch();
  dispatch(loadProducts(query));
};
export const useCategories = () => {
  const dispatch = useDispatch();
  dispatch(loadCategories());
};

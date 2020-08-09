import { useDispatch, useSelector } from 'react-redux';
import {
  openDrawer as open,
  closeDrawer as close,
} from 'features/cores/drawer/drawerSlice';

const useDrawer = () => {
  const dispatch = useDispatch();
  const { open: status } = useSelector(state => state.drawer);

  const openDrawer = (drawerType, drawerProps) => {
    dispatch(open({ drawerType, drawerProps }));
  };

  const closeDrawer = () => dispatch(close());

  return {
    openDrawer,
    closeDrawer,
    status,
  };
};

export default useDrawer;

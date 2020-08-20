import { useDispatch, useSelector } from 'react-redux';
import {
  openDrawer as open,
  closeDrawer as close,
} from 'app/cores/drawer/drawerSlice';

const useDrawer = () => {
  const dispatch = useDispatch();
  const { open: status, drawerType } = useSelector(state => state.drawer);

  const openDrawer = (drawerType, drawerProps) => {
    dispatch(open({ drawerType, drawerProps }));
  };

  const closeDrawer = () => dispatch(close());

  const getDrawerStatus = type => (type === drawerType ? status : false);

  return {
    openDrawer,
    closeDrawer,
    getDrawerStatus,
  };
};

export default useDrawer;

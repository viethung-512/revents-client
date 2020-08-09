import { useDispatch, useSelector } from 'react-redux';
import {
  openModal as open,
  closeModal as close,
} from 'features/cores/modal/modalSlice';

const useModal = () => {
  const dispatch = useDispatch();
  const { open: status } = useSelector(state => state.modal);

  const openModal = (modalType, modalProps) =>
    dispatch(open({ modalType, modalProps }));

  const closeModal = () => dispatch(close());

  return {
    openModal,
    closeModal,
    status,
  };
};

export default useModal;

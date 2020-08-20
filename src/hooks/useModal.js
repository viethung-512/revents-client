import { useDispatch, useSelector } from 'react-redux';
import {
  openModal as open,
  closeModal as close,
} from 'app/cores/modal/modalSlice';

const useModal = () => {
  const dispatch = useDispatch();
  const { open: status, modalType } = useSelector(state => state.modal);

  const openModal = (modalType, modalProps) =>
    dispatch(open({ modalType, modalProps }));

  const closeModal = () => dispatch(close());

  const getModalStatus = type => (type === modalType ? status : false);

  return {
    openModal,
    closeModal,
    getModalStatus,
  };
};

export default useModal;

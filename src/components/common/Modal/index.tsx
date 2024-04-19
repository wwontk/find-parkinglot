import { Dispatch, SetStateAction } from "react";

interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setIsModalOpen }: ModalProps) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="w-20 h-20">
        <button onClick={closeModal}></button>
      </div>
    </>
  );
};

export default Modal;

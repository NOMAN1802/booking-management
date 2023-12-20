import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const Modal = ({ children, closeModal }) => {
  const [isOpen, setIsOpen] = useState(true);

  const closeHandler = () => {
    setIsOpen(false);
    closeModal();  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeHandler}
      >
        <div className="min-h-screen px-4 text-center">
          {/* Background overlay */}
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          {/* Modal content */}
          <div className="inline-block align-middle p-4 my-8 text-left">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import CarCard from './CarCard';
import { ImCross } from 'react-icons/im';


const MatchCar = ({ searchCars, setIsCarOpen }) => {
  return (
    <div>
      {searchCars &&
        searchCars?.map((result) => (
          <Transition key={result.id} show={true}>
            <Dialog
              as="div"
              className="fixed inset-0 z-10 overflow-y-auto"
              onClose={() => setIsCarOpen(false)}
            >
              <div className="min-h-screen px-4 text-center">
                {/* Background overlay */}
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-75"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-75"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
                </Transition.Child>

                {/* Modal content */}
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block align-middle max-w-md p-6 my-8 overflow-hidden text-left transition-all transform bg-white shadow-xl rounded-lg">
                    {/* Your card content goes here */}
                    <CarCard result={result} />

                    {/* Close button */}
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => setIsCarOpen(false)}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-600 bg-transparent border border-transparent rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      >
                        {/* Close */}

                        <ImCross className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        ))}
    </div>
  );
};

export default MatchCar;

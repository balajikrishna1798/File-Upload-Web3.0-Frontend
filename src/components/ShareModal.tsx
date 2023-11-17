import { useState,Fragment } from 'react';
import { Dialog,Transition } from '@headlessui/react';

export const ShareModal = ({ isOpen, onClose, onSend }) => {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    onSend(email);
    setEmail('');
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Email Input */}
                <div className="bg-transparent w-full">
                <div className="container mx-auto max-w-screen-sm p-4">
        {/* Modal content */}
        <div className='w-full flex justify-center gap-6'>
        <label htmlFor="email" className='text-lg'>Email</label>
        <input placeholder='Enter Email Address' className='px-2 py-1 border border-gray-400' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='text-center mt-5'>
        <button className='bg-blue-600 p-2 text-white rounded-md' onClick={handleSend}>Send</button>
        </div>
        </div>
        </div>
        </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

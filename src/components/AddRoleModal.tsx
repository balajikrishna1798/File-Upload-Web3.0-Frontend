import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const AddRoleModal = ({ isOpen, closeModal, addNewRole }) => {
  const [roleTitle, setRoleTitle] = useState("");
  const [permissions, setPermissions] = useState([]);

  const togglePermission = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  const handleSubmit = () => {
    addNewRole({ title: roleTitle, permissions });
    setRoleTitle(""); // Reset form
    setPermissions([]);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={closeModal} as="div" className="relative z-10">
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
                {/* Role Title Input */}
                <div className="bg-transparent w-full">
                  <div className="container mx-auto max-w-screen-sm p-4">
                <input
                  type="text"
                  placeholder="Role Title"
                  className="border border-gray-300 p-2 w-full my-4"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                />
<div className="flex gap-3 items-end justify-between">
                {/* Permissions Checkboxes */}
                {["Access", "Create", "Edit", "View", "Delete"].map((perm) => (
                  <div key={perm} className="flex items-center my-2">
                    <input
                      id={`perm-${perm}`}
                      type="checkbox"
                      className=" form-checkbox h-5 w-5 text-blue-600 cursor-pointer"
                      checked={permissions.includes(perm)}
                      onChange={() => togglePermission(perm)}
                    />
                    <label
                      htmlFor={`perm-${perm}`}
                      className="ml-1 text-sm font-medium text-gray-700"
                    >
                      {perm}
                    </label>
                  </div>
                ))}
</div>
                {/* Action Buttons */}
                <div className="flex justify-end gap-4 mt-4">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600"
                  >
                    Save
                  </button>
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
};

export default AddRoleModal;

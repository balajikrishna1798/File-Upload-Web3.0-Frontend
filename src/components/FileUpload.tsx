"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useCallback, useRef, useState } from "react";
const FileUpload = ({ isModalOpen, setIsModalOpen }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [totalSize, setTotalSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxTotalSize = 500 * 1024 * 1024; // 500MB in bytes

  const onDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  }, []);

  const onChange = (event) => {
    addFiles(event.target.files);
  };

  const addFiles = (newFiles: FileList) => {
    const filesArray = Array.from(newFiles);
    const sizeOfNewFiles = filesArray.reduce(
      (total, file) => total + file.size,
      0
    );

    if (totalSize + sizeOfNewFiles > maxTotalSize) {
      // Handle the error, e.g., show an alert or a message on the UI
      alert("Cannot add these files. Total upload size would exceed 500MB.");
      return;
    }

    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
    setTotalSize((prevTotalSize) => prevTotalSize + sizeOfNewFiles);
  };

  const removeFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
    // Also update the total size state
    setTotalSize(
      (prevTotalSize) =>
        prevTotalSize - files.find((file) => file.name === fileName)?.size || 0
    );
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // Implement the upload logic
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <div className="bg-transparent w-full">
                  <div className="container mx-auto max-w-screen-sm p-4">
                    <form
                      onSubmit={onSubmit}
                      className="text-black flex flex-col items-center justify-center rounded-lg w-full"
                    >
                      <div
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        className="w-full h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-blue-500 bg-gray-100 hover:bg-blue-50 rounded-md"
                        onClick={triggerFileInput}
                      >
                        <svg
                          className="w- 10 h-10 text-blue-500 mb-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 7v10m4 0h12M8 7l4-4m0 0l4 4m-4-4v18"
                          />
                        </svg>
                        <p className="text-lg text-blue-700 font-semibold">
                          Drag 'n' drop files here, or click to select files
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          className="hidden"
                          onChange={onChange}
                        />
                        <div className="w-full text-center my-2">
                          <span className="text-xs text-gray-500">
                            Maximum total file size: 500MB
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={triggerFileInput}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      >
                        Select Files
                      </button>
                      {files.length > 0 && (
                        <div className="mt-4 w-full">
                          <p className="text-sm text-gray-600">
                            Files to be uploaded:
                          </p>
                          <div className="mt-4 w-full grid grid-cols-1 gap-4 text-white">
                            {files.map((file, index) => (
                              <div
                                key={index}
                                className="border bg-gray-600 rounded-md p-4 flex justify-between items-center"
                              >
                                <span className="truncate ...">
                                  {file.name}
                                </span>
                                <span className="flex items-center">
                                  <span className="text-sm text-slate-200 mr-4">
                                    {formatBytes(file.size)}
                                  </span>
                                  <button
                                    onClick={() => removeFile(file.name)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded inline-flex items-center"
                                  >
                                    <svg
                                      className="fill-current w-4 h-4 mr-2"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M10 2C5.589 2 2 5.589 2 10s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 15c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7zm3.707-10.293l-1.414 1.414L10 11.586 7.707 9.293 6.293 10.707l2.293 2.293-2.293 2.293 1.414 1.414L10 13.414l2.293 2.293 1.414-1.414-2.293-2.293 2.293-2.293z" />
                                    </svg>
                                    <span>Remove</span>
                                  </button>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                      >
                        Upload Files
                      </button>
                    </form>
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

export default FileUpload;

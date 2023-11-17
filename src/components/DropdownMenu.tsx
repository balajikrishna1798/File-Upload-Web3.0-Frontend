// DropdownMenu.js or DropdownMenu.jsx

import React from 'react';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const DropdownMenu = ({ buttonText, options,onSelect  }) => {
    return (
        <Menu as="div" className=" inline-block text-left">
            <Menu.Button className="inline-flex justify-between items-center border border-slate-500 hover:bg-gray-300 font-bold py-1 px-4 rounded">
                {buttonText}
                <ChevronDownIcon className="ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
            <Menu.Items className="max-h-60 overflow-auto absolute z-10 mt-2 w-32 cursor-pointer rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option, index) => (
                    <Menu.Item key={index} >
                        {({ active }) => (
                            <a onClick={() => onSelect(option)} className={`${active ? 'bg-gray-100' : ''} block px-4 py-2 text-sm text-gray-700`}>
                                {option}
                            </a>
                        )}
                    </Menu.Item>
                ))}
            </Menu.Items>
        </Menu>
    );
};

export default DropdownMenu;

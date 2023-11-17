'use client'

import { useState } from "react";

export default function UserPermissions({ user }) {
  // Assume user.permissions is an array of permission strings ['read', 'write', ...]
  const [permissions, setPermissions] = useState(user.permissions || []);

  const handlePermissionChange = (permission) => {
    const updatedPermissions = permissions.includes(permission)
      ? permissions.filter((p) => p !== permission)
      : [...permissions, permission];
    setPermissions(updatedPermissions);
    // Update permissions in the backend if needed
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Permission</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Add Role +
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="pb-4">Role</th>
              <th className="pb-4">Access</th>
              <th className="pb-4">Create</th>
              <th className="pb-4">Edit</th>
              <th className="pb-4">View</th>
              <th className="pb-4">Delete</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">{user.role}</td>
              {['access', 'create', 'edit', 'view', 'delete'].map((perm) => (
                <td key={perm} className="py-2">
                  <input
                    type="checkbox"
                    checked={permissions.includes(perm)}
                    onChange={() => handlePermissionChange(perm)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                </td>
              ))}
              <td className="py-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

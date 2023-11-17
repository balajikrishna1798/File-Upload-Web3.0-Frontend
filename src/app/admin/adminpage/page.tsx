'use client'
import { useState } from 'react';
import AddRoleModal from '@/components/AddRoleModal';
import RolesTable from '@/components/RolesTable'; // Component that renders roles in a table
import Dashboard from '@/components/Dashboard';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState([
    { title: 'Administrator', permissions: ['Access', 'Create', 'Edit', 'View', 'Delete'] },
    { title: 'User', permissions: ['Edit', 'View'] }]);

  const addNewRole = (role) => {
    setRoles([...roles, role]);
  };

  return (
    <Dashboard>

    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Roles & Permissions</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Role +
      </button>
      
      <RolesTable roles={roles}/>

      <AddRoleModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        addNewRole={addNewRole}
      />
   
    </div>
    </Dashboard>
  );
}

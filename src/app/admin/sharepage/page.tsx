'use client'
import { useState } from 'react';
import AddRoleModal from '@/components/AddRoleModal';
import RolesTable from '@/components/RolesTable'; // Component that renders roles in a table
import Dashboard from '@/components/Dashboard';
import ShareTable from '@/components/ShareTable';
import {ShareIcon} from '@heroicons/react/24/solid'
import { ShareModal } from '@/components/ShareModal';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shares, setShares] = useState([
    { id: 1, email: 'balajikrishna44589@gmail.com', status: "Invite Sent" },
    { id: 2, email: 'rajkumar@gmail.com', status: "Invite Accepted" }
  ]);
 
    const sendInvite = (email) => {
      const newShare = { id: shares.length + 1, email, status: "Invite Sent" };
      setShares([...shares, newShare]);
    };

  return (
    <Dashboard>

    <div className="p-8">
      <div className="flex items-center gap-3 mb-5">
      <h1 className="text-2xl font-bold">Invite </h1><ShareIcon height={18} width={18} onClick={() => setIsModalOpen(true)} className='cursor-pointer text-blue-700'/>
      
      </div>
      <ShareTable shares={shares}/>
      <ShareModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSend={sendInvite} />

   
    </div>
    </Dashboard>
  );
}

'use client'
import Dashboard from "@/components/Dashboard";
import { setLogo } from "@/features/OrganisationSettingsSlice";
import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
    const dispatch = useDispatch()
    const Logo = useSelector(
        (state: RootState) => state.organisationSettings.logo  );
    
    const [email,setEmail] = useState(Logo)
    console.log(email);
    
    const handleSubmit = () =>{

        dispatch(setLogo(email))
    }
  return (
    <Dashboard>
      <h1 className="text-xl font-bold text-center mb-4 text-amber-950">
        Organisation Profile Settings
      </h1>
      <div className="text-start px-20 border-2 border-gray-300 p-5 bg-white">
        <label className="font-semibold text-lg block mb-3">Logo</label>
        <input
          type="text"
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
          placeholder="Enter logo"
          className="outline-none min-w-full p-1 rounded-md border border-slate-300"
        />
        <div className="mt-4 text-start">
          <button type="submit" onClick={handleSubmit} className="p-1 bg-blue-500 rounded-md px-2 text-white">
            Submit
          </button>
        </div>
      </div>
    </Dashboard>
  );
};

export default page;

'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Sidenav from '@/components/sidenav'
import Image from 'next/image'
import React, {  useMemo, useCallback } from 'react';
import { Check, X } from 'lucide-react';
import users from "../jsonfiles/user.json"
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/navigation';

const UserChip = ({ user, onRemove }) => (
    <div className="flex items-center gap-1 bg-zinc-800 text-white px-2 py-1 rounded-full">
        <img
            src={user.img}
            alt={`${user.name} profile`}
            className="w-5 h-5 rounded-full object-cover"
            width={20}
            height={20}
        />
        <span className="text-sm">{user.name}</span>
        <button
            onClick={onRemove}
            className="ml-1 hover:text-zinc-400"
            aria-label={`Remove ${user.name}`}
        >
            <X size={14} />
        </button>
    </div>
);

// Memoized UserListItem to prevent unnecessary re-renders
const UserListItem = React.memo(({ user, isSelected, toggleUser }) => (
    <label className="flex items-center gap-2 p-2 hover:bg-zinc-800 cursor-pointer rounded-md group">
        <img
            src={user.img}
            alt={`${user.name} profile`}
            className="w-10 h-10 rounded-full object-cover"
            width={40}
            height={40}
        />
        <div className="flex-1">
            <p className="font-semibold text-sm text-white flex items-center">
                {user.name}
                {user.verified && <Check size={14} className="text-blue-500 ml-1" />}
            </p>
        </div>
        {/* <Checkbox
            checked={isSelected}
            onChange={toggleUser}
            color="primary"
            inputProps={{ 'aria-label': `Select ${user.name}` }}
            sx={{
                color: '#3b82f6',
                '&.Mui-checked': {
                    color: '#3b82f6',
                },
            }}
        /> */}
    </label>
));



export default function Searchnav() {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Memoize filtered users to prevent recalculating on every render
    const filteredUsers = useMemo(() => {
        const searchLower = searchTerm.toLowerCase();
        return users.filter(user =>
            user.name.toLowerCase().includes(searchLower)
        );
    }, [searchTerm]);

    // Memoize toggle function with useCallback
    const toggleUser = useCallback((user) => {
        setSelectedUsers(prev => prev.some(u => u.id === user.id)
            ? prev.filter(u => u.id !== user.id)
            : [...prev, user]
        );
    }, []);
    const [open, setOpen] = useState(true)

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-50">
            <DialogBackdrop
                transition
                className=" text-white transition-opacity duration-500 ease-in-out data-closed:opacity-0"
            />

            <div className="   overflow-hidden">
                <div className="absolute flex  overflow-hidden">
                    <Sidenav value={false} />
                    <div className="pointer-events-none fixed inset-y-0  flex max-w-full ">
                        <DialogPanel
                            transition
                            className="pointer-events-auto relative w-screen  max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
                        >
                            <TransitionChild>
                                <div className="absolute top-0 right-0 ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="relative rounded-md text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden"
                                    >
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon aria-hidden="true" className="size-6" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <div className="flex bg-black pl-20 h-full flex-col mt-10 px-6 overflow-y-scroll z-50  shadow-xl">
                                <div className="px-4 sm:px-6">
                                    <DialogTitle className="text-2xl flex justify-start  font-semibold ">Search</DialogTitle>
                                </div>
                                <div className="mt-6 text-lg px-4 sm:px-6">
                                    <div className="  flex flex-col gap-2 rounded-md  ">
                                    <input
                                            type="text"
                                            placeholder="Search..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full bg-transparent text-white border-none bg-zinc-600 bg-opacity-50 rounded-md shadow-inner pl-2 outline-none placeholder-zinc-500"
                                            aria-label="Search users"
                                        />


                                        
                                        {/* <div className="flex flex-wrap gap-2">
                                            {selectedUsers.map(user => (
                                                <UserChip
                                                    key={user.id}
                                                    user={user}
                                                    onRemove={() => toggleUser(user)}
                                                />
                                            ))}
                                        </div> */}

                                        
                                        

                                        
                                        <div className="flex flex-col overflow-auto mt-2 ">
                                            {filteredUsers.map(user => (
                                                <UserListItem
                                                    key={user.id}
                                                    user={user}
                                                    isSelected={selectedUsers.some(u => u.id === user.id)}
                                                    toggleUser={() => toggleUser(user)}
                                                />
                                            ))}
                                            {filteredUsers.length === 0 && (
                                                <p className="text-zinc-500 text-sm p-2">No users found</p>
                                            )}
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

// Extract UserChip component for better readability




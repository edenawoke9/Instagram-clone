'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Sidenav from '@/components/sidenav'
import Image from 'next/image'
const notifications = [
    {
      id: 1,
      user: "abigail_tesfaye",
      action: "started following you.",
      time: "2w",
      avatar: "/path-to-avatar1.jpg",
      following: true,
    },
    {
      id: 2,
      user: "nahom_dereje",
      action: "started following you.",
      time: "2w",
      avatar: "/path-to-avatar2.jpg",
      following: false,
    },
    {
      id: 3,
      user: "helina_mekonnen",
      action: "mentioned you in a comment:",
      comment: "@blue_moon 🌟",
      time: "3w",
      avatar: "/path-to-avatar3.jpg",
      following: false,
    },
    {
      id: 4,
      user: "michael_solomon",
      action: "liked your comment: ❤️❤️",
      time: "3w",
      avatar: "/path-to-avatar4.jpg",
      following: false,
    },
    {
      id: 5,
      user: "seble_ayele",
      action: "started following you.",
      time: "3w",
      avatar: "/path-to-avatar5.jpg",
      following: true,
    },
  ];

export default function Notifications( {open,onClose}) {


  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className=" text-white transition-opacity duration-500 ease-in-out data-closed:opacity-0"
      />

      <div className="   overflow-hidden">
        <div className="absolute flex  overflow-hidden">
            <Sidenav value={false}/>
          <div className="pointer-events-none fixed inset-y-0  flex max-w-full ">
            <DialogPanel
              transition
              className="pointer-events-auto bg-black relative w-screen  max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <TransitionChild >
                <div className="absolute top-0 right-0 ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={onClose}
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
                  <DialogTitle className="text-2xl flex justify-start  font-semibold ">Notifications</DialogTitle>
                </div>
                <div className="mt-6 text-lg px-4 sm:px-6"><p className='font-bold '>This month</p>
                <div className="space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={notif.avatar}
                alt={notif.user}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm">
                  <span className="font-semibold">{notif.user}</span> {notif.action}
                </p>
                {notif.comment && <p className="text-sm text-gray-400">{notif.comment}</p>}
                <span className="text-xs text-gray-500">{notif.time}</span>
              </div>
            </div>
            {notif.following !== undefined && (
              <button
                className={`px-3 py-1 rounded-md text-sm ${
                  notif.following
                    ? "bg-gray-600 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {notif.following ? "Following" : "Follow"}
              </button>
            )}
          </div>))}</div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

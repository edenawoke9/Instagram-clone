import React from "react";
import Image from "next/image";

export default function Note() {
  const users = [
    { name: "instagram", mutual: "modernsciencex ...", img: "/ig.png", verified: true },
    { name: "ashertade", mutual: "meri06564 + 11 ...", img: "/applestore.png" },
    { name: "giftiko_", mutual: "meri06564 + 6 ...", img: "/unlike.png" },
  ];

  return (
    <div className="flex flex-row gap-2 overflow-auto">
      {users.map((user, index) => (
        <div key={index} >
          <div className="flex flex-col">
            <textarea className="rounded-lg bg-gray-800 w-10 border-none z-20 text-sm -mb-4 text-center " placeholder="Note..."></textarea>
            <Image src={user.image} width={100} height={100} alt={user.name} className="w-14 h-14 rounded-full" />
            <p>{user.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

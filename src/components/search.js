import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import Users from '../app/jsonfiles/user';
import Checkbox from '@mui/material/Checkbox';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Search() {

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [users,setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers(){
      const userData = await Users();
      setUsers(userData);
    }
    fetchUsers();
  }, []);

  const UserChip = ({ user, onRemove }) => (
    <div className="flex items-center gap-1 bg-zinc-800 text-white px-2 py-1 rounded-full">
      <Image
        src={user.image || '/default-avatar.png'}
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

  const UserListItem = React.memo(({ user, isSelected, toggleUser }) => (
    <label className="flex items-center gap-2 p-2 hover:bg-zinc-800 cursor-pointer rounded-md group">
      <Image
        src={user.image || '/default-avatar.png'}
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
      <Checkbox
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
      />
    </label>
  ));
  UserListItem.displayName = 'UserListItem';  

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) return [];
    const searchLower = searchTerm.toLowerCase();
    return users.filter((user) => user.name && user.name.toLowerCase().includes(searchLower));
  }, [searchTerm, users]);

  const toggleUser = useCallback((user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u.id === user.id) ? prev.filter((u) => u.id !== user.id) : [...prev, user]
    );
  }, []);

  const handleClick = () => {
    if (selectedUsers.length === 0) return;
    const value = encodeURIComponent(JSON.stringify(selectedUsers));
    router.push(`/messages?value=${value}`);
  };

  return (
    <div className="z-40 w-96 bg-zinc-900 flex flex-col gap-2 rounded-md p-4">
      <h1 className="text-xl font-semibold text-white border-b border-b-zinc-700 pb-2">New Message</h1>

      <div className="flex flex-wrap gap-2">
        {selectedUsers.map((user) => (
          <UserChip key={user.id} user={user} onRemove={() => toggleUser(user)} />
        ))}
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-transparent text-white border-none outline-none placeholder-zinc-500"
        aria-label="Search users"
      />

      <div className="flex flex-col overflow-auto mt-2 max-h-[300px]">
        {filteredUsers.map((user,index) => (
          <UserListItem
            key={user.id?? index}
            user={user}
            isSelected={selectedUsers.some((u) => u.id === user.id)}
            toggleUser={() => toggleUser(user)}
          />
        ))}
        {filteredUsers.length === 0 && <p className="text-zinc-500 text-sm p-2">No users found</p>}
      </div>

      <div className="flex justify-center">
        <button onClick={handleClick} className="p-2 pr-8 pl-8 rounded-md bg-blue-600">
          Chat
        </button>
      </div>
    </div>
  );
}

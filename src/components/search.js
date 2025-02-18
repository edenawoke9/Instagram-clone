import React, { useState } from "react";
import users from "../app/jsonfiles/user.json";
import Image from "next/image";
import { Autocomplete, TextField, Checkbox, Avatar, Chip } from "@mui/material";

export default function Search() {
  const [selectedUsers, setSelectedUsers] = useState([]);

  return (
    <div className="z-40 w-64 bg-black flex flex-col gap-2 rounded-md p-4">
      <h1 className="text-xl font-semibold border-b border-b-zinc-700 pb-2">New Message</h1>

      {/* Autocomplete Multi-Select Input */}
      <Autocomplete
        multiple
        options={users.users}
        getOptionLabel={(user) => user.name}
        value={selectedUsers}
        onChange={(event, newValue) => setSelectedUsers(newValue)}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder="Search users..."
            InputProps={{ ...params.InputProps, disableUnderline: true }}
            sx={{ backgroundColor: "black", color: "white", mt: 1 }}
          />
        )}
        renderOption={(props, user, { selected }) => (
          <li {...props} className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 rounded-md px-2 py-1">
            <Avatar src={user.img} alt={user.name} sx={{ width: 32, height: 32 }} />
            <span>{user.name}</span>
            {user.verified && <span className="text-blue-500 ml-1">✔</span>}
            <Checkbox checked={selected} sx={{ marginLeft: "auto", color: "gray" }} />
          </li>
        )}
        renderTags={(selectedUsers, getTagProps) =>
          selectedUsers.map((user, index) => (
            <Chip
              {...getTagProps({ index })}
              key={user.name}
              label={user.name}
              avatar={<Avatar src={user.img} />}
              sx={{ backgroundColor: "#1f2937", color: "white" }}
            />
          ))
        }
      />

      {/* Persistent User List */}
      <div className="bg-black flex flex-col overflow-auto mt-2">
        {users.users.map((user) => (
          <label key={user.name} className="flex items-center gap-2 p-2 hover:bg-gray-800 cursor-pointer rounded-md">
            <Image src={user.img} width={40} height={40} alt={user.name} className="rounded-full" />
            <div className="ml-3 flex-1">
              <p className="font-semibold text-sm flex items-center">
                {user.name} {user.verified && <span className="text-blue-500 ml-1">✔</span>}
              </p>
            </div>
            <Checkbox
              checked={selectedUsers.includes(user)}
              onChange={() => {
                setSelectedUsers((prev) =>
                  prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
                );
              }}
              sx={{ color: "gray", "&.Mui-checked": { color: "blue" } }}
            />
          </label>
        ))}
      </div>
    </div>
  );
}

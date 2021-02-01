import React, { useState } from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import UsersDropdown from './components/UsersDropdown';
import { users } from './mocks';

function App() {
  const [selectedUsersIds, setSelectedUsersIds] = useState([1, 0]);
  return (
    <div>
      <UsersDropdown
        users={users}
        selectedValues={selectedUsersIds}
        onChange={({ value, selected }) => {
          if (Boolean(selected) === false) {
            return setSelectedUsersIds(selectedUsersIds.filter((id) => id !== value));
          }
          return setSelectedUsersIds([...selectedUsersIds, value]);
        }}
      />
      <Dropdown
        options={users.map((user) => ({
          value: user.id,
          label: user.fullName,
        }))}
        selectedValues={selectedUsersIds}
        onChange={({ value, selected }) => {
          if (Boolean(selected) === false) {
            return setSelectedUsersIds(selectedUsersIds.filter((id) => id !== value));
          }
          return setSelectedUsersIds([...selectedUsersIds, value]);
        }}
      />
    </div>
  );
}

export default App;

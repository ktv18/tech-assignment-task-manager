import React, { useState } from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import { users } from './mocks';

function App() {
  const [selectedUsersIds, setSelectedUsersIds] = useState([1, 0]);
  return (
    <div>
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

import React, { useState } from 'react';
import './App.css';
import Dropdown from './components/Dropdown';
import UsersDropdown from './components/UsersDropdown';
import LabelsDropdown from './components/LabelsDropdown';
import { users, labels } from './mocks';

function App() {
  const [selectedUsersIds, setSelectedUsersIds] = useState([1, 0]);
  const [selectedLabelsIds, setSelectedLabelsIds] = useState([]);
  console.log('selectedLabelsIds', selectedLabelsIds);
  return (
    <div>
      <LabelsDropdown
        labels={labels}
        selectedValues={selectedLabelsIds}
        onChange={({ value, selected }) => {
          if (Boolean(selected) === false) {
            return setSelectedLabelsIds(selectedUsersIds.filter((id) => id !== value));
          }
          return setSelectedLabelsIds([...selectedUsersIds, value]);
        }}
      />
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

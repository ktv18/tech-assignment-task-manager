import React, { useState } from 'react';
import './App.css';
import Card from './components/Card';
import AddCard from './components/AddCard';
import Dropdown from './components/Dropdown';
import UsersDropdown from './components/UsersDropdown';
import LabelsDropdown from './components/LabelsDropdown';
import { users, labels } from './mocks';

function App() {
  const [selectedUsersIds, setSelectedUsersIds] = useState([1, 0]);
  const [selectedLabelsIds, setSelectedLabelsIds] = useState(['#61bd4f0', '0']);
  return (
    <div>
      <Card users={[users[0], users[1]]} title='Implement edit dialog' />
      <AddCard className={'addCard'} onCardAdd={({ title }) => alert(title)} />
      <LabelsDropdown
        labels={labels}
        selectedValues={selectedLabelsIds}
        onChange={({ value, selected }) => {
          if (Boolean(selected) === false) {
            return setSelectedLabelsIds(selectedLabelsIds.filter((id) => id !== value));
          }
          return setSelectedLabelsIds([...selectedLabelsIds, value]);
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

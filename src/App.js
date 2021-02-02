import React, { useState } from 'react';
import './App.css';
import CardsColumn from './components/CardsColumn';
import Dropdown from './components/Dropdown';
import UsersDropdown from './components/UsersDropdown';
import LabelsDropdown from './components/LabelsDropdown';
import { users, labels, cards as cardsMock } from './mocks';

function App() {
  const [cards, setCards] = useState(cardsMock);
  const [selectedUsersIds, setSelectedUsersIds] = useState([1, 0]);
  const [selectedLabelsIds, setSelectedLabelsIds] = useState(['#61bd4f0', '0']);
  return (
    <div>
      <CardsColumn
        className='column'
        title='My very first column'
        cards={cards}
        onCardAdd={({ title }) => {
          setCards([
            ...cards,
            {
              id: Date.now(),
              title,
            },
          ]);
        }}
      />
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

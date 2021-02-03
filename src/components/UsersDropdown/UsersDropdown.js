import React from 'react';
import Dropdown from '../Dropdown';
import Option from './components/Option';

const normalizeOption = (user) => ({
  value: user.id,
  ...user,
});

const UsersDropdown = (props) => {
  const { className, users, onChange, selectedValues } = props;
  return (
    <Dropdown
      className={className}
      options={users.map(normalizeOption)}
      selectedValues={selectedValues}
      placeholder='Search users'
      title='Board users'
      renderOption={(args) => <Option user={args} />}
      onChange={onChange}
    />
  );
};

export default UsersDropdown;

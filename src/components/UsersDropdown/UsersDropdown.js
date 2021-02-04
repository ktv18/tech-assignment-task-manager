import React from 'react';
import Dropdown from '../Dropdown';
import Option from './components/Option';

const normalizeOption = (user) => ({
  value: user.id,
  label: `${user.firstName} ${user.lastName} ${user.nickName}`,
  ...user,
});

const UsersDropdown = (props) => {
  const { className, users = [], title, onChange, selectedValues, renderOptionWrapper } = props;
  return (
    <Dropdown
      className={className}
      options={users.map(normalizeOption)}
      selectedValues={selectedValues}
      placeholder='Search users'
      title={title}
      renderOptionWrapper={renderOptionWrapper}
      renderOption={(args) => <Option user={args} />}
      onChange={onChange}
    />
  );
};

export default UsersDropdown;

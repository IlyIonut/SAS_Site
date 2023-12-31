import React, { useEffect, useState } from 'react';
import UsersSidebar from '../../components/usersSidebar/usersSidebar.component';
import { fetchUsers } from '../../utils/firebase/firebase.utils';
import { OptionMenu, SelectMenu, UsersContainer, UsersPageContainer } from './users.styled';
import { SearchBox,InputGroup,Input} from './users.styled';

const UserSidebarPage = () => {
  const [users, setUsers] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [selectedOption, setSelectedOption] = useState('All');

  const options = [

    { label: 'All', option: 'All' },
    { label: 'Mobile App Development', value: 'Mobile App Development' },
    { label: 'Data Science', value: 'Data Science' },
    { label: 'Photoshop', value: 'Photoshop' },
    { label: 'WebDevelopment', value: 'WebDevelopment' },
    { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
    { label: 'Machine Learning', value: 'Machine Learning' },
    { label: 'Cloud Computing', value: 'Cloud Computing' },
    { label: 'Front-end Development', value: 'Front-end Development' },
    { label: 'Back-end Development', value: 'Back-end Development' },
    { label: 'UI/UX Design', value: 'UI/UX Design' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Management', value: 'Management' },
    { label: 'SEO', value: 'SEO' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Accountancy', value: 'Accountancy' },
    { label: 'Cybersecurity', value: 'Cybersecurity' },
    { label: 'DevOps', value: 'DevOps' },
    { label: 'Blockchain', value: 'Blockchain' },
    { label: 'Game Development', value: 'Game Development' },
    { label: 'Internet of Things (IoT)', value: 'Internet of Things (IoT)' },
   
 
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Error retrieving user data:', error);
        // Handle the error appropriately, such as showing an error message to the user
      }
    };
  
    getUsers();
  }, []);

  const onSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchField(searchValue);
  };

  const handleChange = (event) => {

    setSelectedOption(event.target.value);
 
  };

  const filteredUsers = users.filter((user) => {
    if (selectedOption === 'All' && searchField === '') {
      return true; 
    } else if (selectedOption === 'All') {
      return user.skills.some((skill) => skill.toLowerCase().includes(searchField));
    } else if (selectedOption !== 'All' && searchField === ''){
      return user.skills.includes(selectedOption);
    } else {
      return user.skills.some((skill) => skill.toLowerCase().includes(searchField));
    }
  });

  return (
    <UsersPageContainer>
      <SearchBox>
    
   
            <InputGroup>
              <div className="input-group-btn search-panel">

                <SelectMenu option={selectedOption} onChange={handleChange}>

                  {options.map((option) => (

                  <OptionMenu value={option.option}>{option.label}</OptionMenu>

                  ))}

                </SelectMenu>
      
              </div>
              <Input
                className=""
                type="search"
                placeholder="Search by skills"
                onChange={onSearchChange}
              />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button">
                  <span className="glyphicon glyphicon-search"></span>
                </button>
              </span>
            </InputGroup>
        
       
      </SearchBox>
      <UsersContainer>
        {filteredUsers.map((user) => (
          <UsersSidebar key={user.uid} user={user} />
        ))}
      </UsersContainer>
    </UsersPageContainer>
  );
};

export default UserSidebarPage;
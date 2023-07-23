import { useState } from 'react';
import * as MaIcons from 'react-icons/md';
import { UserType } from '../../@types/jobmemo';
import './Header.scss';

function Header() {
  const [search, setSearch] = useState('');
  // console.log(search);
  // test api :
  const fetchSearch = (value: string) => {
    fetch('http://127.0.0.1:3000/users')
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user: UserType) => {
          return user.lastName.toLowerCase().includes(value);
        });
        console.log(results);
      });
  };

  const handleChange = (value: string) => {
    setSearch(value);
    fetchSearch(value);
  };

  return (
    <div className="header">
      <div className="search-bar">
        <MaIcons.MdSearch className="search-icons" />
        <input
          type="text"
          placeholder="Recherche"
          value={search}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Header;

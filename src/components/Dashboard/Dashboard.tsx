import { useEffect, useState } from 'react';
import './Dashboard.scss';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  avatar_url: string;
}

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.slice(2));
      });
  }, []);

  return (
    <div className="Dashboard">
      <br />
      {users.map((user: User) => (
        <div key={user.id}>
          <h3>Hello {user.first_name} </h3>
          <p>Votre id est : {user.id}</p>
          <p>votre prénom est {user.first_name}</p>
          <p>votre nom est {user.last_name}</p>
          <p>Votre mot de passe est {user.password}</p>
          <img src={user.avatar_url} alt={user.first_name} />
          <br />
        </div>
      ))}
      ,
    </div>
  );
}

export default Dashboard;

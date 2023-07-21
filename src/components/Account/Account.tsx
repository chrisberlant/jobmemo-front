import Navbar from '../Navbar/Navbar';
import './Account.scss';

function Account() {
  return (
    <div className="Account">
      <Navbar />
      <h1>Hello Account</h1>
    </div>
  );
}

export default Account;

// <div key={user.id}>
// <h3>Hello {user.first_name} </h3>
// <p>Votre id est : {user.id}</p>
// <p>votre prénom est {user.first_name}</p>
// <p>votre nom est {user.last_name}</p>
// <img src={user.avatar_url} alt={user.first_name} />
// <br />
// </div>

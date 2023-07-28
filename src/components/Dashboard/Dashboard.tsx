import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Kanban from '../Kanban/Kanban';
import Navbar from '../Navbar/Navbar';
import './Dashboard.scss';
import { useAppSelector } from '../../store/hook/redux';

function Dashboard() {
  const user = useAppSelector((state) => state.user.email);

  console.log(`Utilisateur connecté : ${user}`);

  return (
    <div className="dashboard">
      <div className="navbar-container">
        <Navbar />
      </div>
      {/* <div>{cardsItems}</div> */}
      <div className="kanban-container">
        <Header />
        <Kanban />
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;

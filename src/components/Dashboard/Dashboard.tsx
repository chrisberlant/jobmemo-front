import Header from '../Header/Header';
import Kanban from '../Kanban/Kanban';
import './Dashboard.scss';

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <Kanban />
    </div>
  );
}

export default Dashboard;

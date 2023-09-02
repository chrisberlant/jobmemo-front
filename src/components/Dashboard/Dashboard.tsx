import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../store/hook/redux';
import useMediaQuery from '../../Utils/mediaQuery';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Kanban from '../Kanban/Kanban';
import Navbar from '../Navbar/Navbar';
import './Dashboard.scss';

function useMediaQueries() {
  const md = useMediaQuery('(max-width: 1250px)');

  return { md };
}

function Dashboard() {
  const user = useAppSelector((state) => state.user.email);
  const { md } = useMediaQueries();

  return (
    /* <div
        className="navbar-container"
        style={md ? { width: 0, display: 'none' } : { width: '100%' }}
      >
        <Navbar />
      </div> */
    <div className="dashboard">
      <Header />
      <Kanban />
    </div>
  );
}

export default Dashboard;

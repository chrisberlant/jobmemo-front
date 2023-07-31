import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../store/hook/redux';
import useMediaQuery from '../../Utils/mediaQuery';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Kanban from '../Kanban/Kanban';
import Navbar from '../Navbar/Navbar';
import './Dashboard.scss';

// function useMediaQuery(query: string) {
//   const mediaQuery = useMemo(() => window.matchMedia(query), [query]);
//   const [match, setMatch] = useState(mediaQuery.matches);

//   useEffect(() => {
//     const change = () => setMatch(mediaQuery.matches);
//     mediaQuery.addEventListener('change', change);
//     return () => mediaQuery.removeEventListener('change', change);
//   }, [mediaQuery]);

//   return match;
// }

function useMediaQueries() {
  const md = useMediaQuery('(max-width: 1250px)');

  return { md };
}

function Dashboard() {
  const user = useAppSelector((state) => state.user.email);
  const { md } = useMediaQueries();

  console.log(`Utilisateur connecté : ${user}`);

  return (
    <div className="dashboard">
      <div
        className="navbar-container"
        style={md ? { width: 0, display: 'none' } : { width: '100%' }}
      >
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

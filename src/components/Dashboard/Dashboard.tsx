// import { useEffect, useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../hook/redux';
// import Card from '../Card/Card';
// import { CardType } from '../../@types/jobmemo';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Columns from '../Kanban/Kanban';
import Navbar from '../Navbar/Navbar';
import './Dashboard.scss';

function Dashboard() {
  // const user = useAppSelector((state) => state.user);
  // const cards = useAppSelector((state) => state.cards.list);
  // const cardsOffres = cards.filter(
  //   (card: CardType) => card.category === 'Mes offres'
  // );

  // useEffect(() => {
  //   fetch(`http://localhost:3000/userCards/${user.id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCards(data);
  //     });
  // }, [user.id]);

  // const cardsItems = cardsOffres.map((card: CardType) => (
  //   <Card key={card.id} {...card} />
  // ));

  return (
    <div className="dashboard">
      <div className="navbar-container">
        <Navbar />
      </div>
      {/* <div>{cardsItems}</div> */}
      <div className="kanban-container">
        <Header />
        <Columns />
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;

// import { useEffect, useState } from 'react';
// import { useAppSelector, useAppDispatch } from '../hook/redux';
// import Card from '../Card/Card';
// import { CardType } from '../../@types/jobmemo';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Kanban from '../Kanban/Kanban';
import Navbar from '../Navbar/Navbar';
import './Dashboard.scss';
import { useAppSelector, useAppDispatch } from '../../store/hook/redux';
import { getAllCards } from '../../store/reducers/cards';

function Dashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.email);
  const cards = useAppSelector((state) => state.cards.list);

  if (cards.length === 0) {
    dispatch(getAllCards());
  }
  console.log(`User connecté : ${user}`);
  cards.forEach((card) => console.log(card));

  // const cardsOffres = cards.filter(
  //   (card: CardType) => card.category === 'Mes offres'
  // );

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
        <Kanban />
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;

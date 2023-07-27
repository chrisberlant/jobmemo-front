import { useState, useLayoutEffect, useRef, createRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Filters from '../Filters/Filters';
import iconSearch from '../../assets/icons/icon-search.svg';
import iconFilter from '../../assets/icons/icon-filter.svg';
import './Header.scss';

const handleChange = (value: string): void => {
  // setSearch(value);
  // fetchSearch(value);
};

function Header() {
  const [search, setSearch] = useState('');

  // ANIMATION ////////////////////////////////////////////////////

  const container = useRef<HTMLDivElement>(null);
  const tl = useRef();
  // const toggleTimeline = () => {
  //   tl.current.reversed(!tl.current.reversed());
  // };
  const playTimeline = () => {
    tl.current.play();
  };
  const reverseTimeline = () => {
    setSearch('');
    tl.current.reverse();
  };
  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const btnFilter = self.selector('#btnFilter');
      const btnSearch = self.selector('#btnSearch');
      const selects = self.selector('.select-dropdown');
      const inputSearch = self.selector('input[type="text"]');
      tl.current = gsap.timeline({ paused: true, ease: 'none' });
      // .to(selects, {
      //   autoAlpha: 0,
      //   stagger: { // wrap advanced options in an object
      //     each: 0.1,
      //     from: "end",
      //     ease: "power2.inOut",
      //   }
      // })

      tl.current
        .to('.filters', {
          autoAlpha: 0,
        })
        .to('.action-wrapper', {
          duration: 1,
          width: '0%',
        })
        .to(
          '.search-wrapper',
          {
            duration: 1,
            width: 'calc(100% - 32px)',
          },
          '<'
        );
    }, container); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);
  /// //////////////////////////////////////////////////////////////

  // SEARCH ////////////////////////////////////////////////////
  const onchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  return (
    <div className="header">
      <div className="actions-bar" ref={container}>
        <div className="btn-action" id="btnSearch" onClick={playTimeline}>
          <img src={iconSearch} alt="icon search" />
        </div>

        <div className="btn-action" id="btnFilter" onClick={reverseTimeline}>
          <img src={iconFilter} alt="icon filter" />
        </div>

        <div className="dynamic-content">
          <div className="action-wrapper">
            <div className="filters">
              <Filters />
            </div>
          </div>

          <div className="search-wrapper">
            <input type="text" value={search} onChange={onchange} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;

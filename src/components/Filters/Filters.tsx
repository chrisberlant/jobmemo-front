import { useRef, createRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './App.scss';

/*--------------------
Items
--------------------*/
interface MenuItem {
  name: string;
  color: string;
  href: string;
}

const items: MenuItem[] = [
  {
    name: 'Aucun',
    color: '#f44336',
    href: '#',
  },
  {
    name: 'Par note',
    color: '#e91e63',
    href: '#',
  },
  {
    name: 'Par date',
    color: '#9c27b0',
    href: '#',
  },
  {
    name: 'Par salaire',
    color: '#673ab7',
    href: '#',
  },
  {
    name: 'Par distance',
    color: '#3f51b5',
    href: '#',
  },
];

/*--------------------
Menu
--------------------*/

function Menu({ items }: { items: MenuItem[] }) {
  const filters = useRef<HTMLDivElement>(null);
  const indicator1 = useRef<HTMLDivElement>(null);
  const indicator2 = useRef<HTMLDivElement>(null);
  const btns = useRef<Array<React.RefObject<HTMLDivElement>>>(
    items.map(() => createRef<HTMLDivElement>())
  );
  const [active, setActive] = useState(0);

  const animate = () => {
    const menuOffset = filters.current?.getBoundingClientRect();
    const activeItem = btns.current[active].current;
    const { width, height, top, left } =
      activeItem?.getBoundingClientRect() || {};

    const settings = {
      x: left ? left - menuOffset?.x : 0,
      y: top ? top - menuOffset?.y : 0,
      width: width || 0,
      height: height || 0,
      backgroundColor: items[active]?.color,
      ease: 'elastic.out(.7, .7)',
      duration: 0.8,
    };

    gsap.to(indicator1.current, {
      ...settings,
    });

    gsap.to(indicator2.current, {
      ...settings,
      duration: 1,
    });
  };

  useEffect(() => {
    animate();
    window.addEventListener('resize', animate);

    return () => {
      window.removeEventListener('resize', animate);
    };
  }, [active]);

  return (
    <div ref={filters} className="menu">
      {items.map((item, index) => (
        <div
          key={item.name}
          ref={btns.current[index]}
          className={`item ${active === index ? 'active' : ''}`}
          onMouseEnter={() => {
            setActive(index);
          }}
        >
          {item.name}
        </div>
      ))}
      <div ref={indicator1} className="indicator" />
      <div ref={indicator2} className="indicator" />
    </div>
  );
}

/*--------------------
App
--------------------*/
function App() {
  return <Menu items={items} />;
}

export default App;

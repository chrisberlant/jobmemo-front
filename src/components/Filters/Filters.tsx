import { useRef, createRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './Filters.scss';

/*--------------------
Items
--------------------*/
interface MenuItem {
  name: string;
  color: string;
}

const items: MenuItem[] = [
  {
    name: 'Aucun',
    color: 'slateblue',
  },
  {
    name: 'Par note',
    color: 'slateblue',
  },
  {
    name: 'Par date',
    color: 'slateblue',
  },
  {
    name: 'Par salaire',
    color: 'slateblue',
  },
];

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

  // Use Stagger Apparition elements
  // useEffect(() => {
  //   console.log(btns);
  //   gsap.to(btns, {
  //     autoAlpha: 0,
  //   });
  // }, []);

  useEffect(() => {
    animate();
    window.addEventListener('resize', animate);

    return () => {
      window.removeEventListener('resize', animate);
    };
  }, [active]);

  return (
    <div ref={filters} className="menu">
      <span>Filtres :</span>
      {items.map((item, index) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          key={item.name}
          ref={btns.current[index]}
          className={`item ${active === index ? 'active' : ''}`}
          onClick={() => {
            setActive(index);
          }}
          onKeyDown={() => {
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
function Filters() {
  return <Menu items={items} />;
}

export default Filters;

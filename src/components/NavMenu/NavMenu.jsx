import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const items = [
  {
    label: (
      <Link to='/cards/NM'>
        Nuevas
      </Link>
    ),
    key: 'nm',
  },
  {
    label: (
      <Link to='/cards/PLD'>
        Usadas
      </Link>
    ),
    key: 'pld',
  },
  {
    label: (
      <Link to='/cards/HP'>
        Altamente usadas
      </Link>
    ),
    key: 'hp',
  },
]

const NavMenu = ({ mode }) => {
  const [current, setCurrent] = useState('nm');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu theme="light" onClick={onClick} selectedKeys={[current]} mode={mode} items={items} />
  );
};

export default NavMenu;
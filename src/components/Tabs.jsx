// Tabs.jsx
import React, { useState, useEffect } from 'react';
import { CiPizza } from 'react-icons/ci';
import { GiNoodles, GiFruitBowl } from 'react-icons/gi';
import { MdOutlineIcecream } from 'react-icons/md';
import { fetchTabData } from '../service';
import About from './About'; // Import komponen About

function Tabs(props) {
  const [active, setActive] = useState('Pizza');
  const [tabData, setTabData] = useState('');
  const [navItems] = useState([
    {
      name: 'Pizza',
      icon: <CiPizza />,
      id: '0209cb28fc05320434e2916988f47b71',
    },
    {
      name: 'Noodles',
      icon: <GiNoodles />,
      id: 'c7657780aec8ce44886fa9288f707dfb',
    },
    {
      name: 'Desert',
      icon: <GiFruitBowl />,
      id: 'bc865476ffe2b8a03fbe9aee2f739740',
    },
    {
      name: 'Ice cream',
      icon: <MdOutlineIcecream />,
      id: '7c5a5ced83523b4dc49adbc78471cc38',
    },
    // {
    //   name: 'About',
    //   id: 'about', // Tambahkan id untuk About
    // },
  ]);

  const handleClick = async (name, id) => {
    setActive(name);
    props.setLoader(true);

    if (id === 'about') {
      // Tampilkan halaman About
      props.setLoader(false);
      props.setShowAbout(true);
      return;
    }

    try {
      const response = await fetchTabData(id);
      setTabData(response);
      props.setLoader(false);
      props.setRecipeData(response);
      props.setSelectedCategory(name);
      props.setShowRecipeBanner(false);
    } catch (error) {
      console.error('Error fetching tab data:', error);
      props.setLoader(false);
    }
  };

  useEffect(() => {
    props.setLoader(true);

    if (props.showAbout) {
      // Tampilkan halaman About
      props.setLoader(false);
      return;
    }

    const selectedItem = navItems.find((item) => item.name === active);
    fetchTabData(selectedItem.id).then((response) => {
      setTabData(response);
      props.setLoader(false);
    });

  }, [active, props.selectedCategory, props.showRecipeBanner, props.showAbout]);

  return (
    <div className="container">
      <h1 className="recipeHeading">What do you want to eat?!</h1>
      <div className="tabs" style={{ marginBottom: '20px' }}>
        {navItems.map((item, index) => (
          <button
            onClick={() => handleClick(item.name, item.id)}
            key={index}
            className={`tablist ${active === item.name ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Tabs;

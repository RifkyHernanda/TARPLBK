import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import './Index.css';

import Tabs from '../components/Tabs';
import RecipeLists from '../components/RecipeLists';
import RecipeBanner from '../components/RecipeBanner';

export default function Index() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Pizza');
  const [recipeData, setRecipeData] = useState(null);
  const [showRecipeBanner, setShowRecipeBanner] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const handleClick = () => {
    setShowRecipeBanner(true);
  };

  const handleBackClick = () => {
    setShowRecipeBanner(false);
    setRecipeData(null); // Reset data resep saat kembali ke RecipeLists
  };

  const handleLogout = (e) => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
  };

  return (
    <>
      <div className="main">
        <div className="wrap-button">
          <button onClick={handleLogout}>Logout</button>
        </div>
        <Tabs
          setLoader={setLoader}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          setRecipeData={setRecipeData}
          setShowRecipeBanner={setShowRecipeBanner} // Tambahkan setShowRecipeBanner
        />
        {showRecipeBanner ? (
          <RecipeBanner
            resData={recipeData}
            onBackClick={handleBackClick}
            setShowRecipeBanner={setShowRecipeBanner} // Tambahkan setShowRecipeBanner
          />
        ) : (
          <RecipeLists setLoader={setLoader} selectedCategory={selectedCategory} setRecipeData={setRecipeData} handleClick={handleClick} />
        )}
        {loader && (
          <div className="loader">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </>
  );
}

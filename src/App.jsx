// App.jsx
import React, { useState } from "react";
import "./App.css";

import Tabs from "./components/Tabs";
import RecipeLists from "./components/RecipeLists";
import RecipeBanner from "./components/RecipeBanner";
import About from "./components/About";

function App() {
  const [loader, setLoader] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Pizza");
  const [recipeData, setRecipeData] = useState(null);
  const [showRecipeBanner, setShowRecipeBanner] = useState(false);

  const handleClick = () => {
    setShowRecipeBanner(true);
  };

  const handleBackClick = () => {
    setShowRecipeBanner(false);
    setRecipeData(null); // Reset data resep saat kembali ke RecipeLists
  };

  return (
    <>
      <div className="main">
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
          <RecipeLists
            setLoader={setLoader}
            selectedCategory={selectedCategory}
            setRecipeData={setRecipeData}
            handleClick={handleClick}
          />
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

export default App;

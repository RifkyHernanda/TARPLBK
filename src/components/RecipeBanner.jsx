// RecipeBanner.jsx
import React from 'react';
import "./RecipeBanner.css";

function RecipeBanner({ resData, onBackClick, setShowRecipeBanner }) {
  if (!resData || !resData.recipe) {
    return null;
  }

  return (
    <div className="recipe_banner">
      <h1 className="recipe_banner_title">{resData.recipe.label}</h1>
      <span className="badge">{resData.recipe?.cuisineType[0].toUpperCase()}</span>
          <p className="recipe_by">
            <strong>Recipe by:</strong>
            <small>{resData.recipe.source}</small>
          </p>
      <div className="content-container">
        <div className="left-col">
          <div className="image-wrapper">
            <img src={resData.recipe.image} alt={resData.recipe.label} />
          </div>
        </div>
        <div className="right-col">
          <h3>Ingredients</h3>
          <div className="ingredients">
            <ul>
              {resData.recipe.ingredientLines.map((list, index) => (
                <li key={index}>{list}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <button className="back_button" onClick={() => {
            onBackClick();
            setShowRecipeBanner(false); // Menutup RecipeBanner
          }}>Back to Recipes</button>
    </div>
  );
}

export default RecipeBanner;

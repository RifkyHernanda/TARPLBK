// RecipeLists.jsx
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { fetchData, fetchTabData } from "../service";
import { GiCheckMark } from "react-icons/gi";
import "./RecipeLists.css";

function RecipeLists(props) {
  const [searchedTerm, setSearchedTerm] = useState("");
  const [query, setQuery] = useState("pasta");
  const [data, setData] = useState("");
  const [resData, setResData] = useState("");
  const [ID, setID] = useState("3de27a0a3f97d36315b3e74c7bed378f");

  const searchRecipe = (searchQuery) => {
    fetchData(searchQuery).then((response) => {
      setData(response);
      props.setLoader(false);
    });
  };

  const handleClick = (id) => {
    const resId = id.split("_")[1];
    fetchTabData(resId).then((response) => {
      setResData(response);
      props.setLoader(false);
      props.setRecipeData(response);
      props.handleClick();
    });
  };

  useEffect(() => {
    console.log("Fetching data for category:", props.selectedCategory);
    fetchData(props.selectedCategory).then((response) => {
      console.log("Data fetched:", response);
      setData(response);
      props.setLoader(false);
    });
  }, [props.selectedCategory, props.showRecipeBanner]);

  return (
    <div className="container">
      {/* <div className="heading-line">
        <strong>Search Recipes</strong>
        <div className="input-wrapper">
          <input
            onChange={(e) => setSearchedTerm(e.target.value)}
            value={searchedTerm}
            type="text"
            placeholder="Search your recipe"
          />
          <button onClick={() => (searchRecipe(searchedTerm), props.setLoader(true))}>
            <BsSearch />
          </button>
        </div>
      </div> */}
      <div className="flexbox">
        {data &&
          data.hits.map((item, index) => (
            <div key={index} className="flexItem">
              <div className="img-wrapper">
                <img src={item.recipe.image} alt={item.recipe.label} />
              </div>
              <button onClick={() => (handleClick(item.recipe.uri), props.setLoader(true))}>
                {item.recipe.label}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RecipeLists;

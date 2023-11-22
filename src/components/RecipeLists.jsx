import React, { useEffect, useState } from 'react';
import { fetchData, fetchTabData } from '../service';
import RecipeBanner from './RecipeBanner'; // Import RecipeBanner
import './RecipeLists.css';

function RecipeLists(props) {
  const [searchedTerm, setSearchedTerm] = useState('');
  const [query, setQuery] = useState('pasta');
  const [data, setData] = useState('');
  const [resData, setResData] = useState('');
  const [ID, setID] = useState('3de27a0a3f97d36315b3e74c7bed378f');
  const [showRecipeBanner, setShowRecipeBanner] = useState(false); // State untuk menampilkan RecipeBanner

  const searchRecipe = (searchQuery) => {
    fetchData(searchQuery).then((response) => {
      setData(response);
      props.setLoader(false);
    });
  };

  const handleClick = (id) => {
    const resId = id.split('_')[1];
    fetchTabData(resId).then((response) => {
      setResData(response);
      setShowRecipeBanner(true); // Menampilkan RecipeBanner
      props.setLoader(false);
      props.setRecipeData(response);
      props.handleClick();
    });
  };

  useEffect(() => {
    console.log('Fetching data for category:', props.selectedCategory);
    fetchData(props.selectedCategory).then((response) => {
      console.log('Data fetched:', response);
      setData(response);
      props.setLoader(false);
    });
  }, [props.selectedCategory, props.showRecipeBanner]);

  return (
    <div>
      <div className="container" style={{ display: !showRecipeBanner && props.showFlexBox ? 'flex' : 'none' }}>
        <div className="flexbox">
          {data &&
            data.hits.map((item, index) => (
              <div key={index} className="flexItem">
                <div className="img-wrapper">
                  <img src={item.recipe.image} alt={item.recipe.label} />
                </div>
                <button onClick={() => (handleClick(item.recipe.uri), props.setLoader(true))}>{item.recipe.label}</button>
              </div>
            ))}
        </div>
      </div>

      {/* Menyertakan RecipeBanner jika showRecipeBanner bernilai true */}
      {showRecipeBanner && <RecipeBanner resData={resData} onBackClick={() => setShowRecipeBanner(false)} setShowRecipeBanner={setShowRecipeBanner} />}
    </div>
  );
}

export default RecipeLists;

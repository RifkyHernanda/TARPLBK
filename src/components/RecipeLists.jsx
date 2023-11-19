import React,{useEffect,useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import {fetchData} from "../service"
import {fetchTabData} from "../service"
import {GiCheckMark} from 'react-icons/gi'
function RecipeLists(props) {
    const [searchedTearm, setSearchedTearm] = useState('')
    const [query,setQuery] = useState('pasta')
    const [data,setData] = useState('');
    const [resData,setResData] = useState('')
    const [ID,setID] = useState('3de27a0a3f97d36315b3e74c7bed378f')
   const searchrecipe = (searchQuery) => {
    fetchData(searchQuery).then((response)=> {
        setData(response)
        props.setLoader(false)
    })
   }
   const handleClick = (id) => {
    const resId = id.split('_')[1]
    fetchTabData(resId).then((response)=> {
        setResData(response);
        props.setLoader(false)
    })
}

    useEffect(()=>{
        fetchData(query).then((response)=> {
            setData(response)
            props.setLoader(false)
        })
    },[])
  return (
    <div className='container'>
        <div className='heading-line'>
            <strong>Search Recipes</strong>
            <div className='input-wrapper' >
                <input 
                    onChange={(e)=> setSearchedTearm(e.target.value)} 
                    value={searchedTearm} 
                    type="text" 
                    placeholder='Search you recipe' />
                <button onClick={()=> (searchrecipe(searchedTearm),props.setLoader(true))}><BsSearch /></button>
            </div> 
        </div>
        <div className='flexbox'>
            {
                data && data.hits.map((item,index)=> (
                    <div  key={index} className='flexItem'>
                        <div className='img-wrapper'>
                            <img src={item.recipe.image} alt={item.recipe.label} />
                        </div>
                        
                        <button onClick={()=> (handleClick(item.recipe.uri),props.setLoader(true))}>{item.recipe.label}</button>
                    
                    </div>
                ))
            }
            
        </div>
        <div className='recipe_banner'>
            {resData !== '' && resData.recipe &&  <>
                <div className="left-col">
                    <span className='badge'>{resData.recipe?.cuisineType[0].toUpperCase()}</span>
                    <h1>{resData.recipe.label}</h1>
                    <p><strong>Recipe by:</strong><small>{resData.recipe.source}</small></p>
                    <h3>Ingredients</h3>
                    <div className='ingredients'>
                        <ul>
                            {resData.recipe.ingredientLines.map((list,index)=> 
                                (<li key={index}><GiCheckMark size="18px" color="#6fcb9f" />&nbsp;<span>{list}</span></li>)
                            )}
                            
                        </ul>
                    </div>
                </div>
                <div className="right-col">
                    <div className="image-wrapper">
                    <img src={resData.recipe.image} alt={resData.recipe.label} />
                    </div>
                </div>
            </>}
        </div>
        
    </div>
  )
}

export default RecipeLists
//onClick={()=> (handleClick(item.recipe.label,item.recipe.id),props.setLoader(true))} key={index} className={`tablist ${active === item.recipe.label ? 'active':""}`}>                   

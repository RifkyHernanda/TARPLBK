import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Tabs from './components/Tabs'
import RecipeLists from './components/RecipeLists'

function App() {
  const [loader,setLoader] = useState(true)

  return (
    <>
    <div className="main">
      
      <Tabs setLoader={setLoader}/>
      <RecipeLists setLoader={setLoader}/>
      {loader && <div className='loader'>
        <div className='spinner'></div>
        </div>}
    </div>
    </>
    
  )
}

export default App

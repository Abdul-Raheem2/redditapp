import './App.css'
import React from "react";

import Banner from './Components/Banner';
import Main from './Components/Main';
function App(){

    return (
        <>
            <Banner/>
            <div className='Main'>
                <Main/>
            </div>
        </>
    )
}



export default App
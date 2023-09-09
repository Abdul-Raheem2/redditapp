import './App.css'
import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import AppLayout from './AppLayout';
import Posts from '../features/posts/posts';

const appRouter = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<AppLayout/>}>
        <Route path='/r/:subreddit' element={<Posts/>}/>
    </Route>
));

function App(){
    return (
        <RouterProvider router={appRouter}/>
    )
}



export default App
import './App.css';
import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements } from 'react-router-dom';
import Homepage from './Homepage';

const appRouter=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Homepage/>}>

    </Route>
));

function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;

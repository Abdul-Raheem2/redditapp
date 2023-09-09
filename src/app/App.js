import './App.css';
import { RouterProvider,Route,createBrowserRouter,createRoutesFromElements } from 'react-router-dom';
import AppLayout from './AppLayout';

const appRouter=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<AppLayout/>}>

    </Route>
));

function App() {
  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;

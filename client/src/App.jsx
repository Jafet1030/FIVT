import { Suspense, useState } from 'react';
import './App.css';
import Layout from './componentes/Layout/Layout';
import Website from './pages/Website';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Properties from './pages/Properties/Properties';
import {QueryClient, QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Property from './pages/Property/Property';
import UseDetailedContext from './context/UseDetailedContext';
import Bookings from './pages/Bookings/Bookings';
import Favourites from './pages/Favourites/Favourites';
import Sales from './pages/Sales/sales';


function App() {
  const queryClient = new QueryClient()
  const [userDetails,setUserDetails]=useState({
    favourites:[],
    bookings:[],
    token:null
  })
    return (
      <UseDetailedContext.Provider value={{userDetails,setUserDetails}}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Website />} />
              <Route path="/properties">
                <Route index element={<Properties />} />
                <Route path=":propertyId" element={<Property />} />

              </Route>
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/sales" element={<Sales />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer/>
      <ReactQueryDevtools initialsIsOpen={false}/>
      </QueryClientProvider>
      </UseDetailedContext.Provider>
    );
}

export default App;


import './App.css';
import SideBar from './components/side_bar'
import Setup from './components/setup';
import Search from './components/User_Components/search';
import Services from './components/services';
import ShowServices from './components/showServices';
import Profile from './components/profile';
import UpdateService from './components/update_service';
import User_Appointments from './components/User_Components/user_Appointments';
import UserRegister from './components/User_Components/register1'
import Login from './components/User_Components/login';
import Appointment from './components/User_Components/Appointment';
import Service_provider from './components/User_Components/service_provider';
import ShowAppointments from './components/showAppointments';
import {ChakraProvider} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router, Route, Link, Routes, BrowserRouter
} from "react-router-dom";
import Home from './components/User_Components/Home';
import Dashboard from './components/Dashboard';
import SpLogin from './components/spLogin';
import Activities from './components/activities';
import Register from './components/registration';

function App() {
  

  return (<>
    <BrowserRouter>
    <ChakraProvider>
      
       <Routes>
       {/*<--------- Service Provider Routes ------->*/}
        <Route path='/panel'  element={<Dashboard/>}/>
        <Route exact path='/setup' element={<Setup/>}/>
        <Route exact path='/api/updateService/:id' element={<UpdateService/>}/>
        <Route path='/addServices' element={<Services/>}/>
        <Route path='/services' element={<ShowServices/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/appointments' element={<ShowAppointments/>}/>
        <Route path='/activities' element={<Activities/>}/>
        <Route path='/search'  element={<Search/>}/>
        <Route path='/spLogin' element={<SpLogin/>}/>
        <Route path='/testRegister' element={<Register/>}/>

        {/*<--------- User Routes ------->*/}
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/signIn' element={<Login/>}/>
        <Route path='/serviceProvider/:id' element={<Service_provider/>}/>
        <Route path='/appointment/:id' element={<Appointment/>}/>
        <Route path='/myappointments' element={<User_Appointments/>}/>
       </Routes>
      </ChakraProvider>
      </BrowserRouter>
      </>
  );
}

export default App;

import {Flex,Link, Box,Image,Text,useDisclosure,Button, Divider,Select, Stack} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {FiHome,FiLogOut,FiClipboard,FiSettings,FiCalendar,FiPlusSquare} from 'react-icons/fi'
import{GiHamburgerMenu} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
const hoverCss={
  color:'black',
  fontWeight:'700',
  fontFamily:'poppins'
}

//Function starts from here
const Side_bar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef() 



  const[profile,setProfile]=useState(null)
  const navigate=useNavigate()
  
  const GetProfile=()=>{
    axios.get('/api/panel')
    .then(res=>{
      console.log(res)
      setProfile(res.data)
    })
    .catch((err)=>{
      if(err.response.status==401){navigate("/sp_login")}
    })
  }
  useEffect(()=>{
    GetProfile()
  },[])


  const clearCookies=()=>{
    axios.get('/api/clearCookies')
    .then(res=>{
      if(res.status==200){
        navigate('/spLogin')
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }


  return (
    <>

     <Image src='https://ik.imagekit.io/3zuv6faux/Hamburger_icon.svg_hWaQbvS0t.png?updatedAt=1679082751489' height={'50px'}
     width="50px" onClick={()=>onOpen()} cursor="pointer"/>

        <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
                
  <Link href='/profile'>{profile==null ?
  <Image src={"https://ik.imagekit.io/3zuv6faux/user_ajDEdp2ep.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677440515197"} 
  height='100px' width='100px' mt='5'  />:
 <Image src={"data:image/jpg;base64,"+profile.B_pimage.data} 
 height='100px' width='100px' mt='5'  />
 }</Link> <Text mt='5' mx='5'>{profile!=null?profile.B_name:""}</Text>
          </DrawerHeader>

          <DrawerBody>
          <Flex direction='column' boxShadow='xl' bg='#f6f8fa' height='100vh' width='100%' gap='5'alignItems='flex-start' fontFamily='poppins'
   px='4' display='inline-flex'> 
   <Box display='inline-flex'>


  
  
  </Box>
      <Divider/>
      <Link href='/panel' fontSize='lg' color='gray.700'  _hover={hoverCss} fontFamily='' display='inline-flex' gap='4'alignItems='center'><FiHome/>Home</Link>
      <Link href='/appointments' fontSize='lg' color='gray.700' _hover={hoverCss} fontFamily='' display='inline-flex' gap='4'alignItems='center'><FiCalendar/>Appointments</Link>
      <Link  href='/services' fontSize='lg' color='gray.700'  _hover={hoverCss} display='inline-flex' gap='4'alignItems='center'><FiSettings/>Services</Link>
      <Link  href='/activities' fontSize='lg' color='gray.700'  _hover={hoverCss} display='inline-flex' gap='4'alignItems='center'><FiClipboard/>Activities</Link>
      <Divider mt='200'/>
      
  </Flex>
          </DrawerBody>

          <DrawerFooter>
          <Link  fontSize='lg' color='gray.700' _hover={hoverCss} display='inline-flex' gap='4'alignItems='center'
       onClick={clearCookies}
      ><FiLogOut/>Logout</Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      </>
  )
}

export default Side_bar;

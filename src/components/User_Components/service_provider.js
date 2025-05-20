import React from 'react'
import { useState,useEffect } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Services from './services'
import {MdLocationOn,MdEmail,MdPhoneEnabled} from 'react-icons/md'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import {
    Box,
    IconButton,
    useBreakpointValue,
    Stack,
    Heading,
    Text,
    Container,
    Flex,
    Image,Card,CardBody,Divider,Spinner
  } from '@chakra-ui/react';
  // Here we have used react-icons package for the icons
  // And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

const Service_provider = () => {
    const [slider, setSlider] = React.useState(null);
 
    // These are the breakpoints which changes the position of the
    // buttons as the screen size changes
    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '40px' });
  
    // This list contains all the data for carousels
    // This can be static or loaded from a server
    // const cards = [
    //   {
        
    //     image:
    //       'https://images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    //   },
    //   {
        
    //     image:
    //       'https://images.unsplash.com/photo-1438183972690-6d4658e3290e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2274&q=80',
    //   },
    //   {
       
    //     image:
    //       'https://images.unsplash.com/photo-1507237998874-b4d52d1dd655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=900&q=60',
    //   },
    // ];



    const navigate=useNavigate();
    const [sp_Data,setSp_data]=useState(null)
    const {id}=useParams()
    const GetServices=async()=>{
        await axios.get(`/api/user/get_sp/${id}`)
        .then(res=>{
           setSp_data(res.data.data) 
        })
        .catch(err=>{
          console.log(err)
        })
      }
   
    useEffect(()=>{
      GetServices()
   },[])
    return (
      <>
    {sp_Data!=null?
    <Box w={{base:"140%",sm:"140%",md:"100%",lg:"100%"}} >
     <Navbar/>
      <Stack mt={6} direction={'row'} spacing={10} align={'center'} 
      my='4'  w='fit-content' px={'10'}>
          
          <Image src={sp_Data!=null?'data:image/jpg;base64,'+sp_Data.B_pimage.data:"no image"}
           maxW={'100px'}
           maxH='20vh'
           />
           <Stack direction={'column'}>
           <Heading size={'lg'}>{sp_Data.B_name}</Heading>
           <Text display={'inline-flex'} fontWeight='500' 
           color="gray.700"> <MdLocationOn />{sp_Data.B_address}</Text>
           <Text display={'inline-flex'} fontWeight='500'  
           color="gray.700"> <MdEmail/>{sp_Data.B_contact_email}</Text>
           <Text display={'inline-flex'} fontWeight='500' 
           color="gray.700"> <MdPhoneEnabled/>{sp_Data.B_contact_no}</Text>
           <Text color={"blue.600"}>{sp_Data.service_cat}</Text>
           </Stack>
        </Stack>
              {/* This is the block you need to change, to customize the caption */}
             
        <Divider/>
        <Text fontSize='2xl' fontWeight='bold'
        mx="5" my='8'>Services</Text>
        <Services />
        <Divider/>
        <Text fontSize='2xl' fontWeight='bold'
        mx="5" my='8'>Branch Images</Text>
        <Stack mx='5'>
          <Stack  p='10px' mx='5px'
          borderColor={'gray.500'} direction='row'>
              {sp_Data.B_Images.map((image)=>{
                  return <Image src={'data:image/jpg;base64,'+image.data} w='2xs' h='2xs'/>
              })}
          </Stack>
        </Stack>
        <Divider/>
        <Text fontSize='2xl' fontWeight='bold'
        mx="5" my='8'>Service Description</Text>
      <Text size='lg' fontWeight={'semibold'}
      color="gray.600" mx={'5'}>{sp_Data.service_desc}</Text>
        <Footer/>
      </Box>:
      <>
      <Box w='100%'>
      <Navbar/>
      <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
      />
  <Footer/>
</Box>
</>}
      </>
  )

}

export default Service_provider

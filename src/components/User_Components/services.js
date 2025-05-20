import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Stack,
    Heading,
    Text,Spinner,
    Image,Card,CardBody,CardFooter,Button
  } from '@chakra-ui/react';

const Services = (isopen) => {
  const navigate=useNavigate();
  const [services,setservices]=useState([])
  const [isAvailaible,setIsAvailaible]=useState(null)
  const {id}=useParams()

  const GetServices=()=>{
      axios.get(`/api/user/get_services/${id}`)
      .then(res=>{
          setservices(res.data.data) 
      })
      .catch(err=>{
        if(err.response.status==404){
          setIsAvailaible("No Service Found For this Service Provider")
        }
      })
    }
 
  useEffect(()=>{
    GetServices()
 },[])

 return (
   <>
   {services.length!=0?
   <Box display={'flex'} >
    {services.map((services)=>{
      const {serviceName,serviceDesc,serviceDuration,serviceImage,_id,serviceCharges}=services
      return <Card w={{base:"80%",sm:"80%",md:"20%",lg:"20%"}}  boxShadow='md' p='0' mx={'5'} my='10' key={_id}>
    <Image
      src={"data:image/jpg;base64,"+serviceImage.data}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      height='200px' width='100%'
      display='inline'
      borderBottomRadius={'none'}
      />
        <CardBody>
      <Heading size='md' my='4'>{serviceName}</Heading>
      <Stack direction={'column'}>
      <Text fontWeight='bold' bg='green.50' color='blue.500' width={'fit-content'}>{serviceDuration} min</Text>
      <Text noOfLines={[1,2]}>{serviceDesc}
      </Text>
    <Heading size={'md'} fontWeight='700' >{serviceCharges}/-Rs</Heading>
    </Stack>
      <CardFooter>
      <Button border='none' w={{base:"100%",md:"fit-content",sm:"100%"}} p={{base:'10px',sm:"10px"}} colorScheme='blue' onClick={()=>{navigate("/appointment/"+`${_id}`)}}>
         Book Appointment
      </Button>     
  </CardFooter>
      </CardBody>       
</Card>
    })}
    </Box>:
    <>
    {isAvailaible!=null?
      <Text size='lg' fontWeight={'semibold'}
      color="gray.600" mx={'5'}>{isAvailaible}</Text>:
      <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
      />}
</>}
    </>

  )
}

export default Services


import React, { useEffect } from 'react'
import {Flex,Select,Button,Heading,Textarea } from '@chakra-ui/react';
import { FormControl,
    FormLabel,
    FormErrorMessage,Input,
    FormHelperText,} from '@chakra-ui/react';
import axios from 'axios';
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';

const Setup = () => {
  var spId='';
  var loggedIn=false;
  let setup=false;
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get('/setup')
    .then(res=>{
      spId=res.sessionId
      loggedIn=res.logSession
      setup=res.setup
    })
  },[])
  return (
    <Flex  overflowY='scroll' height='100vh' css={{
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        width: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor:'whitesmoke',
        borderRadius: '24px',
      },
    }} margin='auto' w='100vw' ml='100' justifyContent='center'>
     {setup!=false?
     navigate('/'):
      <form method='post' action='/api/setup' encType='multipart/form-data'>
      <FormControl  isRequired>
        <Heading mb='5'>Set Up Your Account</Heading>
        <Heading as='h6z' color='#2C7A7B' my='10'>Branch Information</Heading>
        <FormLabel >Enter Your Branch Name :</FormLabel>
        <Input type='text' name='B_name' />
        <FormHelperText mb='5'>This name is shown in the users feed.</FormHelperText>
         <FormLabel> Branch Address :</FormLabel>
        <Textarea placeholder='Enter the address of your store' name='B_address'/>
         <FormLabel> Contact Information :</FormLabel>
        <Input type='email' display='inline' w='50' placeholder='Enter Your Email' name='B_contact_email'/>
        Tel No: <Input type='tel' display='inline'   w='50' placelder='Enter Your Tel No' name='B_contact_no'/>
        <FormLabel>Upload your Branch Images:</FormLabel>
        <Input type='file' name='B_Images' multiple/>
        <FormLabel >Set your branch Profile Photo</FormLabel>
        <Input type='file' name='B_pimage'/>
      <Heading as='h6' color='#2C7A7B' my='10'>Owner Information</Heading>
      <FormLabel>Owner Name :</FormLabel>
      <Input type='text' placeholder='Enter the owner name' name='owner_name'/>
      <FormLabel>Owner Address :</FormLabel>
      <Textarea placeholder='Enter owner address' name='owner_address'/>
      <FormLabel>Owner Mobile No :</FormLabel>
      <Input type='number' placeholder='Enter your phone no' name='owner_contact_No'/>
      <FormLabel>Owner Email :</FormLabel>
      <Input type='email' placeholder='Enter your email ID' name='owner_contact_email'/>
      <Heading as='h6'  color='#2C7A7B' my='10'>Services Information</Heading>
      
      <Select placeholder='Select Category of your services' name='service_cat'>
        <option>Medical</option>
        <option>Automobile</option>
        <option>Grooming & salon & spa</option>
        <option>Consultation</option>
        <option>Sports</option>
        <option>Educational</option>
        <option>Banking</option>
        <option>Goverment Documentation work</option>
        </Select>
      <FormLabel>Services Description</FormLabel>
      <Textarea placeholder='Enter Here...' name='service_desc'/>

      <Button type='submit' bg='teal' w='50%' color='white' my='10' >Save</Button>
      <Button type='submit' bg='crimson' w='100' mx='10' color='white' my='10' >Reset</Button>
      </FormControl>
      </form>}
    </Flex>
  )
}

export default Setup

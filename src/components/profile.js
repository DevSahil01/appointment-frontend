import React, { useEffect, useState } from 'react'
import {Flex,Select,Button,Heading,Textarea ,Box,Image, Stack} from '@chakra-ui/react';
import { FormControl,
    FormLabel,
    FormErrorMessage,Input,
    Spinner,
    FormHelperText,} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Side_bar from './side_bar';
const Profile = () => {
  const [profileData,setProfileData]=useState(null)
  const navigate=useNavigate()
  const funcupdateFormData=(e)=>{
    setProfileData({
       ...profileData,
       [e.target.name]:e.target.value
    })
  }
  const getProfileInfo=()=>{
    axios.get('/api/profile',{
      headers:{
        Accept:"application/json",
      "Content-type":"application/json"
      },
      withCredentials:true}
      )
    .then(res=>{
        console.log(res.data)
        setProfileData(res.data)
    })
    .catch(err=>{
      if(err.response.status==401){
         navigate("/sp_login")
      }
    })
  }
  useEffect(()=>{
     getProfileInfo()
  },[])
  return (
    <>
    <Side_bar/>{
  profileData!=null?
 <Flex bg='gray.100'  w={{base:"100%",sm:"100%",md:"100%",lg:"100%"}} display='column' px='5' overflow='auto' h='100vh'
 css={{
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
  }}>
  <Box display='flex' flexDirection={{base:"column",sm:"column",md:"row",lg:"row"}}>
<Image src={"data:image/jpg;base64,"+profileData.B_pimage.data} height='150px' width={{base:"50%",sm:"50%",lg:"20%",md:"20%"}} mt='5' />
 <FormControl >
    <Input type='file' mt='5'/>
 </FormControl>
  </Box>
  <Box>
<form method='post' action='api/updateProfile'>
    <FormControl >
    <Heading as='h6z' color='#2C7A7B' my='10'>Branch Information</Heading>
    <FormLabel >Branch Name :</FormLabel>
    <Input type='text' value={profileData.B_name} name='B_name' onChange={funcupdateFormData}/>
    <FormLabel> Branch Address :</FormLabel>
    <Textarea placeholder='Enter the address of your store' name='B_address' onChange={funcupdateFormData}>{profileData.B_address}</Textarea>
    <FormLabel> Contact Information :</FormLabel>
    <Input type='email' display='inline' w='50' placeholder='Enter Your Email' 
    value={profileData.B_contact_email} name='B_contact_email' onChange={funcupdateFormData}/>
        Tel No: <Input type='tel' display='inline' 
        value={profileData.B_contact_no}  w='50' placelder='Enter Your Tel No' name='B_contact_no' onChange={funcupdateFormData}/>

    <Heading as='h6' color='#2C7A7B' my='10'>Owner Information</Heading>
    <FormLabel>Owner Name :</FormLabel>
      <Input type='text' placeholder='Enter the owner name' value={profileData.owner_name} name='owner_name' onChange={funcupdateFormData}/>
      <FormLabel>Owner Address :</FormLabel>
      <Textarea placeholder='Enter owner address' value={profileData.owner_address} name='owner_address' onChange={funcupdateFormData}/>
      <FormLabel>Owner Mobile No :</FormLabel>
      <Input type='number' placeholder='Enter your phone no' name='owner_contact_no' value={profileData.owner_contact_no} onChange={funcupdateFormData}/>
      <FormLabel>Owner Email :</FormLabel>
      <Input type='email' placeholder='Enter your email ID' name='owner_contact_email' value={profileData.owner_contact_email} onChange={funcupdateFormData}/>
      <Heading as='h6'  color='#2C7A7B' my='10'>Services Information</Heading>
      <FormLabel>Services Description</FormLabel>
      <Textarea placeholder='Enter Here...' name='service_desc' onChange={funcupdateFormData}>{profileData.service_desc}</Textarea>
      <Button type='submit' bg='teal' w='50%' color='white' my='10' >Save</Button>
      <Button type='submit' bg='crimson' w='100' mx='10' color='white' my='10' >Reset</Button>
    </FormControl>
    </form>
  </Box>
  </Flex>
  
  :<Spinner
  thickness="4px"
  speed="0.65s"
  emptyColor="gray.200"
  color="teal.500"
  size="xl"
/>}
  </>
  )
}

export default Profile

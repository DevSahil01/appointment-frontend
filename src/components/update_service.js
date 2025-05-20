import {useEffect} from 'react'
import {Flex,Select,Button,Heading,Textarea,Text,Alert,AlertIcon } from '@chakra-ui/react'
import { FormControl,
    FormLabel,Box,
    FormErrorMessage,Input,Image,
    FormHelperText,} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import Side_bar from './side_bar';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateService = () => {
  const navigate=useNavigate()
  const [serviceInfo,setServiceInfo]=useState(null)
  // const [updateFormData,setUpdateFormData]=useState(serviceInfo)

  const funcupdateFormData=(e)=>{
        setServiceInfo({
           ...serviceInfo,
           [e.target.name]:e.target.value
        })
  }
   console.log(serviceInfo)

    const {id}=useParams()
    const getServiceInfo=()=>{
        axios.get(`/api/getServiceInfo/${id}`,{
          headers:{
            Accept:"application/json",
          "Content-type":"application/json"
          },
          withCredentials:true
      })
      .then(res=>{
        setServiceInfo(res.data)
      })
      .catch(err=>{
        if(err.response.status==401){
          navigate('/spLogin')
        }
      })
      }
    useEffect(()=>{
            getServiceInfo()
          },[])
    
  return (
    <>
    <Side_bar/> 
    {serviceInfo!==null ? 
    <Box h={'100vh'} overflowY='auto' w={'80%'}>
      <form method='post' action={'/api/updateImage/'+id} encType='multipart/form-data'>
      <Image src={'data:image/jpg;base64,'+serviceInfo.serviceImage.data} height="200px" width={'200px'}/>
      <Input type={'file'} name="serviceImage"/>
      <Button type='submit' colorScheme={'linkedin'} >Update</Button>
      </form>
    <form method='post' >
    
    <>
    
    <FormControl  isRequired>
    <Heading mb='5'>Update Your Services</Heading>
    <FormLabel >Enter service name :</FormLabel>
    <Input type='text' name='serviceName' value={serviceInfo.serviceName} onChange={funcupdateFormData}/>
    <FormHelperText mb='5'>This name is shown in the users feed.</FormHelperText>
    <FormLabel>Enter service Duration :</FormLabel>
    <FormHelperText color='red'>Enter The Duration in <b>Minutes</b></FormHelperText>
    <Input type='number' name='serviceDuration' value={serviceInfo.serviceDuration} onChange={funcupdateFormData}/>
    {/* <FormLabel>Upload image Related to service:</FormLabel>
    <Input type='file' name='serviceImage'/> */}
    <FormLabel>Enter Service Description :</FormLabel>
    <Textarea placeholder='Enter the address of your store' name='serviceDesc'  value={serviceInfo.serviceDesc}  onChange={funcupdateFormData}/>
  <Button type='submit' bg='teal' w='50%' color='white' my='10' >Update</Button>
  <Button type='reset' bg='crimson' w='100' mx='10' color='white' my='10' >Reset</Button>
  </FormControl>
  </>
  
  </form>
  </Box>:"noting"}
  </>
  )
}

export default UpdateService

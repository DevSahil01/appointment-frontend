import React, { useState } from 'react'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Toast,
    useToast,
  } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SpLogin = () => {
  const [email,setEmail]=useState()
  const [pass,setPass]=useState()
  const navigate=useNavigate()
  const toast=useToast()
  const LoginApi=()=>{
     axios.get(`api/spLogin/${email}/${pass}`,{
        email:email,
        password:pass
     })
     .then(res=>{
       if(res.status==200){
          navigate("/panel")
       }
       else if(res.status==201){
          navigate('/setup')
       }
     })
     .catch(err=>{
        if(err.response.status==404){
            toast({
                title: 'Invalid Credentials',
                position:'top',
                status:"error",
                variant:"subtle",
                isClosable: true,
              })
        }
     })
  }






  return (
    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')} w="100%">
    <Stack spacing={10} mx={'auto'}  py={12} px={6} w={{base:"100%",sm:"100%",md:"40%",lg:"40%"}} h="80vh" >
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}>
        <Stack spacing={10}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" name='email' onChange={(e)=>setEmail(e.target.value)}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" name='password' onChange={(e)=>setPass(e.target.value)} />
            
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              type="submit" w='100%' mt='30px' onClick={LoginApi}>
              Sign in
            </Button>
          </FormControl>
          <Stack spacing={10}>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Flex>
  )
}

export default SpLogin

import React from 'react'
import { useState } from 'react';
import Navbar from './navbar'
import Footer from './footer'
import {Flex,Link, Box,Image,Text, Divider,Select, Stack, FormControl,Heading,
    Input,FormLabel,Textarea, Button,InputGroup,InputRightElement,Alert,AlertIcon} from '@chakra-ui/react';
    import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 const onfocus={
        'border':'2px solid purple'
    }

const Login = () => {
  const navigate=useNavigate();

  const [password,setpassword]=useState('')
  const [email,setemail]=useState('')
  const [msgstatus,setmsgstatus]=useState('')
  const [msg,setmsg]=useState(null);

  function handleSubmit(e){
    const formData={
      "email":email,
      "password":password
    }
    console.log(formData)

    e.preventDefault();
    axios.post('/api/user/login',formData)
    .then(res=>{
      if(res.status==200){
        setmsg("You Are Logged In")
        setTimeout(() => {
          setmsg(null)
        }, 3000);
        setmsgstatus("success")
        window.localStorage.setItem("userInfo",JSON.stringify(res.data))
        navigate('/')
      }
    })
    .catch(err=>{
      console.log(err.response.status)  
      if(err.response.status==401){
        setmsg("Invalid Credentials")
            setTimeout(() => {
              setmsg(null)
            }, 3000);
            setmsgstatus("error")
      }
      else if(err.response.status==404){
        setmsg("Email Does Not Exist")
        setTimeout(() => {
          setmsg(null)
        }, 3000);
        setmsgstatus("error")
      }
    })
}
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  return (
    <> 
    <Box w='100%'>
    <Navbar/>
    
    <Flex bg='purple.50' w='100%' h='100vh'>
       <Flex m='auto' bg='white' h='fit-content' borderRadius='10px'>
        <Box display={{base:"none",sm:"none",md:"flex",lg:"flex"}} flexDirection='column' w='50%' h='80vh' >
        <Image src='https://ik.imagekit.io/3zuv6faux/8431429_3905235_CTvvj2AuI.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674832192443' h='100%' w='500px' borderLeftRadius='10'  />
        </Box>
        <Flex direction='column' bg='purple.100' w={{base:"100%",sm:"100%",md:"50%",lg:"50%"}} borderRightRadius='10px' px='10' gap='10'>   
        {msg!=null && <Alert status={msgstatus} >
    <AlertIcon />
     {msg}
  </Alert> }
        <Heading as='h2' color='purple.700' m='auto'>Login</Heading>
        <form onSubmit={handleSubmit}>
        <FormControl>
        <Input type='email' placeholder='Enter Your Email'    _focus={onfocus} bg='white' my='10'  onChange={(e)=>{setemail(e.target.value)}} required /> 
        <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        bg='white'
        _focus={onfocus}
        mb='10'
        onChange={(e)=>{setpassword(e.target.value)}}
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick} bg='purple.600' color='white'>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
        <Button type='submit' bg='yellow.300' w='100%'>Sign-In</Button>
        </FormControl>
        </form>
        <Text m='auto'>Don't have an Account ?<Link href='/register' >SignUp</Link></Text>
        <Divider color='black' />
        </Flex>
       </Flex>
       </Flex>
       <Footer/>
       </Box>
    </>
    
  )
}

export default Login

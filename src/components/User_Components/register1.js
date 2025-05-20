import React, { useState } from 'react'
import {Flex,Link, Box,Image,Text, Divider,Select, Stack, FormControl,Heading,
    Input,FormLabel,Textarea, Button,InputGroup,InputRightElement,Alert,AlertIcon} from '@chakra-ui/react';
import Axios from 'axios';
import { display } from '@mui/system';
import Navbar from './navbar'
import Footer from './footer'




const onfocus={
    'border':'2px solid purple'
}

const Register = () => {
   const [msgstatus,setmsgstatus]=useState('');
   const [msg,setmsg]=useState(null);
   const regx=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
   const [firstname,setfirstname]=useState('')
   const [lastname,setlastname]=useState('')
   const [email,setemail]=useState('')
   const [password,setpassword]=useState('')
   const [cpass,setcpass]=useState('')
   function handleSubmit(e){
        const formData={
          "name":firstname+" "+lastname,
          "email":email,
          "password":password
        }
        console.log(formData)

        e.preventDefault();
      if(cpass==password){
        fetch('/api/user/register',{
          method:"POST",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(formData)
        })
        .then(res=>{
          console.log(res.status)
          if(res.status==200){
            setmsg("Successfully Sign Up")
            setTimeout(() => {
              setmsg(null)
            }, 3000);
            setmsgstatus("success")
          }
          else if(res.status==409){
            setmsg("User already Exist")
            setTimeout(() => {
              setmsg(null)
            }, 3000);
            setmsgstatus("error")
          }
          })
        }
        else{
          setmsg("Password Does Not Match")
            setTimeout(() => {
              setmsg(null)
            }, 3000);
            setmsgstatus("error")
        }

   }
  //  console.log(firstname,lastname,email,password,cpass);
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
  return (
    <> 
    <Box w='100%'>
  <Navbar/>
  <Flex bg='purple.50' w='100%' h='100vh'>
      
       <Flex m='auto' bg='white' h='fit-content' w={{base:"80%",sm:"80%",md:"50%",lg:"50%"}} borderRadius='10px'>
        <Box display={{base:"none",sm:"none",md:"flex",lg:"flex"}} flexDirection='column' w='50%' h='80vh'>
        <Image src='https://ik.imagekit.io/3zuv6faux/8608874_3961373_ztywxCAMe.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1674758324596' h='80%' w='500px' borderRadius='10' />
        </Box>
        <Flex direction='column' bg='purple.100' w={{base:"100%",sm:"100%",md:"50%",lg:"50%"}} borderRightRadius='10px' px='10'> 
{msg!=null && <Alert status={msgstatus}>
    <AlertIcon />
     {msg}
  </Alert> }
  <form onSubmit={handleSubmit}>
        <Heading as='h2' color='purple.700' m='auto'>Sign-Up</Heading>
        <Input type='text' placeholder='First name' name="name" _focus={onfocus} bg='white' mt='5' onChange={(e)=>{setfirstname(e.target.value)}}  required/>
        <Input type='text' placeholder='Last name'  name="name"   _focus={onfocus} bg='white' mt='5' onChange={(e)=>{setlastname(e.target.value)}} required/> 
        <Input type='email' placeholder='Enter Your Email'  name="email"    _focus={onfocus} bg='white'  mt='5' onChange={(e)=>{setemail(e.target.value)}} required/> 
        <InputGroup size='md'>
      <Input
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        name="password" 
        bg='white'
        mt='5'
        _focus={onfocus}
        onChange={(e)=>{setpassword(e.target.value)}}
        required
      />
      <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick} bg='purple.600' color='white' mt='10'>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
        <Input type='password' placeholder= 'Confirm password' my='5' onChange={(e)=>setcpass(e.target.value)}  _focus={onfocus} bg='white' required /> 
        <Button type='submit' bg='yellow.300' w='100%' my='5'>Sign-Up</Button>
    </form>
        <Text m='auto'>Already Have an Account ?<Link href='/signIn' >Sign In</Link></Text>
        <Divider color='black' />
        {/* <Image src='https://ik.imagekit.io/3zuv6faux/Google-Icon-PNG_rwscww_CkvWvWaIm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674760662480' h='40px' w='40px' m='auto' mb='5' /> */}
        </Flex>
       </Flex>
       </Flex>
       <Footer/>
       </Box>
    </>
    
  )
}

export default Register

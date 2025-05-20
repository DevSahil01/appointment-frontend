import React from 'react'
import { FormControl,Flex,Button,Input, FormLabel, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
const Registration = () => {

  return (
   <form  style={{'margin':"auto"}} method="post" action='api/user/register'>
    <FormControl w={'100%'} display={"flex"} flexDirection="column" gap={5} p='10' bg="gray.50">
        <Heading>Registration Form</Heading>
        <FormLabel >Enter your Username:</FormLabel>
        <Input type="text" name='name' />
        <FormLabel >Enter Your Email</FormLabel>
        <Input type="email" name='email'/>
        <FormLabel>Enter Password: </FormLabel>
        <Input type="password" name='password'/>
        <Button type="submit" name="submit" colorScheme={'linkedin'}>Submit</Button>
    </FormControl>
    </form>
  )
}

export default Registration

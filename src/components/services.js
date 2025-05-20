import React, { useEffect } from 'react'
import { Flex, Select, Button, Heading, Textarea, Text, Alert, AlertIcon } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage, Input,
  FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import Side_bar from './side_bar';
import { useParams } from 'react-router-dom';

const Services = () => {

  const [msg, setMessage] = useState(null)
  const [Sname, setSname] = useState('')
  const [Sduration, setSduration] = useState('')
  const [Simage, setSimage] = useState()
  const [Sdesc, setSdesc] = useState('')
  const [slotCapacity, setSlotCapacity] = useState('');
  const [charges, setcharges] = useState('')
  //handle form data


  //Using axioss
  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/services', {
      serviceName: Sname,
      duration: Sduration,
      serviceImage: Simage,
      serviceDesc: Sdesc,
      slotCapacity:slotCapacity,
      serviceCharges: charges
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log(res.data)
        setMessage(res.data)
        setTimeout(() => {
          setMessage(null)
        }, 3000);
      })
      .catch((e) => {
        console.log(e)
      })
  }


  return (
    <>
      <Side_bar />

      <Flex overflowY='scroll' height='100vh' css={{
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'whitesmoke',
          borderRadius: '24px',
        },
      }} margin='auto' w={{ base: "100%", sm: "100%", md: "50%", lg: "50%" }} ml={{ base: "0px", md: "20px" }} flexDirection='column'>
        {msg != null && <Alert status='success' variant='left-accent' >
          <AlertIcon />
          The service is successfully registered !
        </Alert>}
        <FormControl isRequired>
          <Heading mb='5'>Register Your Services</Heading>
          <FormLabel >Enter service name :</FormLabel>
          <Input type='text' name='serviceName' onChange={(e) => { setSname(e.target.value) }} />
          <FormHelperText mb='5'>This name is shown in the users feed.</FormHelperText>
          <FormLabel>Enter service Duration :</FormLabel>
          <FormHelperText color='red'>Enter The Duration in <b>Minutes</b></FormHelperText>
          <Input type='number' name='duration' onChange={(e) => { setSduration(e.target.value) }} />

          <FormLabel>Enter Slot Capacity:</FormLabel>
          <Input type='number' name='slotCapacity' onChange={(e) => setSlotCapacity(e.target.value)} />


          <FormLabel>Upload image Related to service:</FormLabel>
          <Input type='file' name='serviceImage' onChange={(e) => { setSimage(e.target.files[0]) }} />
          <FormLabel >Enter Service Charges:</FormLabel>
          <Input type='number' name='serviceCharges' onChange={(e) => { setcharges(e.target.value) }} />
          <FormLabel>Enter Service Description :</FormLabel>
          <Textarea placeholder='Enter the address of your store' name='serviceDesc' onChange={(e) => { setSdesc(e.target.value) }} />
          <Button type='submit' bg='teal' w='50%' color='white' my='10' onClick={handleSubmit}>Save</Button>
          <Button type='reset' bg='crimson' w='100' mx='10' color='white' my='10' >Reset</Button>
        </FormControl>
      </Flex>
    </>
  )
}

export default Services

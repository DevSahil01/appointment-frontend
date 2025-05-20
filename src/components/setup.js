import React, { useEffect, useState } from 'react'
import {
  Flex, Select, Button, Heading, Textarea, Input,
  FormControl, FormLabel, FormHelperText
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Setup = () => {
  const [latLng, setLatLng] = useState({ lat: '', lng: '' });
  const [setup, setSetup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/setup')
      .then(res => {
        if (res.data.setup) setSetup(true);
      });

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLatLng({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.warn("Geolocation error:", err);
      }
    );
  }, []);

  if (setup) {
    navigate('/');
    return null;
  }

  return (
    <Flex overflowY='scroll' height='100vh' margin='auto' w='100vw' justifyContent='center'>
      <form method='post' action='/api/setup' encType='multipart/form-data'>
        <FormControl isRequired>
          <Heading mb='5'>Set Up Your Account</Heading>
          <Heading as='h6' color='#2C7A7B' my='10'>Branch Information</Heading>
          <FormLabel>Enter Your Branch Name :</FormLabel>
          <Input type='text' name='B_name' />
          <FormHelperText mb='5'>This name is shown in the users feed.</FormHelperText>
          <FormLabel> Branch Address :</FormLabel>
          <Textarea placeholder='Enter the address of your store' name='B_address' />
          <FormLabel> Contact Information :</FormLabel>
          <Input type='email' w='50' placeholder='Enter Your Email' name='B_contact_email' />
          Tel No: <Input type='tel' w='50' name='B_contact_no' />
          <FormLabel>Upload your Branch Images:</FormLabel>
          <Input type='file' name='B_Images' multiple />
          <FormLabel>Set your branch Profile Photo</FormLabel>
          <Input type='file' name='B_pimage' />
          <Heading as='h6' color='#2C7A7B' my='10'>Owner Information</Heading>
          <FormLabel>Owner Name :</FormLabel>
          <Input type='text' name='owner_name' />
          <FormLabel>Owner Address :</FormLabel>
          <Textarea name='owner_address' />
          <FormLabel>Owner Mobile No :</FormLabel>
          <Input type='number' name='owner_contact_No' />
          <FormLabel>Owner Email :</FormLabel>
          <Input type='email' name='owner_contact_email' />
          <Heading as='h6' color='#2C7A7B' my='10'>Services Information</Heading>
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
          <Textarea name='service_desc' />

          {/* Hidden Inputs for Coordinates */}
          <input type="hidden" name="latitude" value={latLng.lat} />
          <input type="hidden" name="longitude" value={latLng.lng} />

          <Button type='submit' bg='teal' w='50%' color='white' my='10'>Save</Button>
          <Button type='reset' bg='crimson' mx='10' color='white' my='10'>Reset</Button>
        </FormControl>
      </form>
    </Flex>
  )
}

export default Setup;

import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { CheckIcon } from '@chakra-ui/icons'
import {
  Box, Flex, FormControl, FormLabel, Input, Textarea,
  RadioGroup, Radio, Text, Select, Button, InputGroup, InputLeftAddon,
  InputRightElement, InputLeftElement,
  AlertDescription, AlertTitle, CloseButton,
  Alert, AlertIcon,
  Heading,
  Stack
} from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment/moment'
import { useParams, useNavigate } from 'react-router-dom'

const Appointment = () => {
  const [value, setValue] = React.useState('1')
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedSlot, setSelectedSlot] = useState('');
  const [maxPersons, setMaxPersons] = useState(1);

  const [msgstatus, setmsgstatus] = useState('')
  const [msg, setmsg] = useState(null);

  const [user, setUserData] = useState(null)
  const [timeSlots, setTimeslots] = useState([])
  const [Sp_id, setSp_id] = useState('')
  const [charges, setCharges] = useState('')

  const getTimeslot = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD")
    axios.get(`/api/appointments/services/${id}/${formattedDate}`, {
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      withCredentials: true
    })
      .then(res => {
        const times = res.data.data.timeslot;
        setUserData(res.data.data.user)
        setTimeslots(times)
        setSp_id(res.data.data.spId)
        setCharges(res.data.data.serviceCharges)

        if (times.length === 0) {
          setSelectedSlot('');
          setMaxPersons(1);
          setFormdata(prev => ({ ...prev, noOfPersons: 1, timeslot: '' }));
        }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          navigate("/signIn")
        }
      })
  }

  const [formData, setFormdata] = useState({
    serviceId: id,
    noOfPersons: 1
  })

  const updateData = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
      serviceProviderId: Sp_id
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/appointments/bookappointment', formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": 'application/json'
      },
      withCredentials: true
    })
      .then((res) => {
        if (res.status == 200) {
          setmsg(res.data.message)
          setmsgstatus('success')
        }
      })
      .catch((err) => {
        if (err.response.status == 409) {
          setmsg("You Already Booked That Appointment")
          setmsgstatus('warning')
        }
      })
  }

  useEffect(() => {
    getTimeslot()
  }, [])

  return (
    <Box w='100%'>
      <Navbar />
      <Box w={'100%'} p='10'>
        {msg != null && <Alert status={msgstatus} w={{ base: "100%", md: "50%", lg: "50%" }} m='auto'>
          <AlertIcon />
          <Box>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              {msg}
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf='flex-start'
            position='relative'
            right={-1}
            top={-1}
            onClick={() => { setmsg(null) }}
          />
        </Alert>}

        <form onSubmit={handleSubmit} method='post'>
          <FormControl w={{ base: "100%", sm: "100%", md: "45%", lg: "45%" }} display={'flex'} gap="5"
            flexDirection={'column'} m="auto">
            <FormLabel htmlFor='name'>Enter Your Name :</FormLabel>
            <Input type="text" id="name" name='name' onChange={updateData} required />

            <FormLabel htmlFor='contact'>Enter Your Contact No :</FormLabel>
            <InputGroup>
              <InputLeftAddon children='+91' />
              <Input type='tel' placeholder='phone number' name="C_no" onChange={updateData} required />
            </InputGroup>

            <FormLabel htmlFor='address'>Enter Your Address :</FormLabel>
            <Textarea id="address" name='address' onChange={updateData} required />

            <FormLabel htmlFor='date'>Select Date :</FormLabel>
            <Input type="date" name="date" min={moment().format("YYYY-MM-DD")} onChange={(e) => {
              updateData(e)
              getTimeslot(e.target.value)
            }} required />

            <FormLabel htmlFor='timeslot'>Select TimeSlot :</FormLabel>
            {timeSlots.length === 0 ? (
              <Text color="red.500" fontWeight="bold">
                No slots available for the selected date. It may be a holiday.
              </Text>
            ) : (
              <RadioGroup onChange={setValue}>
                <Stack direction='row' wrap={'wrap'} gap="3">
                  {timeSlots.map((slotData, index) => {
                    const isDisabled = slotData.available === 0;
                    return (
                      <Flex key={index} p='2' border='2px solid' borderColor={isDisabled ? 'gray.300' : 'blue.500'} borderRadius='3xl' opacity={isDisabled ? 0.6 : 1}>
                        <Radio
                          value={slotData.slot}
                          name="timeslot"
                          onChange={(e) => {
                            updateData(e);
                            setSelectedSlot(slotData.slot);
                            setMaxPersons(slotData.available);
                          }}
                          isDisabled={isDisabled}
                        >
                          {slotData.slot} ({slotData.available} left)
                        </Radio>
                      </Flex>
                    );
                  })}
                </Stack>
              </RadioGroup>
            )}

            <FormLabel htmlFor='noOfPersons'>Number of Persons Visiting:</FormLabel>
            <Select
              placeholder='Select number'
              name='noOfPersons'
              onChange={updateData}
              required
              value={formData.noOfPersons}
              isDisabled={timeSlots.length === 0}
            >
              {Array.from({ length: maxPersons }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </Select>

            <FormLabel htmlFor='charges'>Charges:</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children='Rs' />
              <Input placeholder='Enter amount' value={charges} disabled />
              <InputRightElement children={<CheckIcon color='green.500' />} disabled />
            </InputGroup>

            <Button border='none' colorScheme='blue' type='submit' isDisabled={timeSlots.length === 0}>
              Book Appointment
            </Button>
          </FormControl>
        </form>
      </Box>
      <Footer />
    </Box>
  )
}

export default Appointment

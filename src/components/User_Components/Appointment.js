import React, { useEffect,useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { CheckIcon } from '@chakra-ui/icons'
import {Box, Flex, FormControl, FormLabel, Input,Textarea,
  RadioGroup,Radio,Text,Select,Button,InputGroup,InputLeftAddon,
  InputRightElement,InputLeftElement,
  AlertDescription,AlertTitle,CloseButton,
  Alert,AlertIcon,
 Heading,
  Stack} from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment/moment'
import { useParams,useNavigate} from 'react-router-dom'
  const Appointment = () => {
    const [value, setValue] = React.useState('1')
    //get url ID
    const {id} =useParams();
    const navigate=useNavigate();

    //To show message 
    const [msgstatus,setmsgstatus]=useState('')
    const [msg,setmsg]=useState(null);
    //to set data came from server about timeslosts
    const [user,setUserData]=useState(null)
    const [timeSlots,setTimeslots]=React.useState([])
    const [Sp_id,setSp_id]=useState('')
    const [charges,setCharges]=useState('')
    //this is service provider actual timeslot
    const getTimeslot=(date)=>{
      const foramtedDate=moment(date).format("YYYY-MM-DD")
      axios.get(`/api/appointments/services/${id}/${foramtedDate}`,{
        headers:{
          Accept:"application/json",
          'Content-Type':"application/json"
        },
        withCredentials:true
      })
      .then(res=>{
         setUserData(res.data.data.user)
         setTimeslots(res.data.data.timeslot)
         setSp_id(res.data.data.spId) 
         setCharges(res.data.data.serviceCharges)
        //  console.log(res.data.timeslot)  
      })
      .catch(err=>{
          if(err.response.status==401){
              navigate("/signIn")
          }
      
      })
    }
  


    const [formData,setFormdata]=useState({
      serviceId:id,
    })
 
    const updateData=(e)=>{
       setFormdata({
          ...formData,
          [e.target.name]:e.target.value,
          serviceProviderId:Sp_id
       })
    }
    const handleSubmit=(e)=>{
       e.preventDefault()
       axios.post('/api/appointments/bookappointment',formData,{
        headers:{
          Accept:"application/json",
          "Content-Type":'application/json'
        },
        withCredentials:true
       })
       .then((res)=>{
        console.log(res.data.data)
        if(res.status==200){
          setmsg(res.data.message)
          setmsgstatus('success')
       }
       })
       .catch((err)=>{
        if(err.response.status==409){
          setmsg("You Already Booked That Appointment")
          setmsgstatus('warning')
        }
       })
    }
    useEffect(()=>{
      getTimeslot()
    },[])
  return (
    <Box w='100%'>
    <Navbar/>
    <Box w={'100%'} p='10' >
   {msg!=null && <Alert status={msgstatus} w={{base:"100%",md:"50%",lg:"50%"}}  m='auto'>
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
        onClick={()=>{setmsg(null)}}
      />
    </Alert>}
  
      <form onSubmit={handleSubmit} method='post'>
        <FormControl w={{base:"100%",sm:"100%",md:"45%",lg:"45%"}} display={'flex'} gap="5"
        flexDirection={'column'} m="auto"> 
        <FormLabel for='name' >Enter Your Name :</FormLabel>
          <Input type={"text"} id="name" name='name' onChange={updateData} required/>
          <FormLabel for='name' >Enter Your Contact No :</FormLabel>
          <InputGroup>
    <InputLeftAddon children='+91' />
    <Input type='tel' placeholder='phone number' name="C_no" onChange={updateData} required/>
  </InputGroup>
  <FormLabel for='name' >Enter Your Address :</FormLabel>
          <Textarea type={"text"} id="name" name='address' onChange={updateData} required></Textarea>

          <FormLabel for='date'>Select Date :</FormLabel>
          {console.log(new Date())}
          <Input type={"date"} name="date" min={moment().format("YYYY-MM-DD")}  onChange={(e)=>{
            updateData(e)
            getTimeslot(e.target.value)
          }} required/>
          <FormLabel for='data'>Select TimeSlot :</FormLabel>

              <RadioGroup onChange={setValue} >
                  <Stack direction='row' wrap={'wrap'} gap="3" >
                    {timeSlots.map((timeslot,index)=>{
                        return  (
                          <Flex  p='2' border={'2px solid'} borderColor='blue.500' borderRadius={'3xl'}
                          >
                          <Radio value={timeslot} name="timeslot" onChange={updateData}>{timeslot}</Radio>
                          </Flex>
                          )
                        
                    })}
                  </Stack>
          </RadioGroup>

            <FormLabel for='name'>Charges:</FormLabel>
            <InputGroup>
            <InputLeftElement
      pointerEvents='none'
      color='gray.300'
      fontSize='1.2em'
      children='Rs'
    />
    <Input placeholder='Enter amount' value={charges} disabled/>
    <InputRightElement children={<CheckIcon color='green.500' />} disabled />
  </InputGroup>
           
            <Button border='none' colorScheme='blue' type='submit'>
         Book Appointment
      </Button>
        </FormControl>
      </form>
    </Box>
    <Footer/>
    </Box>
  )
}

export default Appointment

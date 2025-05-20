import React, { useState,useEffect } from 'react'
import Side_bar from './side_bar'
import { Text,Box, Flex, Heading, Stack
    ,Tr,TableCaption,TableContainer,useToast,Table,Td,Th,Thead,Tbody,Button,
    Link,Spinner,Badge,Select,
    Tfoot, 
    Textarea} from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment'
import {
  Modal,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const ShowAppointments = () => {
  const navigate=useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
   const [idate,setDate]=useState(moment().format('YYYY-MM-DD'))
   const [appointments,setAppointments]=useState([])
   const toast=useToast()
   const updateStatus=(id,date,time)=>{
      const currTime=moment().format("HH:MM A")
      const currDate=moment().format("YYYY-MM-DD")
      if(moment(date).isBefore(currDate)==true){
       axios.get(`/api/updateStatus/${id}`)
       .then(res=>{
        if(res.status==200){
          toast({
            title: 'Successfully Updated',
            position:'top',
            status:"success",
            variant:"subtle",
            isClosable: true,
          })
         }
         GetAppointments()
       })
       .catch(err=>{
          if(err.response.status==401){
            
          }
       })
      }
      else if(date==currDate){
        if(moment(time,'h:mm:ss A').isBefore(currTime)==true){
          axios.get(`/api/updateStatus/${id}`)
          .then(res=>{
             if(res.status==200){
              toast({
                title: 'Successfully Updated',
                position:'top',
                status:"success",
                variant:"subtle",
                isClosable: true,
              })
             }
         GetAppointments()
          })
          .catch(err=>{
           console.log(err)
          })
        }
        else{
          toast({
            title: 'You cannot update before time',
            position:'top',
            status:"error",
            variant:"subtle",
            isClosable: true,
          })
        }
      }
      else{
        toast({
          title: 'You cannot update before time',
          position:'top',
          status:"error",
          variant:"subtle",
          isClosable: true,
        })
      }

      
   }
   const GetAppointments=()=>{
       axios.get('/api/getAppointments',{
        headers:{
          Accept:"application/json",
          'Content-Type':'application/json'
        },
        withCredentials:true
       })
       .then(res=>{
          setAppointments(res.data)
       })
       .catch(err=>{
         if(err.response.status==401){
            navigate('/spLogin')
         }
       })
   }
   
   useEffect(()=>{
    GetAppointments()
  },[])
  return (
    <>
    <Side_bar/>
    <TableContainer w='95%'>
    <Heading size={'md'} my='4' color={"purple.700"}>Scheduled Appointments</Heading>
  <Table userSelect={'none'}>
    
    <Thead>
      <Tr>
        <Th >Service Name</Th>
        <Th><Stack direction={'row'}>
          <Text mt={4}>Date</Text>
          <Select variant='flushed' onChange={(e)=>{setDate(e.target.value)
          GetAppointments()}} name='paymentType' placeholder='Select Date' w="50%">
          
          {appointments.map((dates)=>{
              return <option>
                 {dates.date}
              </option>
          })}
            </Select></Stack></Th>
        <Th>Time</Th>
        <Th>Update Status</Th>
        <Th>Status</Th>
      </Tr>
    </Thead>
    <Tbody>
      {appointments.length!=0?appointments.map((appointment)=>{
         const {date,name,timeSlot,serviceId,status,_id,address,contactNo}=appointment
         const date1=new Date()
       return idate==date&&<Tr h='80px' border={'2px solid #faf5ff'} borderRadius='full' _hover={{
              backgroundColor:"purple.50" 
          }}>
          <Td>
              <Link fontSize={"lg"} fontWeight="bold" color={'Hightlight'}
            onClick={onOpen}>{serviceId[0].serviceName}</Link>
        </Td>
          <Td fontSize={"md"} fontWeight="normal" color={'GrayText'}>{date}</Td>
          <Td ><Badge variant={'subtle'} colorScheme="cyan" p={1}>{moment(timeSlot,'HH:mm').format("HH:MM A")}</Badge> </Td>
          <Td><Button variant='outline' colorScheme={'black'} onClick={()=>updateStatus(_id,date,timeSlot)}>Attended</Button></Td>
         <Td> <Badge variant='subtle' colorScheme={status=="UpComing"?"green":"red"} p={1} borderRadius={'lg'}>
  {status}
  </Badge></Td>
  <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>More Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name:</FormLabel>
              <Input ref={initialRef} value={name} color="black" fontWeight={500} disabled/>
              <FormLabel>ContactNo:</FormLabel>
              <Input ref={initialRef} value={contactNo} color="black" fontWeight={500} disabled/>
              <FormLabel>address:</FormLabel>
              <Textarea ref={initialRef}  color="black" fontWeight={500} disabled>{address}</Textarea>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
        </Tr>
       }):<Text>NO Appointment Scheduled on {idate}</Text>}
        </Tbody>
        </Table>
        </TableContainer>



    </>
  )
}

export default ShowAppointments

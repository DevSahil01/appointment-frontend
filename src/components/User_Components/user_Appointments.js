import React,{ useEffect,useState } from 'react'
import { Text,Box, Flex, Heading, Stack
,Tr,TableCaption,TableContainer,Table,Td,Th,Thead,Tbody,Button,
Link,Spinner,
Tfoot,Badge,
AlertDialog,
AlertDialogBody,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogContent,
AlertDialogOverlay,Wrap,WrapItem,
useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './footer'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { render } from '@testing-library/react'



const User_Appointments = () => {
  const navigate=useNavigate()
  const [appointments,setAppointments]=useState([])
  const [status,setstatus]=useState(null)

  const GetUserAppointments=async ()=>{
    await axios.get('api/appointments/getmyappointments',{
     headers:{
       Accept:"application/json",
       'Content-Type':'application/json'
     },
     withCredentials:true
    })
    .then((appointmentData)=>{
        setAppointments(appointmentData.data)
        console.log(appointmentData.data)
     })
     .catch((err)=>{
       if(err.response.status==401){
          navigate('/signIn')
       }
       else if(err.response.status==404){
          setstatus(404)
       }
       else if(err.response.status==500){
        setstatus(500)
       }
     }
     )
 }

  useEffect(()=>{
    GetUserAppointments()
  },[])

  //If User Cancel their Appointment
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [deleteIndex,setDeleteIndex]=useState(null)

  const toast = useToast()
  const positions = [
    'top',
    'top-right',
    'top-left',
    'bottom',
    'bottom-right',
    'bottom-left',
  ]

  //api request for delete appointment
  const cancelAppointment=(id)=>{
    axios.delete(`api/appointments/cancelAppointment/${id}`,{
    headers:{
      Accept:"application/json",
      "Content-Type":"application/json"
    },
    withCredentials:true
    })
    .then(res=>{
          if(res.status==202){
            toast({
              title: 'Successfully Cancelled',
              position:'top',
              status:"success",
              variant:"subtle",
              isClosable: true,
            })
            GetUserAppointments()
          }          
    })
    .catch(err=>{
      if(err.response.status==401) navigate('/signIn')
      else if(err.response.status==500) toast({
        title: 'Database Error',
        position:'top',
        status:"error",
        variant:"subtle",
        isClosable: true,
      })
    })

  }
  return (
    <>
   

    <Box w='100%'>
    <Navbar/>
    <TableContainer w='95%' m={'auto'}>
    <Heading size={'md'} my='4' color={"purple.700"}>Scheduled Appointments</Heading>
  <Table userSelect={'none'}>
    
    <Thead>
      <Tr>
        <Th>Service Name</Th>
        <Th>Date</Th>
        <Th>Time</Th>
        <Th>Cancel Appointment</Th>
        <Th>Edit Appointment</Th>
      </Tr>
    </Thead>
    <Tbody>
      {appointments.length!=0?appointments.map((appointment,index)=>{
        const {_id,serviceId,serviceProviderId,userId,timeSlot,date,status}=appointment
          return (status=="UpComing" && <Tr h='80px' border={'2px solid #faf5ff'} borderRadius='full' _hover={{
              backgroundColor:"purple.50" 
          }}>
          <Td ><Stack>
              <Link fontSize={"lg"} fontWeight="bold" color={'Hightlight'}
               onClick={()=>navigate("/serviceProvider/"+`${serviceProviderId[0]._id}`)}>{serviceId[0].serviceName}</Link>
              <Link fontSize={'md'} color={'blue.400'}
              onClick={()=>navigate("/serviceProvider/"+`${serviceProviderId[0]._id}`)}>
                {"In " + serviceProviderId[0].B_name}
                </Link></Stack></Td>
          <Td fontSize={"md"} fontWeight="normal" color={'GrayText'}>{date.substring(0,10)}</Td>
          <Td >{timeSlot}</Td>
          <Td><Button variant='outline' colorScheme={'red'} onClick={function(){onOpen()
          setDeleteIndex(index)}}>Cancel</Button></Td>
          <Td><Badge variant='subtle' colorScheme='green' p={1} borderRadius={'lg'}>{status}</Badge></Td>
        </Tr>)
      }):status==404?
      <Heading size={'md'} >No Appointments Booked Yet</Heading>:
      <Spinner
      thickness='5px'
      speed='0.95s'
      emptyColor='gray.200'
      color='purple.500'
      size='xl'
        />}
      
    </Tbody>
    {/* <Heading size={'md'} my='4' color={"purple.700"}>Appointments Report</Heading>
    <Tfoot>
      <Tr>
        <Th>Upcoming</Th>
        <Th>Attended</Th>
        <Th>Cancelled </Th>
      </Tr>
      <Tr>
        <Th>1</Th>
        <Th>5</Th>
        <Th>9 </Th>
      </Tr>
    </Tfoot> */}
  </Table>
</TableContainer>

<AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             Cancel Appointment 😒
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to cancel This &nbsp;
              <b>{deleteIndex!=null && appointments[deleteIndex].serviceId[0].serviceName}</b>
             &nbsp; Appointment
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={()=>{
                onClose()
                cancelAppointment(deleteIndex!=null && appointments[deleteIndex]._id)
              }} ml={3}>
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

     
     <Footer/>
     </Box>
     </>
  )
}

export default User_Appointments

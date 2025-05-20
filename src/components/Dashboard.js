import React from 'react'
import { useState,useEffect } from 'react'
import { Text,Box, Stack ,Heading,Button
,Table,TableContainer,Th,Td,Thead,Tbody,Tr,
Link,
Wrap} from '@chakra-ui/react'
import Side_bar from './side_bar'
import axios from 'axios'
import { red } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {
    const navigate=useNavigate()
    const [appointments,setAppointments]=useState([])
    const [services,setServices]=useState([])

    const Getvalues=(param)=>{
       let counter=0
        appointments.map((appointment)=>{
             if(appointment.status==param){
                counter++
             }
        })
        return counter
    }

    const ServiceReports=(serviceName,status)=>{
      
      let counter=0;
      if(status=='Total'){
        appointments.map((appointment)=>{
          if(appointment.serviceId[0].serviceName==serviceName){
             counter++
          }})
      }
      else{
      appointments.map((appointment)=>{
        if(appointment.serviceId[0].serviceName==serviceName && appointment.status==status){
           counter++
        }
      })
    }
      return counter
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

        axios.get('/api/services')
        .then((res)=>{
            console.log(res.data)
            setServices(res.data)
        })  
        .catch(err=>{
          console.log(err)
        })
    }
    
    useEffect(()=>{
     GetAppointments()
   },[])

  return (
    <>
    <Side_bar/>
    <Box w="100%" h="100vh">
      <Heading size={"lg"} color="cyan.800" 
      mx="4">Appointment Report</Heading>
          <Stack direction={{base:'column',sm:"column",md:'row',lg:"row"}} borderRadius="10px"
          m={'4'} userSelect="none" >
         
            <Stack w={{base:"100%",md:"20%",lg:"20%"}} h="20vh" bg="blue.50" borderRadius={'10'}
            alignItems="center" justifyContent={"center"}
            _hover={{
              translate:"0 -4px"
            }}>
              <Heading size="xl" color={'blue.500'}>
              {Getvalues("UpComing")}
              </Heading>
              <Text fontWeight={'bold'} color="GrayText">
                UpComing
              </Text>
            </Stack>
        
            <Stack w={{base:"100%",md:"20%",lg:"20%"}} h="20vh" bg="green.50" borderRadius={'10'}
            alignItems="center" justifyContent={"center"}
            _hover={{
              translate:"0 -4px"
            }}>
              <Heading size="xl" color={'green.500'}>
              {Getvalues("Attended")}
              </Heading>
              <Text fontWeight={'bold'} color="GrayText">
               Attended
              </Text>
            </Stack>
            <Stack w={{base:"100%",md:"20%",lg:"20%"}} h="20vh"  bg="red.50" borderRadius={'10'}
            alignItems="center" justifyContent={"center"}
            _hover={{
              translate:"0 -4px"
            }} >
              <Heading color={"red.400"} >
                {Getvalues("Cancelled By User")}
              </Heading>
              <Text fontWeight={"bold"} color="GrayText">
               Cancelled
              </Text>
            </Stack>
            <Stack w={{base:"100%",md:"20%",lg:"20%"}} h="20vh" bg="purple.50" borderRadius={'10'}
            alignItems="center" justifyContent={"center"}
            _hover={{
              translate:"0 -4px"
            }}>
              <Heading size="xl" color={'purple.500'}>
               {appointments.length}
              </Heading>
              <Text fontWeight={'bold'} color="GrayText">
               Total Appointment
              </Text>
            </Stack>
          </Stack>

      <Stack>
          <Button type='submit' bg='teal' w={'25%'} color='white' my='10'
          onClick={()=> navigate('/addHoliday')}
          
          >Add Holiday</Button>
        
        <Heading size={'lg'} color="cyan.800"
        mx='4'>Service Report</Heading>
        <TableContainer w='95%'>
           {/* <Heading size={'md'} my='4' color={"purple.700"}>Scheduled Appointments</Heading> */}
  <Table userSelect={'none'}>
    
    <Thead>
      <Tr>
        <Th >Service Name</Th>
        <Th>Attended</Th>
        <Th>Upcoming</Th>
        <Th>Cancelled</Th>
        <Th>Total
         </Th>
      </Tr>
    </Thead>
    <Tbody>
  {services.length!=0?services.map((service)=>{
   return   <Tr h='80px' border={'2px solid #faf5ff'} borderRadius='full' _hover={{
              backgroundColor:"purple.50" 
          }}>
          <Td>
              <Link fontSize={"lg"} fontWeight="bold" color={'Hightlight'}
            >{service.serviceName}</Link>
        </Td>
          <Td fontSize={"md"} fontWeight="normal" color={'GrayText'}>{ServiceReports(service.serviceName,"Attended")}</Td>
          <Td >{ServiceReports(service.serviceName,"UpComing")}</Td>
          <Td>{ServiceReports(service.serviceName,"Cancelled By User")}</Td>
          <Td>{ServiceReports(service.serviceName,"Total")}</Td>
        </Tr>}):
        <Text>NO services added</Text>}
        </Tbody>
        </Table>
        </TableContainer>
      </Stack>
    </Box>
    </>
  )
}

export default Dashboard

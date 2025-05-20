import React, { useEffect, useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { Box, Divider, Flex, FormControl, Stack,Input, Select, Table, TableContainer, Tbody
,Th,Td,Heading,Thead,Tr,Button,Image} from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Search = () => {
  const [param,setparam]=useState('BYSP')
  const [iparam,setiparam]=useState('')
  const [spData,setSpData]=useState([])
  const [serviceData,setServiceData]=useState([])
  const navigate=useNavigate()

  const getResults= ()=>{
  if(iparam!=''){
    axios.get(`api/user/search/${param}/${iparam}`)
      .then(res=>{
        console.log(res.data)
        if(param=="BYSP"){
          setSpData(res.data)
        }
        else{
          setServiceData(res.data)
        }
      })
  }
  }

  return (
    <>  
    <Box w={'100%'} >
       <Navbar/>
       <Flex h="20vh" alignItems={'flex-start'}>
            <Stack alignItems={"center"}   direction={{base:'column',sm:"column",md:"row",lg:"row"}} >
                <Input type="text" px={{base:"20px",md:"100px"}}  mx={{base:"auto"}}  placeholder={"Enter Here ......"}  onKeyUp={(e)=>{setiparam(e.target.value)}} /> 
                <Select onChange={(e)=>setparam(e.target.value)}>
                    <option value={'BYSP'}>by Service Provider</option>
                    <option value={"BYSER"}>by Service</option>
                </Select>
                <Button type='submit'  width={'sm'} colorScheme={'telegram'}  onClick={()=>getResults()}>Search</Button>
        </Stack>

       </Flex>

<TableContainer w='95%' m={'auto'} display={param=="BYSER"?"block":"none"}>
    <Heading size={'md'} my='4' color={"purple.700"}>Services</Heading>
  <Table userSelect={'none'}>
  
    <Thead>
      <Tr>
        <Th>Service Image</Th>
        <Th>Service Name</Th>
        <Th>Service Provider</Th>
        <Th>Charges</Th>
      </Tr>
    </Thead>
    <Tbody>
    {serviceData.length!=0?serviceData.map((service)=>{
      return  <Tr h='80px' border={'2px solid #faf5ff'} borderRadius='full' _hover={{
        backgroundColor:"purple.50" 
    }}>   
    <Td>
      <Image src={'data:image/jpg;base64,'+service.serviceImage.data} h="150px" w='30%'
      cursor={'pointer'} onClick={()=>navigate(`/serviceProvider/${service.serviceProvideId[0]._id}`)}/>
    </Td>
    <Td fontSize={"md"} fontWeight="normal" color={'GrayText'}>
      {service.serviceName}
    </Td>
    <Td fontWeight={'bold'}>{service.serviceProvideId[0].B_name}</Td>
    <Td>{service.serviceCharges} Rs/-</Td>
  </Tr>
    }):"No Search Results found"}
        </Tbody>
        </Table>
        </TableContainer>

  <TableContainer w='95%' m={'auto'} display={param=="BYSP"?"block":"none"}>
    <Heading size={'md'} my='4' color={"purple.700"}>Service Providers</Heading>
  <Table userSelect={'none'}>
  
    <Thead>
      <Tr>
        <Th>Service Provider Image</Th>
        <Th>Service Provider Name</Th>
        <Th>Address</Th>
        <Th>Service Category</Th>
      </Tr>
    </Thead>
    <Tbody>
    {spData.length!=0?spData.map((spData)=>{
      const {B_name,B_address,service_cat,B_pimage,_id}=spData
       return <Tr h='80px' border={'2px solid #faf5ff'} borderRadius='full' _hover={{
              backgroundColor:"purple.50" 
          }}>
          <Td >
           
            <Image src={'data:image/jpg;base64,'+B_pimage.data} w='100px' />
           
          </Td>
          <Td fontSize={"md"} fontWeight="normal" color={'GrayText'} >
        <a href={"/serviceProvider/"+_id}> {B_name}</a>
     </Td>
          <Td >{B_address}</Td>
          <Td color={'blue.500'}>{service_cat}</Td>
        </Tr>}):"No results Found For Your Search"}
        </Tbody>
        </Table>
        </TableContainer>
        <Divider/>
       <Footer/>
       </Box>
    </>
  )
}

export default Search

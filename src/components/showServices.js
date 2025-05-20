import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter,Image,Stack,Heading,Text,Divider,ButtonGroup,Button,Flex,Link } from '@chakra-ui/react'
import { useEffect } from 'react'
import axios from 'axios'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Side_bar from './side_bar';

const ShowServices = () => {
  const navigate=useNavigate();
  const [data,setdata]=useState([])
  const getData=()=>{
    axios.get('/api/services')
    .then((res)=>{
        console.log(res)
        setdata(res.data)
      })  
    .catch(err=>{
      if(err.respones.status==401){
        navigate('/spLogin')
      }
    })
  }

  
  useEffect(()=>{
     getData()
  },[])

  function handleDelete(id){
      axios.delete(`api/services/${id}`)
      .then(res=>{
        console.log(res)
        getData()
      })
      .catch(err=>{
        console.log(err)
      })
  }

  return (
    <>     
    <Side_bar/> 
    <Flex mx='5' mt='5' flexWrap='wrap' overflowY='auto' gap='10' height='100vh'
     css={{
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        width: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor:'whitesmoke',
        borderRadius: '24px',
      },
    }} flexDirection='column'>
          <Link href={`/addServices`} display='inline' ><Button colorScheme='linkedin'>Add Services</Button></Link>
   <Flex gap={10} direction={{base:'column',sm:"column",md:"row",lg:"row"}}>
    {data.length!=0?data.map((data)=>{
      const {serviceName,serviceImage,_id}=data;
      return <Card maxW='200px' maxH={'fit-content'} key={_id} >
    <Image
      src={'data:image/jpg;base64,'+serviceImage.data}
      alt='Green double couch with wooden legs'
      borderRadius='lg'
      height='50%' width='100%'
      display='inline'
      />
      <Heading size='md' my='4'>{serviceName}</Heading>
    

      <CardFooter>
      <ButtonGroup>
      <Button variant='solid' colorScheme='blue' onClick={()=>navigate(`/api/updateService/${_id}`)}>
        Update
      </Button>
      <Button variant='ghost' colorScheme='red' onClick={()=>handleDelete(_id)} >
       Delete
      </Button>
</ButtonGroup>
  </CardFooter>       
</Card>


    }):<Text color='grey' fontSize='larger' my='5'>Please add some services</Text>
}
</Flex>    
</Flex>
</>
  )
}

export default ShowServices

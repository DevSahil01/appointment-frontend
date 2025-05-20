import { Heading,Box,Text,Stack, HStack} from '@chakra-ui/react'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Side_bar from './side_bar'




const Activities = () => {
    const navigate=useNavigate()
    const getMyActivities=()=>{
        axios.get("/api/getMyActivities",{
            headers:{
                "Content-Type":"application/json",
                Accept:"application/json"
            },
            withCredentials:true
        })
        .then(res=>{
            console.log(res.data)
            setActivities(res.data)
        })
        .catch(err=>{
            if(err.response.status==401){
               navigate('/spLogin')
            }
        })
    }
    
    const [activities,setActivities]=useState([])

    useEffect(()=>{
        getMyActivities()
    },[])
    return (
        <>
            <Side_bar activities={activities.length}/>
            <Box flexDirection={'column'} overflowY={"auto"} h={'100vh'}>
            <Heading size={"lg"} color="cyan.800">Notifications </Heading>
            {activities.length!=0?activities.map((activity)=>{
               const {Notification,Date} =activity
             return <Stack h="fit-content" bg="gray.50" borderBottom={'2px solid grey'}
            borderRadius={"10"} p={'4'} m="4" >
               
                <Text 
                fontWeight={"medium"}>{Notification}
                </Text>
                <HStack justifyContent={"flex-end"}>
                    <Text fontWeight={'bold'}
                    color={'GrayText'}>
                     {moment(Date).format("YYYY-MM-DD")}
                    </Text>
                </HStack>
              
                </Stack>
                }):<Text>
                    Nothing In Activities
                    </Text>}
             </Box>
        </>
    )
}

export default Activities

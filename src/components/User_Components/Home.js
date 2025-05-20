import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './navbar'
import Footer from './footer'
import { Box, Button, Flex, Heading, Image, Stack, Badge, Text, Link, Avatar, CardBody, SimpleGrid, Card, Center, Divider } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import MedicalIcon from '../../images/healthcare.png'
import AutomobileIcon from '../../images/automobile.png'
import GroomingIcon from '../../images/grooming.png'
import ConsultationIcon from '../../images/operator.png'
import SportsIcon from '../../images/sports.png'
import EducationalIcon from '../../images/graduation-cap.png'
import BankingIcon from '../../images/bank.png'
import GovermentIcon from '../../images/city-hall.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


//Functional code starts from here
const Home = () => {
  const navigate = useNavigate();
  const [sp_Data, setSp_data] = useState([])
  const [userInfo, setlocalstorage] = useState(null)
  const [serviceData, setServiceData] = useState([])
  const categories = [
    { label: 'Medical', icon:  MedicalIcon},
    { label: 'Automobile', icon: AutomobileIcon},
    { label: 'Grooming & salon & spa', icon: GroomingIcon},
    { label: 'Consultation', icon: ConsultationIcon},
    { label: 'Sports', icon: SportsIcon},
    { label: 'Educational', icon: EducationalIcon},
    { label: 'Banking', icon: BankingIcon },
    { label: 'Government Documentation work', icon: GovermentIcon},
  ];


  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`)
  }

  const GetData = async () => {


    //get service providers on location bassis
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

         axios.get(`/api/user/get_sp?lat=${lat}&lng=${lng}`)
        .then(res => {
          console.log("Nearby service providers:", res.data.data);
          setSp_data(res.data.data)
        });
    });
  

    await axios.get('/api/user/getSer')
      .then(res => {
        console.log(res.data)
        setServiceData(res.data)
      })
  }

  useEffect(() => {
    GetData()
    setlocalstorage(JSON.parse(localStorage.getItem('userInfo')))
  }, [])

  //This acutal componenet that is going to render
  return (

    <>
      <Box w='100%'>
        <Navbar />
        {userInfo != null ?
          '' : <Flex direction={{ base: "column", sm: "column", md: "row", lg: "row" }}>
            <Image src="https://ik.imagekit.io/3zuv6faux/8351257_3886130_j88aOvr2Z.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1675974579106" w={{ base: "100%", sm: "100%", md: "40%", lg: "40%" }} h='500px' display='inline' />
            <Stack direction='column' gap='10' mt='10' mx='10'>
              <Heading as='h3' fontSize={{ base: 20, sm: 20, md: 50, lg: 50 }}
                color='gray.800'>Book Appointments<br />on one tap
              </Heading>
              <Text fontWeight='bold' color='gray.700'>Get your Appointments with less effort in just <br /> few taps</Text>
              <Button bg='yellow.300' borderRadius='20px' w='50%'
              ><Link href='/register'
                _hover={{ "outline": "none" }}>Get Started</Link></Button>
            </Stack>
          </Flex>}


        <Divider />
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg: 4 }}
          spacing={5}
          px={5}
          py={4}
        >
          {categories.map((category, index) => (
            <Card
              key={index}
              bg="gray.50"
              borderRadius="xl"
              boxShadow="md"
              _hover={{ bg: 'gray.100', boxShadow: 'lg' }}
              transition="all 0.2s"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="200px"
              cursor='pointer'
              onClick={() => handleCategoryClick(category.label)}

            >
              <CardBody display="flex" flexDirection="column" alignItems="center" justifyContent="center"
              >
                <Image
                  src={category.icon}
                  alt={category.label}
                  boxSize="60px"
                  objectFit="contain"
                  mb={4}
                />
                <Heading size="sm" textAlign="center">
                  {category.label}
                </Heading>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>



        <Divider />
        <Text fontSize={'2xl'} fontWeight="bold" my={'5'} mx='5'>Service Providers <ArrowForwardIcon /></Text>
        <Divider />
        <Flex overflowX={'auto'}
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
              height: "10px"
            },
            '&::-webkit-scrollbar-track': {
              width: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'whitesmoke',
              borderRadius: '24px',
            },
          }}>


          <Center py={6}>
            {sp_Data.length != 0 ? sp_Data.map((data) => {
              const { service_cat, service_desc, B_address, B_name, B_pimage, B_Images, _id } = data;
              return <Box
                w='2xs'
                h='lg'
                bg={'white'}
                boxShadow={'lg'}
                rounded={'md'}
                overflow={'hidden'}
                mx="5" key={_id}>
                <Box
                  bg={'gray.100'}
                >
                  <Image
                    src={
                      'data:image/jpg;base64,' + B_Images[0].data
                    }
                    layout={'fill'}
                    h={"3xs"}
                  />
                </Box>



                <Stack p={4}>
                  <Text
                    color={'green.500'}

                    fontWeight={600}
                    fontSize={'sm'}
                    h='20px'
                    w={'fit-content'}
                    letterSpacing={1.1}
                    bg={'green.50'}>
                    {service_cat}
                  </Text>
                  <Heading
                    color='gray.700'
                    fontSize={'2xl'}
                    fontFamily={'body'}
                    noOfLines='1'>
                    {B_name}
                  </Heading>
                  <Text color={'gray.500'} noOfLines={1}>
                    {service_desc}

                  </Text>
                </Stack>
                <Stack p={4} direction={'row'} spacing={4} align={'center'}>
                  <Avatar
                    src={'data:image/jpg;base64,' + B_pimage.data}
                    alt={'Author'}
                  />
                  <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>{B_name}</Text>
                    <Text color={'gray.500'}>{B_address}</Text>
                  </Stack>
                </Stack>
                <Button bg={'green.400'} color='white' my='4' w={'80%'} mx="5" _hover={
                  {
                    "color": "green",
                    "backgroundColor": "gray.100"
                  }}><Link onClick={() => navigate('/serviceProvider/' + _id)}>Show Services</Link></Button>
              </Box>
            }) : <Heading as={'h3'} >no services</Heading>}
          </Center>
        </Flex>
        <Divider />
        <Text fontSize={'2xl'} fontWeight="bold" my={'5'} mx='5'>Services<ArrowForwardIcon /></Text>
        <Divider />
        <Flex m={'3'} overflowX={'auto'}
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
              height: "10px"
            },
            '&::-webkit-scrollbar-track': {
              width: '2px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'whitesmoke',
              borderRadius: '24px',
            },
          }} wrap="wrap">
          <Center py={6}>
            {serviceData.length != 0 ? serviceData.map(service => {
              const { serviceImage, serviceName, serviceProvideId, serviceDesc, serviceTimeslots, serviceDuration, _id } = service
              return <Box
                w='2xs'
                h='lg'
                bg={'white'}
                boxShadow={'lg'}
                rounded={'md'}
                overflow={'hidden'}
                mx="5">
                <Box
                  bg={'gray.100'}
                >
                  <Image
                    src={
                      'data:image/jpg;base64,' + serviceImage.data
                    }
                    layout={'fill'}
                    h={"3xs"}
                  />
                </Box>
                <Stack p={4}>
                  <Text
                    color={'green.500'}

                    fontWeight={600}
                    fontSize={'sm'}
                    h='20px'
                    w={'fit-content'}
                    letterSpacing={1.1}
                    bg={'green.50'}>

                  </Text>
                  <Heading
                    color='gray.700'
                    fontSize={'2xl'}
                    fontFamily={'body'}
                    noOfLines='1'>
                    {serviceName}
                  </Heading>
                  <Badge colorScheme='green' w={'fit-content'}>{serviceDuration} Minutes</Badge>
                </Stack>
                <Stack p={4} direction={'row'} spacing={4} align={'center'}>
                  <Avatar
                    src={'data:image/jpg;base64,' + serviceProvideId[0].B_pimage.data}
                    alt={'Author'}
                    cursor='pointer'
                    onClick={() => navigate(`/serviceProvider/${serviceProvideId[0]._id}`)}
                  />
                  <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                    <Text fontWeight={600}>{serviceProvideId[0].B_name}</Text>
                    <Text color={'gray.500'}>{serviceProvideId[0].B_address}</Text>
                  </Stack>
                </Stack>
                <Button bg={'cyan.500'} color='white' my='4' w={'80%'} mx="5" _hover={
                  {
                    "color": "#00b5d8",
                    "backgroundColor": "gray.100"
                  }}><Link onClick={() => navigate(`/appointment/${_id}`)}>Book Appointment</Link></Button>
              </Box>
            }) : "nothing"}
          </Center>

        </Flex>
        <Footer />
      </Box>
    </>

  )
}

export default Home

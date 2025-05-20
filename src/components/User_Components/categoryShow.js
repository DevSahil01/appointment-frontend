import { useParams , useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './navbar'
import Footer from './footer'
import axios from 'axios';
import {
  Box,
  Spinner,
  Heading,
  Text,
  Center,
  Stack,
  Avatar,
  Flex,
  Button,
  Link,
  Image,
  VStack,
  HStack,
  Divider,
} from '@chakra-ui/react';

const CategoryDetails = () => {
  const { category } = useParams();
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate();

  useEffect(() => {
    axios
      .get(`/api/user/category/${encodeURIComponent(category)}`)
      .then((res) => {
        setProviders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch category data', err);
        setLoading(false);
      });
  }, [category]);

  if (loading) return <Spinner size="xl" m={10} />;

  return (
    <Box p={5} w={'100%'}>
      
      <Navbar/>

      <Heading mb={6}>{category} Service Providers</Heading>

      {providers.length === 0 ? (
        <Text>No providers found in this category.</Text>
      ) :   <Flex overflowX={'auto'}
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
            {providers.length != 0 ? providers.map((data) => {
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
        </Flex>}
      <Footer/>
    </Box>
  );
};

export default CategoryDetails;

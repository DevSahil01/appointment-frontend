"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  Flex,
  Image,
  Card,
  CardBody,
  CardHeader,
  Divider,
  SimpleGrid,
  HStack,
  VStack,
  Icon,
  Badge,
  useColorModeValue,
  Grid,
  GridItem,
  Button,
  Center,
  Skeleton,
} from "@chakra-ui/react"
import { MdLocationOn, MdEmail, MdPhoneEnabled, MdVerified } from "react-icons/md"
import Navbar from "./navbar"
import Footer from "./footer"
import Services from "./services"

const ServiceProvider = () => {
  const navigate = useNavigate()
  const [spData, setSpData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  // Color mode values
  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue("gray.200", "gray.700")
  const headingColor = useColorModeValue("gray.800", "white")
  const textColor = useColorModeValue("gray.600", "gray.300")
  const accentColor = useColorModeValue("blue.600", "blue.300")

  const getServices = async () => {
    setIsLoading(true)
    try {
      const res = await axios.get(`/api/user/get_sp/${id}`)
      setSpData(res.data.data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getServices()
  }, [id])

  // Main layout wrapper with fixed width and centered content
  const MainLayout = ({ children }) => (
    <Box width="100%" maxWidth="100vw" mx="auto" overflow="hidden">
      <Navbar />
      {children}
      <Footer />
    </Box>
  )

  if (isLoading) {
    return (
      <MainLayout>
        <Container maxW="container.xl" py={10} px={{ base: 4, md: 6 }} centerContent>
          <Box width="100%">
            <Stack spacing={8}>
              <HStack spacing={6} align="flex-start">
                <Skeleton height="100px" width="100px" borderRadius="md" />
                <VStack align="start" spacing={3} flex={1}>
                  <Skeleton height="30px" width="200px" />
                  <Skeleton height="20px" width="300px" />
                  <Skeleton height="20px" width="250px" />
                  <Skeleton height="20px" width="200px" />
                </VStack>
              </HStack>

              <Divider />

              <Box>
                <Skeleton height="30px" width="150px" mb={4} />
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} height="200px" borderRadius="lg" />
                  ))}
                </SimpleGrid>
              </Box>

              <Divider />

              <Box>
                <Skeleton height="30px" width="200px" mb={4} />
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} height="150px" borderRadius="md" />
                  ))}
                </SimpleGrid>
              </Box>

              <Divider />

              <Box>
                <Skeleton height="30px" width="250px" mb={4} />
                <Skeleton height="100px" />
              </Box>
            </Stack>
          </Box>
        </Container>
      </MainLayout>
    )
  }

  if (!spData) {
    return (
      <MainLayout>
        <Center minH="50vh" flexDirection="column">
          <Heading size="md" mb={4} color="gray.500">
            Service provider information not available
          </Heading>
          <Button colorScheme="blue" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Center>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Box width="100%">
        <Container maxW="container.xl" py={8} px={{ base: 4, md: 6 }}>
          {/* Business Information Section */}
          <Card
            mb={10}
            boxShadow="md"
            borderRadius="lg"
            overflow="hidden"
            bg={cardBg}
            borderWidth="1px"
            borderColor={borderColor}
            width="100%"
          >
            <CardHeader bg="gray.50" py={4}>
              <Heading size="lg" color={headingColor}>
                Business Profile
              </Heading>
            </CardHeader>

            <CardBody>
              <Flex
                direction={{ base: "column", md: "row" }}
                align={{ base: "center", md: "flex-start" }}
                gap={6}
                width="100%"
              >
                <Box
                  borderWidth="1px"
                  borderRadius="md"
                  p={2}
                  borderColor={borderColor}
                  alignSelf={{ base: "center", md: "flex-start" }}
                >
                  <Image
                    src={
                      spData ? "data:image/jpg;base64," + spData.B_pimage.data : "/placeholder.svg?height=100&width=100"
                    }
                    alt={spData.B_name}
                    maxW="120px"
                    maxH="120px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Box>

                <VStack align="flex-start" spacing={3} flex={1} width="100%">
                  <HStack>
                    <Heading size="lg" color={headingColor}>
                      {spData.B_name}
                    </Heading>
                    <Icon as={MdVerified} color="blue.500" />
                  </HStack>

                  <Badge colorScheme="blue" fontSize="sm" px={2} py={1} borderRadius="full">
                    {spData.service_cat}
                  </Badge>

                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3} width="100%">
                    <GridItem>
                      <HStack spacing={2}>
                        <Icon as={MdLocationOn} color={accentColor} boxSize={5} />
                        <Text fontWeight="medium" color={textColor}>
                          {spData.B_address}
                        </Text>
                      </HStack>
                    </GridItem>

                    <GridItem>
                      <HStack spacing={2}>
                        <Icon as={MdEmail} color={accentColor} boxSize={5} />
                        <Text fontWeight="medium" color={textColor}>
                          {spData.B_contact_email}
                        </Text>
                      </HStack>
                    </GridItem>

                    <GridItem>
                      <HStack spacing={2}>
                        <Icon as={MdPhoneEnabled} color={accentColor} boxSize={5} />
                        <Text fontWeight="medium" color={textColor}>
                          {spData.B_contact_no}
                        </Text>
                      </HStack>
                    </GridItem>
                  </Grid>
                </VStack>
              </Flex>
            </CardBody>
          </Card>

          {/* Services Section */}
          <Box mb={10} width="100%">
            <Heading
              size="lg"
              mb={6}
              pb={2}
              borderBottomWidth="2px"
              borderBottomColor={accentColor}
              color={headingColor}
            >
              Our Services
            </Heading>
            <Box width="100%">
              <Services />
            </Box>
          </Box>

          {/* Branch Images Section */}
          <Box mb={10} width="100%">
            <Heading
              size="lg"
              mb={6}
              pb={2}
              borderBottomWidth="2px"
              borderBottomColor={accentColor}
              color={headingColor}
            >
              Branch Gallery
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4} width="100%">
              {spData.B_Images.map((image, index) => (
                <Box
                  key={index}
                  borderRadius="lg"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor={borderColor}
                  transition="all 0.3s"
                  _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
                >
                  <Image
                    src={"data:image/jpg;base64," + image.data}
                    alt={`Branch image ${index + 1}`}
                    width="100%"
                    height="200px"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Service Description Section */}
          <Box mb={10} width="100%">
            <Heading
              size="lg"
              mb={6}
              pb={2}
              borderBottomWidth="2px"
              borderBottomColor={accentColor}
              color={headingColor}
            >
              About Our Services
            </Heading>

            <Card
              p={6}
              boxShadow="sm"
              borderRadius="lg"
              bg={cardBg}
              borderWidth="1px"
              borderColor={borderColor}
              width="100%"
            >
              <Text fontSize="lg" fontWeight="medium" color={textColor} lineHeight="tall">
                {spData.service_desc}
              </Text>
            </Card>
          </Box>
        </Container>
      </Box>
    </MainLayout>
  )
}

export default ServiceProvider

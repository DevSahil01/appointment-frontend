"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import {
  Box,
  Heading,
  Text,
  Image,
  Card,
  CardBody,
  CardFooter,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  useToast,
  Textarea,

  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Progress,
  useDisclosure,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Avatar,
  Divider,
  useColorModeValue,
  Icon,
  Tag,
  Skeleton,
} from "@chakra-ui/react"
import { StarIcon, TimeIcon, InfoIcon } from "@chakra-ui/icons"

const Services = () => {
  const navigate = useNavigate()
  const [services, setServices] = useState([])
  const [isAvailable, setIsAvailable] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedService, setSelectedService] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id } = useParams()

  const cardBg = useColorModeValue("white", "gray.800")
  const textColor = useColorModeValue("gray.700", "gray.200")
  const accentColor = useColorModeValue("blue.500", "blue.300")
  const borderColor = useColorModeValue("gray.200", "gray.700")


   const [reviews, setReviews] = useState({
    rating: 0,
    total: 0,
    breakdown: {},
    userReviews: []
  });
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const GetServices = () => {
    setIsLoading(true)
    axios
      .get(`/api/user/get_services/${id}`)
      .then((res) => {
        setServices(res.data.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        if (err.response?.status === 404) {
          setIsAvailable("No services found for this service provider")
        } else {
          setIsAvailable("Error loading services. Please try again later.")
        }
      })
  }

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/user/review/${id}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error loading reviews.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
  };

    const submitReview = async () => {
    if (!rating || !text.trim()) {
      toast({
        title: "Please provide rating and review text.",
        status: "warning",
        duration: 3000,
        isClosable: true
      });
      return;
    }

    setLoading(true);
    try {
      
      await axios.post(`/api/user/review/${id}`, {
        rating,
        text
      });
      toast({
        title: "Review submitted!",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      setRating(0);
      setText("");
      fetchReviews(); // reload reviews
    } catch (err) {
      toast({
        title: err.response?.data?.message || "Failed to submit review.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    GetServices()
  }, [id])

  useEffect(() => {
    if (isOpen) {
      fetchReviews();
    }
  }, [isOpen]);

  

  const openModal = (service) => {
    setSelectedService(service)
    onOpen()
  }

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={10}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} boxShadow="md" borderRadius="lg" overflow="hidden">
              <Skeleton height="200px" />
              <CardBody>
                <Skeleton height="20px" mb={2} />
                <Skeleton height="15px" mb={2} />
                <Skeleton height="15px" mb={2} />
                <Skeleton height="15px" />
              </CardBody>
              <CardFooter>
                <Skeleton height="40px" width="100%" />
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    )
  }

  if (isAvailable) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh" flexDirection="column" p={8}>
        <Icon as={InfoIcon} boxSize={12} color="gray.400" mb={4} />
        <Text fontSize="xl" fontWeight="semibold" color="gray.600" textAlign="center">
          {isAvailable}
        </Text>
        <Button mt={6} colorScheme="blue" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    )
  }

  return (
    <>
      <Container maxW="container.xl" py={10}>
        <Heading as="h1" size="xl" mb={8} textAlign="center">
          Available Services
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={8}>
          {services.map((service) => {
            const { serviceName, serviceDesc, serviceDuration, serviceImage, _id, serviceCharges } = service
            return (
              <Card
                key={_id}
                boxShadow="lg"
                borderRadius="lg"
                overflow="hidden"
                transition="all 0.3s"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "xl",
                }}
                bg={cardBg}
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Box position="relative">
                  <Image
                    src={`data:image/jpg;base64,${serviceImage.data}`}
                    alt={serviceName}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                  />
                  <Tag position="absolute" top={3} right={3} colorScheme="green" fontWeight="bold">
                    ₹{serviceCharges}
                  </Tag>
                </Box>

                <CardBody>
                  <VStack align="start" spacing={2}>
                    <Heading size="md">{serviceName}</Heading>

                    <HStack>
                      <TimeIcon color={accentColor} />
                      <Text color={accentColor} fontWeight="medium">
                        {serviceDuration} minutes
                      </Text>
                    </HStack>

                    <Text fontSize="sm" color={textColor} noOfLines={2}>
                      {serviceDesc}
                    </Text>

                    <HStack
                      spacing={1}
                      mt={2}
                      onClick={() => openModal(service)}
                      cursor="pointer"
                      _hover={{ color: accentColor }}
                    >
                      <StarIcon color="yellow.400" />
                      <Text fontWeight="medium">{reviews.rating}</Text>
                      <Text color="gray.500" fontSize="sm">
                        ({(reviews.total / 1000).toFixed(1)}k reviews)
                      </Text>
                    </HStack>
                  </VStack>
                </CardBody>

                <CardFooter pt={0}>
                  <Button
                    colorScheme="blue"
                    onClick={() => navigate(`/appointment/${_id}`)}
                    w="full"
                    size="lg"
                    borderRadius="md"
                    fontWeight="bold"
                  >
                    Book Appointment
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </SimpleGrid>
      </Container>

      {/* Review Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent borderRadius="xl" p={3}>
        <ModalHeader>
          <HStack>
            <StarIcon color="yellow.400" />
            <Text>{reviews.rating}</Text>
            <Text color="gray.500">— {reviews.total.toLocaleString()} reviews</Text>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          {/* ➕ Review Form */}
          <Box p={4} borderRadius="md" mb={6} bg="gray.100">
            <Text fontWeight="bold" mb={2}>Write a Review</Text>
            <HStack mb={3}>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  cursor="pointer"
                  color={i < rating ? "yellow.400" : "gray.300"}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </HStack>
            <Textarea
              placeholder="Write your experience..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              mb={3}
            />
            <Button
              colorScheme="yellow"
              isLoading={loading}
              onClick={submitReview}
            >
              Submit Review
            </Button>
          </Box>

          {/* 📊 Breakdown */}
          <Box bg="gray.50" p={4} borderRadius="md" mb={6}>
            {Object.entries(reviews.breakdown)
              .reverse()
              .map(([star, count]) => (
                <HStack key={star} mb={2} spacing={3}>
                  <Text fontSize="sm" width="30px">{star} ★</Text>
                  <Progress
                    value={(count / reviews.total) * 100}
                    size="sm"
                    colorScheme="yellow"
                    borderRadius="full"
                    flex={1}
                  />
                  <Text fontSize="xs" color="gray.600" width="60px" textAlign="right">
                    {count.toLocaleString()}
                  </Text>
                </HStack>
              ))}
          </Box>

          {/* 👥 Recent Reviews */}
          <Heading size="md" mb={4}>Recent Reviews</Heading>
          <VStack spacing={4} align="stretch" divider={<Divider />}>
            {reviews.userReviews.map((rev, index) => (
              <Box key={index}>
                <HStack mb={2}>
                  <Avatar size="sm" src={rev.avatar} name={rev.name} />
                  <VStack align="start" spacing={0}>
                    <Text fontWeight="bold">{rev.name}</Text>
                    <Text fontSize="xs" color="gray.500">{rev.date}</Text>
                  </VStack>
                </HStack>

                <HStack mb={1}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < rev.rating ? "yellow.400" : "gray.300"}
                      boxSize={4}
                    />
                  ))}
                </HStack>

                <Text mt={2}>{rev.text}</Text>
              </Box>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  )
}

export default Services

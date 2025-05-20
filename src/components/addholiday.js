import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Text,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import Side_bar from './side_bar';

const MarkHoliday = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const toast = useToast();

    const handleSubmitHoliday = async () => {
        setMessage('');
        setError('');



        if (!selectedDate) {
            setError('Please select a date.');
            return;
        }

        try {

            const response = await axios.post('/api/addHoliday', {
                date: selectedDate,
                reason: reason.trim()
            },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json"
                    },
                    withCredentials: true
                });

            setMessage(response.data.message || 'Holiday marked successfully.');
            setSelectedDate('');
            setReason('');
            toast({
                title: "Holiday added.",
                description: response.data.message || "Marked successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <>
            <Side_bar />
            <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="lg" bg="white">
                <Text fontSize="2xl" fontWeight="bold" mb={6}>Mark Full-Day Holiday</Text>

                <FormControl mb={4} isRequired>
                    <FormLabel>Select Date</FormLabel>
                    <Input
                        type="date"
                        value={selectedDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                            setSelectedDate(e.target.value)
                            console.log(e.target.value)
                        }}
                    />
                </FormControl>

                <FormControl mb={4}>
                    <FormLabel>Reason (optional)</FormLabel>
                    <Input
                        type="text"
                        placeholder="e.g., Festival, Personal leave"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                </FormControl>

                <Button colorScheme="green" onClick={handleSubmitHoliday}>
                    Mark as Holiday
                </Button>

                {message && <Text mt={4} color="green.500">{message}</Text>}
                {error && <Text mt={4} color="red.500">{error}</Text>}
            </Box>
        </>
    );
};

export default MarkHoliday;

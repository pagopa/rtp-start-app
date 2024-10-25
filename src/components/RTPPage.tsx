import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RTPLoader from "../components/RTPLoader";
import PageContainer from "../components/PageContainer";
import { RTPForm } from "../components/RTPForm";
import { RTPFormFields } from "./rtpModel";

const API_URL = process.env.API_URL;

export default function RTPPage() {
    const { rptid } = useParams();


    // Set up state for the response message from the server
    const [responseMessage, setResponseMessage] = useState<string>("");

    const onSubmit = async (e: RTPFormFields): Promise<void> => {

        const amountInCents = Math.floor(e.amount * 100); // Convert to cents

        const requestBody = {
            noticeNumber: e.noticeNumber,
            amount: amountInCents,
            description: e.description,
            expiryDate: e.expiryDate,
            payee: {id: e.payee, name: e.payeeCompanyName},
            payerId: e.payerId,
        };

        try {
            // Send form data to a specified endpoint
            const response = await fetch(`${API_URL}/rtps`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            // Handle response from the server
            if (response.ok) {
                setResponseMessage("Request to pay created successfully!");
            } else {
                setResponseMessage("Error creating the request to pay.");
            }
        } catch (error: any) {
            setResponseMessage("An error occurred: " + error.message);
        }
    };

    return (
        <>
            {rptid && <RTPLoader />}
            <PageContainer
                title="rtp.pageTitle"
                description="rtp.pageDescription"
            >
                <Button
                    variant="text"
                    sx={{ p: 0 }}
                    aria-hidden="true"
                    tabIndex={-1}
                >
                </Button>
                <Box sx={{ mt: 6 }}>
                    <RTPForm
                        onSubmit={onSubmit}
                    />
                </Box>
                {/* Display the response message */}
                {responseMessage && <p id="response">{responseMessage}</p>}
            </PageContainer>
        </>
    );
}
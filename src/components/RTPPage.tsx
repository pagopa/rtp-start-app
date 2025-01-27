import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import RTPLoader from "../components/RTPLoader";
import PageContainer from "../components/PageContainer";
import { RTPForm } from "../components/RTPForm";
import { RTPFormFields } from "./rtpModel";

const API_URL = import.meta.env.API_URL;

const DATE_FORMAT = "YYYY-MM-DD";

export default function RTPPage() {
    const { rptid } = useParams();

    // Set up state for the response message from the server
    const [responseMessage, setResponseMessage] = useState<string>("");
    const [isDialogVisible, setDialogVisible] = useState(false);

    const resetValues = (e: RTPFormFields): void => {
        e.noticeNumber=  "";
        e.amount= 0;
        e.description= "";
        e.expiryDate= undefined;
        e.payeeCompanyName= "";
        e.payee= "";
        e.payerId= "";
    }

    const onSubmit = async (e: RTPFormFields): Promise<void> => {


        const amountInCents = Math.floor(e.amount * 100); // Convert to cents

        const requestBody = {
            noticeNumber: e.noticeNumber,
            amount: amountInCents,
            description: e.description,
            expiryDate: e.expiryDate?.format(DATE_FORMAT),
            payee: {payeeId: e.payee, name: e.payeeCompanyName},
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
        } finally {
            resetValues(e);
            setDialogVisible(true);
        }
    };

    return (
        <>
            {rptid && <RTPLoader />}
            <PageContainer
                title="rtp.pageTitle"
                description="rtp.pageDescription"
            >
                <Box sx={{ mt: 6 }}>
                    <RTPForm
                        onSubmit={onSubmit}
                    />
                </Box>
                {/* Display the response message */}
                {responseMessage &&
                    <Dialog open={isDialogVisible}>
                        <DialogContent>
                            <DialogContentText>{responseMessage}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogVisible(false)}>OK</Button>
                        </DialogActions>
                    </Dialog>
                }
            </PageContainer>
        </>
    );
}

import React, { useState, ChangeEvent, FormEvent } from "react";

const API_URL = process.env.API_URL;

// Define an interface to represent the form data structure
interface FormData {
  noticeNumber: string;
  amount: number;
  description: string;
  expiryDate: string;
  payee: {id: string, name: string};
  payerId: string;
}

const FormPage: React.FC = () => {
  // Set up state for form data
  const [formData, setFormData] = useState<FormData>({
    noticeNumber: "",
    amount: 0,
    description: "",
    expiryDate: "",
    payee: {id: "", name: ""},
    payerId: "",
  });

  // Set up state for the response message from the server
  const [responseMessage, setResponseMessage] = useState<string>("");

  // Handle changes in the form fields (input and textarea)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;

    if (name.includes('payee')) {
      const [party, field] = name.split('.');
      if (field) {
        setFormData({
          ...formData,
          [party]: {
            ...formData[party as 'payee'],
            [field]: value
          },
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const amountInCents = Math.floor(formData.amount * 100); // Convert to cents

    const requestBody = {
      ...formData,
      amount: amountInCents,  // Send amount in cents
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
    <div>
      <h2>Create a Request To Pay (RTP)</h2>
      {/* Form submission is handled by handleSubmit */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="noticeNumber">Notice Number:</label>
          <input
            type="text"
            id="noticeNumber"
            name="noticeNumber"
            pattern="\d{18}"
            value={formData.noticeNumber}
            onChange={handleChange}
            // required
            placeholder="18-digit Notice Number"
          />
        </div>

        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.01"
            min="0"
            max="99999999"
            value={formData.amount}
            onChange={handleChange}
            // required
            placeholder="Amount in euro"
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            maxLength={140}
            value={formData.description}
            onChange={handleChange}
            // required
            placeholder="Enter a brief description (max 140 chars)"
          />
        </div>

        <div>
          <label htmlFor="expiryDate">Expiry Date:</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            // required
          />
        </div>

        <div>
          <label htmlFor="payee.name">Payee Company Name:</label>
          <input
            type="text"
            id="payee.name"
            name="payee.name"
            value={formData.payee.name}
            onChange={handleChange}
            // required
            placeholder="Company Name / Ragione Sociale Ente"
          />
        </div>

        <div>
          <label htmlFor="payee.id">Payee ID (Fiscal Code):</label>
          <input
            type="text"
            id="payee.id"
            name="payee.id"
            pattern="\d{11}|\d{16}"
            value={formData.payee.id}
            onChange={handleChange}
            // required
            placeholder="11-digit Fiscal Code"
          />
        </div>

        <div>
          <label htmlFor="payerId">Payer ID (Fiscal Code):</label>
          <input
            type="text"
            id="payerId"
            name="payerId"
            value={formData.payerId}
            onChange={handleChange}
            // required
            placeholder="Fiscal Code"
          />
        </div>

        <button type="submit" id="submit">Submit Request</button>
      </form>

      {/* Display the response message */}
      {responseMessage && <p id="response">{responseMessage}</p>}
    </div>
  );
};

export default FormPage;

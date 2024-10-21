import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormPage from './FormPage';

const API_URL = process.env.API_URL;

// Mock fetch to test form submission without calling an actual API
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Request to pay created successfully!' }),
  })
);

describe('FormPage', () => {
  test('renders all input fields correctly', () => {
    render(<FormPage />);

    // Check if all input fields are rendered
    expect(screen.getByLabelText(/Notice Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiry Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Payee ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Payer ID/i)).toBeInTheDocument();
  });

  test('allows user to input data and submit the form', async () => {
    render(<FormPage />);

    // Simulate user input
    await act(async () => {
        fireEvent.change(screen.getByLabelText(/Notice Number/i), { target: { value: '123456789012345678' } });
        fireEvent.change(screen.getByLabelText(/Company Name/i), { target: { value: 'Ente Test' } });
        fireEvent.change(screen.getByLabelText(/Amount/i), { target: { value: 10.50 } });
        fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test description' } });
        fireEvent.change(screen.getByLabelText(/Expiry Date/i), { target: { value: '2024-12-31' } });
        fireEvent.change(screen.getByLabelText(/Payee ID/i), { target: { value: '12345678901' } });
        fireEvent.change(screen.getByLabelText(/Payer ID/i), { target: { value: '98765432101' } });

        // Submit the form
        fireEvent.click(screen.getByText(/Submit Request/i));
    });
    
    // Check if the fetch call was made with correct data
    expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/rtps`, expect.objectContaining({
        body: JSON.stringify({
            noticeNumber: '123456789012345678',
            companyName: 'Ente Test',
            amount: 1050,   // Converted to cents
            description: 'Test description',
            expiryDate: '2024-12-31',
            payeeId: '12345678901',
            payerId: '98765432101'
        }),
    }));

    // Check if success message is displayed
    expect(await screen.findByText(/Request to pay created successfully!/i)).toBeInTheDocument();
  });
});

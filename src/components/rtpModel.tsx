
export interface RTPFormFields {
    noticeNumber: string;
    amount: number;
    description: string;
    expiryDate: string
    payeeCompanyName: string;
    payee: string;
    payerId: string;
}

export interface RTPFormErrors {
    noticeNumber?: string;
    amount?: number;
    description?: string;
    expiryDate?: string
    payeeCompanyName?: string;
    payee?: string;
    payerId?: string;
}

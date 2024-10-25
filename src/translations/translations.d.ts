interface Languages {
  [key: string]: {
    label: string;
    lang: string;
    translation: Translation;
  };
}

/**
 * Defines the structure of translations and integrates it with the react-i18n module.
 * When useTranslate is called, it verifies if the provided string exists.
 * If the string does not exist, a compile error is returned.
 */
interface Translation {
  rtp: {
    noticeNumber: string;
    amount: string;
    description: string;
    payeeCompanyName: string;
    payee: string;
    payerId: string;
    expiryDate: string;
    pageDescription: string;
    pageTitle: string;
  },
  paymentNoticePage: {
    description: string;
    formButtons: {
      cancel: string;
      submit: string;
    };
    formErrors: {
      minCf: string;
      minCode: string;
      required: string;
      number: string;
    };
    formFields: {
      billCode: string;
      cf: string;
    };
    helpLink: string;
    title: string;
  };
}

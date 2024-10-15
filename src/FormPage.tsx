import React, { useState, ChangeEvent, FormEvent } from "react";

// Definisci un'interfaccia per i dati del form
interface FormData {
  name: string;
  email: string;
  message: string;
}

const FormPage: React.FC = () => {
  // Definisci gli state con il tipo `FormData`
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState<string>("");

  // Funzione per gestire i cambiamenti nei campi del form
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Funzione per gestire il submit del form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await fetch("https://tuo-endpoint.com/api/invia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage("Dati inviati con successo!");
      } else {
        setResponseMessage("Errore nell'invio dei dati.");
      }
    } catch (error: any) {
      setResponseMessage("Si è verificato un errore: " + error.message);
    }
  };

  return (
    <div>
      <h2>Invia i tuoi dati</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="message">Messaggio:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Invia</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default FormPage;

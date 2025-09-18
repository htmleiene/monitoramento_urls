import express from "express";
import bodyParser from "body-parser";
import twilio from "twilio";
import cors from "cors";
import dotenv from "dotenv";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // permite requisições do front-end

// Configuração do Twilio usando variáveis de ambiente
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER; // ex: "+15555555555"
const toNumber = process.env.TWILIO_TO_NUMBER;     // ex: "+5511999999999"

const client = twilio(accountSid, authToken);

// Rota para enviar SMS
app.post("/send-sms", async (req, res) => {
    const { message } = req.body;

    try {
        await client.messages.create({
            body: message,
            from: fromNumber,
            to: toNumber,
        });
        res.json({ success: true, message: "SMS enviado!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

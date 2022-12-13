import express, { Express} from 'express';
import cors from 'cors';
import { serialRouter } from './http/serial'
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.options('*', cors());
app.use(express.json())
app.use('/serial', serialRouter);

app.listen(port, async () => {
    console.log(`⚡️ https://localhost:${port}`);
})


import { SerialPort } from 'serialport'
import express, { Express, Request, Response} from 'express';
export let serialRouter = express.Router();

async function index(req: Request, res: Response) {
    res.send('Onlie Serial');
}


async function serialList(req: Request, res: Response) {
    SerialPort.list().then((ports) => {
        let list = ports.map((item) => {
            return item.path
        });
        res.json(list);
    });
}


serialRouter.get("/index", index);

serialRouter.get("/list", serialList);

// serialRouter.get("/list", serialList);




import WebSocket, { WebSocketServer } from 'ws';
import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
});

const port = new SerialPort({
    path: 'COM6',
    baudRate: 115200,
})
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', data => {
    console.info(data);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
})

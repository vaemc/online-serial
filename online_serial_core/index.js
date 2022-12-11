
import { SerialPort } from 'serialport'
import { ReadlineParser } from '@serialport/parser-readline'
const port = new SerialPort({
    path: 'COM6',
    baudRate: 115200,
})
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', console.log)

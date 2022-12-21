import { SerialPort } from "serialport";
import express, { Express, Request, Response } from "express";
export let serialRouter = express.Router();
let serialStatesList: any = [];

async function index(req: Request, res: Response) {
  res.send("Onlie Serial");
}

async function serialList(req: Request, res: Response) {
  SerialPort.list().then((ports) => {
    let list = ports.map((item) => {
      return item.path;
    });
    res.json(list);
  });
}

serialRouter.get("/", index);

serialRouter.get("/portNumList", serialList);

serialRouter.get("/serialStatesList", (req: Request, res: Response) => {
  res.json(serialStatesList);
});

serialRouter.post("/:portNum/:isOpen", (req: Request, res: Response) => {
  const { portNum, isOpen } = req.params;
  const { buad, dataBits, parity, stopBits } = req.body;

  //   {
  //     "buad": 115200,
  //     "stopBits": 1,
  //     "dataBits": 8,
  //     "parity": "NONE"
  // }
  console.info(req.body);

  if (isOpen === "0") {
    let result = serialStatesList.find(
      (x: { portNum: string }) => x.portNum === portNum
    );
    if (result != null) {
      result.port.close();
      serialStatesList = serialStatesList.filter(
        (x: { portNum: string }) => x.portNum !== portNum
      );
    }
  }

  if (isOpen === "1") {
    const port = new SerialPort({
      path: portNum,
      baudRate: buad,
    });
    serialStatesList.push({
      portNum: portNum,
      port: port,
    });
  }

  res.send("OK");
});

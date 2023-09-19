import http, { IncomingMessage, ServerResponse } from "http"

const port : number = 4010;

interface iData {
    id: number
    name: string
    gender: string
    phoneNum: number
    code: string
    stack: string
}

interface iMessage {
    message: string
    success: boolean
    data: null|{}[]
}

const DummyData: {}[] = [
    {
    id: 1,
    name: "Lydia",
    gender: "Female",
    phoneNum: 7069652222,
    code: "sheCodes",
    stack: "Junior-stack"
    },
    {
        id: 2,
        name: "Danny",
        gender: "Male",
        phoneNum: 8086247067,
        code: "broCodes",
        stack: "Front-end" 
    },
    {
        id: 3,
        name: "Esther",
        gender: "Female",
        phoneNum: +2349132490771,
        code: "sheCodes",
        stack: "Full-stack"
    },
    {
        id: 4,
        name: "Casmir",
        gender: "Male",
        phoneNum: 7022153047,
        code: "broCodes",
        stack: "Back-end"
    },
    {
        id: 5,
        name: "Blessing",
        gender: "sheCodes",
        phoneNum: 8130222487,
        code: "sheCodes",
        stack: "Front-end and Back-end"
    }
]

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "Application/JSON")

    const {url, method} = req

    let status: number = 404

    let response: iMessage = {
        message: "failed",
        success: false,
        data: null
    }
    const container: any = [];

    req.on("data", (chunk: any) => {
        container.push(chunk)
    }).on("end", () => {
        //GET METHOD
        if(url === "/" && method === "GET"){
            status = 200;
            response.message = "All DummyData has been gotten"
            response.success = true;
            response.data = DummyData;
            
            res.write(JSON.stringify({status, response}))

            res.end();
        }

        //POST METHOD
        if(url === "/" && method === "POST"){
            status = 201;
            
            const body = JSON.parse(container);
            DummyData.push(body);
            response.message = "SUCCESSFULLY ADDED";
            response.success = true;
            response.data = DummyData;
            
            res.write(JSON.stringify ({status, response}))

            res.end()
        }

    })
})

server.listen (port, () => {
    console.log("Server is up and running");
    
})
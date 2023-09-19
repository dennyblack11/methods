import http, { IncomingMessage, ServerResponse } from "http"
import { log } from "util";

const port: number = 1050;

interface iData {
    id: number
    name: string
    age: number
    Career: string
    Language: string
}

interface iMessage {
    message: string
    success: boolean
    compliment?: string
    data: null| {}[]
}

const DATAs: {}[] = [
    {
        id: 1,
        name: "Divine",
        age: 20,
        Career: "Full-stack",
        Language: "NodeJs"
    },
    {
        id: 2,
        name: "Ebube",
        age: 18,
        Career: "Front-end",
        Language: "React"
    },
    {
        id: 3,
        name: "Promise",
        age: 30,
        Career: "Software-Developer",
        Language: "Html and Css"
    },
    {
        id: 4,
        name: "Susam",
        age: 25,
        Career: "Back-end",
        Language: "PHP"
    },
    {
        id: 5,
        name: "Denny",
        age: 17,
        Career: "Software-Developer",
        Language: "C++"
    }
]

const server = http.createServer ((req:IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "Application/JSON")

    const {url, method} = req

    let status: number = 404

    let reply: iMessage = {
        message: "failed",
        success: false,
        data: null
    }

    const Parent: any = [];

    req.on("data", (chunk: any) => {
        Parent.push(chunk)
    }).on("end", () => {

        //GET METHOD
        if(url === "/" && method === "GET"){
            status = 200;
            reply.message = "ALL DATAs GOTTEN",
            reply.success = true,
            reply.compliment = "Thanks"
            reply.data = DATAs

            res.write(JSON.stringify ({status, reply}))

            res.end()
        }

        //POST METHOD
        if(url === "/" && method === "POST"){
            status = 201;
            const body = JSON.parse(Parent);
            DATAs.push(body);
            reply.message = "SUCCESSFULLY ADDED",
            reply.success = true,
            reply.compliment = "Thanks",
            reply.data = DATAs

            res.write(JSON.stringify ({status, reply}))

            res.end()
        }
    })

})

server.listen (port, () => {
    console.log("Server is up and running");
    
})

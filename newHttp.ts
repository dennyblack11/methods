import http, { IncomingMessage, ServerResponse } from "http"

const port: number = 2500

interface iData{
    id: number;
    gender: string;
    sheCodes: boolean;
    broCodes: boolean;
}

interface iMessage{
    message: string
    success: boolean
    data: null|{}[]
}

const Info: {}[] = [
    {
        id: 1,
        name: "David",
        gender: "Male",
        sheCodes: false,
        broCodes: true,
    },
    {
        id: 2,
        name: "Joan",
        gender: "Female",
        sheCodes: true,
        broCodes: false,
    },
    {
        id: 3,
        name: "Chinedu",
        gender: "Male",
        sheCodes: false,
        broCodes: true,
    },
    {
        id: 4,
        name: "Regina",
        gender: "Female",
        sheCodes: true,
        broCodes: false,
    },
    {
        id: 5,
        name: "Chiboy",
        gender: "Male",
        sheCodes: false,
        broCodes: true,
    }
]

const server = http.createServer ((req:IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.setHeader ("Content-Type", "Application/JSON")

    const {url, method} = req

    let status: number = 404

    let feedback: iMessage = {
        message: "failed",
        success: false,
        data: null
    }

    const Mother: any = [];

    req.on("data",(pieces: any) =>{
        Mother.push(pieces)
    }).on("end", () => {

        //GET METHOD
        if(url === "/" && method === "GET"){
            status = 200;
            feedback.message = "All Infos Gotten",
            feedback.success = true,
            feedback.data = Info

            res.write(JSON.stringify ({status, feedback}))

            res.end()
        }

        //POST METHOD
        if(url === "/" && method === "POST"){
            status = 201;
            const body = JSON.parse (Mother);

            Info.push(body);
            feedback.message = "SUCCESSFULLY ADDED",
            feedback.success = true,
            feedback.data = Info

            res.write(JSON.stringify ({status, feedback}))

            res.end
        }
    })
})
server.listen(port, () => {
    console.log("Server is up and running");
    
})


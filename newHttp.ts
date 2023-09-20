import http,{ IncomingMessage, ServerResponse } from "http"

interface iData{
    id: number
    name: string
    phoneNum: number
    stack: string
}


interface iMessage{
    message: string
    success: boolean
    data: null|{}|{}[]
}

const set08: {}[] = [
    {
        id: 1,
        name: "Dennis",
        phoneNum: 8086247067,
        stack: "full-stack"
    },
    {
        id: 2,
        name: "Jemima",
        phoneNum: 7036921433,
        stack: "middle-stack"
    },
    {
        id: 3,
        name: "Ayo",
        phoneNum: 8086247067,
        stack: "full-stack"
    },
    {
        id: 4,
        name: "Tobi",
        phoneNum: 8086247067,
        stack: "front-end"
    },
    {
        id: 5,
        name: "Ayo",
        phoneNum: 8086247067,
        stack: "back-end"
    }
]

const port: number = 5000

const server = http.createServer((req:IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "Application/JSON")

    const {method, url} = req
    let status: number = 404

    let respond: iMessage = {
        message: "failed",
        success: false,
        data: null
    };
    const container: any = [];
    req.on("data", (chunk: any ) => {
        container.push(chunk)
    }).on("end", () => {
        //Get Method
        if(url === "/" && method === "GET"){
            status = 200;
            respond.message = "All set08 data gotten";
            respond.success = true;
            respond.data = set08;
            res.write(JSON.stringify({status, respond}));

            res.end();
        }

        //Post Method
        if(url === "/" && method === "POST"){
            status = 201;
            const body = JSON.parse(container);
        set08.push(body);
        respond.message = "SUCCESSFULLY ADDED";
        respond.success = true;
        respond.data = set08;
        res.write(JSON.stringify({
        status, respond}))

        res.end()
        }

        //patch method
        //put method
    })
    // res.end()
})

server.listen(port, () => {
    console.log("Server is up and running")
}
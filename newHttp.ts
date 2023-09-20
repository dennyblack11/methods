import http, { IncomingMessage, ServerResponse } from "http"

const port: number = 2002;

interface iData{
    id: number
    gender: string
    Career: string
    sheCodes: boolean
    broCodes: boolean
}

interface iMessage{
    message: string
    success:  boolean
    data: null|{}[]
}

const DummyData: {}[] = [
    {
        id: 1,
        gender: "Male",
        Career: "Full-stack",
        sheCodes: false,
        broCodes: true
    },
    {
        id: 2,
        gender: "Female",
        Career: "Full-stack",
        sheCodes: true,
        broCodes: false
    },
    {
        id: 3,
        gender: "Male",
        Career: "Full-stack",
        sheCodes: false,
        broCodes: true
    },
    {
        id: 4,
        gender: "Female",
        Career: "Full-stack",
        sheCodes: true,
        broCodes: false
    },
    {
        id: 5,
        gender: "Male",
        Career: "Full-stack",
        sheCodes: false,
        broCodes: true
    },
]

const server = http.createServer ((req:IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "Application/JSON")

    const {url, method} = req

    let status = 404

    let feedback: iMessage = {
        message: "failed",
        success: false,
        data: null
    }

    const Container: any = []

    req.on("data", (chunk:any) => {
        Container.push(chunk)
    }).on("end", () => {

        //Get Method

        if (url === "/" && method === "GET"){
            status = 200
            feedback.message = "All DummyData Gotten"
            feedback.success = true
            feedback.data = DummyData

            res.write(JSON.stringify({status, feedback}))
            res.end()
        }

        //Post Method

        if (url === "/" && method === "POST"){
            status = 201

            const body = JSON.parse(Container)
            DummyData.push(body)

            feedback.message = "SUCCESSFULLY ADDED"
            feedback.success = true
            feedback.data = DummyData

            res.write(JSON.stringify({status, feedback}))
            res.end()
        }
    })
})

server.listen(port, () => {
    console.log("Server is up and running");
    
})
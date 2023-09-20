import http, { IncomingMessage, ServerResponse } from "http"

const port: number = 5500

interface iData{
    id: number,
    gender: string,
    Complexion: string,
    height: string,
    marital_status: string,
}

interface iMessage {
    message: string,
    success: boolean,
    data: null|{}[],
}

const Information: {}[] = [
    {
        id: 1,
        gender: "Female",
        complexion: "Fair",
        height: "Average",
        marital_status: "Single"
    },
    {
        id: 2,
        gender: "Male",
        complexion: "Fair",
        height: "Tall",
        marital_status: "Married"
    },
    {
        id: 3,
        gender: "Female",
        complexion: "Dark",
        height: "Short",
        marital_status: "Single"
    },
    {
        id: 4,
        gender: "Male",
        complexion: "Dark",
        height: "Average",
        marital_status: "Single"
    },
    {
        id: 5,
        gender: "Female",
        complexion: "Fair",
        height: "Tall",
        marital_status: "Married"
    },
]

const server = http.createServer ((req:IncomingMessage, res:ServerResponse<IncomingMessage>) => {
    res.setHeader("Content-Type", "Application/JSON")

    const {url, method} = req

    let status = 404;

    let getBack: iMessage = {
        message: "failed",
        success: false,
        data: null
    }

    const Father: any = [];

    req.on("data", (chunk: any) => {
        Father.push(chunk)
    }).on("end", () => {

        //GET METHOD

        if(url === "/" && method === "GET"){
            status = 200;

            getBack.message = "All Information Gotten";
            getBack.success = true;
            getBack.data = Information;

            res.write(JSON.stringify ({status, getBack}))

            res.end()
        }

        //POST METHOD

        if(url === "/" && method === "POST"){
            status = 201
            const body = JSON.parse(Father)
            Information.push(body);
            getBack.message = "Successfully Added";
            getBack.success = true;
            getBack.data = Information

            res.write(JSON.stringify ({status, getBack}))

            res.end()
        }
    })
})

server.listen(port, () => {
    console.log("Server is up and running");
    
})


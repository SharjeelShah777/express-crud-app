import express from 'express';
import cors from 'cors';
import path from 'path';
const __dirname = path.resolve();

import authRouter from './routes/auth.mjs'
import commentRouter from './routes/comment.mjs'
import feedRouter from './routes/feed.mjs'
import postRouter from './routes/post.mjs'






// import { MongoClient, ServerApiVersion } from 'mongodb';
// const uri = "mongodb+srv://mycrud:crudpass@cluster0.z6fx8cs.mongodb.net/?retryWrites=true&w=majority";
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri);

// client.connect();



// async function run() {
//     try {
//         await client.connect();
//         console.log("Successfully connected to Atlas");
//     } catch (err) {
//         console.log(err.stack);
//         await client.close();
//         process.exit(1)
//     }
// }
// run().catch(console.dir);

// process.on('SIGINT', async function () {
//     console.log("app is terminating");
//     await client.close();
//     process.exit(0);
// });








const app = express();
app.use(express.json()); // body parser
// app.use(cors())

// /api/v1/login
app.use("/api/v1", authRouter)


app.use((req, res, next) => {
    let token = "valid"
    if (token === "valid") {
        next();
    } else {
        res.send({ message: "invalid token" })
    }
})


app.use("/api/v1", commentRouter)
app.use("/api/v1", postRouter)
app.use("/api/v1", feedRouter)




app.post("/api/v1/weather", (req, res, next) => {

    console.log("req.body: ", req.body);


    // res.send("weather is normal"); // not recommended



    res.send({
        message: "weather is normal",
        temp: 32,
        min: 20,
    });
})

app.post("/api/v2/weather", (req, res, next) => {

    console.log("req.body: ", req.body);


    // res.send("weather is normal"); // not recommended



    res.send({
        message: "weather is normal",
        temp: 32,
        min: 20,
    });
})






app.use("/static", express.static(path.join(__dirname, 'static')))

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 9787;
app.listen(PORT, () => {
    console.log(`Example server listening on port ${PORT}`)
})

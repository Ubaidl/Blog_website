import express from "express"
import authroute from "./router/auth.route.js"
import blogroute from "./router/blog.route.js"
import cookieParser from "cookie-parser";


import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("__dirname =", __dirname);


const app= express()
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../public/uploads"))
);

// 1️ Parse incoming JSON requests
app.use(express.json());
app.use(cookieParser());
import cors from "cors";

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);




app.use(express.urlencoded({ extended: true }));

// 2️ Parse URL-encoded form data (HTML forms)
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.use('/api/auth', authroute)
app.use('/api/blog',blogroute)
export default app

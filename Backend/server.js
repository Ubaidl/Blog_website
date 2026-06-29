import dotenv from "dotenv";
dotenv.config();
import app from "./src/App.js"


const PORT = process.env.PORT || 5000;
import connectDB from "./src/config/connectDB.js";

connectDB();


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
})
import express from "express";
import cors from "cors"
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import roomRoutes from "./routes/roomRoutes";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config()


const app = express();
app.use(express.json())
app.use(cors({
    origin: process.env.NEXT_APP_URL,
    credentials: true,
}))

app.options("*", cors({
  origin: process.env.NEXT_APP_URL,
  credentials: true,
}));  
app.use(cookieParser())


app.use("/api/auth",authRoutes)

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/room",roomRoutes);

const PORT = Number(process.env.PORT) || 3001; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
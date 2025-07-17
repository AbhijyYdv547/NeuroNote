import express from "express";
import cors from "cors"
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import roomRoutes from "./routes/roomRoutes";


const app = express();
app.use(express.json())
app.use(cors())


app.use("/api/auth",authRoutes)

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/room",roomRoutes);


app.listen(3001);
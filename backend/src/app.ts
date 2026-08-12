import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";


dotenv.config();

const app =express();


app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use(morgan("dev"));

app.get("/api/health",(_req, res) => {
    res.status(200).json({
        success:true,
        message: "NexaFlow API is running",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,  () => {
   console.log(`NexaFlow API running on port ${PORT}`);

});
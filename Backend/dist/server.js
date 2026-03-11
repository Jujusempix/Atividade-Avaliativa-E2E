"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes_1 = require("./routes/productRoutes");
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 3001);
app.use(express_1.default.json());
app.use("/api", productRoutes_1.productRouter);
app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
});
app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});

import dotenv from "dotenv";
import { connectDB } from "./db";
import { createServer } from "./app";

dotenv.config();

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  await connectDB();
  const app = createServer();
  app.listen(PORT, () => {
    console.log(`[api] listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error("[api] fatal error:", err);
  process.exit(1);
});
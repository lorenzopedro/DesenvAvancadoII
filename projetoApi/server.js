import { appendFile } from "fs";
import { createApp } from "./app.js";
const PORT = process.env.PORT || 3000;
createApp().then(app => app.listen(PORT, () => {
    console.log(`Servidor rolando na porta${PORT}`);
}))
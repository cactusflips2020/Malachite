import { ChemicalServer } from "chemicaljs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [app, listen] = new ChemicalServer();
const port = process.env.PORT || 3000;

const version = "1.1.0";

app.use(express.static("public", {
    index: "index.html",
    extensions: ["html"]
}));

app.serveChemical();

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

listen(port, () => {
    console.clear();
    console.log(chalk.green('███╗░░░███╗░█████╗░██╗░░░░░░█████╗░░█████╗░██╗░░██╗██╗████████╗███████╗'));
    console.log(chalk.green('████╗░████║██╔══██╗██║░░░░░██╔══██╗██╔══██╗██║░░██║██║╚══██╔══╝██╔════╝'));
    console.log(chalk.green('██╔████╔██║███████║██║░░░░░███████║██║░░╚═╝███████║██║░░░██║░░░█████╗░░'));
    console.log(chalk.green('██║╚██╔╝██║██╔══██║██║░░░░░██╔══██║██║░░██╗██╔══██║██║░░░██║░░░██╔══╝░░'));
    console.log(chalk.green('██║░╚═╝░██║██║░░██║███████╗██║░░██║╚█████╔╝██║░░██║██║░░░██║░░░███████╗'));
    console.log(chalk.green('╚═╝░░░░░╚═╝╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═╝░░░╚═╝░░░╚══════╝'));
    console.log();
    console.log('🕒 Started:', new Date().toLocaleString());
    console.log('📦 Version:', version);
    console.log('🌍 Port:', port);
    console.log('🔗 URL:', `http://localhost:${port}`);
});

function shutdown() {
    process.exit(0);
}

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());
import { ChemicalServer } from "chemicaljs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

// Get the directory name (for ES module compatibility)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [app, listen] = new ChemicalServer();
const port = process.env.PORT || 3000;

// Version and links
const version = "1.0.0";
const discord = "https://discord.gg/your-server";

// Server start time for uptime tracking
const startTime = Date.now();

// Function to format uptime
function formatUptime() {
    const uptime = Date.now() - startTime;
    const seconds = Math.floor(uptime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
}

// Serve static files
app.use(express.static("public", {
    index: "index.html",
    extensions: ["html"]
}));

// Serve ChemicalJS
app.serveChemical();

// 404 handler - Place this AFTER all other routes
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

// Start the server
listen(port, () => {
    console.log(chalk.cyan('-----------------------------------------------'));
    console.log(chalk.green('  🌟 Status: ') + chalk.bold('Active'));
    console.log(chalk.green('  🌍 Port: ') + chalk.bold(chalk.yellow(port)));
    console.log(chalk.green('  🕒 Time: ') + chalk.bold(new Date().toLocaleTimeString()));
    console.log(chalk.cyan('-----------------------------------------------'));
    console.log(chalk.magenta('📦 Version: ') + chalk.bold(version));
    console.log(chalk.magenta('🔗 URL: ') + chalk.underline('http://localhost:' + port));
    console.log(chalk.cyan('-----------------------------------------------'));
    console.log(chalk.yellow('  Press C to shutdown server.'));
    console.log(chalk.cyan('-----------------------------------------------'));
});

// Graceful shutdown handling
function shutdown() {
    console.log(chalk.red('-----------------------------------------------'));
    console.log(chalk.yellow('  🛑 Status: ') + chalk.bold('Shutting Down'));
    console.log(chalk.yellow('  🕒 Time: ') + chalk.bold(new Date().toLocaleTimeString()));
    console.log(chalk.yellow('  ⏱️  Uptime: ') + chalk.bold(formatUptime()));
    console.log(chalk.red('-----------------------------------------------'));
    console.log(chalk.green.bold(`  Thank you for using Malachite!  `));
    console.log(chalk.blue('  Exiting in 3 seconds...'));
    console.log(chalk.red('-----------------------------------------------'));
    setTimeout(() => {
        process.exit(1);
    }, 3000);
}

// Handle shutdown signals
process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

// Handle keyboard input for 'C' key shutdown
process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', (key) => {
    if (key === 'c' || key === 'C') {
        shutdown();
    }
});


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
const version = "1.1.0";

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

// Function to get system info
function getSystemInfo() {
    const nodeVersion = process.version;
    const platform = process.platform;
    const arch = process.arch;
    const memory = process.memoryUsage();
    const memUsage = Math.round(memory.heapUsed / 1024 / 1024);
    const memTotal = Math.round(memory.heapTotal / 1024 / 1024);
    
    return { nodeVersion, platform, arch, memUsage, memTotal };
}

// Function to create a beautiful border
function createBorder(text, color = 'cyan') {
    const border = '═'.repeat(50);
    return chalk[color](`╔${border}╗\n║ ${text.padEnd(48)} ║\n╚${border}╝`);
}

// Function to create a status line
function createStatusLine(label, value, status = 'success') {
    const statusColors = {
        success: 'green',
        warning: 'yellow',
        error: 'red',
        info: 'blue'
    };
    const dot = chalk[statusColors[status]]('●');
    return `${dot} ${chalk.white(label)}: ${chalk.bold(chalk[statusColors[status]](value))}`;
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
    // Clear console for a fresh start
    console.clear();
    
    // Get system info
    const sysInfo = getSystemInfo();

    
    // ASCII Art Logo with alternating colors
    console.log(chalk.green('███╗░░░███╗░█████╗░██╗░░░░░░█████╗░░█████╗░██╗░░██╗██╗████████╗███████╗'));
    console.log(chalk.green('████╗░████║██╔══██╗██║░░░░░██╔══██╗██╔══██╗██║░░██║██║╚══██╔══╝██╔════╝'));
    console.log(chalk.green('██╔████╔██║███████║██║░░░░░███████║██║░░╚═╝███████║██║░░░██║░░░█████╗░░'));
    console.log(chalk.green('██║╚██╔╝██║██╔══██║██║░░░░░██╔══██║██║░░██╗██╔══██║██║░░░██║░░░██╔══╝░░'));
    console.log(chalk.green('██║░╚═╝░██║██║░░██║███████╗██║░░██║╚█████╔╝██║░░██║██║░░░██║░░░███████╗'));
    console.log(chalk.green('╚═╝░░░░░╚═╝╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝╚═╝░░░╚═╝░░░╚══════╝'));
    
    console.log(); // Empty line for spacing
    
    // Server Status Box
    console.log(createBorder('SERVER STATUS', 'green'));
    console.log(createStatusLine('🌍 Port', port.toString(), 'success'));
    console.log(createStatusLine('📦 Version', version, 'info'));
    console.log(createStatusLine('🔗 URL', `http://localhost:${port}`, 'info'));
    console.log(createStatusLine('🕒 Started', new Date().toLocaleString(), 'success'));
    
    console.log(); // Empty line for spacing
    
    // System Information Box
    console.log(createBorder('SYSTEM INFORMATION', 'blue'));
    console.log(createStatusLine('⚡ Node.js', sysInfo.nodeVersion, 'success'));
    console.log(createStatusLine('💻 Platform', `${sysInfo.platform} (${sysInfo.arch})`, 'info'));
    console.log(createStatusLine('🧠 Memory', `${sysInfo.memUsage}MB / ${sysInfo.memTotal}MB`, 'warning'));
    console.log(createStatusLine('📁 Directory', process.cwd(), 'info'));
    
    console.log(); // Empty line for spacing
    
    // Quick Actions Box
    console.log(createBorder('QUICK ACTIONS', 'yellow'));
    console.log(chalk.yellow('  ⌨️  Press ') + chalk.bold(chalk.red('C')) + chalk.yellow(' to shutdown server'));
    console.log(chalk.yellow('  📊 Press ') + chalk.bold(chalk.green('S')) + chalk.yellow(' to show stats'));
    
    console.log(); // Empty line for spacing
    
    // Animated loading indicator
    const loadingFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let frameIndex = 0;
    
    const loadingInterval = setInterval(() => {
        process.stdout.write(`\r${chalk.cyan(loadingFrames[frameIndex])} ${chalk.gray('Server is running...')}`);
        frameIndex = (frameIndex + 1) % loadingFrames.length;
    }, 100);
    
    // Store interval for cleanup
    global.loadingInterval = loadingInterval;
});

// Graceful shutdown handling
function shutdown() {
    // Clear loading animation
    if (global.loadingInterval) {
        clearInterval(global.loadingInterval);
    }
    
    console.log(); // Clear the loading line
    console.log(); // Extra spacing
    
    // Shutdown animation
    console.log(chalk.red('╔══════════════════════════════════════════════════════════════╗'));
    console.log(chalk.red('║                    🛑 SHUTTING DOWN 🛑                        ║'));
    console.log(chalk.red('╚══════════════════════════════════════════════════════════════╝'));
    
    console.log(); // Empty line for spacing
    
    // Shutdown info box
    console.log(createBorder('SHUTDOWN INFORMATION', 'red'));
    console.log(createStatusLine('🕒 Shutdown Time', new Date().toLocaleString(), 'error'));
    console.log(createStatusLine('⏱️  Total Uptime', formatUptime(), 'warning'));
    console.log(createStatusLine('📊 Final Memory', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, 'info'));
    
    console.log(); // Empty line for spacing
    
    // Farewell message
    console.log(chalk.green('╔══════════════════════════════════════════════════════════════╗'));
    console.log(chalk.green('║               Thank you for using Malachite!                 ║'));
    console.log(chalk.green('╚══════════════════════════════════════════════════════════════╝'));
    
    setTimeout(() => {
        process.exit(0);
    }, 2000);
}

// Handle shutdown signals
process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());

// Handle keyboard input for enhanced controls
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (key) => {
        if (key === 'c' || key === 'C') {
            shutdown();
        } else if (key === 's' || key === 'S') {
            const sysInfo = getSystemInfo();
            console.log(chalk.cyan('\n📊 Current Stats:'));
            console.log(createStatusLine('⏱️  Uptime', formatUptime(), 'info'));
            console.log(createStatusLine('🧠 Memory Usage', `${sysInfo.memUsage}MB / ${sysInfo.memTotal}MB`, 'warning'));
            console.log(createStatusLine('📁 Process ID', process.pid.toString(), 'info'));
        }
    });
} else {
    console.log(chalk.yellow('⚠️  No TTY detected. Enhanced keyboard controls unavailable.'));
}


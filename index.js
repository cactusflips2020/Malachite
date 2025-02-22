import { ChemicalServer } from "chemicaljs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name (for ES module compatibility)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const [app, listen] = new ChemicalServer();
const port = process.env.PORT || 3000;

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
    console.log(`Mewing Academy listening on port ${port}!`);
});

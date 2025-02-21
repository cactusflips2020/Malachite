import { ChemicalServer } from "chemicaljs";
import express from "express";
import path from "path";

const [app, listen] = new ChemicalServer({
    uv: true,
    scramjet: false,
    rammerhead: false,
});

const port = process.env.PORT || 8080;
const __dirname = process.cwd();

app.use(express.static("static"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "files"));

app.get("/", (req, res) => {
    res.render("index");
}) 

app.get("/~", (req, res) => {
    res.render("proxy");
});

app.serveChemical();

listen(port, () => {
    console.log(`Mewing Academy is listening on port ${port}!`);
    console.log(`\t1. http://localhost:${port}`);
});

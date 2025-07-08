import { ChemicalBuild } from "chemicaljs";

const build = new ChemicalBuild({
    path: "dist",
    default: "uv",
    uv: true,
    scramjet: false,
    rh: true,
});

build.write();
/*
 * Arma la carpeta deploy/ con lo que hay que subir a Hostinger.
 *
 *   node build.js
 *
 * Copia solo lo que el sitio referencia de verdad. Quedan fuera los
 * originales .jpg/.png ya convertidos a WebP, las fotos sin usar,
 * lib/lenis.min.js (esta en el repo pero el HTML nunca lo carga),
 * assets/credits.json (documentacion de licencias, no lo pide el codigo)
 * y este mismo script.
 *
 * deploy/ esta en .gitignore: es una salida derivada, se regenera.
 */
const fs   = require("fs");
const path = require("path");

const ROOT = __dirname;
const OUT  = path.join(ROOT, "deploy");

// Se borra en cada corrida para que no arrastre archivos de una version previa.
fs.rmSync(OUT, { recursive: true, force: true });

const copy = rel => {
  const dst = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(path.join(ROOT, rel), dst);
  return fs.statSync(dst).size;
};

const RAIZ = [
  "index.html", "privacy.html", "terms.html",
  "styles.css", "main.js",
  ".htaccess", "robots.txt", "sitemap.xml",
  "lib/gsap.min.js", "lib/ScrollTrigger.min.js",
  "lib/manifest.js", "lib/translations.js", "lib/legal.js"
];

// Fuentes donde buscar rutas de imagenes.
const FUENTES = ["index.html", "privacy.html", "terms.html", "styles.css", "main.js", "lib/manifest.js"];
const RE_IMG  = /assets\/[A-Za-z0-9_./ -]*\.(?:webp|jpg|jpeg|png|svg)/g;

let total = 0;
const filas = [];

for (const f of RAIZ) {
  if (!fs.existsSync(path.join(ROOT, f))) {
    console.error("FALTA el archivo obligatorio: " + f);
    process.exit(1);
  }
  const s = copy(f);
  total += s;
  filas.push([f, s]);
}

const refs = new Set();
for (const f of FUENTES) {
  const s = fs.readFileSync(path.join(ROOT, f), "utf8");
  for (const m of s.matchAll(RE_IMG)) refs.add(m[0]);
}

let bytesImg = 0, nImg = 0;
for (const rel of [...refs].sort()) {
  if (!fs.existsSync(path.join(ROOT, rel))) {
    console.error("Referencia rota: " + rel + " no existe en disco");
    process.exit(1);
  }
  bytesImg += copy(rel);
  nImg++;
}
total += bytesImg;

const kb = n => (n / 1024).toFixed(0) + " KB";
for (const [f, s] of filas) console.log("  " + kb(s).padStart(8) + "  " + f);
console.log("  " + kb(bytesImg).padStart(8) + "  assets/img/ (" + nImg + " archivos)");
console.log("\nTOTAL A SUBIR: " + (total / 1024 / 1024).toFixed(2) + " MB");
console.log("Carpeta lista: " + OUT);

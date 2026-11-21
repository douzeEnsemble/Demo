import { defineConfig } from "vite";
import { appVersion } from "./.github/scripts/app-version.mjs";

// "/" en local ; sous-chemin du dépôt (ex: "/demo/") sur GitHub Pages, où
// l'app est servie depuis un dépôt de projet plutôt qu'un domaine dédié —
// voir VITE_BASE_PATH dans .github/workflows/pages.yml et src/lib/basePath.ts
// pour le routeur.
//
// Pas de @cloudflare/vite-plugin ici, contrairement aux autres projets : les
// démos n'ont aucun code serveur (toutes les données sont générées côté
// client à partir d'une graine, voir src/lib/random.ts), un hébergement
// statique (GitHub Pages) suffit.
const base = process.env.VITE_BASE_PATH || "/";

export default defineConfig({
  base,
  // Dernier tag v* (VER-09) ; le checkout de CI doit avoir l'historique (fetch-depth: 0).
  define: { __APP_VERSION__: JSON.stringify(appVersion()) },
});

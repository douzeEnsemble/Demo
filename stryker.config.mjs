// Chaque module est associé aux seuls fichiers de test capables de tuer ses
// mutants : la CI lance un job par module (variable MUTATE, voir
// .github/scripts/mutation-matrix.mjs) et le runner « command » ne relance que
// ces tests-là pour chaque mutant.
//
// Périmètre volontairement plus restreint que la couverture 100 % de
// vitest.config.ts (qui couvre aussi les vues DOM) : la logique pure,
// c'est-à-dire tout ce qui fabrique ou transforme les données fictives.
export const targets = {
  "src/lib/random.ts": ["src/lib/random.test.ts"],
  "src/lib/seed.ts": ["src/lib/seed.test.ts"],
  "src/lib/fake.ts": ["src/lib/fake.test.ts"],
  "src/lib/format.ts": ["src/lib/format.test.ts"],
  "src/apps/wheel/generator.ts": ["src/apps/wheel/generator.test.ts"],
  "src/apps/poll/generator.ts": ["src/apps/poll/generator.test.ts"],
  "src/apps/stock/generator.ts": ["src/apps/stock/generator.test.ts"],
  "src/apps/booking/generator.ts": ["src/apps/booking/generator.test.ts"],
};

const selected = process.env.MUTATE ? process.env.MUTATE.split(",") : Object.keys(targets);
for (const file of selected) {
  if (!targets[file]) throw new Error(`MUTATE : module inconnu ${file}`);
}
const tests = [...new Set(selected.flatMap((file) => targets[file]))];

export default {
  packageManager: "npm",
  // Runner « command » : le runner vitest dédié n'exécute quasiment aucun test
  // par mutant (heuristique « --related » mal résolue dans le bac à sable de
  // Stryker), d'où un score sans signification.
  testRunner: "command",
  commandRunner: { command: `npx vitest run ${tests.join(" ")}` },
  coverageAnalysis: "off",
  // Contournement TypeScript 7 : fichier volontairement absent (le
  // préprocesseur de Stryker appelle une API retirée, `parseConfigFileTextToJson`).
  tsconfigFile: "tsconfig.stryker-unused.json",
  mutate: selected,
  reporters: ["clear-text", "progress", "html"],
  htmlReporter: { fileName: "mutation-report/index.html" },
  ignorePatterns: ["dist", "coverage", "mutation-report", "playwright-report", "test-results"],
  thresholds: { high: 100, low: 100, break: 100 },
  tempDirName: ".stryker-tmp",
  cleanTempDir: true,
};

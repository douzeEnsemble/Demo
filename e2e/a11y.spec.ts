import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Une page = un état à contrôler (A11Y-02), dans les deux thèmes (A11Y-05).
const pages = [
  { name: "accueil", path: "/" },
  { name: "roue", path: "/roue?seed=E2E001" },
  { name: "sondage", path: "/sondage?seed=E2E001" },
  { name: "stock", path: "/stock?seed=E2E001" },
  { name: "repas", path: "/repas?seed=E2E001" },
];

for (const theme of ["light", "dark"] as const) {
  test.describe(`thème ${theme}`, () => {
    test.use({ colorScheme: theme });

    for (const { name, path } of pages) {
      test(`axe : aucune violation sur ${name}`, async ({ page }) => {
        await page.goto(path);
        await expect(page.locator("h1")).toBeVisible();
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
          .analyze();
        // toEqual([]) : le rapport s'affiche en entier à l'échec.
        expect(results.violations).toEqual([]);
      });
    }
  });
}

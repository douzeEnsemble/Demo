import type { IconName } from "./lib/icons";
import type { MountDemo } from "./apps/types";

export interface DemoApp {
  /** Segment d'URL : `/roue`, `/sondage`… */
  slug: string;
  name: string;
  tagline: string;
  icon: IconName;
  /** Chargée à la demande (import() dynamique) : l'accueil n'embarque le
   * code d'aucune démo, chacune n'est téléchargée qu'une fois ouverte. */
  load: () => Promise<MountDemo>;
}

// Ajouter une démo = un dossier src/apps/<nom>/ (generator.ts pur + view.ts)
// et une entrée ici ; l'accueil et le routeur s'en déduisent tout seuls.
export const DEMO_APPS: readonly DemoApp[] = [
  {
    slug: "roue",
    name: "Roue de tirage",
    tagline: "Une roue à faire tourner pour désigner un gagnant au hasard.",
    icon: "wheel",
    load: async () => (await import("./apps/wheel/view")).mountWheel,
  },
  {
    slug: "sondage",
    name: "Sondage",
    tagline: "Une question, des votes, et les résultats en direct.",
    icon: "poll",
    load: async () => (await import("./apps/poll/view")).mountPoll,
  },
  {
    slug: "stock",
    name: "Gestion de stock",
    tagline: "Inventaire, alertes de stock bas et historique des mouvements.",
    icon: "box",
    load: async () => (await import("./apps/stock/view")).mountStock,
  },
  {
    slug: "repas",
    name: "Réservation de repas",
    tagline: "Places, menus et paiements pour un repas à organiser.",
    icon: "utensils",
    load: async () => (await import("./apps/booking/view")).mountBooking,
  },
];

export function findDemoApp(slug: string): DemoApp | undefined {
  return DEMO_APPS.find((app) => app.slug === slug);
}

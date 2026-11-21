// Types partagés entre le registre (src/apps.ts) et les vues des démos : dans un
// fichier à part pour que les vues n'importent pas le registre, qui les charge
// (cycle).

/** Ce qu'une démo reçoit pour se monter : la graine de son jeu de données
 * (voir src/lib/seed.ts) et la date du jour (ISO locale, voir
 * src/lib/format.ts), passée explicitement plutôt que lue par chaque
 * générateur pour qu'ils restent des fonctions pures, testables à date fixe. */
export interface DemoContext {
  seed: string;
  today: string;
}

/** Monte la démo dans `root` et renvoie sa fonction de nettoyage (timers,
 * écouteurs globaux…), appelée par le routeur avant de monter la vue
 * suivante. */
export type MountDemo = (root: HTMLElement, ctx: DemoContext) => () => void;

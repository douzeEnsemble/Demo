# Architecture

La description des couches (rôle de chaque dossier, graine, démos, routeur) est dans `CLAUDE.md`, section *Architecture*. Ce fichier garde ce qui s'**exécute** : les règles d'architecture vérifiées à chaque `npm run lint`.

## Règles vérifiées (`.dependency-cruiser.cjs`)

Dossier analysé : `src/`.

| Règle | Raison |
|---|---|
| `no-circular` | Un cycle empêche de raisonner sur un module isolé et fausse la mutation ciblée (MUT-04). Les types partagés entre le registre et les vues vivent dans `src/apps/types.ts` pour que les vues n'importent pas `src/apps.ts`, qui les charge. |
| `no-orphans` | Un fichier que rien n'importe est du code mort : le supprimer (COV-05). |
| `lib-is-pure` | `src/lib/` est la logique pure : elle n'importe pas l'interface (composants, démos, vues). |

Une exception se documente à côté de la règle (`pathNot` + raison), jamais par un assouplissement global.

## Pièges

- `dependency-cruiser` ne sait pas lire TypeScript 7 : sans `@swc/core` en devDependency, il analyse **0 module** et ne signale rien. Après une montée, vérifier que la sortie annonce un nombre de modules non nul (une cinquantaine ici).

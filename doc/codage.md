# Conventions de code

Le détail de la philosophie de test et de la CI est dans `CLAUDE.md` ; ce fichier fixe les conventions du quotidien.

## À faire

- Commits au format conventionnel `type(portée): sujet`, à l'impératif, qui disent le pourquoi (hook : `git config core.hooksPath .githooks`). La version se déduit des commits : ne jamais l'écrire à la main.
- Ajouter un test à côté du fichier modifié ; couverture et mutation restent à 100 %.
- Garder la logique dans des fonctions pures (`generator.ts`), la vue (`view.ts`) la plus fine possible.
- Une nouvelle démo ou un nouveau module pur s'ajoute aux `targets` de `stryker.config.mjs`, avec ses fichiers de test.
- Toute donnée générée dérive de la graine (`createRng`), et son invariant se teste sur une quarantaine de graines.

## À éviter

- `Math.random()` dans un générateur : la même URL doit redonner les mêmes données.
- Baisser un seuil (couverture, mutation) ou ajouter un `Stryker disable` sans raison écrite.
- Importer à rebours des couches (voir `doc/architecture.md`) : `npm run lint` échoue.
- Référencer une action GitHub par un tag : toujours par SHA.

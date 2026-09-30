# CLAUDE.md

## Mission
MVP livré en 1h. Fonctionnel > propre. Rapide > robuste.
Le code sera jeté ou réécrit s'il y a une suite : la maintenabilité n'est pas un critère.

## App
[description en 2 phrases]

## Stack
[stack choisie]
Lancement : `[commande unique]`

## Fonctionnalités MVP
- [ ] [fonctionnalité 1]
- [ ] [fonctionnalité 2]
- [ ] [fonctionnalité 3]

## Hors périmètre
- [tout ce qui a été écarté]

## Règles de travail
- Pas de tests automatisés. Vérifier en lançant l'app une fois.
- Config par défaut partout : pas de linter, formatter, CI, Docker, hooks git ni TypeScript strict.
- Données en mémoire, JSON, localStorage ou SQLite. Pas de base à installer.
- Pas d'auth sauf si indispensable (dans ce cas, un utilisateur codé en dur).
- Style minimal : librairie CSS en CDN ou quelques règles CSS.
- Pas d'abstraction anticipée : le code le plus direct qui marche. Dupliquer plutôt qu'abstraire.
- Gestion d'erreurs uniquement là où l'app planterait sinon.
- Le moins de dépendances possible.
- Décider seul, noter les choix ci-dessous plutôt que demander.
- Avant chaque tâche : « Est-ce que ça rapproche d'une app qui marche ? » Si non, ne pas le faire.

## Décisions prises
- [choix fait en cours de route, une ligne chacun]

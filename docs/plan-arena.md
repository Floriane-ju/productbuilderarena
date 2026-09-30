# Plan Arena : Benjamin et Floriane à The Product Builder Arena

Rédigé le 30/09/2026 pour l'édition #1 du 14/10/2026 à Villeurbanne.

Convention de lecture : **[lu]** = vu sur productbuilderarena.com, la page Luma de l'événement ou la doc Claude Code, avec la source. **[supposé]** = déduction ou hypothèse de ma part, à vérifier auprès des organisateurs. Tout ce qui n'est pas marqué [lu] est à prendre comme une recommandation, pas comme une règle.

---

## Partie 1 : la compétition

### 1.1 Ce que dit le site, mot pour mot ou presque

Le site est une seule page (Next.js), sans FAQ, sans page de règles, sans page « éditions passées » détaillée. Voici tout ce qu'on y lit d'utile.

**Format [lu, productbuilderarena.com]**
- « Two teams. Two builders each. One challenge, revealed on the spot. Sixty minutes to build a real, working product. Every prompt on screen. Every move on air. You test. You vote. You decide. »
- Cartouches : « 2 vs 2 · Duel format », « 60:00 · Live build », « Live URL · Working product », « Audience vote · Real-time jury ».
- « Ninety minutes of show. Sixty minutes on the clock. Everyone in the room sees the same thing at the same time. »
- Cinq phases : 01 Brief « The challenge drops », 02 Build « 60 minutes, on air », 03 Demos « Ship the URL », 04 Vote « The room decides », 05 Result « One winner, live ».
- **Zero-day rule** : « Nothing is built in advance. No constraint is ever added once the clock has started. »
- « Every Arena is filmed and stays online. » Diffusion en direct sur YouTube (chaîne @TheProductBuilderArena).
- Public : « Join the audience in the room. Test the products on your phone. Vote live. Your voice crowns the winner. » Entrée « Free, limited seats ».
- Builders : « Apply for a future Arena, get matched into a team, build live. No prep. »
- Partenaires : Mobbin, Mylight150. Pied de page : « Iterate. Build. Ship. », contact « Lyon · Paris ».

**Édition #1, le 14/10/2026 [lu, luma.com/abf0jfcs]**
- Lieu : MyLight150, 1 rue Hippolyte Kahn, 69100 Villeurbanne.
- Description : « un duel en direct : deux équipes de deux builders, un brief révélé à froid, 60 minutes chrono pour livrer un produit fonctionnel, de zéro ».
- Programme : 18h30 accueil · 19h00 The Draft (présentation des équipes) · 19h05 The Brief · 19h15 The Build (60 min) · 20h15 The Demos · 20h30 The Reveal (résultats et tirage au sort) · puis verre et pizza.
- Retransmission YouTube pour ceux qui ne sont pas dans la salle.

**Édition passée [lu, partiellement]**
- Le site liste une « Past arena » à Lyon le 11/05/2026 avec un bouton « Watch replay », mais le bouton pointe vers la chaîne YouTube, pas vers une vidéo. La chaîne (id UCN2oEMtyGLJnWsOnx4NPJrw) n'expose aucune vidéo publique dans son flux RSS ; la seule vidéo trouvée (m2YcX-TGxx8) s'appelle « The Product Builder Arena · Édition #1 », donc c'est le direct du 14/10, pas un replay. **Je n'ai pas pu voir de replay, ni de projet gagnant, ni les outils utilisés par les builders passés.**
- Des extraits LinkedIn (profils de Samuel Boulery et Johan Durand, mylight150 ; LinkedIn refuse la lecture directe, je n'ai que les résumés du moteur de recherche) parlent d'un « POC » lancé « le 27 mai à Lyon » devant une vingtaine de personnes, « en mode crash-test », et d'un format « 2v2, zéro préparation, sujet découvert au début, seules armes : vitesse d'exécution, maîtrise des agents IA, architecture propre ». La date (27 mai vs 11 mai sur le site) ne concorde pas : je ne tranche pas.

**Ce que le site ne dit pas** (donc à demander aux organisateurs, voir 1.6) : critères de vote détaillés, outils autorisés ou interdits, définition exacte de « nothing is built in advance » (comptes ? templates ? design system ?), modalités de la démo (durée, qui parle, écran projeté ou téléphones), si Benjamin et Floriane seront bien dans la même équipe (le site parle de « get matched into a team »), si les builders peuvent utiliser leurs propres machines et abonnements, et quel est le brief type (produit grand public ? outil interne ? thème du partenaire ?).

### 1.2 Ce que le jury récompense vraiment

Le jury, c'est la salle, en direct, après avoir testé sur son téléphone [lu]. Tout le reste est déduit [supposé] :

1. **Ça marche, tout de suite, sur un téléphone.** Le public teste « on your phone ». Une URL qui charge en moins de 2 s, un premier écran compréhensible sans explication, un parcours de 3 écrans max qui aboutit. Un bug visible pendant le test vaut une défaite. Donc : mobile d'abord, zéro login, zéro formulaire long.
2. **Le vote est émotionnel et immédiat.** Les gens votent pour le produit qu'ils ont compris et qui leur a fait faire quelque chose de satisfaisant en 60 secondes. Un « wow » (une animation, une donnée réelle, une réponse instantanée, un partage) pèse plus qu'une deuxième fonctionnalité.
3. **Le spectacle compte.** « Every prompt on screen » : les prompts sont projetés. Des prompts clairs, courts, nommés, qui montrent une méthode, servent la narration. Les 15 minutes de démo sont un pitch : problème, solution, démo live, fin nette.
4. **La cohérence avec le brief.** Un jury de salle sanctionne un produit hors sujet plus qu'un produit incomplet. Répondre au brief littéralement, puis y ajouter une seule idée en plus.

Où mettre l'effort, dans l'ordre : parcours principal fiable > lisibilité mobile > un effet mémorable > pitch > tout le reste. Ce qu'on ne fait pas : auth, back-office, tests, README, responsive desktop soigné, dark mode.

### 1.3 Déroulé du jour J, minute par minute

Horaires [lu, Luma]. Contenu [supposé], calibré pour deux personnes et 4 à 6 sessions Claude. T = 19h15, le top du chrono.

**18h30 - 19h00 : installation**
- Brancher les deux machines, tester le wifi et le partage de connexion 4G en secours, ouvrir un terminal par personne dans un clone à jour du dépôt, `gh auth status`, `wrangler whoami`, `pnpm -v`.
- Ouvrir les deux sessions Claude « socle » (une par personne) dans le dépôt, vérifier que le hook SessionStart affiche l'état Arena (voir partie 2). Ne rien écrire.
- Régler la taille de police des terminaux pour la projection.

**19h05 - 19h15 : The Brief (le chrono n'a pas démarré)**
- Écouter, noter le brief mot pour mot sur un papier partagé. Repérer : l'utilisateur cible, l'action clé, ce qui serait « wow ».
- Se mettre d'accord à voix haute sur UNE phrase : « Notre produit permet à [qui] de [quoi] en [combien de temps] ». Si la règle interdit même de discuter avant le top, se taire et le faire à T+0 [supposé : le site dit seulement que rien n'est construit avant].

**T+0 à T+5 : cadrage (les deux, un seul écran)**
- Écrire dans `PLAN.md` (voir gabarit en 2.7) : la phrase produit, le parcours en 3 écrans max, les 2 features (une par personne), le « wow », la décision base de données (Supabase ou localStorage), qui intègre (Benjamin).
- Découper : Benjamin = socle + feature A ; Floriane = feature B + contenu/pitch. Écrire `ZONES` (voir 2.7).
- Chacun donne à son Claude le brief complet, la phrase produit et sa zone.

**T+5 à T+12 : socle (Benjamin) et préparation (Floriane)**
- Benjamin, session socle, sur `main` directement (l'intégrateur y a droit) : scaffold Vite React TS, Tailwind, `src/shared/types.ts` (le modèle de données, 20 lignes), `src/routes.tsx` avec des pages vides nommées d'avance, `index.html` (titre, viewport, thème couleur), premier `pnpm ship` : l'URL publique affiche « Hello + nom du produit ». Commit `socle`, push. Annoncer à voix haute « socle poussé ».
- Floriane, pendant ce temps, sur sa branche : prompts détaillés de sa feature, données d'exemple (JSON) au format des types, texte des écrans, plan de pitch. Dès que le socle est poussé, `git pull`, et sa session Claude démarre sa feature.
- Si Supabase : Benjamin crée la table (une seule) et publie l'URL et la clé anon dans `.env` versionné (voir 2.9) dans ce même créneau. Pas de RLS fine : des policies « tout le monde lit et écrit » pour la démo, en le disant à voix haute.

**T+12 à T+38 : construction en parallèle**
- Chaque personne pilote 1 à 2 sessions Claude, chacune dans son worktree et sa branche `ben/<tâche>` ou `flo/<tâche>`, avec une PR draft ouverte dès la première minute (c'est la réservation, voir 2.4).
- Commit et push toutes les 5 à 8 minutes, même moche. Message court, préfixé par la zone.
- T+20 : premier point voix, 30 secondes : « où j'en suis, ce qui bloque ». Toute demande de changement en zone partagée (types, routes, deps) passe par Benjamin, à voix haute.
- T+30 : première fusion sur `main` de ce qui tient (même partiel) + `pnpm ship`. L'URL évolue devant le public.

**T+38 à T+48 : intégration et premier test téléphone**
- Benjamin fusionne tout ce qui est « prêt » (`gh pr merge`), lance `pnpm ship`, ouvre l'URL sur son téléphone. Floriane la teste sur le sien en même temps, en suivant le parcours du brief.
- On note les 3 bugs les plus visibles. Pas plus. Chacun corrige dans sa zone.
- Le « wow » démarre ici seulement si le parcours principal tient. Sinon on l'abandonne, sans débat.

**T+48 à T+55 : polish mobile et gel**
- Hauteurs tactiles, textes lisibles, états vides, messages d'erreur, favicon et titre d'onglet, un pied de page avec le nom du produit.
- T+53 : gel des features. Dernières fusions, `pnpm ship`, test du parcours complet sur les deux téléphones. Vérifier que c'est bien la nouvelle version qui est en ligne (voir 2.9, propagation Cloudflare).

**T+55 à T+60 : pitch**
- Une répétition à voix basse : 20 s problème, 20 s ce qu'on a fait, 90 s démo sur téléphone projeté, 10 s « testez-le ». Qui parle de quoi. Générer le QR code de l'URL en grand sur un écran.
- Fermer les terminaux de build. Laisser un onglet ouvert sur l'URL.

**20h15 - 20h30 : démos** [lu]. Démo live, pas de slides. Faire tester la salle pendant qu'on parle.

### 1.4 Ce qu'on peut préparer avant, et ce qu'on ne peut pas

La règle lue est courte et absolue : « Nothing is built in advance. » [lu]. Ce qui suit est mon interprétation [supposé], à confirmer par écrit avec les organisateurs (question 1 en 1.6).

**Interdit, sans ambiguïté**
- Tout code produit écrit avant le top : composants, pages, squelette d'app, design system, schéma de base. Même « générique ». Si on arrive avec un dépôt contenant `src/`, on triche à l'écran devant tout le monde.

**Zone grise, à faire valider (mon avis : légitime, car ce n'est pas le produit)**
- Un dépôt vide mais outillé : `CLAUDE.md` de protocole, hooks `.claude/settings.json`, `.gitignore`, `ZONES` et `PLAN.md` vides. C'est de l'organisation d'équipe, pas de la construction. Si les organisateurs refusent, plan B : Benjamin garde ces fichiers dans un gist privé et les colle à T+0 (90 secondes).
- Des comptes et projets d'infrastructure vides : projet Cloudflare Pages « arena » créé, `wrangler login` fait, projet Supabase vide créé. Plan B : `wrangler pages project create arena` prend 5 secondes à T+6, et Supabase se crée en 2 minutes.
- Des prompts gabarits (texte) pour le scaffold, pour une feature, pour le polish mobile. C'est de la méthode.

**Autorisé sans doute (c'est de l'entraînement, pas du livrable)**
- S'entraîner deux fois en conditions réelles avant le 14 (voir checklist 2.10), sur un brief inventé, puis jeter le code.
- Connaître par cœur sa stack : quelle commande crée le projet, combien de temps prend le premier `pnpm ship`, comment Vite gère les ports en double.
- Avoir installé et mis à jour : Node, pnpm, wrangler, gh, Claude Code, jq, le dépôt cloné et la confiance du dossier acceptée.

### 1.5 Stack recommandée

Contraintes de Benjamin : pnpm obligatoire (un hook global bloque `npm install`), déploiement sur Cloudflare Pages, Supabase si base. Le site ne mentionne aucune restriction d'outil [lu : rien sur le sujet], donc compatible, sous réserve de la question 2 en 1.6.

| Brique | Choix | Pourquoi |
| --- | --- | --- |
| Scaffold | `pnpm create vite@latest arena --template react-ts` | 20 secondes, Claude le connaît par cœur, HMR immédiat. |
| Style | Tailwind v4 (`@import "tailwindcss"` dans un seul CSS) | Zéro config, tout dans le JSX, Claude produit du mobile-first sans friction. Pas de design system importé (règle zero-day). |
| Routing | react-router, fichier unique `src/routes.tsx` | Une page par écran, chaque feature exporte sa page. Si le produit tient en un écran, pas de router du tout. |
| Données | localStorage par défaut. Supabase seulement si le brief exige un état partagé entre visiteurs (vote, mur, classement). | Supabase ajoute 5 minutes et un risque. Un état partagé est souvent le « wow » qui fait voter la salle. Décision à T+3, pas après. |
| Déploiement | `pnpm ship` = `vite build` puis `wrangler pages deploy dist --project-name arena` depuis la machine de Benjamin | 20 à 40 secondes, déterministe, aucune attente de build distant. Pas d'intégration Git Cloudflare : elle exigerait d'installer l'app GitHub de Cloudflare sur le compte de Floriane (propriétaire du dépôt) et ajoute 1 à 3 minutes de build par merge. |
| Secours déploiement | Netlify drop ou `pnpm dlx serve dist` + tunnel Cloudflare (`cloudflared tunnel --url http://localhost:4173`) | Si wrangler tombe, un tunnel donne une URL publique en 10 secondes. |

Scripts `package.json` à poser au scaffold :

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "ship": "vite build && wrangler pages deploy dist --project-name arena --branch main --commit-dirty=true"
  }
}
```

Note : pas de `tsc -b` dans `build`. Une erreur de type ne doit jamais bloquer un déploiement à T+52. Vite compile le TS sans vérifier les types.

Supabase, si retenu : une table, colonnes en snake_case, `created_at` par défaut, policies `for all using (true) with check (true)` pour la démo. Clé anon et URL dans `.env` versionné (voir 2.9). Jamais la clé service_role.

### 1.6 Questions à poser aux organisateurs avant le 14

1. « Nothing is built in advance » couvre-t-il un dépôt outillé sans code produit (CLAUDE.md, hooks, .gitignore) et des comptes d'infrastructure vides ? Sinon, à quel moment peut-on les créer ?
2. Outils : nos machines, nos abonnements Claude, nos comptes Cloudflare et Supabase sont-ils autorisés ? Y a-t-il une stack imposée ou un outil interdit ?
3. Benjamin et Floriane sont-ils confirmés dans la même équipe (« get matched into a team ») ?
4. Démo : durée, écran projeté ou téléphones de la salle, qui présente, le public vote-t-il pendant ou après ?
5. Le brief est-il un thème large ou une commande précise ? Y a-t-il un lien avec un partenaire (Mylight150, Mobbin) ?
6. Peut-on discuter entre nous pendant les 10 minutes du Brief (19h05 à 19h15) ?
7. Le wifi de la salle et un secours 4G sont-ils prévus ? Combien d'écrans projetés par équipe ?

---

## Partie 2 : deux machines, plusieurs Claude, un seul dépôt

### 2.1 Le problème, précisément

- Deux machines, deux comptes GitHub, aucune mémoire partagée entre sessions Claude. Le seul point commun est `github.com/Floriane-ju/productbuilderarena` (vide, Floriane propriétaire, Benjamin invité en écriture ; l'invitation n'est pas encore acceptée, `gh repo view` confirme `isEmpty: true`).
- Sur une même machine, plusieurs sessions peuvent tourner (une par worktree) et chaque session peut lancer des sous-agents, éventuellement chacun dans un worktree (`isolation: "worktree"`).
- Les deux humains sont dans la même pièce. C'est le canal le plus rapide qui existe et il faut l'utiliser pour tout ce qui est décision. Le protocole ci-dessous ne sert qu'à ce que les Claude, eux, voient l'état sans qu'on le leur répète.

Ce que dit la doc Claude Code, utile ici [lu, code.claude.com/docs] :
- La messagerie entre sessions (`SendMessage`, `/list-agents`) fonctionne entre sessions **de la même machine** via une socket locale, ou vers ses **propres** sessions sur une autre machine via Remote Control. Elle ne relie pas le compte de Benjamin à celui de Floriane. Donc entre machines, il n'y a que git et GitHub.
- Les « agent teams » (task list partagée avec verrou de fichier, claims) sont expérimentales, limitées à une session et une machine. Pas utilisables entre deux machines.
- Les hooks de `.claude/settings.json` du dépôt s'exécutent dans les sous-agents aussi, et sont versionnables. Ils exigent que chaque personne ait accepté la confiance du dossier (« workspace trust ») sur sa machine.
- Dans un worktree, `${CLAUDE_PROJECT_DIR}` reste le dépôt principal, et le champ `cwd` du JSON reçu par le hook est le worktree. Les scripts ci-dessous utilisent `cwd`.
- Un sous-agent en `isolation: "worktree"` part de la branche par défaut (`origin/main`), pas du HEAD de la session, sauf `worktree.baseRef: "head"`. Son worktree est supprimé s'il n'a rien changé, conservé sinon, avec ses changements sur une branche `worktree-<nom>` que le parent doit fusionner. `claude --worktree <nom>` crée `.claude/worktrees/<nom>` sur la branche `worktree-<nom>` et exige un dépôt avec au moins un commit.
- `.worktreeinclude` copie dans chaque worktree créé par Claude les fichiers ignorés par git qu'il liste (`.env.local`, etc.). Il ne s'applique pas à `git worktree add` manuel.

### 2.2 Les pistes, comparées sur ce qui compte à J

Critères : (a) travail simultané ; (b) chaque Claude voit l'état au démarrage et pendant ; (c) jamais deux écritures sur le même fichier ; (d) fusions rapides sans conflit. Plus le coût en secondes par opération, parce qu'on en a 60 minutes.

| Piste | (a) | (b) | (c) | (d) | Coût | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| **Issues GitHub + labels + assignation, claim avant de commencer** | oui | bon : `gh issue list` est toujours à jour, sans merge | non par elle-même | neutre | 1 à 2 s par appel gh, une issue à créer par tâche, puis une branche, puis une PR : trois objets pour une tâche de 15 min | Trop d'objets. La PR fait le même travail de registre. |
| **Fichier de coordination versionné (registre de tâches et de fichiers réservés)** | oui | moyen : il faut `git fetch` et lire `origin/main:FICHIER`, et l'état est faux dès qu'une personne oublie de pousser | oui si tout le monde le lit | **mauvais** : le fichier devient le point de conflit numéro un, chaque réservation est un commit sur `main` qui entre en collision avec les fusions de code | un commit par changement d'état | Bon pour ce qui s'écrit une fois (le plan, les zones). Mauvais comme registre vivant. |
| **CLAUDE.md commun qui impose le protocole** | pas concerné | oui au démarrage, non pendant (Claude ne le relit pas) | oui si obéi | oui si obéi | zéro | Indispensable mais insuffisant : c'est une consigne, pas un mécanisme. |
| **Hooks versionnés dans `.claude/settings.json`** | pas concerné | **oui, au démarrage et à chaque prompt** (SessionStart + UserPromptSubmit) | **oui, mécaniquement** (PreToolUse qui refuse l'écriture hors zone) | indirect | 1 à 2 s par prompt (fetch + gh, en cache 45 s) | Le seul moyen de garantir (b) et (c) face à un Claude qui n'a pas relu l'état. |
| **Zones d'appartenance par dossier, plus zone partagée protégée** | oui | oui (le fichier `ZONES` se lit en 5 lignes) | **oui, structurellement** : deux zones ne partagent aucun fichier | **oui** : git fusionne sans conflit des fichiers différents | zéro pendant le build, 2 min à T+3 | La base de tout. |
| **Rythme de synchro (petits commits, rebase fréquent, merge régulier, un intégrateur)** | oui | indirect | non | **oui** : des branches courtes et à jour se fusionnent en 2 s | discipline | Nécessaire, à inscrire dans le CLAUDE.md et à rappeler par le hook. |

Deux constats sortent du tableau. D'abord, la seule chose qui rend les conflits impossibles, c'est le découpage par zones ; tout le reste sert à ce que les Claude respectent ce découpage et sachent où en sont les autres. Ensuite, sous chrono, le registre le moins cher est celui qu'on obtient gratuitement : une branche poussée et sa PR draft. `gh pr list` est le tableau de bord, il est atomique côté GitHub, il n'exige aucun commit sur `main`, et il ne peut pas être « oublié » puisqu'on doit de toute façon pousser pour être fusionné.

### 2.3 Recommandation

**Découpage par zones + PR draft comme réservation + `main` comme unique point d'intégration, tenu par Benjamin + hooks versionnés qui injectent l'état à chaque prompt et refusent les écritures hors zone.** Le tout décrit dans un `CLAUDE.md` commun de moins de 60 lignes.

Concrètement :

1. **Zones.** `ZONES` (fichier texte, écrit une fois à T+3 par Benjamin, lu par le hook) liste : l'intégrateur, la zone `shared` (types, routes, `App.tsx`, `main.tsx`, `index.html`, `package.json`, `pnpm-lock.yaml`, CSS global), une zone par personne (`src/features/<nom>/`), et une zone `any` (`docs/`, `PLAN.md`). Chaque feature vit dans son dossier et exporte une page dont le nom est fixé à T+3. Personne n'écrit chez l'autre. La zone partagée n'est écrite que par l'intégrateur, sur demande orale.
2. **Réservation = PR draft.** Une tâche commence par : branche `<moi>/<tâche>` depuis `origin/main`, commit vide `start: <tâche>`, push, `gh pr create --draft --label zone:<moi>`. Fin de tâche : `gh pr ready`. Le titre de la PR est la tâche. `gh pr list` montre qui fait quoi, en cours ou prêt, des deux côtés, sans aucune écriture dans le dépôt.
3. **Un seul intégrateur.** Benjamin fusionne (`gh pr merge N --merge --delete-branch`) toutes les 8 à 10 minutes et à T+30, T+40, T+48, T+53, puis `pnpm ship`. Floriane ne fusionne jamais elle-même : ça évite deux merges croisés et deux `pnpm ship` concurrents. Si Benjamin est bloqué, il le dit et Floriane prend le rôle pour un cycle ; on ne change pas `ZONES` pour ça.
4. **Hooks.** SessionStart et UserPromptSubmit impriment l'état (derniers commits de `origin/main`, PR ouvertes, ma branche, mon retard sur `main`, `PLAN.md`, `ZONES`). PreToolUse sur Edit/Write refuse d'écrire hors de sa zone, en zone partagée si on n'est pas l'intégrateur, et sur `main` si on n'est pas l'intégrateur. Le refus contient la marche à suivre, donc le Claude se corrige seul.
5. **Rythme.** Commit toutes les 5 à 8 min. Avant chaque push : `git fetch && git rebase origin/main` (sans conflit possible si les zones sont respectées, hors zone partagée). Après chaque fusion annoncée à voix haute, chacun rebase.
6. **Identité de chaque machine** : un fichier `.arena-owner` ignoré par git, contenant `ben` ou `flo`, lu par les hooks (avec repli sur le dépôt principal quand on est dans un worktree, et sur le préfixe de branche sinon).

Ce qui reste hors mécanisme et passe par la voix : les décisions de scope, les changements de types ou de routes, les ajouts de dépendances, l'annonce des fusions.

### 2.4 Comment ça se passe pour un Claude, du début à la fin d'une tâche

1. Il démarre (ou reçoit un prompt) : le hook lui imprime l'état partagé. Il sait qu'il est `flo`, sur `flo/board`, 2 commits derrière `main`, que `#4 [en cours] capture form · Benjaminnespou` existe, et que sa zone est `src/features/board/`.
2. Le CLAUDE.md lui dit de commencer par `git fetch && git rebase origin/main`, puis de créer sa PR draft s'il n'en a pas.
3. Il écrit dans `src/features/board/`. S'il tente `src/shared/types.ts`, le hook refuse avec « zone partagée, seul l'intégrateur (ben) y écrit : envoie-lui le changement voulu ». Il formule alors le changement en une phrase pour son humain, qui le dit à Benjamin.
4. Il commit et pousse régulièrement. Avant de finir : rebase, push, `gh pr ready`, et son compte rendu se termine par « PR #N prête, fichiers touchés : … ».
5. Benjamin voit `[prêt à fusionner]` dans son prochain état, fusionne, ship, annonce.

### 2.5 Sessions et sous-agents sur une même machine

- **Une session par tâche, dans son propre worktree**, plutôt que des sous-agents en worktree. Raisons : la branche porte le bon nom (`ben/<tâche>`), l'humain voit et pilote chaque session, et rien n'attend la fin d'un sous-agent pour être poussé. Commandes :
  ```bash
  git fetch origin
  git worktree add ../arena-<tâche> -b ben/<tâche> origin/main
  cd ../arena-<tâche> && pnpm install --prefer-offline && claude
  ```
  `pnpm install` dans un nouveau worktree prend quelques secondes grâce au store partagé de pnpm. Sur la machine de Benjamin, `.arena-owner` est trouvé par repli dans le dépôt principal, rien à copier.
- **Les sous-agents restent dans le worktree de leur session**, sans `isolation: "worktree"`, et ne servent qu'à des tâches internes à la zone (une recherche, un composant). Si Benjamin tient vraiment à `isolation: "worktree"`, poser `"worktree": { "baseRef": "head" }` dans `settings.json` pour que le sous-agent parte du HEAD de la branche et non de `main`, puis fusionner sa branche `worktree-<nom>` dans la branche de la session avant de pousser. C'est une étape de plus sous chrono ; je le déconseille.
- **`claude --worktree <nom>`** marche aussi (crée `.claude/worktrees/<nom>` sur `worktree-<nom>`), mais la branche ne porte pas le préfixe `ben/` : le hook lit alors `.arena-owner` (copié via `.worktreeinclude`), donc ça reste protégé. Renommer la branche avant de pousser : `git branch -m ben/<tâche>`.
- **Ports de dev** : Vite prend le port suivant s'il est occupé (5173, 5174, …) et l'affiche. Ne pas mettre `strictPort`. Un seul `pnpm dev` par humain suffit ; les autres sessions se contentent de `vite build` pour vérifier que ça compile.
- **Messagerie locale** : entre les sessions de Benjamin, `SendMessage` fonctionne. Utile pour « j'ai poussé le socle, rebase » sans repasser par l'humain. Entre machines, ça n'existe pas : c'est git et la voix.

### 2.6 Les pièges et la réponse à chacun

| Piège | Réponse |
| --- | --- |
| Latence GitHub | Chaque `gh` prend 1 à 2 s. Le hook d'état met en cache 45 s, donc ça ne pèse que sur un prompt sur trois environ. Aucune écriture ne dépend de GitHub : on pousse quand on veut, la PR draft est créée une fois. |
| Deux Claude réservent la même tâche | Les tâches sont distribuées à T+3 par les humains, par zone : un Claude n'invente pas de tâche hors de sa zone. Si deux PR portent le même titre, la plus ancienne (numéro plus petit) gagne, l'autre se ferme. Le hook d'état montre les deux. |
| `package.json` et `pnpm-lock.yaml` | Zone partagée : seul l'intégrateur ajoute des dépendances, et toutes celles qu'on peut prévoir sont posées au socle (T+5). En cas de conflit sur le lockfile malgré tout : `git checkout origin/main -- pnpm-lock.yaml package.json && pnpm add <ce qui manque> && git add -A && git rebase --continue`. |
| Routes | `src/routes.tsx` est écrit une fois au socle avec des pages vides nommées d'avance (`CapturePage`, `BoardPage`). Chaque feature remplit son fichier `src/features/<zone>/index.tsx` qui exporte ce nom. Personne ne retouche les routes après T+10. |
| Types | `src/shared/types.ts` écrit au socle. Un changement se demande à voix haute, Benjamin l'écrit, pousse sur `main`, annonce « types poussés, rebase ». |
| `.env` non versionné | Voir 2.9 : on versionne un `.env` avec uniquement des valeurs publiques (`VITE_SUPABASE_URL`, clé anon). Rien de secret ne rentre jamais dans le dépôt ni à l'écran. `.env.local` reste ignoré et listé dans `.worktreeinclude`. |
| Ports en double | Vite bascule tout seul sur le port libre suivant. |
| Un Claude qui ne relit pas l'état | Il n'a pas le choix : l'état est injecté à chaque prompt par le hook UserPromptSubmit, et l'écriture hors zone est refusée par le hook PreToolUse. |
| Un Claude qui pousse sur `main` | Le hook refuse d'écrire sur `main` sauf pour l'intégrateur. Par sécurité en plus, activer la protection de branche sur GitHub (Floriane, propriétaire, dans Settings > Branches : « Require a pull request before merging », sans review obligatoire, et autoriser les admins à contourner pour que Benjamin puisse pousser le socle). Si ça gêne à T+5, la désactiver prend 10 secondes. |
| Une PR qui ne fusionne pas | Ça n'arrive que si la zone partagée a bougé. L'auteur fait `git fetch && git rebase origin/main`, résout, `git push --force-with-lease`. Deux minutes max, sinon on abandonne la PR et on repart de `main`. |
| Le hook plante ou ralentit | `"disableAllHooks": true` dans `.claude/settings.local.json` de la machine concernée, et on retombe sur le CLAUDE.md seul. À décider à voix haute, pas en silence. |
| Une machine tombe | Tout est sur GitHub toutes les 8 minutes au pire. L'autre machine ouvre un deuxième worktree sur la branche orpheline et continue. |

### 2.7 Les fichiers prêts à copier

Tous ces fichiers vont à la racine du dépôt `productbuilderarena`, sauf mention contraire. Aucun n'est du code produit.

#### `CLAUDE.md`

```markdown
# Arena : protocole pour tous les Claude du dépôt

Deux humains (Benjamin = `ben`, Floriane = `flo`), deux machines, plusieurs sessions Claude,
60 minutes chrono. Ce dépôt est le seul lien entre les machines. Lis ce fichier en entier.

## Qui je suis
- Mon identité est dans `.arena-owner` (ben ou flo). Les hooks la lisent aussi.
- Ma zone est dans `ZONES`. Je n'écris que dans ma zone (le hook refuse le reste).
- L'intégrateur (première ligne de `ZONES`) est le seul à écrire en zone `shared` et sur `main`.

## Ce que je fais au démarrage et à chaque prompt
- Le hook m'imprime l'état partagé : `origin/main`, PR ouvertes, ma branche, `PLAN.md`, `ZONES`.
  Je le lis avant d'agir. Une PR `[en cours]` = quelqu'un travaille dessus, je n'y touche pas.
- Si je ne suis pas sur une branche `<moi>/<tâche>` : `git fetch origin && git switch -c <moi>/<tâche> origin/main`.
- Si je suis en retard sur `origin/main` : `git fetch && git rebase origin/main` avant d'écrire.

## Réserver une tâche = ouvrir une PR draft
git commit --allow-empty -m "start: <tâche>" && git push -u origin HEAD
gh pr create --draft --title "<tâche>" --body "zone: <moi>" --label "zone:<moi>"
Une seule PR par tâche. Si une PR du même nom existe déjà, je m'arrête et je le dis.

## Pendant le travail
- Commit + push toutes les 5 à 8 minutes, message préfixé par la zone : `board: liste des cartes`.
- Je n'ajoute pas de dépendance, je ne touche ni aux types, ni aux routes, ni à `package.json` :
  je formule le changement en une phrase et je le remonte à mon humain, qui le dit à l'intégrateur.
- Mobile d'abord (390 px), zéro auth, zéro formulaire long. Le public teste sur téléphone.
- Pas de secret dans le code, ni dans les prompts, ni dans les logs : les écrans sont projetés.
- `pnpm` uniquement, jamais `npm`.

## Finir une tâche
git fetch && git rebase origin/main && git push --force-with-lease && gh pr ready
Mon compte rendu se termine par : `PR #<n> prête · fichiers : <liste>` ou `PR #<n> en cours · bloqué par : <quoi>`.
Je ne fusionne pas moi-même : l'intégrateur fusionne et déploie (`pnpm ship`).

## Intégrateur seulement
- Fusion : `gh pr merge <n> --merge --delete-branch`, puis `git pull` sur `main`, puis `pnpm ship`.
- Modification de zone partagée : sur `main` directement, commit `shared: <quoi>`, push, et l'annoncer.
```

#### `ZONES` (écrit à T+3, première correspondance gagne, préfixes de chemin)

```text
# owner    prefixe (dossier terminé par / ou fichier exact). Première ligne qui correspond gagne.
integrator ben
shared  src/shared/
shared  src/routes.tsx
shared  src/App.tsx
shared  src/main.tsx
shared  src/index.css
shared  index.html
shared  package.json
shared  pnpm-lock.yaml
shared  vite.config.ts
ben     src/features/capture/
flo     src/features/board/
any     public/
any     docs/
any     PLAN.md
```

Les noms `capture` et `board` sont des exemples : à remplacer à T+3 par les deux features du brief. Un chemin qui ne correspond à aucune ligne est autorisé (le hook laisse passer) : ajouter une ligne dès qu'un nouveau dossier apparaît.

#### `PLAN.md` (écrit à T+0 à T+5, modifié ensuite seulement par l'intégrateur)

```markdown
# Plan · <nom du produit>

Brief (mot pour mot) : …
Produit en une phrase : <qui> peut <quoi> en <temps>.
Parcours (3 écrans max) : 1. … 2. … 3. …
Wow (un seul, après T+38 seulement) : …
Données : localStorage | Supabase (table `…`)
Intégrateur : ben · déploiement : `pnpm ship` · URL : https://arena.pages.dev

## Tâches
| Zone | Qui | Tâche | État |
| --- | --- | --- | --- |
| shared | ben | socle : scaffold, types, routes, ship hello | |
| capture | ben | … | |
| board | flo | … | |
| any | flo | textes des écrans, données d'exemple, pitch | |
```

L'état vivant n'est pas dans ce tableau mais dans `gh pr list`. Le tableau sert à ce que chaque Claude connaisse le découpage initial.

#### `.arena-owner` (un par machine, ignoré par git)

```text
ben
```

et `flo` sur la machine de Floriane.

#### `.gitignore` (partie coordination, en plus de celui de Vite)

```text
node_modules
dist
.env.local
.arena-owner
.claude/worktrees/
.claude/settings.local.json
```

#### `.worktreeinclude`

```text
.env.local
.arena-owner
```

#### `.claude/settings.json`

Syntaxe vérifiée contre la doc hooks (code.claude.com/docs/en/hooks) le 30/09/2026 : structure `hooks > Événement > [{ matcher?, hooks: [{ type, command, timeout, statusMessage? }] }]`, matcher `Edit|Write|NotebookEdit` pour PreToolUse, pas de matcher pour SessionStart (donc toutes les sources : startup, resume, clear, compact) ni pour UserPromptSubmit. Le stdout texte de SessionStart et UserPromptSubmit est ajouté au contexte ; PreToolUse décide via JSON `hookSpecificOutput.permissionDecision`. JSON validé avec `jq`.

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash \"${CLAUDE_PROJECT_DIR}/.claude/hooks/arena-state.sh\"",
            "timeout": 20,
            "statusMessage": "Lecture de l'état Arena (main, PR, zones)"
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash \"${CLAUDE_PROJECT_DIR}/.claude/hooks/arena-state.sh\"",
            "timeout": 15
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Edit|Write|NotebookEdit",
        "hooks": [
          {
            "type": "command",
            "command": "bash \"${CLAUDE_PROJECT_DIR}/.claude/hooks/arena-zones.sh\"",
            "timeout": 10
          }
        ]
      }
    ]
  },
  "permissions": {
    "allow": [
      "Bash(git *)",
      "Bash(gh pr *)",
      "Bash(pnpm *)",
      "Bash(wrangler *)"
    ]
  }
}
```

`${CLAUDE_PROJECT_DIR}` pointe toujours vers le dépôt principal, y compris dans un worktree [lu], et les scripts y sont versionnés : c'est voulu. Les scripts lisent `cwd` dans le JSON pour savoir dans quel worktree ils sont.

#### `.claude/hooks/arena-state.sh` (testé le 30/09 sur un dépôt local)

```bash
#!/bin/bash
# SessionStart + UserPromptSubmit : imprime l'état partagé (main, PR ouvertes, ma branche).
# Sortie texte = ajoutée au contexte de Claude. Cache 45 s pour ne pas ralentir chaque prompt.
INPUT=$(cat)
CWD=$(printf '%s' "$INPUT" | jq -r '.cwd // empty')
[ -z "$CWD" ] && CWD=$(pwd)
ROOT=$(git -C "$CWD" rev-parse --show-toplevel 2>/dev/null) || exit 0
EVENT=$(printf '%s' "$INPUT" | jq -r '.hook_event_name // "SessionStart"')

owner_file() {
  local f
  f="$ROOT/.arena-owner"; [ -f "$f" ] && { echo "$f"; return; }
  f="$(git -C "$CWD" rev-parse --git-common-dir 2>/dev/null)/../.arena-owner"; [ -f "$f" ] && echo "$f"
}

CACHE="${TMPDIR:-/tmp}/arena-state-$(id -u).txt"
if [ "$EVENT" = "UserPromptSubmit" ] && [ -f "$CACHE" ]; then
  AGE=$(( $(date +%s) - $(stat -f %m "$CACHE" 2>/dev/null || stat -c %Y "$CACHE") ))
  if [ "$AGE" -lt 45 ]; then cat "$CACHE"; exit 0; fi
fi

git -C "$CWD" fetch -q origin 2>/dev/null
ME=$(head -n1 "$(owner_file)" 2>/dev/null | tr -d '[:space:]')
BRANCH=$(git -C "$CWD" branch --show-current 2>/dev/null)
BEHIND=$(git -C "$CWD" rev-list --count "HEAD..origin/main" 2>/dev/null || echo "?")
DIRTY=$(git -C "$CWD" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
REPO=$(git -C "$CWD" remote get-url origin 2>/dev/null | sed -E 's#.*github.com[:/]##; s#\.git$##')

{
  echo "## ARENA : état partagé ($(date +%H:%M))"
  echo "Moi : ${ME:-inconnu} · branche : ${BRANCH:-?} · en retard sur origin/main : $BEHIND commit(s) · fichiers non commités : $DIRTY"
  echo "### Derniers commits sur origin/main"
  git -C "$CWD" log --format='- %h %s (%an, %cr)' -6 origin/main 2>/dev/null || echo "- (pas encore de main distant)"
  echo "### PR ouvertes = tâches en cours (gh pr list)"
  gh pr list --repo "$REPO" --state open --json number,title,author,isDraft,headRefName \
     --template '{{range .}}- #{{.number}} {{if .isDraft}}[en cours]{{else}}[prêt à fusionner]{{end}} {{.title}} · {{.author.login}} · {{.headRefName}}{{"\n"}}{{end}}' 2>/dev/null \
     || echo "- (gh indisponible ou dépôt sans PR)"
  [ -f "$ROOT/PLAN.md" ] && { echo "### PLAN.md"; cat "$ROOT/PLAN.md"; }
  [ -f "$ROOT/ZONES" ] && { echo "### ZONES"; grep -v '^#' "$ROOT/ZONES"; }
} | tee "$CACHE"
```

#### `.claude/hooks/arena-zones.sh` (testé le 30/09 : refuse hors zone, refuse la zone partagée aux non-intégrateurs, refuse `main` aux non-intégrateurs, laisse passer le reste)

```bash
#!/bin/bash
# PreToolUse (Edit|Write|NotebookEdit) : refuse d'écrire hors de sa zone.
INPUT=$(cat)
FILE=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // empty')
CWD=$(printf '%s' "$INPUT" | jq -r '.cwd // empty')
[ -z "$FILE" ] || [ -z "$CWD" ] && exit 0

ROOT=$(git -C "$CWD" rev-parse --show-toplevel 2>/dev/null) || exit 0
ZONES="$ROOT/ZONES"
[ -f "$ZONES" ] || exit 0

owner_file() {
  local f
  f="$ROOT/.arena-owner"; [ -f "$f" ] && { echo "$f"; return; }
  f="$(git -C "$CWD" rev-parse --git-common-dir 2>/dev/null)/../.arena-owner"; [ -f "$f" ] && echo "$f"
}
ME=$(head -n1 "$(owner_file)" 2>/dev/null | tr -d '[:space:]')
BRANCH=$(git -C "$CWD" branch --show-current 2>/dev/null)
[ -z "$ME" ] && ME=$(printf '%s' "$BRANCH" | cut -d/ -f1)
INTEGRATOR=$(awk '$1=="integrator"{print $2; exit}' "$ZONES")

deny() {
  jq -nc --arg r "$1" '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
  exit 0
}

case "$FILE" in
  "$ROOT"/*) REL="${FILE#"$ROOT"/}" ;;
  *) exit 0 ;;   # hors dépôt : pas notre affaire
esac

if [ "$BRANCH" = "main" ] && [ "$ME" != "$INTEGRATOR" ]; then
  deny "Tu es sur main. Crée une branche $ME/<tache> avant d'écrire ($REL)."
fi

OWNER=""
while read -r owner prefix _; do
  case "$owner" in ""|"#"*|integrator) continue ;; esac
  case "$REL" in "$prefix"*) OWNER="$owner"; break ;; esac
done < "$ZONES"

[ -z "$OWNER" ] && exit 0
[ "$OWNER" = "any" ] && exit 0
[ "$OWNER" = "$ME" ] && exit 0
if [ "$OWNER" = "shared" ]; then
  [ "$ME" = "$INTEGRATOR" ] && exit 0
  deny "$REL est en zone partagée (types, routes, deps). Seul l'intégrateur ($INTEGRATOR) y écrit : remonte le changement voulu à ton humain au lieu d'éditer."
fi
deny "$REL appartient à la zone de $OWNER, pas à $ME. Reste dans ta zone ou demande à $OWNER."
```

Après copie : `chmod +x .claude/hooks/*.sh`. Les deux scripts n'ont besoin que de `bash`, `git`, `jq` (présent sur la machine de Benjamin : `/usr/bin/jq`) et `gh`. À vérifier chez Floriane.

Limites connues des hooks, à connaître :
- Le refus ne s'applique qu'aux outils Edit, Write et NotebookEdit. Un `sed -i` en Bash passe. Le CLAUDE.md compense ; en pratique Claude n'écrit pas de code via sed.
- Le cache d'état de 45 s est partagé par toutes les sessions de la machine (un seul fichier par utilisateur) : la ligne « Moi / branche » peut afficher celle d'une autre session pendant 45 s. Si ça gêne, remplacer `arena-state-$(id -u)` par `arena-state-$(id -u)-$(printf '%s' "$CWD" | md5 | cut -c1-8)` (sur macOS ; `md5sum` sur Linux).
- Rien n'empêche deux personnes de mettre des noms de zones différents dans `ZONES` sur deux branches : c'est pour ça que `ZONES` est écrit une fois par l'intégrateur sur `main` et jamais modifié ailleurs.

#### Labels GitHub (créés par Floriane avant le jour J, ou à T+2 : 10 secondes)

```bash
gh label create "zone:ben" --color 1D76DB --repo Floriane-ju/productbuilderarena
gh label create "zone:flo" --color D93F0B --repo Floriane-ju/productbuilderarena
gh label create "zone:shared" --color 5319E7 --repo Floriane-ju/productbuilderarena
```

Ils ne sont pas indispensables (le titre et l'auteur suffisent au hook), mais rendent `gh pr list` et la page GitHub lisibles sur l'écran projeté.

### 2.8 Gabarits de prompts (à garder en texte, pas en code)

**Socle (Benjamin, T+5)**
> Crée une app Vite React TypeScript avec pnpm dans ce dossier (déjà un dépôt git, ne touche pas à `.claude/`, `CLAUDE.md`, `ZONES`, `PLAN.md`). Tailwind v4 via `@import "tailwindcss"`. react-router avec `src/routes.tsx` qui déclare deux pages vides : `CapturePage` importée de `src/features/capture/index.tsx` et `BoardPage` de `src/features/board/index.tsx`, chacune affichant son nom. `src/shared/types.ts` contient : <coller le modèle>. Scripts `dev`, `build` (vite build seul) et `ship` (voir PLAN.md). `index.html` : titre « <produit> », viewport mobile, `theme-color`. Puis `pnpm ship` et donne-moi l'URL. Commit `socle` sur main et push. Pas de tests, pas de README.

**Feature (chacun, T+12)**
> Lis PLAN.md et ZONES. Tu es `<moi>`, ta zone est `src/features/<zone>/`. Le brief : <coller>. Ta page `<Nom>Page` doit permettre à <qui> de <quoi> en 3 interactions max, sur téléphone (390 px de large), sans login. Données : <localStorage via src/shared/storage.ts | table Supabase `x` via src/shared/supabase.ts>, en respectant les types de `src/shared/types.ts` sans les modifier. Commence par créer ta branche et ta PR draft comme décrit dans CLAUDE.md, commit et push toutes les 5 minutes. Quand le parcours marche dans `pnpm dev`, passe la PR en prête et dis-moi les fichiers touchés.

**Polish mobile (T+48)**
> Sur ta zone uniquement : zones tactiles d'au moins 44 px, texte 16 px minimum, états vides avec une phrase, erreurs affichées, pas de scroll horizontal à 390 px, retour visuel sur chaque action. Ne change aucune fonctionnalité. Commit, push, PR prête.

### 2.9 Déploiement, secrets et propagation

- **Projet Cloudflare Pages** : `wrangler pages project create arena --production-branch main` (une fois). Le `pnpm ship` du socle donne `https://arena.pages.dev` (ou `https://arena-xxx.pages.dev` si le nom est pris : le choisir la veille, ou à T+6).
- **Qui déploie** : seulement l'intégrateur, depuis son `main` fraîchement `git pull`. Une session dédiée « intégration » sur la machine de Benjamin, qui ne fait que `gh pr merge`, `git pull`, `pnpm ship`.
- **Propagation** : d'après l'expérience de Benjamin sur ses autres apps, tester immédiatement après un déploiement peut encore servir l'ancienne version. Parade : afficher le SHA court du commit dans le pied de page (`import.meta.env.VITE_SHA`, injecté par `VITE_SHA=$(git rev-parse --short HEAD) pnpm ship`) et vérifier ce SHA sur le téléphone avant de dire « c'est en ligne ». Jamais de rollback Cloudflare : ça fige le cache.
- **Secrets** : `.env` versionné contenant uniquement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` (la clé anon est publique par conception, elle finit de toute façon dans le bundle). Rien d'autre. `.env.local` ignoré, pour tout ce qui serait personnel. Les écrans sont projetés : ne jamais afficher un `cat .env`, un `wrangler whoami` détaillé, ni le dashboard Supabase avec la clé service_role.
- **Secours** : si `wrangler` échoue deux fois, `pnpm dlx serve dist -l 4173` et `cloudflared tunnel --url http://localhost:4173` donnent une URL publique en 10 secondes depuis la machine de Benjamin (installer `cloudflared` avant le jour J).

### 2.10 Checklist avant le jour J

**Les deux, dès maintenant**
- [ ] Envoyer les 7 questions de 1.6 aux organisateurs, par écrit.
- [ ] Benjamin accepte l'invitation GitHub (`gh api -X PATCH /user/repository_invitations/<id>` ou depuis le site).
- [ ] Floriane pousse le premier commit : `CLAUDE.md`, `ZONES` (vide sauf la ligne `integrator ben`), `PLAN.md` (gabarit), `.gitignore`, `.worktreeinclude`, `.claude/settings.json`, `.claude/hooks/*.sh` exécutables. Aucun code produit. Si les organisateurs le refusent, garder ces fichiers dans un gist privé.
- [ ] Floriane crée les trois labels `zone:*` et, si vous le voulez, la protection de branche `main` (PR obligatoire, pas de review, admins exemptés).
- [ ] Chacun clone, lance `claude` une fois dans le dossier et accepte la confiance du dossier (sinon les hooks du dépôt ne tournent pas). Vérifier que l'état Arena s'affiche au démarrage.
- [ ] Chacun crée son `.arena-owner`.
- [ ] Machines : Node 22+, `pnpm` (Benjamin : 10.34.5, présent), `gh` connecté (Benjamin : compte Benjaminnespou, présent), `jq` (Benjamin : présent), `wrangler` (Benjamin : **absent**, `pnpm add -g wrangler && wrangler login`), `cloudflared` (secours), Claude Code à jour (sur la machine de Benjamin, `claude` n'est pas dans le PATH du shell des agents : vérifier `claude --version` dans son terminal habituel).
- [ ] Benjamin : `wrangler pages project create arena` et un `pnpm ship` d'un `dist/` bidon pour vérifier le compte, puis supprimer le déploiement de test. Vérifier le nom `arena.pages.dev` disponible, sinon choisir le nom la veille.
- [ ] Supabase : un projet vide « arena » créé, URL et clé anon notées, à ne remplir qu'à T+6 si le brief l'exige.

**Répétition générale (deux fois, une semaine et deux jours avant, 75 minutes chacune)**
- [ ] Brief inventé par un tiers, chrono réel, deux machines, protocole complet, ship à T+10 et à T+53, démo de 3 minutes. Objectif de la première : que les hooks et les fusions passent sans conflit. Objectif de la seconde : un produit qui tient sur téléphone.
- [ ] Après chaque répétition : noter les 3 frictions, corriger le CLAUDE.md, supprimer tout le code (`git rm -r src public index.html package.json pnpm-lock.yaml …`, commit « reset ») pour arriver le 14 avec un dépôt sans code produit.
- [ ] Mesurer : durée réelle du scaffold, du premier ship, d'une fusion, du `pnpm install` dans un worktree.

**La veille**
- [ ] `git pull`, `pnpm store prune`, mise à jour de Claude Code et de wrangler, un dernier `claude` pour vérifier les hooks.
- [ ] Charger les téléphones, prévoir un câble de projection, un partage de connexion 4G, la police du terminal en gros.
- [ ] Relire 1.3 ensemble, et se répartir le pitch.

**Le jour J, avant 19h00**
- [ ] `gh auth status`, `wrangler whoami`, `git fetch`, `.arena-owner` en place, terminal projetable.
- [ ] Un onglet ouvert sur `github.com/Floriane-ju/productbuilderarena/pulls` sur chaque machine.

---

## Ce qui manque encore

- Le replay et le gagnant de l'édition de mai (la chaîne YouTube ne publie rien d'accessible) : si Benjamin retrouve le lien, le regarder change probablement plusieurs choix de 1.2 (ce qui a fait voter la salle, la longueur des démos, le niveau des produits).
- La réponse des organisateurs sur la zone grise de 1.4 conditionne la checklist : dépôt outillé avant, ou tout à T+0.
- La composition de l'équipe (« get matched ») n'est pas confirmée sur le site.

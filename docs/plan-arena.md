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
- Écrire dans `PLAN.md` (voir gabarit en 2.7) : la phrase produit, le parcours en 3 écrans max, les 2 features (une par personne), le « wow », la décision base de données (Supabase ou localStorage).
- Découper : Benjamin = socle + feature A ; Floriane = feature B + contenu/pitch. Écrire `ZONES` (voir 2.7).
- Chacun donne à son Claude le brief complet, la phrase produit et sa zone.

**T+5 à T+12 : socle (Benjamin) et préparation (Floriane)**
- Benjamin, session socle, sur la branche `ben/socle` avec une PR draft `zone:shared` (il prend le verrou partagé, voir 2.3) : scaffold Vite React TS, Tailwind, `src/shared/types.ts` (le modèle de données, 20 lignes), `src/routes.tsx` avec des pages vides nommées d'avance, `index.html` (titre, viewport, thème couleur). Il fusionne aussitôt (`gh pr merge`) : l'Action GitHub déploie toute seule et l'URL publique affiche « Hello + nom du produit » une à deux minutes plus tard. Annoncer à voix haute « socle fusionné ».
- Floriane, pendant ce temps, sur sa branche : prompts détaillés de sa feature, données d'exemple (JSON) au format des types, texte des écrans, plan de pitch. Dès que le socle est poussé, `git pull`, et sa session Claude démarre sa feature.
- Si Supabase : Benjamin, toujours sous le verrou du socle, crée la table (une seule) et publie l'URL et la clé anon dans `.env` versionné (voir 2.9) dans ce même créneau. Pas de RLS fine : des policies « tout le monde lit et écrit » pour la démo, en le disant à voix haute.

**T+12 à T+38 : construction en parallèle**
- Chaque personne pilote 1 à 2 sessions Claude, chacune dans son worktree et sa branche `ben/<tâche>` ou `flo/<tâche>`, avec une PR draft ouverte dès la première minute (c'est la réservation, voir 2.4).
- Commit et push toutes les 5 à 8 minutes, même moche. Message court, préfixé par la zone.
- T+20 : premier point voix, 30 secondes : « où j'en suis, ce qui bloque ». Un changement en zone partagée (types, routes, deps, table Supabase) se fait sous le verrou partagé : une petite PR `zone:shared`, fusionnée tout de suite, annoncée à voix haute.
- Chacun fusionne lui-même sa PR dès qu'un morceau tient (même partiel), sans attendre l'autre. L'Action déploie à chaque fusion : l'URL évolue devant le public.

**T+38 à T+48 : intégration et premier test téléphone**
- Chacun fusionne ce qu'il a de prêt (`gh pr merge`). Une fois le déploiement fini (SHA du pied de page = dernier commit de `main`), les deux testent l'URL sur leur téléphone en suivant le parcours du brief.
- On note les 3 bugs les plus visibles. Pas plus. Chacun corrige dans sa zone.
- Le « wow » démarre ici seulement si le parcours principal tient. Sinon on l'abandonne, sans débat.

**T+48 à T+55 : polish mobile et gel**
- Hauteurs tactiles, textes lisibles, états vides, messages d'erreur, favicon et titre d'onglet, un pied de page avec le nom du produit.
- T+52 : gel des features. Dernières fusions, attendre la fin du déploiement (une à deux minutes), test du parcours complet sur les deux téléphones. Vérifier que c'est bien la nouvelle version qui est en ligne (voir 2.9, propagation Cloudflare).

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
- Connaître par cœur sa stack : quelle commande crée le projet, combien de temps prend un déploiement par l'Action GitHub, comment Vite gère les ports en double.
- Avoir installé et mis à jour : Node, pnpm, wrangler, gh, Claude Code, jq, le dépôt cloné et la confiance du dossier acceptée.

### 1.5 Stack recommandée

Contraintes de Benjamin : pnpm obligatoire (un hook global bloque `npm install`), déploiement sur Cloudflare Pages, Supabase si base. Le site ne mentionne aucune restriction d'outil [lu : rien sur le sujet], donc compatible, sous réserve de la question 2 en 1.6.

| Brique | Choix | Pourquoi |
| --- | --- | --- |
| Scaffold | `pnpm create vite@latest arena --template react-ts` | 20 secondes, Claude le connaît par cœur, HMR immédiat. |
| Style | Tailwind v4 (`@import "tailwindcss"` dans un seul CSS) | Zéro config, tout dans le JSX, Claude produit du mobile-first sans friction. Pas de design system importé (règle zero-day). |
| Routing | react-router, fichier unique `src/routes.tsx` | Une page par écran, chaque feature exporte sa page. Si le produit tient en un écran, pas de router du tout. |
| Données | localStorage par défaut. Supabase seulement si le brief exige un état partagé entre visiteurs (vote, mur, classement). | Supabase ajoute 5 minutes et un risque. Un état partagé est souvent le « wow » qui fait voter la salle. Décision à T+3, pas après. |
| Déploiement | Une GitHub Action déploie sur Cloudflare Pages à chaque push sur `main` (fichier en 2.7) | Chacun fusionne quand il veut, et personne ne déploie à la main : la version en ligne est toujours le dernier `main`, jamais un `main` local en retard qui effacerait la feature de l'autre. Deux fusions rapprochées : l'Action annule le déploiement le plus ancien au profit du plus récent, qui contient les deux. Compter une à deux minutes par déploiement. `pnpm ship` reste en secours manuel. |
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

`ship` ne sert qu'en secours, si l'Action tombe : lancé à la main depuis un `main` à jour (`git pull` d'abord), jamais par deux personnes en même temps.

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

Révisée le 30/09/2026 : plus d'intégrateur unique. Chacun fusionne ses propres PR, le déploiement est automatique, et la zone partagée se prend comme un verrou.

### 2.1 Le problème, précisément

- Deux machines, deux comptes GitHub, aucune mémoire partagée entre sessions Claude. Le seul point commun est `github.com/Floriane-ju/productbuilderarena` (Floriane propriétaire, Benjamin en écriture depuis le 30/09). Le dépôt est **public** : tout ce qu'on y pousse, ce plan compris, est lisible par l'équipe adverse.
- Sur une même machine, plusieurs sessions peuvent tourner (une par worktree) et chaque session peut lancer des sous-agents, éventuellement chacun dans un worktree (`isolation: "worktree"`).
- La contrainte de base : **chacun avance à son rythme, fusionne quand il est prêt, sans attendre l'autre, et sait vite ce que l'autre fait.**
- Les deux humains sont dans la même pièce. La voix reste le canal le plus rapide pour les décisions ; le protocole ci-dessous sert à ce que les Claude, eux, voient l'état sans qu'on le leur répète.

Ce que dit la doc Claude Code, utile ici [lu, code.claude.com/docs] :
- La messagerie entre sessions (`SendMessage`) relie les sessions **d'un même compte** (même machine, ou autres machines via Remote Control). Elle ne relie pas le compte de Benjamin à celui de Floriane. Entre les deux, il n'y a que git et GitHub.
- Les « agent teams » (task list partagée, claims) sont expérimentales, limitées à une session et une machine.
- Les hooks de `.claude/settings.json` du dépôt s'exécutent aussi dans les sous-agents et sont versionnables. Ils exigent que chaque personne ait accepté la confiance du dossier sur sa machine.
- Dans un worktree, `${CLAUDE_PROJECT_DIR}` reste le dépôt principal, et le champ `cwd` du JSON reçu par le hook est le worktree. Les scripts ci-dessous utilisent `cwd`.
- Un sous-agent en `isolation: "worktree"` part de `origin/main`, pas du HEAD de la session, sauf `worktree.baseRef: "head"`. `.worktreeinclude` copie dans chaque worktree créé par Claude les fichiers ignorés qu'il liste ; il ne s'applique pas à `git worktree add` manuel.

### 2.2 Les pistes, comparées

Critères : (a) travail simultané ; (b) chaque Claude voit l'état au démarrage et pendant ; (c) jamais deux écritures sur le même fichier ; (d) fusions rapides sans conflit, par n'importe qui.

| Piste | (a) | (b) | (c) | (d) | Verdict |
| --- | --- | --- | --- | --- | --- |
| **Issues GitHub + assignation** | oui | bon | non par elle-même | neutre | Trois objets (issue, branche, PR) pour une tâche de 15 min. La PR seule fait le même travail. |
| **Fichier de coordination versionné** | oui | moyen (faux dès qu'on oublie de pousser) | oui si lu | **mauvais** : chaque changement d'état est un commit sur `main` qui entre en collision avec les fusions | Bon pour ce qui s'écrit une fois (plan, zones), mauvais comme registre vivant. |
| **CLAUDE.md commun** | pas concerné | au démarrage seulement | oui si obéi | oui si obéi | Indispensable mais c'est une consigne, pas un mécanisme. |
| **Hooks versionnés** | pas concerné | **oui, à chaque prompt** | **oui, mécaniquement** | indirect | Le seul moyen de garantir (b) et (c) face à un Claude qui n'a pas relu l'état. |
| **Zones d'appartenance par dossier** | oui | oui | **oui, structurellement** | **oui** : des fichiers différents se fusionnent sans conflit, dans n'importe quel ordre | La base de tout. |
| **Verrou sur la zone partagée** | oui | oui (visible dans l'état) | oui pour les fichiers communs | oui : un seul à la fois sur les types, routes, deps | Remplace l'intégrateur unique sans recréer de goulot. |
| **Déploiement automatique sur `main`** | oui | oui (le SHA en ligne) | pas concerné | **oui** : personne ne déploie un `main` local en retard | Condition pour que chacun puisse fusionner seul. |

### 2.3 Recommandation

**Zones par dossier + PR draft comme réservation + chacun fusionne ses PR + verrou pour la zone partagée + déploiement par GitHub Action + hooks qui injectent l'état à chaque prompt et refusent les écritures interdites.** Le tout décrit dans un `CLAUDE.md` commun.

1. **Zones.** `ZONES` (écrit à T+3, lu par les hooks) liste la zone `shared` (types, routes, `App.tsx`, `main.tsx`, `index.html`, `package.json`, `pnpm-lock.yaml`, CSS global, schéma Supabase), une zone par personne (`src/features/<nom>/`) et une zone `any` (`docs/`, `PLAN.md`, `public/`). Chaque feature exporte une page dont le nom est fixé au socle. Personne n'écrit chez l'autre.
2. **Réservation = PR draft.** Une tâche commence par : branche `<moi>/<tâche>` depuis `origin/main`, commit vide `start: <tâche>`, push, `gh pr create --draft`. `gh pr list` montre qui fait quoi, des deux côtés, sans aucune écriture dans le dépôt.
3. **Chacun fusionne ses propres PR**, quand il veut : `gh pr ready` puis `gh pr merge --squash`. Comme deux zones ne partagent aucun fichier, GitHub fusionne sans conflit même si la branche est en retard sur `main`, et l'ordre des fusions n'a pas d'importance.
4. **Verrou partagé.** Pour toucher la zone `shared`, on ouvre une PR draft avec le label `zone:shared`. Le détenteur du verrou est la plus ancienne PR ouverte portant ce label. Le hook refuse l'écriture en zone partagée à toute autre branche, et dit qui détient le verrou. Les changements partagés sont petits et fusionnés tout de suite : le verrou se libère à la fusion. Le verrou est par branche, pas par personne : deux sessions de Benjamin ne peuvent pas non plus toucher les types en même temps.
5. **Déploiement automatique.** Une GitHub Action déploie sur Cloudflare Pages à chaque push sur `main`, avec `concurrency` qui annule un déploiement en cours quand un plus récent arrive. La version en ligne est donc toujours le dernier `main`. Personne ne lance `pnpm ship` à la main, sauf en secours.
6. **État à chaque prompt.** SessionStart et UserPromptSubmit impriment : derniers commits de `origin/main`, PR ouvertes (qui, quoi, en cours ou prête), détenteur du verrou partagé, ma branche, mon retard, et une alerte si la zone partagée a bougé sur `main` depuis ma base. Cache de 15 s par worktree.
7. **Garde-fous.** PreToolUse sur Edit/Write refuse : écrire sur `main` (pour tout le monde), écrire dans la zone de l'autre, écrire en zone partagée sans le verrou. La protection de branche GitHub sur `main` (PR obligatoire, sans review) empêche aussi un push direct fait en Bash.
8. **Identité de chaque machine** : `.arena-owner` ignoré par git, contenant `ben` ou `flo`, lu par les hooks (repli sur le dépôt principal depuis un worktree, puis sur le préfixe de branche).

Ce qui reste à la voix : les décisions de scope, et l'annonce « j'ai fusionné un changement partagé, rebasez ».

### 2.4 Une tâche, vue par un Claude

1. Il démarre : le hook lui imprime l'état. Il sait qu'il est `flo`, sur `flo/board`, 2 commits derrière `main`, que `#4 [en cours] capture form · ben/capture` existe, que le verrou partagé est libre, et que sa zone est `src/features/board/`.
2. Le CLAUDE.md lui dit de rebaser s'il est en retard, puis de créer sa PR draft s'il n'en a pas.
3. Il écrit dans `src/features/board/`. Il a besoin d'un champ dans `src/shared/types.ts` : le hook refuse et lui explique comment prendre le verrou. Il le dit à son humain, qui valide ; il ouvre une petite branche `flo/shared-types` avec une PR draft `zone:shared`, fait la modification, fusionne aussitôt, et reprend sa feature après `git rebase origin/main`.
4. Il commit et pousse toutes les 5 à 8 minutes. Quand la feature tient : rebase, push, `gh pr ready`, `gh pr merge --squash`. L'Action déploie. Son compte rendu se termine par « PR #N fusionnée · fichiers : … ».
5. Côté Benjamin, le prochain prompt affiche la fusion de Floriane dans l'état, sans que personne n'ait rien dit.

### 2.5 Sessions et sous-agents sur une même machine

- **Une session par tâche, dans son propre worktree** :
  ```bash
  git fetch origin
  git worktree add ../arena-<tâche> -b ben/<tâche> origin/main
  cd ../arena-<tâche> && pnpm install --prefer-offline && claude
  ```
  `pnpm install` dans un nouveau worktree prend quelques secondes grâce au store partagé de pnpm. `.arena-owner` est trouvé par repli dans le dépôt principal.
- **Deux sessions d'une même personne** partagent une zone : les découper par sous-dossier (`src/features/capture/form/`, `src/features/capture/list/`) et le noter dans `ZONES` avec le même propriétaire. Le hook ne les distingue pas, c'est la découpe qui les protège.
- **Les sous-agents restent dans le worktree de leur session**, sans `isolation: "worktree"`, pour des tâches internes à la zone. Si on tient à `isolation: "worktree"`, poser `"worktree": { "baseRef": "head" }` et fusionner la branche `worktree-<nom>` dans la branche de la session avant de pousser.
- **Ports de dev** : Vite prend le port libre suivant (5173, 5174, …). Un seul `pnpm dev` par humain ; les autres sessions se contentent de `pnpm build` pour vérifier que ça compile.
- **Messagerie locale** : entre les sessions d'une même personne, `SendMessage` fonctionne. Entre les deux machines, c'est l'état injecté par les hooks et la voix.

### 2.6 Les pièges et la réponse à chacun

| Piège | Réponse |
| --- | --- |
| Deux fusions en même temps | Fichiers disjoints : GitHub fusionne les deux. L'Action annule le déploiement le plus ancien et publie le plus récent, qui contient les deux. |
| Quelqu'un déploie un `main` en retard | Personne ne déploie à la main. `pnpm ship` ne sert qu'en secours, après `git pull`, annoncé à voix haute. |
| Deux Claude prennent le verrou partagé au même moment | Deux PR `zone:shared` ouvertes : la plus ancienne (numéro plus petit) détient le verrou, le hook refuse l'autre en le nommant. La seconde attend la fusion de la première. |
| Un verrou oublié | L'état affiche le détenteur à chaque prompt. Une PR `zone:shared` ouverte depuis plus de 5 minutes se signale à voix haute ; on la fusionne ou on la ferme. |
| `package.json` et `pnpm-lock.yaml` | Zone partagée, donc sous verrou. Les dépendances prévisibles sont posées au socle. Conflit de lockfile malgré tout : `git checkout origin/main -- pnpm-lock.yaml package.json && pnpm install && git add -A && git rebase --continue`. |
| La zone partagée a bougé sur `main` | L'état l'annonce (« zone partagée modifiée sur main depuis ta base »). Le Claude rebase avant d'écrire la suite. |
| Latence GitHub | Chaque `gh` prend 1 à 2 s. L'état est en cache 15 s par worktree ; le verrou, lui, est vérifié à chaque écriture en zone partagée (rare). |
| `.env` non versionné | `.env` versionné avec uniquement `VITE_SUPABASE_URL` et la clé anon (publique par conception). `.env.local` ignoré et listé dans `.worktreeinclude`. Dépôt public : rien d'autre, jamais. |
| Un Claude qui ne relit pas l'état | Il n'a pas le choix : l'état est injecté à chaque prompt et les écritures interdites sont refusées. |
| Un push direct sur `main` en Bash | Le hook ne voit que Edit/Write. La protection de branche GitHub refuse le push, et `settings.json` interdit `git push origin main`. |
| `gh` indisponible | Le hook d'état affiche « gh indisponible ». Le hook de zones refuse l'écriture en zone partagée tant que le verrou ne peut pas être vérifié ; on décide à voix haute. |
| Le hook plante | `"disableAllHooks": true` dans `.claude/settings.local.json` de la machine concernée, décidé à voix haute. |
| Une machine tombe | Tout est sur GitHub toutes les 8 minutes au pire. L'autre machine ouvre un worktree sur la branche orpheline et continue. |

### 2.7 Les fichiers prêts à copier

Tous à la racine du dépôt, sauf mention contraire. Aucun n'est du code produit.

#### `CLAUDE.md`

```markdown
# Arena : protocole pour tous les Claude du dépôt

Deux humains (Benjamin = `ben`, Floriane = `flo`), deux machines, plusieurs sessions Claude,
60 minutes chrono. Ce dépôt est le seul lien entre les machines. Lis ce fichier en entier.

## Qui je suis
- Mon identité est dans `.arena-owner` (ben ou flo). Ma zone est dans `ZONES`.
- Je n'écris que dans ma zone, jamais sur `main`. Les hooks refusent le reste.

## Au démarrage et à chaque prompt
- Le hook m'imprime l'état partagé : `origin/main`, PR ouvertes, verrou partagé, ma branche.
  Je le lis avant d'agir. Une PR `[en cours]` = quelqu'un travaille dessus, je n'y touche pas.
- Si je ne suis pas sur une branche `<moi>/<tâche>` : `git fetch origin && git switch -c <moi>/<tâche> origin/main`.
- Si l'état dit que la zone partagée a bougé sur main : `git fetch && git rebase origin/main` avant d'écrire.

## Réserver une tâche = ouvrir une PR draft
git commit --allow-empty -m "start: <tâche>" && git push -u origin HEAD
gh pr create --draft --title "<tâche>" --body "zone: <moi>"
Une seule PR par tâche. Si une PR du même nom existe déjà, je m'arrête et je le dis.

## Zone partagée (types, routes, package.json, lockfile, schéma Supabase) : verrou
- Je ne la touche que si mon humain l'a demandé ou validé.
- Je prends le verrou sur une branche dédiée `<moi>/shared-<quoi>` :
  git commit --allow-empty -m "start: shared <quoi>" && git push -u origin HEAD
  gh pr create --draft --title "shared: <quoi>" --label "zone:shared" --body "verrou"
- Si le hook dit que le verrou est pris, j'attends et je le dis à mon humain.
- Changement minimal, puis tout de suite : push, `gh pr ready`, `gh pr merge --squash`. Le verrou se libère à la fusion.
- Mon humain annonce à voix haute : « partagé fusionné, rebasez ».

## Pendant le travail
- Commit + push toutes les 5 à 8 minutes, message préfixé par la zone : `board: liste des cartes`.
- Mobile d'abord (390 px), zéro auth, zéro formulaire long. Le public teste sur téléphone.
- Pas de secret dans le code, les prompts ou les logs : dépôt public, écrans projetés.
- `pnpm` uniquement, jamais `npm`. Je ne déploie pas : l'Action GitHub le fait à chaque fusion.

## Finir une tâche : je fusionne moi-même
git fetch && git rebase origin/main && git push --force-with-lease
gh pr ready && gh pr merge --squash
Mon compte rendu se termine par : `PR #<n> fusionnée · fichiers : <liste>` ou `PR #<n> en cours · bloqué par : <quoi>`.
Tâche suivante : `git fetch && git switch -c <moi>/<suivante> origin/main`.
```

#### `ZONES` (écrit à T+3, première correspondance gagne, préfixes de chemin)

```text
# owner  prefixe (dossier terminé par / ou fichier exact). Première ligne qui correspond gagne.
shared  src/shared/
shared  src/routes.tsx
shared  src/App.tsx
shared  src/main.tsx
shared  src/index.css
shared  index.html
shared  package.json
shared  pnpm-lock.yaml
shared  vite.config.ts
shared  supabase/
shared  .env
ben     src/features/capture/
flo     src/features/board/
any     public/
any     docs/
any     PLAN.md
```

`capture` et `board` sont des exemples, remplacés à T+3 par les features du brief. Un chemin qui ne correspond à aucune ligne est autorisé : ajouter une ligne dès qu'un nouveau dossier apparaît. `ZONES` lui-même n'y figure pas exprès : on le modifie ensemble à voix haute, sur une PR fusionnée tout de suite.

#### `PLAN.md` (écrit de T+0 à T+5)

```markdown
# Plan · <nom du produit>

Brief (mot pour mot) : …
Produit en une phrase : <qui> peut <quoi> en <temps>.
Parcours : 1. … 2. … 3. …
Wow (un seul, après T+38 seulement) : …
Données : localStorage | Supabase (table `…`)
Déploiement : automatique à chaque fusion sur main · URL : https://arena.pages.dev

## Découpage initial
| Zone | Qui | Tâche |
| --- | --- | --- |
| shared | ben | socle : scaffold, types, routes, hello en ligne |
| capture | ben | … |
| board | flo | … |
| any | flo | textes des écrans, données d'exemple, pitch |
```

L'état vivant n'est pas dans ce tableau mais dans `gh pr list`, que les hooks affichent.

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

#### `.github/workflows/deploy.yml`

Déploie `main` sur Cloudflare Pages à chaque push, sauf quand seuls des fichiers de coordination changent. Demande deux secrets du dépôt, `CLOUDFLARE_API_TOKEN` (droit « Cloudflare Pages : Edit ») et `CLOUDFLARE_ACCOUNT_ID`, que seule Floriane, propriétaire, peut ajouter. Le projet Pages `arena` doit exister avant le premier déploiement.

```yaml
name: deploy
on:
  push:
    branches: [main]
    paths-ignore:
      - "docs/**"
      - "**.md"
      - "ZONES"
      - ".gitignore"
      - ".worktreeinclude"
      - ".claude/**"
      - ".github/**"
  workflow_dispatch:

concurrency:
  group: deploy-production
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 10
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
        env:
          VITE_SHA: ${{ github.sha }}
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name=arena --branch=main --commit-hash=${{ github.sha }}
```

Le pied de page de l'app affiche `import.meta.env.VITE_SHA` tronqué à 7 caractères : on sait ce qui est en ligne en regardant son téléphone.

#### `.claude/settings.json`

Structure des hooks vérifiée contre la doc (code.claude.com/docs/en/hooks). Les permissions laissent passer git et gh sans question, mais interdisent le push direct sur `main`, le push forcé sans `--force-with-lease` et le reset dur.

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
            "statusMessage": "Lecture de l'état Arena (main, PR, verrou)"
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
      "Bash(git status*)",
      "Bash(git diff*)",
      "Bash(git log*)",
      "Bash(git fetch*)",
      "Bash(git switch*)",
      "Bash(git add*)",
      "Bash(git commit*)",
      "Bash(git rebase*)",
      "Bash(git push*)",
      "Bash(gh pr *)",
      "Bash(pnpm *)"
    ],
    "deny": [
      "Bash(git push origin main*)",
      "Bash(git push --force *)",
      "Bash(git push -f *)",
      "Bash(git reset --hard*)",
      "Bash(gh pr merge * --admin*)"
    ]
  }
}
```

#### `.claude/hooks/arena-state.sh`

```bash
#!/bin/bash
# SessionStart + UserPromptSubmit : imprime l'état partagé (main, PR ouvertes, verrou partagé, ma branche).
# Sortie texte = ajoutée au contexte de Claude. Cache 15 s par worktree pour ne pas ralentir chaque prompt.
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

KEY=$(printf '%s' "$ROOT" | cksum | cut -d' ' -f1)
CACHE="${TMPDIR:-/tmp}/arena-state-$(id -u)-$KEY.txt"
if [ "$EVENT" = "UserPromptSubmit" ] && [ -f "$CACHE" ]; then
  AGE=$(( $(date +%s) - $(stat -f %m "$CACHE" 2>/dev/null || stat -c %Y "$CACHE") ))
  if [ "$AGE" -lt 15 ]; then cat "$CACHE"; exit 0; fi
fi

git -C "$CWD" fetch -q origin 2>/dev/null
ME=$(head -n1 "$(owner_file)" 2>/dev/null | tr -d '[:space:]')
BRANCH=$(git -C "$CWD" branch --show-current 2>/dev/null)
BEHIND=$(git -C "$CWD" rev-list --count "HEAD..origin/main" 2>/dev/null || echo "?")
DIRTY=$(git -C "$CWD" status --porcelain 2>/dev/null | wc -l | tr -d ' ')
REPO=$(git -C "$CWD" remote get-url origin 2>/dev/null | sed -E 's#.*github.com[:/]##; s#\.git$##')
PRS=$(gh pr list --repo "$REPO" --state open --json number,title,author,isDraft,headRefName,labels 2>/dev/null)

# La zone partagée a-t-elle bougé sur main depuis ma base ?
SHARED_MOVED=""
if [ -f "$ROOT/ZONES" ] && [ "$BEHIND" != "0" ] && [ "$BEHIND" != "?" ]; then
  CHANGED=$(git -C "$CWD" diff --name-only "HEAD...origin/main" 2>/dev/null)
  while read -r owner prefix _; do
    [ "$owner" = "shared" ] || continue
    printf '%s\n' "$CHANGED" | grep -q "^$prefix" && { SHARED_MOVED=1; break; }
  done < "$ROOT/ZONES"
fi

{
  echo "## ARENA : état partagé ($(date +%H:%M:%S))"
  echo "Moi : ${ME:-inconnu} · branche : ${BRANCH:-?} · en retard sur origin/main : $BEHIND commit(s) · fichiers non commités : $DIRTY"
  [ -n "$SHARED_MOVED" ] && echo "ATTENTION : la zone partagée a changé sur main depuis ta base. Fais 'git fetch && git rebase origin/main' avant d'écrire."
  echo "### Derniers commits sur origin/main"
  git -C "$CWD" log --format='- %h %s (%an, %cr)' -6 origin/main 2>/dev/null || echo "- (pas encore de main distant)"
  echo "### PR ouvertes = tâches en cours"
  if [ -z "$PRS" ]; then
    echo "- (gh indisponible)"
  else
    printf '%s' "$PRS" | jq -r 'if length == 0 then "- (aucune)" else sort_by(.number)[] | "- #\(.number) \(if .isDraft then "[en cours]" else "[prête]" end) \(.title) · \(.headRefName) · \(.author.login)\(if any(.labels[]; .name == "zone:shared") then " · zone partagée" else "" end)" end'
    echo "### Verrou partagé : $(printf '%s' "$PRS" | jq -r '[.[] | select(any(.labels[]; .name == "zone:shared"))] | sort_by(.number) | if length == 0 then "libre" else "pris par #\(.[0].number) (\(.[0].headRefName))" end')"
  fi
  [ -f "$ROOT/PLAN.md" ] && { echo "### PLAN.md"; cat "$ROOT/PLAN.md"; }
  [ -f "$ROOT/ZONES" ] && { echo "### ZONES"; grep -v '^#' "$ROOT/ZONES"; }
} | tee "$CACHE"
```

#### `.claude/hooks/arena-zones.sh`

```bash
#!/bin/bash
# PreToolUse (Edit|Write|NotebookEdit) : refuse d'écrire sur main, dans la zone de l'autre,
# ou en zone partagée sans détenir le verrou (= la plus ancienne PR ouverte labellisée zone:shared).
INPUT=$(cat)
FILE=$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // .tool_input.notebook_path // empty')
CWD=$(printf '%s' "$INPUT" | jq -r '.cwd // empty')
{ [ -z "$FILE" ] || [ -z "$CWD" ]; } && exit 0

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

deny() {
  jq -nc --arg r "$1" '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$r}}'
  exit 0
}

case "$FILE" in
  "$ROOT"/*) REL="${FILE#"$ROOT"/}" ;;
  *) exit 0 ;;   # hors dépôt : pas notre affaire
esac

if [ "$BRANCH" = "main" ]; then
  deny "Personne n'écrit sur main. Crée d'abord une branche : git fetch origin && git switch -c $ME/<tâche> origin/main ($REL)."
fi

OWNER=""
while read -r owner prefix _; do
  case "$owner" in ""|"#"*) continue ;; esac
  case "$REL" in "$prefix"*) OWNER="$owner"; break ;; esac
done < "$ZONES"

[ -z "$OWNER" ] && exit 0
[ "$OWNER" = "any" ] && exit 0

if [ "$OWNER" = "shared" ]; then
  REPO=$(git -C "$CWD" remote get-url origin 2>/dev/null | sed -E 's#.*github.com[:/]##; s#\.git$##')
  LOCKS=$(gh pr list --repo "$REPO" --state open --label zone:shared --json number,headRefName 2>/dev/null) \
    || deny "$REL est en zone partagée et gh ne répond pas : impossible de vérifier le verrou. Réessaie, ou décidez à voix haute."
  HOLDER=$(printf '%s' "$LOCKS" | jq -r 'sort_by(.number) | .[0].headRefName // empty')
  NUM=$(printf '%s' "$LOCKS" | jq -r 'sort_by(.number) | .[0].number // empty')
  [ -z "$HOLDER" ] && deny "$REL est en zone partagée (types, routes, deps, schéma). Prends d'abord le verrou sur une branche dédiée : git commit --allow-empty -m 'start: shared <quoi>' && git push -u origin HEAD && gh pr create --draft --title 'shared: <quoi>' --label zone:shared --body verrou. Puis réessaie."
  [ "$HOLDER" = "$BRANCH" ] && exit 0
  deny "$REL est en zone partagée et le verrou est pris par #$NUM ($HOLDER). Attends sa fusion (visible dans l'état Arena) ou vois ça à voix haute."
fi

[ -z "$ME" ] && deny "Identité inconnue : crée .arena-owner (ben ou flo) à la racine du dépôt."
[ "$OWNER" = "$ME" ] && exit 0
deny "$REL appartient à la zone de $OWNER, pas à $ME. Reste dans ta zone, ou demande à $OWNER."
```

Après copie : `chmod +x .claude/hooks/*.sh`. Les deux scripts n'ont besoin que de `bash`, `git`, `jq` et `gh`, à vérifier chez Floriane.

Limites connues :
- Le refus ne s'applique qu'à Edit, Write et NotebookEdit. Un `sed -i` en Bash passe. Le CLAUDE.md compense.
- Deux sessions d'une même personne ne sont pas séparées par le hook dans leur zone : c'est la découpe en sous-dossiers qui les protège (voir 2.5).
- `ZONES` se modifie ensemble, à voix haute, par une PR fusionnée tout de suite, jamais en douce sur une branche.

#### Labels et réglages GitHub (Floriane, avant le jour J)

```bash
gh label create "zone:shared" --color 5319E7 --repo Floriane-ju/productbuilderarena
```

Dans Settings du dépôt :
- General → Pull Requests : cocher « Allow squash merging » et « Automatically delete head branches ».
- Branches → règle sur `main` : « Require a pull request before merging », sans review obligatoire, sans « Require branches to be up to date » (sinon chaque fusion forcerait un rebase).
- Secrets and variables → Actions : `CLOUDFLARE_API_TOKEN` et `CLOUDFLARE_ACCOUNT_ID`.

### 2.8 Gabarits de prompts (à garder en texte, pas en code)

**Socle (Benjamin, T+5)**
> Lis CLAUDE.md. Sur la branche `ben/socle`, prends le verrou partagé comme décrit (PR draft `zone:shared`). Crée une app Vite React TypeScript avec pnpm dans ce dossier (déjà un dépôt git, ne touche pas à `.claude/`, `.github/`, `CLAUDE.md`, `ZONES`, `PLAN.md`). Tailwind v4 via `@import "tailwindcss"`. react-router avec `src/routes.tsx` qui déclare deux pages vides : `CapturePage` importée de `src/features/capture/index.tsx` et `BoardPage` de `src/features/board/index.tsx`, chacune affichant son nom. `src/shared/types.ts` contient : <coller le modèle>. Scripts `dev`, `build` (vite build seul) et `ship` (secours). `index.html` : titre « <produit> », viewport mobile, `theme-color`. Un pied de page qui affiche les 7 premiers caractères de `import.meta.env.VITE_SHA`. Puis push, `gh pr ready`, `gh pr merge --squash`, et suis le déploiement avec `gh run watch`. Donne-moi l'URL. Pas de tests, pas de README.

**Feature (chacun, T+12)**
> Lis PLAN.md et ZONES. Tu es `<moi>`, ta zone est `src/features/<zone>/`. Le brief : <coller>. Ta page `<Nom>Page` doit permettre à <qui> de <quoi> sur téléphone (390 px de large), sans login. Données : <localStorage via src/shared/storage.ts | table Supabase `x` via src/shared/supabase.ts>, en respectant les types de `src/shared/types.ts`. Si tu as besoin de changer la zone partagée, dis-le-moi avant. Commence par ta branche et ta PR draft comme décrit dans CLAUDE.md, commit et push toutes les 5 minutes. Quand le parcours marche dans `pnpm dev`, fusionne ta PR toi-même et dis-moi les fichiers touchés.

**Polish mobile (T+48)**
> Sur ta zone uniquement : zones tactiles d'au moins 44 px, texte 16 px minimum, états vides avec une phrase, erreurs affichées, pas de scroll horizontal à 390 px, retour visuel sur chaque action. Ne change aucune fonctionnalité. Commit, push, fusionne.

### 2.9 Déploiement, secrets et propagation

- **Projet Cloudflare Pages** : `wrangler pages project create arena --production-branch main`, une fois, depuis la machine de Benjamin (compte Cloudflare de Benjamin). L'URL sera `https://arena.pages.dev`, ou `https://arena-xxx.pages.dev` si le nom est pris : le fixer la veille.
- **Qui déploie** : l'Action GitHub, à chaque fusion sur `main`. Compter une à deux minutes. `gh run watch` montre le déploiement en cours.
- **Propagation** : tester juste après un déploiement peut encore servir l'ancienne version. Parade : le SHA du pied de page doit être celui du dernier commit de `main` avant de dire « c'est en ligne ». Jamais de rollback Cloudflare : ça fige le cache.
- **Secrets** : `.env` versionné contenant uniquement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` (la clé anon est publique par conception, elle finit dans le bundle). Le jeton Cloudflare ne vit que dans les secrets GitHub. Dépôt public et écrans projetés : ne jamais afficher un `cat .env.local`, ni le dashboard Supabase avec la clé service_role.
- **Secours** : si l'Action échoue deux fois, une seule personne lance `git pull && pnpm ship` et l'annonce à voix haute. Si wrangler tombe aussi : `pnpm dlx serve dist -l 4173` et `cloudflared tunnel --url http://localhost:4173` donnent une URL publique en 10 secondes.

### 2.10 Checklist avant le jour J

**Les deux, dès maintenant**
- [ ] Envoyer les 7 questions de 1.6 aux organisateurs, par écrit.
- [ ] Décider si le dépôt reste public (l'équipe adverse peut lire ce plan) ou passe en privé.
- [ ] Pousser le commit d'outillage : `CLAUDE.md`, `ZONES` (vide), `PLAN.md` (gabarit), `.gitignore`, `.worktreeinclude`, `.claude/settings.json`, `.claude/hooks/*.sh` exécutables, `.github/workflows/deploy.yml`. Aucun code produit. Si les organisateurs le refusent, garder ces fichiers dans un gist privé et les pousser à T+0.
- [ ] Floriane : le label `zone:shared`, les réglages et les deux secrets de 2.7.
- [ ] Chacun clone, lance `claude` une fois dans le dossier et accepte la confiance du dossier (sinon les hooks ne tournent pas). Vérifier que l'état Arena s'affiche.
- [ ] Chacun crée son `.arena-owner`.
- [ ] Machines : Node 22+, `pnpm`, `gh` connecté, `jq`, `wrangler` (Benjamin : **absent**, `pnpm add -g wrangler && wrangler login`), `cloudflared` (secours), Claude Code à jour.
- [ ] Benjamin : créer le projet Pages `arena` et le jeton API « Cloudflare Pages : Edit », à transmettre à Floriane pour les secrets.
- [ ] Supabase : un projet vide « arena » créé, URL et clé anon notées, à ne remplir qu'à T+6 si le brief l'exige.

**Répétition générale (deux fois, une semaine et deux jours avant, 75 minutes chacune)**
- [ ] Brief inventé par un tiers, chrono réel, deux machines, protocole complet, au moins une prise de verrou partagé chacun, et deux fusions à moins d'une minute d'écart pour voir l'Action les enchaîner.
- [ ] Après chaque répétition : noter les 3 frictions, corriger le CLAUDE.md, supprimer tout le code produit (commit « reset ») pour arriver le 14 avec un dépôt sans code produit.
- [ ] Mesurer : durée du scaffold, d'un déploiement par l'Action, d'une fusion, du `pnpm install` dans un worktree.

**La veille**
- [ ] `git pull`, mise à jour de Claude Code et de wrangler, un dernier `claude` pour vérifier les hooks.
- [ ] Charger les téléphones, prévoir un câble de projection, un partage de connexion 4G, la police du terminal en gros.
- [ ] Relire 1.3 ensemble, et se répartir le pitch.

**Le jour J, avant 19h00**
- [ ] `gh auth status`, `git fetch`, `.arena-owner` en place, terminal projetable.
- [ ] Un onglet ouvert sur `github.com/Floriane-ju/productbuilderarena/pulls` et un sur les Actions, sur chaque machine.

---

## Ce qui manque encore

- Le replay et le gagnant de l'édition de mai : si on retrouve le lien, le regarder change probablement plusieurs choix de 1.2.
- La réponse des organisateurs sur la zone grise de 1.4 conditionne la checklist : dépôt outillé avant, ou tout à T+0.
- La composition de l'équipe (« get matched ») n'est pas confirmée sur le site.

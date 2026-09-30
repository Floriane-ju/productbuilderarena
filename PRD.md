# PRD — Itinéraires à l'ombre à Lyon

30 septembre 2026

## 1. Résumé

Une application web gratuite, utilisable sur mobile et sur ordinateur, qui calcule à Lyon des itinéraires à pied ou à vélo exposés le moins possible au soleil. [Confirmé]

Le calcul tient compte de l'heure de passage, des arbres, de l'ombre portée des bâtiments et de la météo. [Confirmé]

Pour chaque demande, l'app propose 3 variantes : la plus rapide, une équilibrée et la plus ombragée. [Confirmé]

Elle s'adresse aux piétons, aux cyclistes et aux promeneurs de chiens, et signale les points de fraîcheur sur le trajet. [Confirmé]

L'app calcule et affiche les trajets ; elle ne fait pas de guidage pas à pas. [Confirmé]

## 2. Contexte et problème

Les calculateurs d'itinéraires actuels optimisent la distance ou la durée. Ils ignorent l'exposition au soleil. [Hypothèse]

En été, un trajet en plein soleil est pénible, voire risqué : coup de chaleur, fatigue, surchauffe du bitume pour les pattes des chiens. Un trajet un peu plus long mais ombragé est souvent préférable. [Hypothèse]

L'ombre d'une rue change au fil de la journée. Le même trottoir peut être à l'ombre à 9 h et en plein soleil à 14 h. L'utilisateur ne peut pas l'anticiper seul. [Implicite]

Lyon est retenue comme ville de lancement. [Confirmé]

**Problème résolu** : permettre à un piéton ou un cycliste de choisir, avant de partir, un trajet qui limite son exposition au soleil, en connaissant le coût en temps de ce choix.

## 3. Personas

Trois personas sont retenus. Les parents avec poussette sont retirés du périmètre, et les livreurs ne sont pas ciblés spécifiquement (ils peuvent utiliser les modes piéton et vélo). [Confirmé]

|  | P1 — Piéton urbain | P2 — Cycliste urbain | P3 — Promeneur de chien |
| --- | --- | --- | --- |
| Profil | Actif ou étudiant, se déplace à pied entre 1 et 4 km | Utilise son vélo pour aller au travail ou faire ses courses, trajets de 2 à 10 km | Sort son chien 2 à 3 fois par jour, balades de 20 à 60 min |
| Besoins | Arriver sans être en sueur, connaître le temps perdu pour un trajet plus ombragé | Limiter la chaleur sans multiplier les détours ni quitter les voies cyclables | Protéger son chien de la chaleur et du bitume brûlant, trouver de l'eau |
| Frustrations | Les apps actuelles le font passer par les grands axes exposés | Arrive trempé au bureau en été | Ne sait pas quelles rues restent ombragées à l'heure de sa sortie |
| Contexte d'usage | Sur mobile, juste avant de partir | Sur desktop la veille, ou sur mobile avant de partir | Sur mobile, avant la sortie, souvent vers un parc |
| Maîtrise technique | Moyenne à bonne | Moyenne à bonne | Faible à moyenne |

Les tranches de distance et de durée sont des [Hypothèse] destinées à dimensionner le calcul.

## 4. Rôles et permissions

L'app n'a pas de compte utilisateur : tous les utilisateurs sont des visiteurs anonymes. [Confirmé] La mise à jour des données est faite par l'équipe interne, hors de l'interface publique. [Implicite]

| Action | Visiteur | Administrateur données (interne) |
| --- | --- | --- |
| Rechercher un départ et une arrivée | Autorisé | Autorisé |
| Utiliser sa position actuelle | Autorisé (après accord du navigateur) | Autorisé |
| Calculer et comparer les 3 variantes | Autorisé | Autorisé |
| Afficher les points de fraîcheur | Autorisé | Autorisé |
| Créer un compte, enregistrer des favoris | Interdit (hors périmètre) | Interdit |
| Modifier les données (arbres, bâtiments, points de fraîcheur) | Interdit | Autorisé |
| Déclencher une mise à jour des données sources | Interdit | Autorisé |
| Consulter les statistiques d'usage anonymisées | Interdit | Autorisé |

## 5. Périmètre

**Inclus dans le MVP**

- F-01 Saisie du départ et de l'arrivée, dont la position actuelle
- F-02 Choix du mode : piéton ou vélo
- F-03 Choix de l'heure de départ
- F-04 Calcul de l'exposition au soleil (arbres, bâtiments, position du soleil)
- F-05 Proposition et comparaison de 3 variantes
- F-06 Affichage de l'itinéraire sur une carte, tronçons ombre et soleil distingués
- F-07 Prise en compte et affichage de la météo
- F-08 Points de fraîcheur (fontaines à boire, parcs et jardins)
- F-09 Meilleur moment pour partir, selon la météo et l'ombre

**Prévu dans les versions ultérieures** [Hypothèse]

- Extension à la Métropole de Lyon, puis à d'autres villes
- Points de fraîcheur supplémentaires : bancs à l'ombre, lieux publics rafraîchis
- Mode balade en boucle (départ et retour au même point), utile pour P3
- Indice UV et alerte canicule
- Signalement communautaire (arbre abattu, travaux)

**Explicitement hors périmètre** [Confirmé]

- Guidage pas à pas et instructions vocales
- Recalcul automatique quand l'utilisateur sort de l'itinéraire
- Écrans dédiés de gestion des erreurs (voir la note en section 12)
- Applications natives iOS et Android
- Comptes utilisateurs, favoris, historique
- Profil poussette et fonctionnalités spécifiques aux livreurs (tournées multi-arrêts)
- Toute monétisation (publicité, abonnement)
- Langues autres que le français
- Usage hors ligne

## 6. Parcours utilisateurs

Chaque persona a un parcours clé. Les chemins d'erreur sont limités aux messages minimum retenus en F-01, F-03 et F-07.

**PU-01 — P1 calcule un trajet à pied, départ immédiat**

1. P1 ouvre l'app sur son mobile. La carte est centrée sur Lyon.
2. Il touche « Ma position » comme départ.
   - Décision : le navigateur demande l'accès à la position. S'il refuse, il saisit une adresse à la main.
3. Il saisit l'arrivée et choisit une suggestion.
   - Chemin d'erreur : adresse hors de la zone couverte, un message l'indique (F-01).
4. Le mode piéton et l'heure « Maintenant » sont présélectionnés. Il lance le calcul.
5. L'app affiche 3 variantes avec durée, distance et taux d'ombre.
6. Il sélectionne la variante équilibrée ; la carte montre les tronçons à l'ombre et au soleil.
7. Il part en gardant la carte ouverte comme repère visuel.

**PU-02 — P2 prépare la veille un trajet à vélo**

1. P2 ouvre l'app sur son ordinateur le soir.
2. Il saisit son domicile et son lieu de travail.
3. Il choisit le mode vélo et l'heure de départ : demain, 8 h 15.
   - Chemin d'erreur : heure au-delà de 7 jours, elle est refusée (F-03).
4. L'app calcule les variantes avec la météo prévue pour 8 h 15.
   - Décision : si le ciel est prévu couvert, un bandeau indique que les variantes diffèrent peu (F-07).
5. Il compare les variantes et retient la plus ombragée, qui coûte 4 minutes de plus.
6. Le lendemain, il ouvre de nouveau l'app sur mobile et refait la recherche (pas d'historique au MVP).

**PU-03 — P3 prépare la sortie de son chien vers un parc**

1. P3 ouvre l'app sur mobile en début d'après-midi.
2. Il active l'affichage des points de fraîcheur.
3. Il choisit un parc proche comme arrivée, en le touchant sur la carte ou en le recherchant.
4. Il lance le calcul en mode piéton, départ maintenant.
   - Décision : s'il fait nuit à l'heure choisie, l'app n'optimise pas l'ombre et le signale (F-03).
5. Il retient la variante la plus ombragée et repère les fontaines situées le long du trajet.
6. Il part avec son chien.

## 7. Spécifications fonctionnelles

### F-01 — Saisie du départ et de l'arrivée

**Priorité** : Must have (MVP)

**Personas concernés** : P1, P2, P3

**Statut** : [Implicite]

**User story** : En tant qu'utilisateur, je veux indiquer mon point de départ et mon point d'arrivée afin d'obtenir un itinéraire.

**Règles de gestion**

- Départ et arrivée peuvent être saisis par adresse, par nom de lieu, par un appui sur la carte ou, pour le départ, par « Ma position ».
- Des suggestions apparaissent dès 3 caractères saisis, 5 au maximum, limitées à la zone couverte.
- La zone couverte au MVP est la ville de Lyon (9 arrondissements). [Hypothèse]
- « Ma position » utilise la géolocalisation du navigateur, après accord de l'utilisateur.
- Un bouton permet d'inverser départ et arrivée.
- Départ et arrivée identiques ou distants de moins de 50 m : le calcul n'est pas lancé.

**Critères d'acceptation**

- Étant donné un utilisateur qui tape « Place Bellecour », quand 3 caractères sont saisis, alors au plus 5 suggestions situées à Lyon s'affichent en moins de 1 s.
- Étant donné un utilisateur qui accepte la géolocalisation, quand il touche « Ma position », alors le champ départ se remplit avec sa position en moins de 5 s.
- Étant donné une adresse hors de Lyon, quand l'utilisateur la valide, alors un message indique que seule la ville de Lyon est couverte.

**Cas limites et erreurs** : géolocalisation refusée (le champ reste vide, la saisie manuelle reste possible), position hors de Lyon, aucune suggestion trouvée.

**Dépendances** : service de géocodage (section 10).

### F-02 — Choix du mode de déplacement

**Priorité** : Must have (MVP)

**Personas concernés** : P1, P2, P3

**Statut** : [Confirmé]

**User story** : En tant qu'utilisateur, je veux choisir entre piéton et vélo afin d'obtenir un trajet adapté à mon moyen de déplacement.

**Règles de gestion**

- Deux modes : piéton (présélectionné) et vélo.
- Mode piéton : trottoirs, rues piétonnes, parcs ouverts au public, escaliers autorisés. Vitesse de référence 4,5 km/h. [Hypothèse]
- Mode vélo : uniquement les voies où le vélo est autorisé, en respectant les sens de circulation (double-sens cyclables inclus). Vitesse de référence 15 km/h. [Hypothèse]
- Distance maximale : 10 km à pied, 25 km à vélo. [Hypothèse]
- Changer de mode relance le calcul si un itinéraire est déjà affiché.

**Critères d'acceptation**

- Étant donné le mode vélo, quand l'itinéraire est calculé, alors il n'emprunte aucune voie interdite aux vélos ni aucun sens interdit.
- Étant donné un itinéraire affiché en mode piéton, quand l'utilisateur passe en mode vélo, alors les 3 variantes sont recalculées sans autre action.
- Étant donné un trajet de 12 km en mode piéton, quand l'utilisateur lance le calcul, alors un message indique la distance maximale de 10 km.

**Cas limites et erreurs** : point de départ inaccessible à vélo (parc interdit aux vélos) ; l'app rattache le point à la voie cyclable la plus proche.

**Dépendances** : réseau viaire (section 10).

### F-03 — Choix de l'heure de départ

**Priorité** : Must have (MVP)

**Personas concernés** : P1, P2, P3

**Statut** : [Confirmé]

**User story** : En tant qu'utilisateur, je veux choisir mon heure de départ afin que l'ombre soit calculée pour le moment où je passerai réellement.

**Règles de gestion**

- Valeur par défaut : « Maintenant ».
- L'utilisateur peut choisir une date et une heure jusqu'à 7 jours à l'avance, par pas de 5 minutes. La limite de 7 jours suit l'horizon des prévisions météo. [Hypothèse]
- L'ombre est évaluée tronçon par tronçon à l'heure de passage estimée, pas seulement à l'heure de départ.
- Si le soleil est sous l'horizon pendant tout le trajet, l'app affiche uniquement la variante la plus rapide et l'indique.
- Toutes les heures sont en heure locale de Lyon.

**Critères d'acceptation**

- Étant donné un départ à 8 h pour un trajet de 40 min, quand l'ombre est calculée, alors un tronçon parcouru à 8 h 35 est évalué avec la position du soleil à 8 h 35.
- Étant donné un départ à 23 h en juillet, quand l'utilisateur lance le calcul, alors un message indique que l'optimisation de l'ombre ne s'applique pas de nuit.
- Étant donné une date située à 8 jours, quand l'utilisateur tente de la choisir, alors elle n'est pas sélectionnable.

**Cas limites et erreurs** : trajet commençant avant le lever du soleil et finissant après (seuls les tronçons de jour comptent) ; changement d'heure été / hiver.

**Dépendances** : F-04.

### F-04 — Calcul de l'exposition au soleil

**Priorité** : Must have (MVP)

**Personas concernés** : P1, P2, P3

**Statut** : [Confirmé]

**User story** : En tant qu'utilisateur, je veux que l'app sache quelles rues sont à l'ombre à l'heure de mon passage afin de me proposer un trajet réellement moins exposé.

**Règles de gestion**

- La position du soleil (hauteur et direction) est calculée pour chaque tronçon à son heure de passage.
- Sont prises en compte l'ombre portée des bâtiments, selon leur emprise et leur hauteur, et l'ombre des arbres, selon leur position et la taille de leur houppier.
- Un tronçon est découpé en segments de 10 m au plus ; chaque segment est classé « à l'ombre » ou « au soleil ». [Hypothèse]
- Le taux d'ombre d'un trajet = longueur des segments à l'ombre / longueur totale, arrondi au pourcentage entier.
- Les arbres à feuilles caduques ne comptent pas comme ombrage de décembre à mars. [Hypothèse]
- Le résultat est un indicateur. L'app précise que l'ombre réelle peut varier (auvents, arbres récents, travaux).

**Critères d'acceptation**

- Étant donné un segment situé au nord d'un bâtiment de 20 m de haut, quand le soleil est au sud à 40° de hauteur, alors le segment est classé à l'ombre.
- Étant donné le jeu de 50 tronçons de référence relevés sur le terrain à 3 horaires, quand le calcul est lancé, alors au moins 85 % des classements sont conformes aux relevés.
- Étant donné un même trajet calculé à 9 h et à 15 h, quand les résultats sont comparés, alors les taux d'ombre diffèrent si la position du soleil modifie les ombres portées.

**Cas limites et erreurs** : donnée de hauteur manquante pour un bâtiment (hauteur par défaut de 3 m par étage, nombre d'étages estimé), tunnels et passages couverts (comptés à l'ombre), ponts sur le Rhône et la Saône (généralement au soleil).

**Dépendances** : données arbres et bâtiments (section 10), F-03, F-07.

### F-05 — Proposition et comparaison de 3 variantes

**Priorité** : Must have (MVP)

**Personas concernés** : P1, P2, P3

**Statut** : [Confirmé]

**User story** : En tant qu'utilisateur, je veux comparer un trajet rapide, un trajet équilibré et un trajet très ombragé afin de choisir mon compromis entre temps et fraîcheur.

**Règles de gestion**

- Variante « La plus rapide » : durée minimale, sans tenir compte de l'ombre.
- Variante « Équilibrée » : taux d'ombre maximal avec une durée au plus 15 % supérieure à la plus rapide. [Hypothèse]
- Variante « La plus ombragée » : taux d'ombre maximal avec une durée au plus 30 % supérieure à la plus rapide. [Hypothèse]
- Chaque variante affiche : durée (min), distance (km, 1 décimale), taux d'ombre (%), écart de durée avec la plus rapide (+ x min).
- Si deux variantes sont identiques ou diffèrent de moins de 5 points de taux d'ombre, une seule est affichée, avec la mention « Aucun trajet plus ombragé à proximité ».
- La variante équilibrée est sélectionnée par défaut.

**Critères d'acceptation**

- Étant donné un calcul abouti, quand les résultats s'affichent, alors chaque variante montre durée, distance, taux d'ombre et écart de durée.
- Étant donné une variante la plus rapide de 20 min, quand la variante la plus ombragée est calculée, alors sa durée n'excède pas 26 min.
- Étant donné deux variantes dont le taux d'ombre diffère de 3 points, quand les résultats s'affichent, alors une seule est présentée avec la mention prévue.

**Cas limites et erreurs** : trajet très court (moins de 300 m) où les 3 variantes se confondent ; aucune variante ne respectant le plafond de détour.

**Dépendances** : F-02, F-04.

### F-06 — Affichage de l'itinéraire sur la carte

**Priorité** : Must have (MVP)

**Personas concernés** : P1, P2, P3

**Statut** : [Implicite]

**User story** : En tant qu'utilisateur, je veux voir sur la carte où mon trajet passe à l'ombre ou au soleil afin de savoir à quoi m'attendre.

**Règles de gestion**

- La variante sélectionnée est tracée en premier plan ; les autres apparaissent en retrait et restent sélectionnables d'un appui ou d'un clic.
- Les segments à l'ombre et au soleil sont distingués par la couleur et par un motif (pointillé pour le soleil), afin de ne pas reposer sur la couleur seule.
- La carte se cadre automatiquement pour montrer tout le trajet.
- Sur mobile, la liste des variantes s'affiche dans un panneau repliable sous la carte ; sur desktop, dans une colonne à gauche.
- La position de l'utilisateur est affichée s'il l'a partagée.

**Critères d'acceptation**

- Étant donné un itinéraire calculé, quand la carte s'affiche, alors tout le trajet est visible sans action de l'utilisateur.
- Étant donné un utilisateur daltonien, quand il regarde le trajet, alors il distingue ombre et soleil grâce au motif.
- Étant donné 3 variantes affichées, quand l'utilisateur touche une variante en retrait, alors elle passe au premier plan et ses indicateurs s'affichent.

**Cas limites et erreurs** : écran de 360 px de large ; zoom maximal de l'utilisateur ; fonds de carte lents à charger.

**Dépendances** : F-05, fond de carte (section 10).

### F-07 — Prise en compte et affichage de la météo

**Priorité** : Must have (MVP)

**Personas concernés** : P1, P2, P3

**Statut** : [Confirmé]

**User story** : En tant qu'utilisateur, je veux que l'app tienne compte de la météo afin de ne pas faire de détour inutile par temps couvert.

**Règles de gestion**

- L'app récupère, pour l'heure de départ choisie, la température, la couverture nuageuse (%) et la probabilité de pluie à Lyon.
- Ces valeurs s'affichent au-dessus des variantes.
- Couverture nuageuse ≥ 80 % : un bandeau indique que le ciel est couvert et que les variantes ombragées apportent peu. Les 3 variantes restent affichées. [Hypothèse]
- La couverture nuageuse pondère le taux d'ombre affiché : un segment au soleil sous ciel couvert est signalé « soleil voilé ». [Hypothèse]
- Les données météo ont au plus 1 h d'ancienneté pour un départ immédiat.

**Critères d'acceptation**

- Étant donné une prévision à 90 % de couverture nuageuse, quand les variantes s'affichent, alors le bandeau « ciel couvert » est visible.
- Étant donné un départ prévu demain à 14 h, quand le calcul est lancé, alors la météo affichée est la prévision pour demain 14 h.
- Étant donné un service météo indisponible, quand le calcul est lancé, alors les variantes sont calculées sans météo et la zone météo indique « météo indisponible ».

**Cas limites et erreurs** : prévision absente pour l'horaire exact (valeur de l'heure la plus proche), pluie en cours.

**Dépendances** : service météo (section 10), F-03, F-04.

### F-08 — Points de fraîcheur

**Priorité** : Should have (MVP)

**Personas concernés** : P1, P2, P3 (surtout P3)

**Statut** : [Confirmé]

**User story** : En tant que promeneur de chien, je veux voir les fontaines et les parcs sur mon trajet afin de faire boire mon chien et de faire une pause au frais.

**Règles de gestion**

- Deux catégories au MVP : fontaines à boire et parcs ou jardins publics. [Hypothèse]
- Un interrupteur « Points de fraîcheur » affiche ou masque ces points sur la carte. Il est désactivé par défaut.
- Quand un itinéraire est affiché, les points situés à moins de 100 m du trajet sont listés sous la variante, avec leur distance au départ.
- Un appui sur un point affiche son nom, sa catégorie et, pour un parc, ses horaires d'ouverture s'ils sont connus.
- Un parc peut être choisi comme arrivée depuis sa fiche.

**Critères d'acceptation**

- Étant donné l'interrupteur activé, quand l'utilisateur regarde la carte, alors les fontaines et parcs de la zone visible s'affichent avec des icônes distinctes.
- Étant donné un itinéraire passant à 60 m d'une fontaine, quand l'utilisateur ouvre le détail de la variante, alors cette fontaine figure dans la liste.
- Étant donné la fiche d'un parc, quand l'utilisateur touche « Y aller », alors le parc devient l'arrivée.

**Cas limites et erreurs** : fontaine hors service ou coupée l'hiver (mention « peut être fermée en hiver »), parc fermé à l'heure de passage, aucun point à moins de 100 m.

**Dépendances** : données points de fraîcheur (section 10), F-01, F-06.

### F-09 — Meilleur moment pour partir

**Priorité** : Must have (MVP)

**Personas concernés** : P1, P2, P3

**Statut** : [Confirmé]

**User story** : En tant qu'utilisateur, je veux savoir à quelle heure partir pour faire mon trajet le plus au frais, afin d'organiser ma sortie selon la météo et l'ombre.

**Règles de gestion**

- Une fois départ, arrivée et mode saisis, un bouton « Meilleur moment pour partir » lance l'analyse de la journée choisie : aujourd'hui par défaut, ou l'un des 7 jours suivants.
- Plage analysée : départs de 6 h à 22 h, toutes les 30 minutes. Pour aujourd'hui, seuls les créneaux postérieurs à l'heure actuelle sont analysés. [Hypothèse]
- Pour chaque créneau, l'app calcule la variante la plus ombragée (F-04, F-05) avec la météo prévue à cette heure (F-07).
- Chaque créneau affiche : heure de départ, température prévue (°C), couverture nuageuse (%), minutes au soleil direct.
- Minutes au soleil direct = durée passée sur des segments au soleil, quand la couverture nuageuse est inférieure à 80 %. [Hypothèse]
- Créneau recommandé : le moins de minutes au soleil direct ; en cas d'écart de 1 min ou moins, la température la plus basse l'emporte. [Hypothèse]
- Le créneau recommandé est mis en évidence, suivi des 2 meilleurs créneaux suivants.
- Choisir un créneau renseigne l'heure de départ (F-03) et affiche les 3 variantes pour cette heure.

**Critères d'acceptation**

- Étant donné une analyse lancée aujourd'hui à 11 h 10, quand les résultats s'affichent, alors le premier créneau proposé est 11 h 30 et le dernier 22 h.
- Étant donné deux créneaux à 3 min au soleil direct, l'un à 24 °C et l'autre à 28 °C, quand l'app choisit le créneau recommandé, alors c'est celui à 24 °C.
- Étant donné un créneau sélectionné par l'utilisateur, quand il le touche, alors l'heure de départ prend cette valeur et les 3 variantes s'affichent.

**Cas limites et erreurs** : météo indisponible (analyse sur l'ombre seule, avec une mention) ; journée entièrement couverte (recommandation sur la seule température) ; analyse lancée après 21 h 30 pour aujourd'hui (l'app propose d'analyser le lendemain).

**Dépendances** : F-03, F-04, F-05, F-07.

## 8. Exigences non fonctionnelles

Tous les seuils ci-dessous sont des [Hypothèse] à valider avec l'équipe technique.

| ID | Catégorie | Exigence | Seuil mesurable |
| --- | --- | --- | --- |
| ENF-01 | Performance | Chargement initial de l'app | Contenu principal affiché en moins de 3 s sur 4G, sur un mobile Android milieu de gamme |
| ENF-02 | Performance | Calcul des 3 variantes | Moins de 5 s pour 95 % des calculs de 10 km ou moins |
| ENF-03 | Performance | Suggestions d'adresse | Affichées en moins de 1 s après la 3e lettre |
| ENF-04 | Disponibilité | Service accessible | 99,5 % par mois, hors maintenances annoncées 48 h à l'avance |
| ENF-05 | Charge | Utilisateurs simultanés | 500 calculs par minute sans dégradation au-delà des seuils ENF-02 |
| ENF-06 | Sécurité | Chiffrement | Tous les échanges en HTTPS (TLS 1.2 minimum) |
| ENF-07 | Sécurité | Données personnelles | Aucune position ni adresse conservée après le calcul, hors journaux techniques anonymisés gardés 30 jours au plus |
| ENF-08 | Accessibilité | Conformité | RGAA 4.1 niveau AA (équivalent WCAG 2.1 AA), vérifié par audit avant lancement |
| ENF-09 | Accessibilité | Usage au clavier et lecteur d'écran | Toutes les fonctions F-01 à F-09 utilisables au clavier ; variantes lisibles sous forme de texte, sans la carte |
| ENF-10 | Lisibilité en extérieur | Contrastes | Rapport de contraste d'au moins 4,5:1 pour tout texte, pour une lecture en plein soleil |
| ENF-11 | Fraîcheur des données | Météo | Données de moins de 1 h pour un départ immédiat |
| ENF-12 | Fraîcheur des données | Arbres, bâtiments, points de fraîcheur | Mise à jour au moins tous les 6 mois |
| ENF-13 | Qualité du calcul | Précision de l'ombre | ≥ 85 % de concordance sur le jeu de 50 tronçons de référence (voir F-04) |
| ENF-14 | Éco-conception | Poids de la page | Moins de 2 Mo transférés au premier chargement, hors tuiles de carte |
| ENF-15 | Performance | Analyse du meilleur moment pour partir (F-09) | Moins de 10 s pour 95 % des analyses d'une journée complète (33 créneaux, trajet de 10 km ou moins) |

## 9. Plateformes et support

L'app est une application web responsive, utilisée dans un navigateur sur mobile et sur ordinateur, sans installation. [Confirmé]

| Élément | Exigence | Statut |
| --- | --- | --- |
| Navigateurs desktop | Chrome, Firefox, Edge, Safari : les 2 dernières versions majeures | [Hypothèse] |
| Navigateurs mobiles | Safari sur iOS 16 et plus, Chrome sur Android 10 et plus | [Hypothèse] |
| Largeurs d'écran | De 360 px à 1920 px, sans défilement horizontal | [Hypothèse] |
| Langue | Français uniquement | [Confirmé] |
| Hors ligne | Non pris en charge ; sans connexion, l'app affiche un message indiquant qu'elle a besoin d'Internet | [Confirmé] |
| Géolocalisation | Via le navigateur ; l'app reste utilisable si elle est refusée | [Implicite] |
| Support utilisateur | Page d'aide (FAQ) et adresse e-mail de contact, réponse sous 5 jours ouvrés | [Hypothèse] |

## 10. Données et intégrations

**Modèle de données simplifié**

| Entité | Attributs principaux | Relations |
| --- | --- | --- |
| Tronçon de voie | Géométrie, longueur, modes autorisés (piéton, vélo), sens de circulation vélo | Découpé en segments |
| Segment | Géométrie (10 m max), classement ombre / soleil calculé à la demande | Appartient à un tronçon |
| Bâtiment | Emprise au sol, hauteur (m) | Projette une ombre sur des segments |
| Arbre | Position, diamètre du houppier (m), hauteur (m), feuillage caduc ou persistant | Projette une ombre sur des segments |
| Point de fraîcheur | Catégorie (fontaine, parc), position, nom, horaires | Proche d'un ou plusieurs tronçons |
| Demande d'itinéraire | Départ, arrivée, mode, heure de départ | Produit jusqu'à 3 variantes ; non conservée (ENF-07) |
| Variante | Type (rapide, équilibrée, ombragée), durée, distance, taux d'ombre | Composée de tronçons |

**Sources de données et services tiers**

Les sources ci-dessous sont des pistes. Leur couverture, leur précision et leur licence restent à vérifier avant le démarrage. [Hypothèse]

| Besoin | Source envisagée | Point à vérifier |
| --- | --- | --- |
| Réseau de rues, voies cyclables | OpenStreetMap | Licence ODbL : attribution obligatoire |
| Arbres | Open data de la Métropole de Lyon (data.grandlyon.com) | Présence des arbres des parcs, pas seulement des arbres d'alignement ; présence du diamètre du houppier |
| Bâtiments et hauteurs | BD TOPO de l'IGN | Précision des hauteurs à Lyon |
| Fontaines, parcs et jardins | Open data de la Métropole ou de la Ville de Lyon | Fraîcheur des données, horaires des parcs |
| Météo | Service de prévision (ex. Météo-France) | Coût, limites d'appels, horizon de 7 jours |
| Géocodage (adresses) | Base Adresse Nationale | Recherche de lieux par nom |
| Fond de carte | Tuiles issues d'OpenStreetMap | Coût d'hébergement ou de service |
| Position du soleil | Calcul astronomique interne, sans service tiers | — |
| Mesure d'audience | Outil exempté de consentement selon la CNIL | Configuration conforme |

## 11. Contraintes légales et conformité

Ces points sont à faire valider par un juriste ; ils ne constituent pas un avis juridique. [Hypothèse]

- **RGPD, géolocalisation** : la position est demandée par le navigateur, utilisée pour le seul calcul, puis effacée (ENF-07). La politique de confidentialité l'explique.
- **Mesure d'audience** : utiliser un outil exempté de consentement selon les critères de la CNIL, ou afficher un bandeau de consentement dans le cas contraire.
- **Pages obligatoires** : mentions légales, conditions générales d'utilisation, politique de confidentialité.
- **Licences des données** : afficher les attributions requises (OpenStreetMap, IGN, open data lyonnais, fournisseur météo) sur la carte ou dans une page dédiée.
- **Responsabilité** : les CGU et l'écran des résultats précisent que l'ombre est une estimation et que l'utilisateur reste responsable de sa sécurité et du respect du code de la route.
- **Accessibilité** : publier une déclaration d'accessibilité après l'audit RGAA (ENF-08).

## 12. Hypothèses et questions ouvertes

| # | Hypothèse retenue | Impact si elle est fausse | À valider par |
| --- | --- | --- | --- |
| H-01 | Les données d'arbres et de hauteurs de bâtiments disponibles à Lyon sont assez précises pour atteindre 85 % de concordance | Le cœur du produit n'est pas fiable ; il faut enrichir les données ou revoir la promesse | Équipe données, étude de faisabilité avant développement |
| H-02 | La zone couverte est la ville de Lyon (9 arrondissements) | Si c'est la Métropole : volume de données et coût de calcul plus élevés | Sponsor produit |
| H-03 | Réponses reçues interprétées ainsi : calcul seul sans guidage, et 3 variantes proposées | Si un guidage était attendu, le périmètre change fortement | Sponsor produit |
| H-04 | Plafonds de détour : +15 % (équilibrée) et +30 % (ombragée) | Variantes jugées trop longues ou trop peu ombragées | Tests utilisateurs |
| H-05 | Ciel couvert à partir de 80 % de nébulosité | Bandeau affiché à tort, ou pas assez souvent | Équipe données |
| H-06 | Horizon de planification de 7 jours | Utilisateurs bloqués pour des trajets planifiés plus tôt | Sponsor produit |
| H-07 | Vitesses de référence : 4,5 km/h à pied, 15 km/h à vélo | Durées affichées fausses, donc heures de passage et ombres décalées | Équipe technique |
| H-08 | Distances maximales : 10 km à pied, 25 km à vélo | Demandes légitimes refusées, ou temps de calcul excessifs | Équipe technique |
| H-09 | Arbres caducs sans ombrage de décembre à mars | Taux d'ombre surestimé ou sous-estimé en intersaison | Équipe données |
| H-10 | Points de fraîcheur limités aux fontaines et aux parcs | Besoin de P3 partiellement couvert | Tests utilisateurs |
| H-11 | Gestion des erreurs retirée du périmètre : seuls les messages minimum sont conservés (hors zone, nuit, géolocalisation refusée, météo indisponible, pas de connexion) | Sans ces messages, l'utilisateur voit un écran vide et ne comprend pas pourquoi | Sponsor produit |
| H-12 | Meilleur moment pour partir : créneaux de 30 min de 6 h à 22 h, classés d'abord par minutes au soleil direct, puis par température | Recommandation jugée peu utile, ou analyse trop lente (ENF-15) | Sponsor produit |
| H-13 | Seuils de performance et de disponibilité (section 8) | Coûts d'infrastructure mal dimensionnés | Équipe technique |
| H-14 | Accessibilité visée : RGAA 4.1 niveau AA | Obligation légale éventuelle non respectée, ou effort sous-estimé | Juriste, équipe design |
| H-15 | Aucune échéance ni budget communiqués | Le découpage MVP peut devoir être réduit | Sponsor produit |

## 13. Matrice de traçabilité

| Exigence (brief ou réponse) | Fonctionnalité(s) |
| --- | --- |
| « itinéraire à l'ombre en ville » | F-04, F-05, F-06 |
| « GPS piéton » (calcul seul, réponse 3) | F-01, F-02, F-05, F-06 |
| « ou vélo » | F-02 |
| « le trajet le moins exposé au soleil, et pas seulement le plus court » | F-04, F-05 |
| « Il tient compte de l'heure » | F-03, F-04 |
| « des arbres » | F-04 |
| « l'ombre portée des bâtiments » | F-04 |
| Cible « piétons » | Persona P1, PU-01, F-02 |
| Cible « cyclistes » | Persona P2, PU-02, F-02 |
| Cible « balade avec les chiens » | Persona P3, PU-03, F-08 |
| Cible « parents avec poussette » | Retirée du périmètre (réponse 7) |
| Cible « livreurs » | Non ciblée spécifiquement (réponse 6) ; modes F-02 utilisables |
| Lyon (réponse 1) | F-01 |
| Web mobile et desktop (réponse 2) | F-06, section 9 |
| 3 variantes (réponse 4) | F-05 |
| Gratuit (réponse 5) | Section 5, hors périmètre |
| Sans compte (réponse 8) | Section 4 |
| Météo prise en compte (réponse 9) | F-07 |
| Français uniquement (réponse 10) | Section 9 |
| Points de fraîcheur (ajout demandé) | F-08 |
| Météo pour savoir à quelle heure sortir (ajout demandé) | F-09, F-07 |

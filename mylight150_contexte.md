# mylight150 — Kit de contexte pour le challenge

> Objectif de ce document : vous donner en 10 minutes de lecture ce qu'il faut savoir sur mylight150, son marché et ses clients pour construire un outil pertinent. Pas besoin d'être expert en énergie.

---

## 1. mylight150 en une phrase

**mylight150 aide les particuliers équipés de panneaux solaires à consommer un maximum de leur propre production**, en combinant trois briques : un fournisseur d'électricité, une batterie virtuelle et un boîtier de gestion d'énergie qui pilote les équipements de la maison.

- Entreprise française, basée dans la métropole lyonnaise
- Fournisseur d'électricité 100 % renouvelable, offres indexées sur le tarif réglementé (TRVE)
- Plus de 10 ans d'expérience sur la batterie virtuelle
- **+35 000 foyers équipés**, **1 237 €/an** d'économies moyennes par client (chiffres mylight150)
- Levée de fonds de 100 M€
- Marché : France
- Distribution principalement via un réseau d'**installateurs** solaires partenaires

---

## 2. Le problème que mylight150 résout

Un foyer avec panneaux solaires produit surtout **le jour**, mais consomme surtout **le matin et le soir**. Résultat : une grande partie de la production est injectée sur le réseau au moment où le foyer n'en a pas besoin.

Que devient ce surplus ?

| Option | Ce que ça rapporte au client |
|---|---|
| Revente à EDF OA (obligation d'achat) | **1,1 c€/kWh** depuis juin 2026 (contre 4 c€ avant, et 12,7 c€ début 2025) |
| Batterie physique | Stocke le surplus, mais coûte plusieurs milliers d'euros et a une capacité limitée |
| **Batterie virtuelle** | Le surplus est "mis de côté" et restitué plus tard, quand le client en a besoin |

Pour comparaison, un kWh acheté au réseau coûte autour de **20 à 25 c€**. Revendre son surplus à 1,1 c€ pour le racheter 20 fois plus cher le soir n'a plus de sens économique. **C'est tout l'enjeu du marché aujourd'hui.**

### Ce qui a changé en 2026 (important)

Depuis le 1er juin 2026 :
- la **prime à l'autoconsommation est supprimée** ;
- le **tarif de rachat du surplus tombe à 1,1 c€/kWh** pour les petites installations ;
- l'État pousse explicitement vers l'autoconsommation et le stockage plutôt que la revente.

➡️ La batterie virtuelle et le pilotage intelligent deviennent le principal levier de rentabilité d'une installation solaire résidentielle.

---

## 3. Comment ça marche (version simple)

```
   ☀️ Panneaux solaires
          │
          ▼
   🏠 Maison ──── consomme en direct (autoconsommation)
          │
          │ surplus non consommé
          ▼
   🔌 Réseau Enedis ──► comptabilisé par mylight150 dans la
                        "batterie virtuelle" du client
          │
          ▼
   🌙 Le soir / l'hiver : le client "déstocke" ses kWh
      au lieu de les payer plein tarif
```

Le **boîtier de gestion d'énergie** (EMS) installé dans le tableau électrique mesure en temps réel la production et la consommation, et peut **piloter les gros équipements** (ballon d'eau chaude, pompe à chaleur, borne de recharge) pour les faire tourner quand le soleil brille.

Le client suit tout dans **l'application mobile mylight150** (production, consommation, état de la batterie virtuelle).

---

## 4. Les offres

> Tarifs issus de mylight150.com/offres-d-energie (relevés en octobre 2026, nouveaux clients).

Dans tous les cas, **mylight150 devient le fournisseur d'électricité du client** : c'est obligatoire pour avoir une batterie virtuelle en France. L'offre est sans engagement et réservée aux producteurs solaires raccordés à Enedis (≤ 36 kVA). En moyenne, l'électricité achetée au réseau ne représente que **25 %** de la consommation des clients.

La facture a deux parties : **la fourniture** (abonnement + kWh achetés au réseau, comme chez n'importe quel fournisseur) et **le stockage virtuel** (l'une des deux formules ci-dessous).

**Frais d'activation du stockage : 279 € TTC** (une fois).

### MySmartBattery — stockage sur-mesure

- Le client choisit une **capacité** de batterie virtuelle. Il peut l'augmenter chaque mois et la baisser tous les 12 mois.
- Les kWh restitués sont **gratuits** (0 €/kWh, réseau et taxes inclus dans le forfait).
- Nécessite le **coffret de pilotage mylight150** (« Robin »), qui mesure et pilote les équipements.

| Capacité | Abonnement mensuel TTC |
|---|---|
| 20 kWh | 14,99 € |
| 100 kWh | 21,99 € |
| 300 kWh | 35,99 € |
| 600 kWh | 45,99 € |
| 900 kWh | 51,99 € |
| 1 200 kWh | 58,99 € |
| 1 800 kWh | 74,99 € |
| 3 000 kWh | 117,99 € |
| 5 000 kWh | 176,99 € |
| 10 000 kWh | 281,99 € |

### MyBattery — stockage illimité

- **Pas de limite de capacité**, pas de matériel obligatoire.
- Le client paie un abonnement selon la taille de son installation, puis les coûts réglementaires sur chaque kWh restitué (« à prix coûtant »).

| Poste | Tarif TTC |
|---|---|
| Abonnement mensuel | 1,90 € / kWc installé |
| Acheminement | 0,05988 € / kWh restitué |
| Accise | 0,03674 € / kWh restitué |
| CEE (certificats d'économie d'énergie) | 0,012 € / kWh restitué |
| **Exemple pour 6 kWc** | **11,40 €/mois + 0,10862 € / kWh restitué** |

À comparer à un kWh acheté au réseau autour de 0,20 €.

### Les autres briques

- **Pilotage intelligent (MySmartPilot)** : un algorithme programme le chauffe-eau, la pompe à chaleur et la borne de recharge pour tourner quand l'électricité est la moins chère (prix spot heure par heure) et s'arrêter aux pics.
- **Borne de recharge** : recharge du véhicule électrique pilotée sur la production solaire.
- **Offre ENCORE** : combinaison batterie physique + batterie virtuelle.
- **Application mobile mylight150** : suivi en temps réel de la production, de la consommation et du stockage.

### Pour les professionnels

- **mylight150 Pro** : plateforme destinée aux **installateurs** pour gérer leurs chantiers, installer et configurer le coffret, activer les clients et suivre leur parc.
- **MyProSizer** : outil de simulation pour dimensionner l'installation et la capacité de batterie virtuelle.

---

## 5. Les acteurs de l'écosystème

```
  Installateur ──vend & pose──► Client particulier ◄──fournit l'électricité── mylight150
       │                              │                                          │
       └──── utilise mylight150 Pro ──┘                                          │
                                      │                                          │
                         Enedis (gestionnaire du réseau) ── données de comptage ──┘
```

| Acteur | Rôle | Ce qui compte pour lui |
|---|---|---|
| **Client particulier** | Propriétaire d'une maison avec panneaux solaires | Réduire sa facture, comprendre ce qu'il économise, ne pas avoir de galère |
| **Installateur** | Artisan / PME qui vend et pose l'installation | Vendre facilement, installer vite, ne pas recevoir d'appels SAV après la pose |
| **Enedis** | Gère le réseau et les compteurs Linky | Fournit les données de production / consommation, valide les mises en service |
| **mylight150** | Fournisseur + éditeur de logiciel + fabricant du boîtier | Activer les clients vite, facturer juste, maximiser la valeur de chaque kWh |

---

## 6. Concurrence

| Catégorie | Acteurs | Positionnement vs mylight150 |
|---|---|---|
| **Batterie virtuelle** | Urban Solar Energy (concurrent direct principal), JPME (historique) | Même promesse de stockage virtuel ; la différence se fait sur le prix, la simplicité et le pilotage intelligent |
| **Revente du surplus** | EDF OA | Solution par défaut, mais devenue très peu rémunératrice (1,1 c€/kWh) |
| **Batterie physique** | Tesla Powerwall, Enphase, Huawei, BYD, kits "plug & play" type Sunology | Indépendance réelle mais coût élevé (plusieurs milliers d'€) et capacité limitée |
| **Gestion d'énergie / pilotage** | Comwatt, Enphase, solutions des onduleurs, domotique | Pilotent les équipements mais sans brique fourniture / batterie virtuelle intégrée |
| **Grands fournisseurs** | EDF, Engie, TotalEnergies, Octopus | Puissants commercialement, pas (ou peu) d'offre de batterie virtuelle à ce jour |

**L'avantage de mylight150** : être le seul à intégrer les trois briques (fourniture + batterie virtuelle + pilotage matériel) dans une même expérience.

---

## 7. Le marché en chiffres

- **~1,35 million** d'installations solaires en France (fin 2025), **33 GW** installés (mars 2026)
- Plus de **780 000** installations en autoconsommation avec un contrat de rachat du surplus
- Environ **30 000 nouveaux projets** d'autoconsommation par trimestre (T1 2026, +26 % vs T4 2025)
- **15,5 %** des nouvelles demandes intègrent déjà une solution de stockage, contre 4 % du parc existant
- ~**100 000 contrats** de rachat arriveront à échéance en 2028, sans garantie de renouvellement

➡️ Un marché en croissance, qui bascule de "je revends mon surplus" vers "je stocke et j'optimise ma consommation".

---

## 8. Où sont les irritants (pistes de réflexion)

Quelques zones où un outil peut avoir un vrai impact :

- **Comprendre ses économies** : la batterie virtuelle est un concept abstrait. Combien ai-je stocké ? Combien ai-je économisé ? Qu'est-ce que je paie exactement ?
- **Choisir la bonne offre** : MyBattery ou MySmartBattery ? Quelle capacité ? Ça dépend de la production, de la consommation, des équipements…
- **L'activation** : entre la pose des panneaux, la validation Enedis et l'activation de la batterie virtuelle, le client attend et ne sait pas toujours où il en est.
- **L'installateur** : il doit vendre un produit complexe, poser du matériel, configurer, former le client. Tout ce qui le simplifie a de la valeur.
- **Consommer au bon moment** : quand lancer son lave-linge, recharger sa voiture, chauffer son eau ?

---

## 9. Glossaire

| Terme | Définition |
|---|---|
| **Autoconsommation** | Consommer directement l'électricité qu'on produit |
| **Surplus** | Production solaire non consommée, injectée sur le réseau |
| **Batterie virtuelle** | Mécanisme comptable : le surplus injecté est crédité et restitué plus tard |
| **kWc** (kilowatt-crête) | Puissance maximale d'une installation solaire. Une maison typique : 3 à 9 kWc |
| **kWh** | Unité d'énergie consommée ou produite. Un foyer français consomme ~4 500 kWh/an |
| **EMS / boîtier** | Système de gestion d'énergie installé chez le client, qui mesure et pilote |
| **Enedis** | Gestionnaire du réseau de distribution, propriétaire des compteurs Linky |
| **Linky** | Compteur communicant qui mesure consommation et injection |
| **EDF OA** | Obligation d'achat : rachat réglementé du surplus solaire |
| **TRVE** | Tarif réglementé de vente d'électricité (référence de prix en France) |
| **HP / HC** | Heures pleines / heures creuses : deux prix du kWh selon l'heure |
| **Acheminement (TURPE)** | Frais de transport de l'électricité sur le réseau, payés à chaque kWh soutiré |
| **PAC** | Pompe à chaleur |
| **Pilotage** | Allumer / éteindre automatiquement un équipement au meilleur moment |

---

## 10. Pour aller plus loin

- Site mylight150 : https://www.mylight150.com
- Tarifs énergie & stockage : https://www.mylight150.com/offres-d-energie
- Comprendre la batterie virtuelle : https://www.mylight150.com/en-en/blog-autoconsommation/stockage
- Chiffres du solaire en France : https://selectra.info/energie/solaire/marche
- Fin de la prime à l'autoconsommation (juin 2026) : https://selectra.info/energie/solaire/autoconsommation-prime

---

*Bon challenge ! 🚀*

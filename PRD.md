# Le « Wrapped » mylight150

## Objectif
Le jour de son anniversaire de contrat, chaque client découvre dans l'app un bilan de son année sous forme de story mobile immersive. Ses données y deviennent des objets visuels vivants, en 2D et en 3D, qu'il peut toucher, faire tourner et explorer. Le bilan rend tangible ce que la batterie virtuelle lui a rapporté, le rend fier et lui propose un défi chiffré pour l'année suivante. Il existe parce que la batterie virtuelle est abstraite : le client voit sa production et sa consommation, mais pas ce qu'il a réellement gagné ni évité.

## Pour qui
Un particulier équipé de panneaux solaires, non expert en énergie, qui ouvre l'app sur son téléphone, souvent d'une main, avec quelques minutes devant lui. Il doit repartir avec trois certitudes : « j'ai fait de vraies économies », « ce que j'ai accompli compte », « je sais quoi faire pour faire mieux ». Cas de référence : Claire Martin (données fictives fournies), 829 € de gain sur l'année.

## Expérience visée
**Fierté · Clarté · Matière · Jeu · Élan**

On doit avoir l'impression de tenir son année d'énergie dans la main, comme un objet précieux qu'on retourne pour la regarder sous tous les angles. Les chiffres ne s'affichent pas, ils prennent forme.

## Périmètre
**Inclus**
- Une story de 9 écrans, à parcourir au doigt, déclenchée le jour de l'anniversaire du client.
- Un rendu graphique temps réel en 2D et en 3D (WebGL, voulu par le projet), où les données réelles du client deviennent des formes, des volumes, des mouvements.
- Des visualisations très interactives : toucher, faire glisser, pincer, tourner, explorer l'année.
- L'activation d'un levier du défi en un tap.
- Un écran de partage avec carte à 3 chiffres et lien de parrainage.
- Une expérience pensée d'abord pour le téléphone, correcte et soignée sur tablette et ordinateur.

**Hors périmètre**
- Une version desktop avec une mise en page différente de celle du mobile.
- Refonte du reste de l'app ou de ses tableaux de bord.
- Comparaison avec d'autres clients.
- Toute offre commerciale nouvelle ou modification d'offre.

## Contenu
Dans l'ordre. Pour chaque écran : le message, et ce que la donnée doit faire ressentir. La forme exacte (2D, 3D, hybride) est laissée au développeur.

1. **Accroche** : la maison a consommé X kWh, dont 53 % couverts par le soleil. *« Votre soleil a travaillé pour vous. »* La part solaire se sent physiquement, avant d'être lue.
2. **Le ticket de caisse inversé** : le gain en euros, ligne par ligne (829 € pour Claire). *« Voici exactement d'où vient votre argent. »* Chaque poste est un élément que l'on peut toucher pour comprendre ce qu'il recouvre.
3. **Gratuit à X %, par équipement** : lave-linge, ballon d'eau chaude, pompe à chaleur. *« Ce que vous faites tourner au soleil est presque offert. »* Les trois équipements se comparent d'un regard.
4. **La saison sans facture** : 165 jours sans acheter un kWh au réseau. *« Une saison entière d'indépendance. »* On voit où ces jours se situent dans l'année et comment ils s'enchaînent.
5. **La batterie comme coffre-fort** : niveau jour par jour, cycles, jours de batterie pleine. *« Votre batterie virtuelle existe, et elle travaille. »* L'année entière s'explore, et le niveau de n'importe quel jour se retrouve au doigt.
6. **L'impact** : CO₂ évité, avec équivalents en km et en arbres. *« Un effet concret au-delà de votre facture. »*
7. **Le défi de l'année 2** : trois leviers classés par euros gagnables, activables en un tap. *« Voici comment faire encore mieux, et c'est simple. »*
8. **La projection année 2** (optionnelle) : ce que donnerait le défi relevé, comparé visuellement à l'année écoulée. *« Voici où vous pouvez aller. »*
9. **Le partage** : une carte à 3 chiffres, avec le choix de ce que le client montre, et un lien de parrainage. *« Fier de le montrer, facile à partager. »*

## Principes de la dataviz interactive
- **Une idée par visualisation.** Un écran, une histoire. La donnée principale se repère sans effort.
- **Le chiffre clé d'abord.** Il se lit avant tout détail. La visualisation l'explique, elle ne le remplace pas.
- **Très interactive, sans mode d'emploi.** Toucher, maintenir, glisser, tourner ou pincer révèle du détail. Le geste possible se devine et se découvre en jouant.
- **La 3D sert la compréhension.** Une dimension de plus n'est justifiée que si elle rend la donnée plus claire ou plus mémorable. Sinon, la 2D l'emporte. Aucune 3D décorative qui brouille la lecture.
- **Les gestes ne se marchent pas dessus.** Explorer une visualisation n'avance jamais la story par erreur, et inversement.
- **Le doigt ne cache rien.** La valeur consultée reste visible pendant l'exploration.
- **Lisible en plein soleil et sur petit écran.** Contrastes forts, libellés jamais minuscules ni superposés, couleur jamais seule porteuse d'information. Les volumes restent lisibles malgré la perspective.
- **Données denses, forme simple.** La courbe 15 min et les relevés quotidiens sont résumés en une forme compréhensible d'un coup d'œil. Le détail est accessible à la demande.
- **Toujours un équivalent texte.** Chaque visualisation a une alternative textuelle simple, pour les lecteurs d'écran et ceux qui préfèrent lire.

## Moments signature
- **Le ticket de caisse inversé (écran 2)** : le total se construit sous les yeux du client, élément après élément, jusqu'au montant final. Il éprouve la satisfaction d'un gain qui s'additionne, à l'inverse d'une facture.
- **Le coffre-fort (écran 5)** : l'année de batterie devient un objet que l'on tient, retourne et parcourt du doigt. Il sent la batterie se remplir et se vider, et retrouve un jour précis en glissant.
- **Le défi en un tap (écran 7)** : activer un levier est un geste gratifiant, qui transforme visiblement la scène et donne le sentiment d'avoir déjà commencé l'année 2.

## Contraintes non négociables
- **Données réelles** : chaque forme, hauteur ou mouvement vient des données du client. Aucun chiffre inventé, aucune déformation flatteuse : la représentation reste fidèle aux proportions réelles.
- **Fierté sans culpabilité** : un client aux résultats modestes ressent une progression possible, jamais un jugement.
- **Identité mylight150** : respecter la charte (couleurs, typographies, logo) fournie par ailleurs.
- **Mobile d'abord, et correct partout** : conçu pour une main et le pouce seul, sur toutes les tailles de téléphone, en portrait. Sur tablette ou ordinateur, l'expérience reste pleinement utilisable (par exemple présentée au format téléphone, centrée), avec interactions à la souris et au clavier.
- **Fluidité sur téléphone milieu de gamme** : l'ambition visuelle s'adapte à l'appareil. Démarrage immédiat, interactions sans à-coups, batterie et chauffe du téléphone ménagées.
- **Repli élégant** : si l'appareil ne peut pas afficher le rendu 3D, le client reçoit une version 2D simplifiée qui garde le même message et les mêmes chiffres, sans écran vide ni erreur.
- **Navigation de story claire** : avancer, revenir et quitter à tout moment.
- **Accessibilité de base** : textes lisibles, contrastes suffisants, mouvement réduit respecté (versions calmes des animations et des rotations).
- **Écran 9** : le client choisit ce qu'il montre avant tout partage, et rien de personnel n'est exposé sans son accord.

## Liberté créative
Le développeur est libre de décider ou d'inventer :
- la mise en page de chaque écran, le rythme de la story, les entrées et sorties ;
- le choix, écran par écran, entre 2D, 3D ou mélange des deux ;
- la métaphore de chaque donnée. À titre de pistes facultatives : l'année de batterie comme un relief ou un paysage, le ticket comme une pile d'objets qui s'empilent, les jours sans facture comme une constellation, les équipements comme trois volumes qui se remplissent ;
- les gestes d'exploration (toucher, glisser, tourner, pincer, incliner le téléphone) et la manière dont ils se révèlent ;
- lumière, matière, particules, ambiance et transitions entre écrans ;
- le son, le haptique ou tout autre sens mobilisé, à titre facultatif ;
- la direction visuelle de la carte de partage, qui peut être un instantané de la scène 3D ;
- les équivalents du CO₂ (km, arbres, ou toute image plus parlante) ;
- l'ajout, la fusion ou le déplacement d'un détail s'il renforce l'émotion.

Surprenez-nous : on préfère un écran audacieux et mémorable à neuf écrans propres et prévisibles.

## Critères de réussite
- Un client comprend en moins de 5 secondes combien il a gagné sur l'année.
- Sur chaque écran de dataviz, le chiffre clé se lit sans toucher quoi que ce soit.
- Un client retrouve seul, au doigt, le niveau de sa batterie un jour précis, sans explication.
- Au moins deux écrans donnent envie de jouer avec la donnée : un testeur y revient spontanément.
- Aucune visualisation n'a de texte tronqué, de libellés superposés ou de valeur cachée par le doigt, du plus petit au plus grand téléphone testé.
- Les interactions restent fluides sur un téléphone milieu de gamme, et la version de repli s'affiche correctement quand le rendu 3D n'est pas disponible.

## Questions ouvertes
Hypothèses faites, à valider :
- **WebGL** : je l'ai posé comme choix du projet, mais pas comme obligation sur chaque écran. Le développeur choisit 2D ou 3D selon ce qui sert la lisibilité. Si tu veux de la 3D sur tous les écrans, à préciser.
- **Périmètre écran** : « correct sur mobile » compris comme « mobile en cible principale, rendu propre sur grand écran ». À inverser si l'usage principal est desktop.
- **Données Claire** : les chiffres cités (829 €, 53 %, 165 jours) viennent de ton brief et n'ont pas été vérifiés avec les fichiers joints (courbe 15 min, journalier, mensuel, JSON client).
- **Déclenchement** : accessible le jour de l'anniversaire du contrat, puis consultable ensuite. À confirmer.
- **CO₂ et équivalents** : méthode de calcul (facteur d'émission, source des équivalents) à choisir et faire valider.
- **Leviers du défi** : supposés calculés pour chaque client, avec un tap qui active réellement un réglage ou une demande. À préciser.
- **Parrainage** : mécanisme et récompense supposés existants. Sinon, l'écran 9 se limite au partage.
- **Écran 8** : à garder seulement s'il apporte du neuf par rapport à l'écran 7.
- **Cas limites** : client sans pilotage de certains équipements, ou avec moins d'un an de données.
- **Langue et ton** : français, tutoiement ou vouvoiement à trancher selon l'app.
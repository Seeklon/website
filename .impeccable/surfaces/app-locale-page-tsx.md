---
version: 1
slug: "app-locale-page-tsx"
primary_target: "app/[locale]/page.tsx"
related_targets: ["components/Hero.tsx", "components/Features.tsx", "components/CTA.tsx", "app/globals.css"]
---

# Accueil Seeklon

- Mode visiteur : Persuade.
- Public prioritaire : manager de PME qui recrute sans équipe RH dédiée.
- Action principale : demander une démonstration ; action secondaire : parcourir les trois étapes du recrutement.
- Contraintes : FR/EN, clavier, mobile, réduction des animations ; aucune donnée de performance ou promesse de décision automatique inventée.
- Périmètre : accueil et conclusion intégrée ; CTA partagé des pages secondaires et blog inchangés ; aucun bloc entreprise sur l'accueil.

## Direction contract

**THESIS.** Accompagner un manager depuis le besoin de recruter jusqu'à une décision qu'il comprend et assume.

**OWN-WORLD.** Bleu Seeklon, bleu nuit et bleu brume ; logo et polices existants. Captures produit réelles et entières, sans inclinaison ni recadrage. Le corail reste ponctuel, sans grand panneau CTA rouge ou corail.

**STORY.** Besoin → rédaction de l'offre → tri des CV → guide d'entretien → décision humaine → demande de démonstration. Une question issue du guide de démonstration devient une grande citation, explicitement attribuée à ces données.

**FIRST VIEWPORT.** Une seule scène bleu nuit éclairée de bleu Seeklon réunit le titre centré « Recruter / plus vite » en Bricolage Grotesque 800 auto-hébergée (TTF et licence OFL dans `/fonts/`), la promesse, le contexte du manager sans RH, un CTA blanc et une capture d'offre entière de 820px maximum. Entre 800 et 950px de hauteur sur desktop, la capture est ramenée à 520px pour conserver son bord inférieur et l'invitation à poursuivre dans le premier viewport. Quatre captures réelles teintées et légèrement floutées composent la profondeur sur desktop ; elles disparaissent à 1100px de largeur ou moins. Le header bleu nuit s'applique à l'accueil, menu mobile inclus. Sa navigation emploie « Le parcours » / « How it works » et bascule en panneau sous 1024px.

**FORM.** Un prologue clair, centré et concentrique occupe au moins 78vh avant de basculer dans une scène bleu nuit. Une colonne narrative de 4fr accompagne alors un affichage produit de 8fr fixé à 88px du haut, dans une largeur maximale de 940px. Des halos lumineux et une ligne de progression horizontale donnent de la profondeur sans remplacer la capture. Trois étapes de `60vh - 16px` au plus, plafonnées à 560px chacune, actualisent la capture, la navigation et le résultat au défilement. La colonne narrative conserve une réserve de sortie de 240px : le titre 03 peut ainsi rejoindre le haut de la preuve avant la fin de la position fixe, y compris aux largeurs où la capture est la plus haute. À partir de 1024px de large, la séquence reste animée quelle que soit la hauteur ; sous 800px de haut, le cadre se compacte à 680px et réduit ses espacements. Sous 1024px, ou avec réduction des animations, les trois captures sont présentées dans le flux. La citation, la décision humaine et l'unique CTA final appartiennent à une même conclusion bleue.

**AUTHORITY.** Le rejet explicite par l'utilisateur de la composition antérieure remplace le seed `ac3f819c` et la maquette `.impeccable/mocks/home-dossier-open.png`. Ces fichiers sont historiques, sans autorité visuelle sur cette implémentation. Le présent contrat décrit la direction issue des contraintes confirmées et du code ; il ne prétend pas à une approbation pixel par pixel du rendu.

## Motion contract

Affinage du bénéfice et du rythme : « plus vite » (EN « faster ») en bleu clair `#8cc4ff`, texte de soutien centré sur l'offre claire, les CV organisés et les entretiens préparés. La promesse, l'explication, le CTA et la preuve entrent successivement ; les chapitres mobiles conservent 72px de padding vertical. L'accueil ne répète plus le CTA partagé après sa conclusion. Ces changements ne concernent pas le blog.

Les deux particules centrales sont masquées pour ne pas traverser le titre coloré ; les six autres restent en périphérie.

Le hero fait entrer la première ligne en 650ms, puis assemble chaque caractère de la seconde avec compression et étirement en 760ms, à partir de 120ms et avec un décalage de 35ms. La promesse, l'explication et le CTA suivent de 520 à 760ms. La figure entière, image et légende ensemble, passe de scale(.88) et translateY(40px) à sa place finale en 900ms après 860ms. Sous 768px, l'entrée des caractères utilise 8px de décalage et 1.18 d'étirement vertical ; desktop conserve 24px et 1.45. Les fonds décoratifs entrent en 1100ms, avec des délais de 0 à 220ms. L'entrée ne boucle pas ; seuls les fonds décoratifs et les particules ont un mouvement ambiant continu, avec un contrôle pause/reprise. Aucun bouton de relance n'est livré. À 1100px de largeur ou moins, les fonds décoratifs sont masqués ; l'introduction reste animée, y compris sur mobile. Le mode réduit affiche immédiatement l'état final et masque les contrôles d'animation. Aucune image générée ni nouvelle dépendance.

Les quatre captures de fond dérivent sur une boucle alternée de 9s, indépendamment de leur entrée, tandis que huit points et arcs bleus suivent une boucle de 12s. Un bouton permet de suspendre ces mouvements ambiants ; ils se suspendent aussi lorsque le hero quitte le viewport ou que le document est masqué. Le mode réduit les désactive. La capture principale reste stable après son entrée.

Dans la séquence fixe, le repère actif bleu glisse de gauche à droite en 620ms sur la ligne 01–02–03. Les captures entières restent alignées dans un cadre 16:9 : la suivante entre par la droite et la précédente repart vers la gauche en 720ms, avec un léger flou uniquement pendant le passage. Le sens s'inverse lorsque l'utilisateur remonte. Le résultat arrive en 420ms sans délai artificiel. L'étape active change lorsque le titre du chapitre franchit le bord supérieur réel de la capture fixe, plutôt qu'à partir du haut de l'article ou de l'ordre variable des notifications d'intersection. Le guide actif souligne sa deuxième question avec un contour SVG dessiné en 700ms après 220ms. L'annotation est déclarée dans les textes FR/EN ; aucun raster n'est modifié.

Le prologue révèle ses mots en 820ms avec décalage, échelle et flou décroissant ; sa copie suit en 760ms. Les titres des chapitres actifs se reforment en 620ms et les deux lignes finales en 820ms. La profondeur lumineuse et le rythme spacieux s'inspirent de Reflect, mais restent construits avec les couleurs, les captures et les composants Seeklon. Le mode réduit supprime ces révélations et rend immédiatement tout le contenu.

La citation déclenche une seule fois un balayage bleu de 850ms lorsqu'elle atteint 78 % de la hauteur du viewport. Deux couches de texte alignées accompagnent le fond, et la citation rejoint sa place depuis 24px de décalage et une échelle de 0.96 en 650ms. Le doublon visuel est masqué aux lecteurs d'écran. Le balayage existe aussi sur mobile ; le mode réduit et l'absence d'IntersectionObserver affichent directement l'état final de la citation. Le mode réduit garde également les captures dans le flux.

Ces animations sont implémentées sans nouvelle dépendance. La revue du 15 septembre 2026 concernait la direction antérieure et ne couvre pas cette évolution inspirée de Reflect. Une nouvelle revue frontend du 16 septembre valide la composition desktop/mobile, le mode réduit et les états avant/pendant/après après déplacement des déclencheurs sur les titres réellement animés. Ce verdict ne certifie ni une réaction subjective « wouah », ni les performances sur appareils réels.

## Evidence

Lisibilité : descriptions des trois étapes 18px, résultats 17px, légendes 15px, liens d'agrandissement et onglets 16px, source de citation 15px. Les textes et captures restent identiques. Les conteneurs permettent le retour à la ligne lors de l'agrandissement du texte ; le hero reçoit uniquement un halo et une pulsation lumineuse supplémentaires, sans changement de contenu ni de structure.

Affinage confirmé : aucun texte n'est changé. Titres à interligne 1.22 ; groupes repère/titre (20px), explication (40px), résultat (24px), capture linéaire (56px), légende (24px). Onglets/capture desktop : 32px ; légende/résultat : 40px. Le prologue, les chapitres et la séquence reçoivent les respirations décrites dans `DESIGN.md`.

Captures originales conservées sans recadrage :
- Capture principale de l'ouverture : `public/marketing/app-screens/09-offer-detail-1920x1080.png`.
- Fonds décoratifs entiers : captures `09`, `10`, `13` et `17` du même dossier ; teinte et flou appliqués en CSS, sans modification des rasters.
- Rédaction : `public/marketing/app-screens/06-create-offer-form-1920x1080.png`.
- Tri : `public/marketing/app-screens/10-applications-table-1920x1080.png`.
- Entretien : `public/marketing/app-screens/17-interview-guide-1920x1080.png`.

Les trois étapes proposent un accès au fichier complet. Les légendes et la citation décrivent des données de démonstration, pas un témoignage client.

## Open inputs

Témoignages validés, photos de l'équipe et détails commerciaux des packs restent indisponibles ; ils ne conditionnent pas cette page. Le verdict de revue visuelle appartient au compte rendu de validation, sans être présumé par ce contrat.

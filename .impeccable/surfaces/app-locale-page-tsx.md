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
- Périmètre : accueil et CTA partagé ; aucun bloc entreprise sur l'accueil, blog inchangé.

## Direction contract

**THESIS.** Accompagner un manager depuis le besoin de recruter jusqu'à une décision qu'il comprend et assume.

**OWN-WORLD.** Bleu Seeklon, bleu nuit et bleu brume ; logo et polices existants. Captures produit réelles et entières, sans inclinaison ni recadrage. Le corail reste ponctuel, sans grand panneau CTA rouge ou corail.

**STORY.** Besoin → rédaction de l'offre → tri des CV → guide d'entretien → décision humaine → demande de démonstration. Une question issue du guide de démonstration devient une grande citation, explicitement attribuée à ces données.

**FIRST VIEWPORT.** « Recruter plus vite » à gauche ; contexte du manager, demande de démonstration et capture entière du détail d'offre à droite. Grille 1.05fr/1fr, puis une colonne sous 768px. Trois liens annoncent les étapes.

**FORM.** Après le prologue, une colonne narrative de 4fr accompagne un affichage produit de 8fr fixé à 120px du haut. Trois étapes actualisent la capture, la navigation et le résultat au défilement. Le viewport doit mesurer au moins 1024px de large et plus de 720px de haut ; sinon, ou avec réduction des animations, les trois captures sont présentées dans le flux. La citation sur fond bleu précède la conclusion sur la décision humaine et le CTA final.

**AUTHORITY.** Le rejet explicite par l'utilisateur de la composition antérieure remplace le seed `ac3f819c` et la maquette `.impeccable/mocks/home-dossier-open.png`. Ces fichiers sont historiques, sans autorité visuelle sur cette implémentation. Le présent contrat décrit la direction issue des contraintes confirmées et du code ; il ne prétend pas à une approbation pixel par pixel du rendu.

## Motion contract

La demande utilisateur inclut davantage d'animation et un effet visuel marquant, avec revue Impeccable. L'ouverture trace son parcours en 850ms et fait apparaître la capture par une échelle de 0.97 à 1 et une ombre progressive en 650ms ; cette mise à l'échelle est désactivée sous 768px.

Dans la séquence fixe, le curseur commun se déplace en 380ms, les captures restent stables avec un fondu de 220ms, et le résultat arrive en 300ms après 120ms. Le guide actif souligne sa deuxième question avec un contour SVG dessiné en 700ms après 220ms. L'annotation est déclarée dans les textes FR/EN ; aucun raster n'est modifié.

La citation déclenche une seule fois un balayage bleu de 850ms lorsqu'elle atteint 78 % de la hauteur du viewport. Deux couches de texte alignées accompagnent le fond, et la citation rejoint sa place depuis 24px de décalage et une échelle de 0.96 en 650ms. Le doublon visuel est masqué aux lecteurs d'écran. Le balayage existe aussi sur mobile ; le mode réduit et l'absence d'IntersectionObserver affichent directement l'état final de la citation. Le mode réduit garde également les captures dans le flux.

Ces animations sont implémentées sans nouvelle dépendance. La revue indépendante Impeccable avec Astra du 15 septembre 2026 conclut `ship`, sans correction matérielle, sur les captures desktop/mobile et les états avant/pendant/après. Ce verdict ne certifie ni une réaction subjective « wouah », ni les performances sur appareils réels, ni une fidélité à Stackdeploy dont le rendu reste inaccessible.

## Evidence

Captures originales conservées sans recadrage :
- Ouverture : `public/marketing/app-screens/09-offer-detail-1920x1080.png`.
- Rédaction : `public/marketing/app-screens/06-create-offer-form-1920x1080.png`.
- Tri : `public/marketing/app-screens/10-applications-table-1920x1080.png`.
- Entretien : `public/marketing/app-screens/17-interview-guide-1920x1080.png`.

Les trois étapes proposent un accès au fichier complet. Les légendes et la citation décrivent des données de démonstration, pas un témoignage client.

## Open inputs

Témoignages validés, photos de l'équipe et détails commerciaux des packs restent indisponibles ; ils ne conditionnent pas cette page. Le verdict de revue visuelle appartient au compte rendu de validation, sans être présumé par ce contrat.

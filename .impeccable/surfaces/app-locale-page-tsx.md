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

**FIRST VIEWPORT.** Premier prototype demandé par l'utilisateur : composition inspirée de Pitch et animation typographique potentiellement inspirée de Jitter, à retirer si l'essai ne convient pas. Une seule scène bleu nuit éclairée de bleu Seeklon réunit le titre centré « Recruter / plus vite » en Bricolage Grotesque 800 auto-hébergée (TTF et licence OFL dans `/fonts/`), la promesse, le contexte du manager sans RH, un CTA blanc et une capture d'offre entière de 960px maximum. Quatre captures réelles teintées et légèrement floutées composent la profondeur sur desktop ; elles disparaissent à 1100px de largeur ou moins. Les sélecteurs et le carrousel de l'essai précédent sont retirés. Le header bleu nuit s'applique à l'accueil uniquement, menu mobile inclus. Les autres polices et les sections suivantes restent inchangées. Ce prototype attend la validation esthétique de l'utilisateur.

**FORM.** Après le prologue, une colonne narrative de 4fr accompagne un affichage produit de 8fr fixé à 120px du haut. Trois étapes actualisent la capture, la navigation et le résultat au défilement. Le viewport doit mesurer au moins 1024px de large et plus de 720px de haut ; sinon, ou avec réduction des animations, les trois captures sont présentées dans le flux. La citation sur fond bleu précède la conclusion sur la décision humaine et le CTA final.

**AUTHORITY.** Le rejet explicite par l'utilisateur de la composition antérieure remplace le seed `ac3f819c` et la maquette `.impeccable/mocks/home-dossier-open.png`. Ces fichiers sont historiques, sans autorité visuelle sur cette implémentation. Le présent contrat décrit la direction issue des contraintes confirmées et du code ; il ne prétend pas à une approbation pixel par pixel du rendu.

## Motion contract

Affinage du bénéfice et du rythme : « plus vite » (EN « faster ») en bleu clair `#8cc4ff`, texte de soutien centré sur l'offre claire, les CV organisés et les entretiens préparés. Navbar et animations conservées. Les transitions du récit gagnent 16–24px par zone, les chapitres mobiles passent à 72px de padding vertical et le CTA partagé gagne 32px avant le footer. Ces changements ne concernent pas le blog.

Les deux particules centrales sont masquées pour ne pas traverser le titre coloré ; les six autres restent en périphérie.

L'essai du hero fait entrer la première ligne en 650ms, puis assemble chaque caractère de la seconde avec compression et étirement en 760ms, à partir de 120ms et avec un décalage de 35ms. La figure entière, image et légende ensemble, passe de scale(.88) et translateY(40px) à sa place finale en 1000ms après 180ms. Sous 768px, l'entrée des caractères utilise 8px de décalage et 1.18 d'étirement vertical ; desktop conserve 24px et 1.45. Les fonds décoratifs entrent en 1100ms, avec des délais de 0 à 220ms. Le bouton de reprise reste hors de la scène remontée afin de conserver son focus. L'entrée ne boucle pas ; seuls les fonds décoratifs et les particules ont un mouvement ambiant continu. À 1100px de largeur ou moins, les fonds décoratifs sont masqués ; l'introduction reste animée, y compris sur mobile. Le mode réduit affiche immédiatement l'état final et masque les contrôles d'animation. Aucune image générée ni nouvelle dépendance. Le verdict `ship` de l'ancien hero ne s'applique pas à ce prototype ; validation utilisateur et revue de ce rendu restent ouvertes.

Les quatre captures de fond dérivent sur une boucle alternée de 9s, indépendamment de leur entrée, tandis que huit points et arcs bleus suivent une boucle de 12s. Un bouton permet de suspendre ces mouvements ambiants ; ils se suspendent aussi lorsque le hero quitte le viewport ou que le document est masqué. Le mode réduit les désactive. La capture principale reste stable après son entrée.

Dans la séquence fixe, le curseur commun se déplace en 380ms, les captures restent stables avec un fondu de 220ms, et le résultat arrive en 300ms après 120ms. Le guide actif souligne sa deuxième question avec un contour SVG dessiné en 700ms après 220ms. L'annotation est déclarée dans les textes FR/EN ; aucun raster n'est modifié.

La citation déclenche une seule fois un balayage bleu de 850ms lorsqu'elle atteint 78 % de la hauteur du viewport. Deux couches de texte alignées accompagnent le fond, et la citation rejoint sa place depuis 24px de décalage et une échelle de 0.96 en 650ms. Le doublon visuel est masqué aux lecteurs d'écran. Le balayage existe aussi sur mobile ; le mode réduit et l'absence d'IntersectionObserver affichent directement l'état final de la citation. Le mode réduit garde également les captures dans le flux.

Ces animations sont implémentées sans nouvelle dépendance. La revue indépendante Impeccable avec Astra du 15 septembre 2026 conclut `ship`, sans correction matérielle, sur les captures desktop/mobile et les états avant/pendant/après. Ce verdict ne certifie ni une réaction subjective « wouah », ni les performances sur appareils réels, ni une fidélité à Stackdeploy dont le rendu reste inaccessible.

## Evidence

Affinage confirmé : uniquement les espaces internes des trois fonctionnalités, sans changer aucun texte. Titres à interligne 1.22 ; groupes numéro/titre (20px), explication (40px), résultat (24px), capture linéaire (56px), légende (24px). Onglets/capture desktop : 32px ; légende/résultat : 40px. Les paddings des chapitres et les autres sections restent inchangés.

Captures originales conservées sans recadrage :
- Capture principale du prototype : `public/marketing/app-screens/09-offer-detail-1920x1080.png`.
- Fonds décoratifs entiers : captures `09`, `10`, `13` et `17` du même dossier ; teinte et flou appliqués en CSS, sans modification des rasters.
- Rédaction : `public/marketing/app-screens/06-create-offer-form-1920x1080.png`.
- Tri : `public/marketing/app-screens/10-applications-table-1920x1080.png`.
- Entretien : `public/marketing/app-screens/17-interview-guide-1920x1080.png`.

Les trois étapes proposent un accès au fichier complet. Les légendes et la citation décrivent des données de démonstration, pas un témoignage client.

## Open inputs

Témoignages validés, photos de l'équipe et détails commerciaux des packs restent indisponibles ; ils ne conditionnent pas cette page. Le verdict de revue visuelle appartient au compte rendu de validation, sans être présumé par ce contrat.

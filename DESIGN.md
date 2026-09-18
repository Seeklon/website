---
name: Seeklon
description: Un recrutement accompagné, avec des preuves lisibles et une décision humaine.
colors:
  paper: "#f2f7f8"
  ink: "#081126"
  ink-muted: "#4c5a70"
  electric: "#0c6df8"
  coral: "#ff806b"
  white: "#ffffff"
typography:
  hero-title:
    fontFamily: "Bricolage Grotesque, Alexandria, sans-serif"
    fontSize: "clamp(3.5rem, 7.5vw, 6rem)"
    fontWeight: 800
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  secondary-title:
    fontFamily: "Bricolage Grotesque, Alexandria, sans-serif"
    fontSize: "clamp(3rem, 5.8vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  display:
    fontFamily: "Alexandria, Cabinet Grotesk, sans-serif"
    fontSize: "clamp(3.5rem, 7.3vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Alexandria, Cabinet Grotesk, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Cabinet Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    lineHeight: 1.75
  label:
    fontFamily: "Cabinet Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 700
rounded:
  control: "12px"
  screen: "16px"
spacing:
  mobile-gutter: "20px"
  desktop-gutter: "32px"
  control-block: "12px"
  control-inline: "24px"
components:
  button-primary:
    backgroundColor: "{colors.electric}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-on-dark:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-quiet:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
---

# Design System: Seeklon

## Overview

**Creative North Star: "Un recrutement accompagné"**

Seeklon associe un fond bleu brume, une encre bleu nuit et le bleu de marque à des captures réelles du produit. La hiérarchie aide à comprendre le travail et laisse la décision au recruteur. Le logo et les polices existants restent les repères de marque.

Ce document décrit les règles réutilisées dans le code. La composition de l'accueil et son public prioritaire sont consignés dans `.impeccable/surfaces/app-locale-page-tsx.md`.

La cible issue des retours utilisateurs de septembre 2026 est consignée dans `SITE-REFONTE-DIRECTIVES.md`. Ce document sépare explicitement les corrections à livrer, les explorations et les informations encore à confirmer ; tant qu'elles ne sont pas implémentées, les sections ci-dessous continuent de décrire l'état réel.

**Key Characteristics:**
- Captures réelles, entières et droites sur l'accueil.
- Titres d'ouverture Bricolage Grotesque sur l'accueil, Tarifs, À propos et l'index du blog ; titres courants Alexandria et texte Cabinet Grotesk.
- Surfaces brume, actions bleues et encre bleu nuit.

## Colors

### Primary

Le bleu Seeklon, token `electric`, signale les actions et les étapes actives. Les grandes surfaces bleues portent un contenu précis, avec du texte blanc.

### Secondary

Le corail `coral` reste un accent de sélection et de focus. Il ne devient pas un grand panneau d'appel à l'action.

### Neutral

Le bleu brume `paper` constitue le fond principal ; `ink` porte les titres et le texte fort ; `ink-muted` accompagne les explications et les légendes. Le blanc accueille les captures et les boutons sur fond sombre.

**The Evidence Rule.** La couleur soutient la lecture de preuves réelles ; elle ne remplace pas les écrans du produit.

## Typography

Lisibilité hors hero : explications des fonctionnalités et paragraphes tarifs/à propos à 1.125rem (18px), bénéfices à 1.0625rem (17px), légendes et source de citation à .9375rem (15px), liens d'agrandissement et onglets à 1rem (16px). Formulaire : libellés et champs à 16px, saisie de graisse normale, placeholders `ink-muted` opaques sur `paper`. Footer : liens 16px, mentions secondaires 14px, y compris sur l'index du blog ; les articles conservent leur traitement.

Les colonnes concernées autorisent la réduction de leur largeur minimale et les mots longs peuvent se couper lors de l'agrandissement du texte. Ces règles concernent le récit, le CTA, les pages tarifs/à propos/contact, l'index du blog et le footer hors pages d'articles. Les articles conservent leurs règles de lecture.

Bricolage Grotesque 800 porte les titres d'ouverture de l'accueil, Tarifs, À propos et de l'index du blog, ainsi que les noms des packs et les titres des thèmes du blog. Elle est auto-hébergée dans `/fonts/bricolage-grotesque-800.ttf`, avec sa licence OFL à côté du fichier. Alexandria reste la police des autres titres ; Cabinet Grotesk porte le texte courant. Les piles complètes restent définies dans `tailwind.config.js`. Swear Display demeure disponible dans la configuration, sans devenir une règle d'affichage par défaut.

Les ouvertures secondaires utilisent le token `secondary-title`, avec une taille `clamp(2.5rem, 10.5vw, 4rem)` sous 768px. Leurs textes explicatifs et les extraits du blog sont à 18px, interligne 1.75 ; les dates sont à 15px. Les noms des packs et thèmes utilisent Bricolage 800 de 2rem à 2.75rem. Les titres d'articles de l'index restent en Alexandria 600. Ces règles ne concernent pas les pages d'articles.

Les styles partagés display/headline sont les tokens ci-dessus. L'accueil possède des ajustements locaux : titre d'ouverture de 3.5rem à 6rem, interligne 1.03 ; titres de chapitre de 2rem à 3rem, graisse 600 et interligne 1.22. Le texte explicatif varie de 17px à 20px, avec des mesures de 38 à 54 caractères selon son rôle.

## Layout

Le conteneur principal atteint 1440px, avec des marges intérieures de 20px sur petit écran et 32px sur grand écran. Les composants s'adaptent à leur contenu ; les proportions de l'accueil ne sont pas une grille obligatoire pour toutes les pages.

Tarifs, À propos et l'index du blog emploient un conteneur de 1280px maximum, avec les mêmes marges intérieures 32px/20px. Les ouvertures laissent 80px de chaque côté vertical, puis 56px sous 768px. Le corps Tarifs/À propos reçoit 112px de padding vertical, puis 72px sur mobile. L'index sépare les thèmes de la liste par 80px sur desktop ; sous 1024px, la navigation thématique rejoint le flux au-dessus des articles. Les entrées gardent 40px de padding vertical, ramenés à 32px sous 768px. Les colonnes date/texte deviennent une seule colonne sur mobile.

Le prologue du récit devient une scène centrée d'au moins 78vh sur desktop, avec 120 à 190px de respiration en haut et 128 à 208px en bas. Sur mobile, il conserve 104px puis 120px. La séquence sombre reçoit 72px en haut et 96px en bas ; sa colonne narrative réserve 240px supplémentaires en sortie afin que le titre de la troisième étape puisse atteindre le haut de la capture avant que celle-ci ne quitte sa position fixe, y compris lorsque la preuve occupe toute la largeur disponible. Ses chapitres desktop occupent au plus `60vh - 16px` ou 560px afin que la séquence complète reste compacte. Ses chapitres mobiles et en mouvement réduit ont 72 à 80px de padding vertical, sans cette réserve. La citation conserve 104px de padding vertical et rejoint la conclusion bleue dans une même section. Le CTA partagé reste employé sur tarifs et à propos ; l'accueil possède un seul CTA final intégré à sa conclusion.

L'accueil réunit le titre centré sur deux lignes, la promesse, le contexte et une capture principale entière dans une seule scène bleu nuit éclairée de bleu Seeklon. Des captures décoratives en profondeur entourent le titre sur grand écran et disparaissent à 1100px de largeur ou moins. Entre 800 et 950px de hauteur sur desktop, la preuve principale est ramenée à 520px afin que son bord inférieur et l'invitation à poursuivre restent dans le premier viewport. La suite ouvre un prologue clair, ample et concentrique, puis bascule dans une scène bleu nuit continue : halos lumineux, profondeur atmosphérique et affichage produit fixe pendant les trois étapes. Cette composition reprend de Reflect le rythme, l'immersion et la respiration, sans sa palette ni ses assets. Sous 1024px, ou avec réduction des animations, chaque étape affiche sa capture dans le flux. Sur les desktops de 800px de haut ou moins, le cadre fixe et ses espacements se compactent sans supprimer l'animation.

Les trois fonctionnalités conservent leurs textes, tailles de titres et espaces entre chapitres. À l'intérieur : interligne des titres 1.22, numéro à 20px du titre, explication à 40px et résultat à 24px de l'explication. En lecture linéaire, la capture suit le résultat à 56px ; sa légende est à 24px. Sur desktop, les onglets précèdent la capture de 32px, puis le résultat est séparé de la légende par 40px. Ces ajustements restent locaux à la séquence.

## Elevation & Depth

Les fonds, halos et orbites définissent les plans. Des ombres diffuses bleu nuit détachent les boutons et les captures, sans rotation des captures. Les écrans décoratifs du hero dérivent doucement ; la preuve principale reste stable après son entrée. Le halo de l'ouverture, les cercles du prologue et la profondeur lumineuse de la séquence sont produits en CSS : aucun visuel généré ne remplace les preuves produit. Les valeurs d'ombre et les transitions figurent dans le sidecar.

## Shapes

Les boutons ont des angles mesurés ; les écrans utilisent un rayon de 12px dans l'ouverture et 16px dans la séquence. Les captures gardent leur ratio naturel. Le panneau CTA utilise un rayon local de 28px, ramené à 24px sur mobile.

## Components

### Buttons

Les quatre variantes sont primaire bleu, sombre, blanche sur fond sombre et discrète. Elles utilisent une hauteur minimale de 48px ; la variante compacte du header descend à 40px. Les états de survol changent le fond, et le focus visible utilise un contour corail de 3px décalé de 3px.

### Navigation

Le header fixe mesure 72px, avec une séparation fine et un fond translucide qui protège la lisibilité. Sur les routes `/`, `/pricing`, `/about` et `/blog` dans les deux langues, son fond bleu nuit et ses liens blancs prolongent l'ouverture, y compris dans le menu mobile ; les autres routes, dont les articles, gardent leur traitement. Une grille à trois colonnes centre réellement la navigation, indépendamment de la largeur du logo et des actions. Les liens restent ouverts, sans capsule englobante, avec 32px entre eux et 24px entre le sélecteur de langue et le CTA ; leur survol et leur focus emploient une surface locale discrète. La page ou la section courante est annoncée par `aria-current` et soulignée par un trait court. Sous 1024px, le menu devient un panneau vertical afin de préserver les espacements de la navigation. Le sélecteur FR/EN expose l'état sélectionné et conserve l'ancre courante.

### Product evidence

Les captures de l'accueil restent complètes, alignées dans un cadre fixe au ratio 16:9. La séquence présente une seule preuve active sur grand écran, entourée d'un halo bleu et d'une profondeur lumineuse ; elle offre un lien vers le fichier original dans un nouvel onglet annoncé. Les légendes identifient les données de démonstration et le contour ajouté au guide. Le scroll de page reste vertical, mais les écrans progressent horizontalement : l'étape suivante entre par la droite et l'étape précédente revient depuis la gauche en 720ms. Un repère circulaire lumineux suit la même direction sur une ligne 01–02–03 en 620ms. Les verbes Rédiger, Trier et Préparer portent la navigation ; les numéros restent des repères secondaires. Le résultat apparaît en 420ms sans délai artificiel. Le changement d'écran se déclenche lorsque le titre du chapitre atteint le haut de la capture fixe, afin que texte et preuve restent alignés, notamment à l'étape 03.

Dans le guide actif de la séquence, un contour SVG se dessine autour de la deuxième question en 700ms, après 220ms ; il ne modifie pas le fichier de capture.

### Opening

L'ouverture s'inspire de la composition demandée de Pitch et d'une entrée typographique de type Jitter. Le titre est centré sur deux lignes, avec un CTA blanc et une capture d'offre entière de 820px maximum, ramenée à 520px sur les viewports desktop de 800 à 950px de haut. Le fond bleu nuit reçoit deux éclairages radiaux bleus ; quatre captures réelles décoratives sont teintées, à 48 % d'opacité et floutées de 1.5px. Elles restent droites et gardent leur ratio ; elles ne constituent pas la preuve principale.

La seconde ligne « plus vite » utilise le bleu clair `#8cc4ff` déjà présent dans l'ambiance, sans dégradé. Le texte de soutien explicite les résultats : une offre claire, des CV organisés et des entretiens préparés, avec une décision qui reste humaine. La navigation nomme cette séquence « Le parcours » / « How it works ».

Les deux particules centrales sont masquées afin de préserver le contraste du titre pendant le mouvement ; six accents ambiants restent visibles.

La première ligne entre en 650ms. La seconde se compose lettre par lettre avec compression et étirement en 760ms, un délai initial de 120ms et un décalage de 35ms par caractère. La promesse, l'explication et le CTA suivent entre 520 et 760ms. La figure entière, capture et légende réunies, avance de 40px et passe de 0.88 à 1 en 900ms après 860ms. Sous 768px, les caractères démarrent à 8px de décalage et 1.18 d'étirement vertical, contre 24px et 1.45 sur desktop. L'animation d'entrée ne boucle pas et aucun contrôle de relance n'est livré ; le contrôle pause/reprise ne concerne que les mouvements ambiants. À 1100px de largeur ou moins, les fonds décoratifs disparaissent ; l'introduction reste animée, y compris sur mobile. En mode réduit, tous ces éléments sont immédiatement à leur place et les contrôles d'animation sont masqués. Aucun sélecteur de capture ni carrousel n'est présent.

Le titre du prologue se révèle mot par mot en 820ms, depuis 34px de décalage, une échelle de 0.94 et 12px de flou ; le texte de soutien suit en 760ms après 480ms. À chaque changement d'étape, le titre actif se reforme en 620ms depuis 18px et 8px de flou. Les deux lignes de la résolution reprennent la révélation en 820ms avec des délais de 300 et 410ms. Ces effets ne masquent le contenu qu'après détection d'`IntersectionObserver` et affichent immédiatement l'état final en mouvement réduit.

Les quatre captures de fond dérivent sur une boucle alternée de 9s, indépendamment de leur entrée, tandis que huit points et arcs bleus suivent une boucle de 12s. Un bouton permet de suspendre ces mouvements ambiants ; ils se suspendent aussi lorsque le hero quitte le viewport ou que le document est masqué. Le mode réduit les désactive. La capture principale reste stable après son entrée.

### Interview reveal

Au premier passage de la citation à 78 % de la hauteur du viewport, une surface bleue la révèle de gauche à droite en 850ms. Deux couches de texte alignées conservent une encre adaptée à chaque fond ; la copie visuelle est masquée aux technologies d'assistance. La citation avance de 24px vers sa position finale et passe de 0.96 à 1 en 650ms. Le balayage reste présent sur mobile. Sans observateur disponible, la citation apparaît directement dans son état final.

Avec réduction des animations, la citation montre son état final et les trois captures restent dans le flux ; les transitions et animations globales sont ramenées à 0.01ms. Ces valeurs décrivent le code, sans présumer du verdict de revue visuelle.

### Closing action

La question issue du produit, la réassurance sur la décision humaine et l'appel à la démo forment une seule conclusion bleue. Son titre utilise deux lignes grammaticalement complètes et son unique action mène à la demande de démonstration.

### Secondary marketing pages

Les ouvertures secondaires portent une seconde ligne bleu clair, un texte teinté bleu et une entrée courte du titre (650ms), désactivée avec réduction du mouvement. Les listes ouvertes et traits fins organisent les packs, principes et articles. Le blog utilise des liens de thème ancrés avec une marge de défilement de 112px et une navigation latérale fixe dans son conteneur sur desktop.

À propos réutilise la capture réelle entière `/marketing/app-screens/17-interview-guide-1920x1080.png`, avec son ratio naturel, un rayon de 16px et une ombre diffuse. La légende identifie les données de démonstration et offre un lien d'agrandissement vers le même fichier. Les choix éditoriaux et le verdict de revue de cette extension figurent dans `.impeccable/surfaces/secondary-marketing.md`.

## Do's and Don'ts

### Do:
- **Do** conserver le logo, le bleu Seeklon et les polices existantes.
- **Do** montrer des captures entières sur l'accueil et identifier les données de démonstration.
- **Do** préserver la lecture linéaire sur mobile et avec réduction des animations.

### Don't:
- **Don't** incliner ou recadrer les captures de l'accueil.
- **Don't** transformer le corail en grand panneau CTA.
- **Don't** présenter une ancienne maquette rejetée comme une référence approuvée.

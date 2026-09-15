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

**Key Characteristics:**
- Captures réelles, entières et droites sur l'accueil.
- Titres Alexandria et texte courant Cabinet Grotesk.
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

Alexandria porte l'affichage et les titres ; Cabinet Grotesk porte le texte courant. Les piles complètes restent définies dans `tailwind.config.js`. Swear Display demeure disponible dans la configuration, sans devenir une règle d'affichage par défaut.

Les styles partagés display/headline sont les tokens ci-dessus. L'accueil possède des ajustements locaux : titre d'ouverture de 3.25rem à 5rem, interligne 1.08 ; titres de chapitre de 2rem à 3rem, graisse 600 et interligne 1.14. Le texte explicatif varie de 17px à 20px, avec des mesures de 38 à 54 caractères selon son rôle.

## Layout

Le conteneur principal atteint 1440px, avec des marges intérieures de 20px sur petit écran et 32px sur grand écran. Les composants s'adaptent à leur contenu ; les proportions de l'accueil ne sont pas une grille obligatoire pour toutes les pages.

L'accueil ouvre sur un bandeau de promesse et de contexte, puis une grande scène produit interactive sur fond bleu Seeklon. Ses trois choix verticaux accompagnent une capture entière ; sous 768px, les choix deviennent horizontaux au-dessus de la capture. La suite conserve un affichage produit fixe pendant trois étapes de lecture. Sous 1024px, lorsque la hauteur du viewport ne dépasse pas 720px, ou avec réduction des animations, chaque étape de cette séquence affiche sa capture dans le flux.

## Elevation & Depth

Les fonds et les traits fins définissent les plans. Des ombres diffuses bleu nuit détachent les boutons et les captures, sans rotation ni effet de dossier flottant sur l'accueil. Les valeurs d'ombre et les transitions figurent dans le sidecar.

## Shapes

Les boutons ont des angles mesurés ; les écrans utilisent un rayon de 12px dans l'ouverture et 16px dans la séquence. Les captures gardent leur ratio naturel. Le panneau CTA utilise un rayon local de 28px, ramené à 24px sur mobile.

## Components

### Buttons

Les quatre variantes sont primaire bleu, sombre, blanche sur fond sombre et discrète. Elles utilisent une hauteur minimale de 48px ; la variante compacte du header descend à 40px. Les états de survol changent le fond, et le focus visible utilise un contour corail de 3px décalé de 3px.

### Navigation

Le header opaque et fixe mesure 72px, avec une séparation fine. Les liens compacts utilisent un soulignement bleu au survol et au focus. Sous 768px, le menu devient un panneau vertical. Le sélecteur FR/EN expose l'état sélectionné.

### Product evidence

Les captures de l'accueil restent complètes, avec une hauteur automatique. La séquence présente une seule preuve active sur grand écran et offre un lien vers le fichier original. Les légendes identifient les données de démonstration et le contour ajouté au guide. Les écrans restent en place pendant un fondu de 220ms ; le curseur partagé des trois onglets glisse en 380ms. Le résultat apparaît en 300ms après un délai de 120ms.

Dans le guide actif de la séquence, un contour SVG se dessine autour de la deuxième question en 700ms, après 220ms ; il ne modifie pas le fichier de capture.

### Interactive opening

Sur le fond bleu Seeklon, trois boutons sélectionnent les captures de l'offre, des candidatures et du guide. La sélection appartient au visiteur, sans défilement automatique. Un curseur blanc se déplace en 380ms ; les captures changent par fondu de 240ms. À l'arrivée, le cadre passe de 0.97 à 1 et remonte de 20px avec une ombre progressive en 700ms. Sous 768px, cette arrivée est désactivée et les choix restent accessibles au-dessus de la capture à hauteur naturelle. Un lien permet d'ouvrir la capture sélectionnée et la légende identifie les données de démonstration. La réduction des animations conserve l'interaction et abrège ses transitions.

### Interview reveal

Au premier passage de la citation à 78 % de la hauteur du viewport, une surface bleue la révèle de gauche à droite en 850ms. Deux couches de texte alignées conservent une encre adaptée à chaque fond ; la copie visuelle est masquée aux technologies d'assistance. La citation avance de 24px vers sa position finale et passe de 0.96 à 1 en 650ms. Le balayage reste présent sur mobile. Sans observateur disponible, la citation apparaît directement dans son état final.

Avec réduction des animations, la citation montre son état final et les trois captures restent dans le flux ; les transitions et animations globales sont ramenées à 0.01ms. Ces valeurs décrivent le code, sans présumer du verdict de revue visuelle.

### Closing action

Le panneau bleu final emploie du texte blanc et un bouton blanc. L'action mène à la demande de démonstration.

## Do's and Don'ts

### Do:
- **Do** conserver le logo, le bleu Seeklon et les polices existantes.
- **Do** montrer des captures entières sur l'accueil et identifier les données de démonstration.
- **Do** préserver la lecture linéaire sur mobile et avec réduction des animations.

### Don't:
- **Don't** incliner ou recadrer les captures de l'accueil.
- **Don't** transformer le corail en grand panneau CTA.
- **Don't** présenter une ancienne maquette rejetée comme une référence approuvée.

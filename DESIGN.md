---
name: Seeklon — Site vitrine
description: Un ciel qui se dégage — recruter sereinement, même sans équipe RH.
colors:
  ink: "#0B0B0C"
  ink-soft: "#4F4E49"
  ink-faint: "#57554F"
  azure: "#0C6DF8"
  azure-deep: "#0A56C4"
  azure-mist: "#B4D5FF"
  azure-wash: "#EEF4FF"
  rule: "#DDDBD5"
  rule-panel: "#D6D8DE"
  sky-pale: "#E7F0FE"
  sky-mid: "#D8E6FB"
  sky-low: "#CFE0FA"
  deep-top: "#0E62E6"
  deep-mid: "#0C5AD9"
  deep-bottom: "#0A52CC"
  surface-card: "rgba(255,255,255,0.85)"
  surface-panel: "rgba(255,255,255,0.75)"
  surface-nav: "rgba(255,255,255,0.95)"
  on-deep: "#FFFFFF"
typography:
  display:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(4rem, 2.6rem + 6.1vw, 8rem)"
    fontWeight: 500
    lineHeight: 0.94
    letterSpacing: "-0.05em"
  accent:
    fontFamily: "Genoid, Host Grotesk, ui-sans-serif, sans-serif"
    fontSize: "clamp(3.5rem, 2.3rem + 5.6vw, 6.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.03em"
  headline:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 0.9rem + 5.9vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 1.2rem + 3.4vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  subtitle:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  plan-name:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  plan-name-lead:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title-compact:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.1rem + 2.6vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  subtitle-hero:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "30px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  question:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  body-large:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  chip:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.92rem + 0.3vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "normal"
  caption:
    fontFamily: "Host Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  xs: "6px"
  sm: "8px"
  md: "10px"
  nav: "14px"
  card: "20px"
  panel: "24px"
  hero-panel: "28px"
  full: "9999px"
spacing:
  xs: "12px"
  sm: "16px"
  md: "20px"
  lg: "24px"
  xl: "36px"
  card-gap: "24px"
  section-mobile: "96px"
  section-desktop: "180px"
  gutter-mobile: "24px"
  gutter-tablet: "40px"
  gutter-desktop: "80px"
components:
  button-primary:
    backgroundColor: "{colors.azure}"
    textColor: "{colors.on-deep}"
    rounded: "{rounded.md}"
    padding: "0 30px"
    height: "52px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.azure-deep}"
    textColor: "{colors.on-deep}"
  button-ghost:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 32px"
    height: "54px"
    typography: "{typography.label}"
  button-on-deep:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 32px"
    height: "52px"
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  card-highlight:
    backgroundColor: "rgba(255,255,255,0.9)"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "28px"
  nav-pill:
    backgroundColor: "{colors.surface-nav}"
    textColor: "{colors.ink}"
    rounded: "{rounded.nav}"
    padding: "0 12px 0 24px"
    height: "60px"
  nav-link-active:
    backgroundColor: "{colors.azure-wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 14px"
  step-control:
    backgroundColor: "rgba(255,255,255,0.85)"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "44px"
---

# Design System : Seeklon — Site vitrine

## Overview

**Creative North Star : « Le ciel dégagé »**

Le site raconte le calme qui suit la tempête du recrutement. Le fond n'est pas un décor :
c'est un vrai ciel, calculé une fois pour toute la hauteur de la page, qui s'éclaircit au
premier écran, se charge de cumulus à mesure qu'on descend, puis bascule dans un bleu
profond au moment où la page demande une décision. Le contenu flotte dessus sur des
surfaces blanches translucides, jamais sur des boîtes opaques.

La densité est basse et assumée : de très grands titres, beaucoup d'air entre les sections,
des paragraphes courts. Le bleu ne sert qu'à deux choses, l'action et l'accent ; partout
ailleurs, le texte est presque noir et les gris sont volontairement foncés, parce qu'ils
doivent rester lisibles sur un fond qui bouge d'une section à l'autre. Les effets sont
rares et courts : un reflet qui traverse un mot, une capture qui se pose, un titre qui se
précise. Rien ne clignote, rien ne boucle.

Anti-références confirmées : le fond qui défile à une autre vitesse que le texte (essayé,
rejeté), les nuages en grille régulière, et les dégradés de couleur dans le texte — le seul
dégradé toléré est la bande de lumière qui passe, une fois, sur le mot d'accent.

**Key Characteristics :**
- Un ciel procédural qui défile avec le contenu, jamais en parallaxe.
- Des titres très grands, en Host Grotesk Medium, tracking serré.
- Un seul bleu, réservé à l'action et à l'accent.
- Des surfaces blanches translucides, des ombres bleutées et diffuses.
- Le bleu profond comme récompense de fin de page.

## Colors

Une palette de ciel : beaucoup de blanc bleuté, un encre presque noir, un seul bleu franc.

### Primary
- **Bleu franc** (#0C6DF8) : boutons pleins, barres de progression actives, mot d'accent du
  hero, prix mis en avant. Jamais en aplat de fond sur une grande surface, sauf la zone de
  fin de page.
- **Bleu profond de lecture** (#0A56C4) : bleu du texte court (étiquettes d'étape, petits
  liens), et survol des boutons pleins. Il existe parce que #0C6DF8 descend sous 4,5:1 en
  petit corps sur le ciel.

### Secondary
- **Bleu de fin** (#0E62E6 → #0C5AD9 → #0A52CC) : le dégradé vertical de la section finale
  et du pied de page. C'est un fond CSS, pas une image : le texte blanc ne doit jamais
  dépendre du WebGL.
- **Brume bleue** (#B4D5FF) : pastilles d'avatar et petites surfaces calmes.
- **Lavis bleu** (#EEF4FF) : onglet de navigation actif, pastille d'information discrète.

### Neutral
- **Encre** (#0B0B0C) : titres et texte courant sur fond clair.
- **Encre adoucie** (#4F4E49) : paragraphes secondaires, à partir de 16px.
- **Encre estompée** (#57554F) : légendes, compteurs, indications, 12 à 15px.
- **Filets** (#DDDBD5 dans les cartes, #D6D8DE dans les panneaux) : séparateurs d'une
  épaisseur de 1px, jamais de bordure colorée épaisse.
- **Ciel de repli** (#E7F0FE → #D8E6FB → #CFE0FA) : le dégradé CSS affiché tant que l'image
  du ciel n'est pas prête, ou si le WebGL est indisponible.

### Named Rules

**La règle du ciel lisible.** Le contraste d'un texte posé sur le ciel se mesure sur les
pixels rendus, pas sur une couleur théorique : on masque le texte, on capture, on
échantillonne le fond sous chaque bloc. Seuil : 4,5:1, y compris quand un nuage passe
derrière. C'est pour ça que les gris du Figma (#5C5B57, #8A877F) ont été foncés.

**La règle du bleu unique.** Un seul bouton plein bleu par écran visible. Les autres actions
sont en contour blanc. Le bleu qui n'appelle pas à agir est une fausse piste.

## Typography

**Display / Body :** Host Grotesk (variable 300–800, auto-hébergée)
**Accent :** Genoid Bold — version démo, licence commerciale à acquérir avant la mise en
ligne
**Autres pages du site (non reconstruites) :** Cabinet Grotesk + Plus Jakarta Sans

**Character :** une grotesque contemporaine, presque neutre, qui laisse la taille faire
l'emphase ; le Genoid n'intervient que sur un mot, pour donner le sourire que la grotesque
ne donne pas.

### Hierarchy
- **Display** (500, `clamp(4rem, 2.6rem + 6.1vw, 8rem)`, 0.94, -0.05em) : le mot d'ouverture
  du hero, une fois par page.
- **Accent** (Genoid 700, +0.03em, bleu) : la seconde ligne du titre d'ouverture, une
  seule fois par page. Sur l'accueil elle fait sa propre taille
  (`clamp(3.5rem, 2.3rem + 5.6vw, 6.5rem)`) ; sur les autres pages elle vaut `0.85em` de la
  ligne au-dessus, pour garder la personnalité sans peser plus lourd que le titre.
- **Headline** (500, `clamp(2.25rem, 0.9rem + 5.9vw, 6rem)`, 1.02, -0.045em) : le titre qui
  ouvre une grande section.
- **Title** (500, `clamp(2.25rem, 1.2rem + 3.4vw, 4rem)`, 1.04, -0.04em) : titre de
  sous-section (détail des plans, FAQ, packs).
- **Subtitle / Plan name** (400, 26 → 32px, 1.2) : nom d'un plan ou d'un pack ; 32px pour
  l'offre mise en avant, 26 à 28px pour les autres — la taille monte avec le poids du pack.
- **Title compact** (500, `clamp(1.875rem, 1.1rem + 2.6vw, 3.25rem)`, 1.08, -0.035em) :
  titre d'une section qui vit dans un panneau, comme le parcours.
- **Subtitle hero** (500, 30px, 1.2) : la ligne qui suit le titre d'ouverture.
- **Question** (400, 22px) : question de FAQ.
- **Body large** (400, 17px) : description d'une offre, réponse de FAQ.
- **Chip** (400, 13px) : pastille d'information posée sur la ligne d'un titre.
- **Body** (400, 16 → 19px, 1.6, encre adoucie) : paragraphes ; mesure courte, 30 à 36rem.
- **Label** (400, 15px) : liens de navigation, libellés de boutons, items de liste.
- **Caption** (400, 12 → 14px, encre estompée) : légendes, compteurs d'étape, mentions.

### Named Rules

**La règle des deux lignes.** Les titres sont écrits ligne par ligne dans les traductions
(`line1`, `line2`), jamais avec un `<br>` ni laissés à la merci du retour automatique : la
coupure fait partie du dessin.

**La règle de l'apostrophe.** Typographie française : apostrophe courbe `’`, espace
insécable avant `? ! : ;` et à l'intérieur des guillemets `«  »` — pleine avant le
deux-points, fine avant les autres. Dans les textes d'interface, elle est écrite à la main
dans `messages/*.json` ; pour les articles, écrits avec des espaces ordinaires,
`frenchSpacing` (`lib/typography.ts`) la pose au rendu, en français seulement.

### Le ciel, en pratique

- Le fond n'est pas blanc : il ouvre sur un bleu pâle mais réel (#E7F0FE), sinon des
  nuages blancs n'ont rien contre quoi se détacher. Leur face à l'ombre descend assez bas
  pour qu'un cumulus ait un volume, jamais assez pour salir le ciel.
- **Le ciel bouge, mais jamais en JavaScript.** Trois calques posés dans la page : le ciel
  lui-même, puis deux bancs de nuages sur fond transparent, plus larges que la page (128%)
  et animés par une simple `transform`. Le compositeur s'en charge, donc le défilement
  reste celui du navigateur. Un canvas redessiné à chaque image a été essayé : il traîne
  d'une frame derrière le texte, et ce retard se voit — c'est ce qui donnait l'impression
  que le fond « lague » et part tout seul.
- **Le ciel cède avant la page.** Le rendu initial baisse sa résolution au-delà de son
  budget de pixels ; en mouvement réduit les calques ne dérivent pas ; sans WebGL, le
  dégradé CSS reste.
- **Un cumulus, pas une rangée de bosses.** Quatre lobes posés sur la base, trois empilés
  au-dessus, fondus par un maximum doux (`k = 7.5`) : c'est ce qui donne le volume et la
  base plate. Sept bosses alignées côte à côte, c'est ce qui donnait des nuages larges et
  écrasés.
- **Une seule grille pour toute la page.** L'échelle des nuages ne doit jamais dépendre de
  la position du pixel dessiné : elle étirait les nuages verticalement et déplaçait les
  frontières de cellules avec le pixel, ce qui coupait un nuage en plein milieu le long
  d'une ligne droite. Tout ce qui varie avec la profondeur (densité, taille) se lit par
  cellule, jamais au fragment.
- Le ciel continue dans le bleu profond : les nuages s'y estompent sur 900px au lieu de
  s'arrêter net, sinon la fin de page est un aplat et plus un ciel.
- Le couloir calme suit la colonne de contenu, pas le centre de l'écran : les titres de
  section sont alignés à gauche, c'est là qu'il faut de l'air, et la météo garde sa
  dramaturgie dans les marges.
- L'échelle des nuages suit la largeur du viewport (`uWidth * 0.55`, borné) : à taille
  fixe, un nuage couvrait les deux tiers d'un écran de 390 px et se lisait comme une brume.
- Le canvas ne s'arrête jamais net. Il s'éteint en fondu sur 160 px après `--deep-full`,
  sinon le bord d'alpha se ré-échantillonne en trait sombre en travers de la page.
- Une seule passe de rendu, plafonnée à 2,2 Mpx : au-delà, c'est la résolution qui baisse,
  pas le ciel qui disparaît.

## Layout

- Gouttières : 24px sur mobile, 40px à partir de `md`, 80px à partir de `xl`. Contenu centré
  dans `max-width: 1440px` ; le panneau du parcours utilise `max-width: 1344px` avec 32px de
  marge interne pour ne jamais toucher les bords à 1280.
- Rythme vertical : 96px entre sections sur mobile, 180 à 200px sur grand écran. On garde un
  grand écart avant une section majeure et un écart resserré à l'intérieur d'un groupe.
- Mesure de lecture : les paragraphes plafonnent à 31–36rem. Sur mobile, ils sont alignés à
  gauche (le centrage est réservé au hero) ; à partir de `md`, le centrage revient là où le
  Figma le prévoit.
- Points de rupture : `sm` 640, `md` 768, `lg` 1024, `xl` 1280, plus `pin`
  (`min-width: 1024px and min-height: 620px`) qui décide si le parcours s'épingle. Toute
  mise en page qui dépend de la hauteur passe par `pin`, jamais par `lg` seul.
- Le gabarit partagé (`app/[locale]/(figma)/layout.tsx`) fournit ciel, navigation et pied de
  page ; une page apporte ses sections et finit par `ClosingCta`, qui porte `data-sky-deep`
  et `--deep-full`.

## Elevation & Depth

La profondeur vient de la transparence, pas de l'ombre portée. Les cartes sont du blanc à
85% posé sur le ciel ; le panneau du parcours descend à 75% pour laisser passer les nuages.

- `ambient-card` : `0 30px 60px -40px rgba(10,86,196,0.35)` — sous un panneau large.
- `ambient-accent` : `0 40px 70px -50px rgba(12,109,248,0.7)` — sous la carte mise en avant
  et le bouton principal.
- `ambient-shot` : `0 40px 80px -24px rgba(12,109,248,0.45)` — sous les captures produit.
- Navigation : blanc à 95%, ombre très basse `0 10px 30px -18px rgba(11,11,12,0.35)`.

Toutes les ombres sont bleutées, décalées vers le bas, et très floues. Pas d'ombre nette,
pas de halo centré sans décalage, pas de `backdrop-filter` décoratif.

## Shapes

Des rectangles à coins tendres, sans fantaisie de forme.

- Rayons : 6px (focus), 8–10px (boutons, petits blocs), 14px (barre de navigation), 20px
  (cartes), 24px (panneaux, tableau), 28px (panneau du parcours), plein (boutons ronds de
  navigation entre étapes, avatars).
- Séparation : un filet de 1px (#DDDBD5) plutôt qu'un encadré ; une carte est délimitée par
  sa surface, pas par une bordure, sauf la carte mise en avant qui porte une bordure bleue
  de 1px.
- Les captures produit sont posées dans un cadre blanc translucide, coins supérieurs
  arrondis, à l'intérieur d'un support bleu très clair.

## Components

- **Navigation** : pilule fixe en haut, largeur maximale 1040px, 60px de haut. Menu complet
  à partir de `lg`, bouton « Démo » compact et menu hamburger en dessous. L'onglet courant
  prend le lavis bleu et `aria-current="page"`. Le menu mobile se ferme sur Échap, au
  défilement et au clic à l'extérieur.
- **Bouton principal** : bleu plein, 52–54px de haut, rayon 10px, libellé 15–16px. Au
  survol, bleu profond ; `sheen` fait passer une bande de lumière. Un seul par écran.
- **Bouton secondaire** : fond blanc, filet gris, même gabarit. C'est le bouton par défaut
  pour toutes les actions qui ne sont pas l'action principale.
- **Carte** : blanc 85%, rayon 20px, 24px de marge interne (36px à partir de `md`) ; listes
  séparées par des filets ; l'action se colle en bas de la carte pour que les cartes d'une
  même rangée s'alignent.
- **Carte mise en avant** : même gabarit, bordure bleue 1px, ombre bleutée, prix en bleu.
- **Parcours (slide)** : barres d'étapes cliquables (`role="tab"`), boutons précédent /
  suivant de 44px, et deux comportements — balayage natif avec la carte suivante qui
  dépasse sur mobile, panneau piloté par les onglets et les flèches à partir de `lg`. On
  ne défile plus pour changer d'étape : le fond descendait pendant qu'on voulait seulement
  changer d'image. La molette fait glisser les étapes quand le curseur est sur
  le panneau : un cran, une étape, tout de suite, et la page reprend la main aux deux
  bouts. Elle ne prend jamais la molette pendant que la page défile — sinon elle arrête
  net un défilement qui ne lui était pas destiné, simplement parce qu'elle est passée sous
  un curseur immobile.
- **Capture agrandissable** : une capture produit s'ouvre au clic dans un `<dialog>`
  (surface blanche, rayon 24px, légende et bouton de fermeture) ; une carte hors écran
  garde son bouton hors du parcours de tabulation.
- **Tableau comparatif** : vrai `<table>` avec `<caption>` masquée et en-têtes de ligne ; sur
  mobile, il devient une carte de synthèse par plan, avec des coches.
- **Carte d'article** : blanc 85%, rayon 24px, 28px de marge interne (36px à partir de
  `md`). Catégorie et date en encre estompée au-dessus du titre, chapô en encre adoucie,
  et « Lire l'article » collé en bas derrière un filet, avec la flèche qui avance au
  survol. Pas de vignette : les articles n'ont pas d'image propre, et un logo répété dans
  trente cartes ne dit rien. La liste ouvre sur le dernier article en grande carte pleine
  largeur — titre à gauche, chapô et lien à droite, comme la carte bêta sur Tarifs — puis
  continue en deux colonnes.
- **Article** : colonne de 860px, titre aligné à gauche, chapô sous le titre, puis le
  corps dans une carte blanche à 90% (rayon 24px, 56px de marge interne à partir de `md`).
  Le corps utilise le plugin `typography` rhabillé avec l'encre et le bleu du site
  (`.home .prose` dans `globals.css`) ; les titres y restent en graisse 400–500. Le `# `
  du markdown est retiré au rendu, le `h1` de la page suffit. Les tableaux GFM sortent de
  `prose` pour pouvoir défiler sur mobile, en-têtes en encre pleine, filets 1px.
- **Personne** : carte blanche, disque de 112px (132px à partir de `md`) en dégradé bleu
  très clair avec l'initiale en bleu profond, puis le prénom et le rôle. Le disque est
  décoratif (`aria-hidden`) tant que les portraits ne sont pas faits.
- **Pied de page** : posé sur le bleu profond, texte blanc, colonnes de liens, filet à 25%
  de blanc au-dessus de la ligne de copyright.

## Do's and Don'ts

- **Do** mesurer le contraste sur le ciel rendu, à plusieurs positions de défilement, avant
  de valider une couleur de texte.
- **Do** écrire les deux langues dans le même changement, et les listes sous forme de
  tableaux lus avec `t.raw`.
- **Do** mettre chaque transition qui déplace un élément derrière `motion-safe:` — les
  variantes `lg:` et `pin:` passent après `motion-reduce:` dans la feuille.
- **Do** vérifier 360×740, 390×844, 820×1180, 1280×600, 1366×625 et 1440×900 : c'est sur les
  écrans courts que le panneau épinglé casse.
- **Don't** faire défiler le fond à une autre vitesse que le texte.
- **Don't** poser une étiquette au-dessus d'un titre, ni une pastille à côté : le titre
  porte son propre poids, et une carte se distingue par sa matière, pas par un badge.
- **Don't** utiliser un dégradé dans le texte, sauf la bande de lumière du mot d'accent.
- **Don't** faire dépendre la lisibilité d'un texte du canvas WebGL : le bleu de fin de page
  est du CSS.
- **Don't** empiler une carte dans une carte, ni ajouter une bordure colorée épaisse pour
  détacher un bloc.
- **Don't** imiter le ciel : pas de dégradé bleu avec de faux nuages sur une carte, à
  quelques centaines de pixels des vrais. Une carte se pose sur du blanc translucide et
  laisse passer le ciel de la page ; le bleu plein est réservé à la fin de page.
- **Don't** laisser un bloc de texte nu sur le ciel quand la section a du contenu à
  lire : une grande surface blanche par section, jamais trois petites boîtes.

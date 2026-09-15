# Design Seeklon

Ce document décrit le langage visuel effectivement utilisé par le site vitrine. La direction est celle d'un **atelier de décision** : le produit est montré comme un dossier de recrutement que l'on structure, consulte et annote. Les grands aplats, cadres fins, onglets et repères numérotés remplacent les gradients décoratifs et les empilements de cartes SaaS génériques.

## Direction visuelle

- Fond principal bleu brume, texte bleu nuit, grandes zones bleu Seeklon et accent corail ponctuel.
- Les écrans réels du produit sont la preuve principale. Ils peuvent dépasser d'un cadre, être légèrement inclinés ou recevoir de courtes annotations.
- Les angles restent mesurés et les surfaces lisibles : rayon courant de `12px` à `16px`, bordures fines et ombres réservées aux éléments qui se détachent réellement du plan.
- Le Bento est ponctuel et asymétrique. Il sert uniquement à organiser plusieurs preuves ou principes liés ; il ne transforme pas chaque paragraphe en carte.

## Palette et tokens

| Token | Valeur | Usage |
| --- | --- | --- |
| `paper` | `#F2F7F8` | fond général et annotations claires |
| `ink` | `#081126` | texte principal et aplats sombres |
| `ink-muted` | `#4C5A70` | texte secondaire |
| `electric` | `#0C6DF8` | action principale et repères actifs |
| `cobalt` | `#1A88F8` | grand aplat produit |
| `coral` | `#FF806B` | sélection, focus et marqueur ponctuel |

Les bordures utilisent principalement `ink` à 10–15 % d'opacité. Les ombres sont bleu nuit translucide et restent attachées aux boutons, captures en surplomb ou cartes mises en avant.

## Typographies

- Titres et affichage : `Alexandria`, avec `Cabinet Grotesk` puis `sans-serif` en repli.
- Texte courant : `Cabinet Grotesk`, puis la pile sans-serif de Tailwind.
- Accent disponible : `Swear Display`, puis `serif` ; il n'est pas un style de titre par défaut.
- Les grands titres utilisent un interlettrage de `-0.035em`, un interligne serré et des tailles fluides avec `clamp()`.

## Grille et composition

- Conteneur principal : largeur maximale `1440px`, marges latérales de `20px` sur mobile et `32px` à partir de `md`.
- Hero : partage `42/58` entre promesse et preuve produit sur grand écran, puis une seule colonne sous `1024px`.
- Sections de preuves : grille de 12 colonnes. Sur l'accueil, les deux premiers usages occupent 7 et 5 colonnes ; la préparation d'entretien occupe toute la largeur avec une composition interne `5/7`.
- L'index `01/02/03` donne le rythme sans recourir à des statistiques.
- La page tarifs utilise la même grille : deux packs sur 6 colonnes, puis trois packs sur 4 colonnes.

## Composants et actions

- `button-primary` : fond bleu électrique, texte blanc, action principale.
- `button-dark` : fond bleu nuit, texte blanc.
- `button-on-dark` : surface blanche sur fond sombre.
- `button-quiet` : action secondaire sans fond permanent.
- Tous les boutons ont une hauteur minimale de `48px`, un rayon de `12px`, une graisse forte et un focus visible corail.
- Les liens de navigation sont compacts, en texte atténué, avec un soulignement bleu animé au survol ou au focus.
- Le header reste fixe, opaque et séparé par une bordure. Le menu mobile est un panneau vertical simple ; le sélecteur FR/EN expose son état avec `aria-pressed`.
- Le footer reprend l'aplat bleu nuit et organise produit, entreprise et liens légaux sans décor superflu.

## Mouvement

- Mouvement signature : arrivée courte du dossier produit avec translation, rotation légère et disparition du flou, sur une courbe `cubic-bezier(.16, 1, .3, 1)`.
- Les flèches de CTA se déplacent de quelques pixels au survol ; les transitions restent fonctionnelles et brèves, sans rebond.
- Avec `prefers-reduced-motion: reduce`, le défilement fluide est désactivé et animations/transitions sont ramenées à `0.01ms` et une seule itération.

## Responsive et accessibilité

- Sous `1024px`, le hero, l'atelier de transparence et les mises en page éditoriales passent en une colonne ; les panneaux de fonctionnalités occupent toute la grille.
- Sous `768px`, le Bento et les compositions internes deviennent linéaires, les captures sont moins inclinées ou remises à plat, et les titres restent fluides sans débordement.
- Le focus clavier est visible sur tous les éléments interactifs. Le contraste s'appuie sur `ink`/`paper`, blanc/bleu nuit et blanc/bleu électrique.
- Les icônes décoratives sont masquées aux technologies d'assistance ; les captures produit ont des textes alternatifs localisés et les sections sont reliées à leurs titres avec `aria-labelledby`.
- Les données visibles dans les captures sont explicitement présentées comme des données de démonstration.

## Règles de contenu

- Montrer une action avant de promettre un résultat : rédiger une offre, trier les candidatures, préparer un entretien.
- Employer des verbes concrets, une voix directe et respectueuse du métier de recruteur.
- Parler d'« analyse » et de « tri » ; ne pas employer « IA » ou « scoring » dans le discours marketing.
- Ne publier aucun chiffre de performance, témoignage, client, intégration, compatibilité de multidiffusion, prix ou quota qui n'a pas été validé.
- Ne jamais suggérer qu'une candidature est rejetée automatiquement. Rendre visibles les critères du poste, les éléments du parcours et les points à vérifier, tout en rappelant que la décision appartient au recruteur.
- Les packs se nomment Brise, Bourrasque, Rafale, Tornade et Cyclone ; leurs détails commerciaux restent à confirmer.

## Captures et provenance

- Sources produit : les 17 captures réelles conservées dans `public/marketing/app-screens/`.
- Captures utilisées directement : table des candidatures (`10-applications-table-1920x1080.png`), détail candidat avec CV (`15-candidate-detail-with-cv-1920x1080.png`) et guide d'entretien (`17-interview-guide-1920x1080.png`).
- Plaques recadrées utilisées par le hero et le premier panneau : `assets/plates/pipeline-screen.png` et `assets/plates/offer-screen.png`, dérivées des captures produit.
- Direction Impeccable : seed assigné `ac3f819c`, mode `persuade`, composition créative retenue `.impeccable/mocks/home-dossier-open.png` et contrat de surface `.impeccable/surfaces/app-locale-page-tsx.md`. Cette composition a servi de direction, pas de référence pixel-perfect ; les captures de revue contrôlent la reproduction de l’implémentation finale.

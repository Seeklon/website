# Design QA — Hero « Vortex Seeklon »

## Cible et preuves

- Vérité visuelle source : `/home/devbox/projects/website/public/logo.png`
- Source originale : 1024 × 1024 px, RGBA.
- Source normalisée sur le fond du Hero : `/tmp/seeklon-logo-reference-normalized.png`, 1440 × 928 px.
- Implémentation desktop de production : `/tmp/seeklon-logo-final-desktop-1440x1000.png`
- Seconde frame : `/tmp/seeklon-logo-final-desktop-t4s-1440x1000.png`
- Canvas seul : `/tmp/seeklon-logo-final-canvas-only-1440x928.png`
- Comparaison ciblée source/WebGL : `/tmp/seeklon-logo-source-vs-webgl.png`
- Mobile de production : `/tmp/seeklon-logo-final-mobile-390x844.png`
- Mouvement réduit en production : `/tmp/seeklon-logo-final-reduced-1440x1000.png`
- Viewport desktop : 1440 × 1000 CSS px, DPR 1, route `/`, état FR.
- Normalisation : la source a été aplatie sur `#edf4ff`, ramenée à 928 × 928 px puis complétée à 1440 × 928 px. Le canvas a été capturé à la même densité.

## Findings

- Aucun écart P0, P1 ou P2 restant.
- [P3] Les trois pales WebGL utilisent trois nuances bleu/cyan distinctes au lieu du dégradé bleu continu du PNG.
  - Localisation : symbole 3D du Hero.
  - Preuve : `/tmp/seeklon-logo-source-vs-webgl.png`.
  - Impact : la silhouette de marque est immédiatement reconnaissable, mais le rendu assume davantage sa profondeur 3D.
  - Suite possible : rapprocher encore les teintes après validation sur GPU matériel.

## Surfaces de fidélité requises

- Typographie : familles, graisses, hiérarchie, italique et retours à la ligne du Hero inchangés. Aucun chevauchement avec le symbole final.
- Espacement et rythme : le logo 3D est contenu dans la zone supérieure droite, derrière la capture produit. Le copy et les CTA restent totalement dégagés.
- Couleurs et tokens : fond froid et palette Seeklon conservés. Les trois pales reprennent le bleu principal, le bleu clair et le cyan du logo.
- Qualité des images : le produit reste un WebP 1902 × 827 fixe avec données fictives. Le symbole principal est une géométrie extrudée en temps réel ; `signal-vortex.webp` est un fallback capturé depuis ce même canvas.
- Copy : aucun changement marketing. Les textes alternatifs FR/EN continuent de signaler les candidatures fictives.

## États et interactions vérifiés

- Desktop : un canvas WebGL2 unique, contexte non perdu, `glError = 0`.
- Animation : les frames t0 et t+4 diffèrent ; rotation, inclinaison et profondeur des pales évoluent.
- Produit : capture strictement fixe, `transform: none`.
- Mobile 390 × 844 : aucun canvas ni chunk R3F ; fallback logo statique visible, cadrage partiel intentionnel à droite.
- `prefers-reduced-motion: reduce` : aucun canvas ni chunk R3F ; fallback statique synchronisé avec le WebGL.
- Aucun overflow horizontal ni erreur console.

## Historique de comparaison

1. Variante tubulaire.
   - Finding P1 : la tresse évoquait des câbles ou de l’ADN et ne correspondait pas à l’identité Seeklon.
   - Correction : suppression complète des tubes et reconstruction paramétrique du logo à trois pales.
2. Première géométrie logo.
   - Finding P1 : symbole trop grand, fortement coupé et moyeu masqué par le produit.
   - Correction : réduction d’échelle, déplacement du centre, 120 échantillons et bevels affinés.
   - Preuve : `/tmp/seeklon-logo-parametric-desktop-t0-1440x1000.png`.
3. Placement à gauche.
   - Finding P2 : la pale cyan attirait l’œil derrière le titre et le sous-titre.
   - Correction : symbole réduit et déplacé dans l’espace supérieur droit.
   - Preuve : `/tmp/seeklon-logo-parametric-refined-desktop-t0-1440x1000.png`.
4. Placement final.
   - Finding P2 : le moyeu restait trop masqué par la capture produit.
   - Correction : échelle ramenée à 0,52 et centre remonté ; copy entièrement libre et moyeu visible.
   - Preuve post-correction : `/tmp/seeklon-logo-final-desktop-t0-1440x1000.png`.
   - Résultat : aucun écart P0/P1/P2 restant.

## Open Questions

- Le framerate et le rendu des bevels sur GPU physique restent à confirmer.

## Implementation Checklist

- [x] Supprimer la tresse rejetée.
- [x] Recréer trois pales spiralées à partir de la géométrie du logo.
- [x] Conserver un mouvement 3D réel et discret.
- [x] Libérer complètement le copy et les CTA.
- [x] Synchroniser le fallback mobile/reduced-motion avec le canvas.
- [x] Vérifier desktop, mobile, mouvement réduit, console et overflow.

## Follow-up Polish

- Ajuster les nuances des pales après contrôle sur GPU réel si une fidélité colorimétrique encore plus stricte est souhaitée.

final result: passed

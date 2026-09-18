# Directives de consolidation du site marketing

Statut : directives P0 et P1 implémentées sur `feat/refonte-site-marketing`. Les explorations de contenu de confiance et de captures interactives restent à confirmer ; la page tarifs reste bloquée par les données commerciales manquantes.

Périmètre : accueil, navigation, fin de parcours, pages de confiance et tarifs, en français et en anglais.

Ce document transforme les retours utilisateurs de septembre 2026 en règles d'exécution vérifiables. Il complète `PRODUCT.md` et `DESIGN.md` sans décrire l'état actuellement en production. En cas de contradiction, les contraintes produit et d'accessibilité de `PRODUCT.md` restent prioritaires. Le brief `.impeccable/surfaces/app-locale-page-tsx.md` reste la source de l'état actuel ; chaque directive livrée devra y être répercutée dans le même lot.

## Intention à préserver

- Conserver le titre « Recruter plus vite », sa typographie, l'animation de fond et le léger rebond qui donnent déjà une identité à l'ouverture.
- Amener immédiatement le visiteur dans le produit : besoin de recruter, rédaction de l'offre, tri des candidatures, préparation de l'entretien, décision humaine.
- Continuer à utiliser des captures réelles, droites et honnêtes. Elles constituent la preuve principale ; les effets graphiques les soutiennent sans les remplacer.
- Renforcer la personnalité Seeklon sans revenir à une esthétique SaaS générique ni ajouter des promesses, chiffres, partenaires ou témoignages non vérifiés.

## P0 — Corriger avant mise en production

### 1. Rendre la navigation plus lisible et plus stable

Targets : `components/Header.tsx`, `messages/fr.json`, `messages/en.json`, `app/globals.css`.

Directives :

- Donner plus d'air entre le logo, les liens, le sélecteur de langue et le CTA : viser au moins 32 px entre les liens et 24 px entre le sélecteur de langue et le CTA. Si ces espaces ne tiennent pas, faire basculer le menu mobile plus tôt au lieu de comprimer la navigation.
- Remplacer « Fonctionnalités » par « Le parcours » et l'équivalent anglais par « How it works ». Le lien continue de mener au parcours en trois étapes.
- Conserver la hauteur, les couleurs et la logique desktop/mobile du header tant qu'un changement plus large n'est pas validé.
- Le passage FR/EN ne doit provoquer ni décalage visible, ni retour à la ligne, ni disparition du CTA. Le chemin et l'ancre courants doivent être conservés.

Critères d'acceptation :

- Aucun chevauchement ou saut de mise en page à 768, 1024, 1280 et 1440 px de large, en FR comme en EN.
- Le menu mobile s'ouvre, se ferme et se parcourt au clavier ; le focus reste visible.
- Les libellés actifs et le sélecteur de langue restent compréhensibles sans dépendre uniquement de la couleur.

### 2. Donner un statut clair à la capture du hero

Targets : `components/Hero.tsx`, `messages/fr.json`, `messages/en.json`, `app/globals.css`.

Directive retenue : la capture principale reste une preuve produit entière. L'état actuel, où elle semble accidentellement coupée au chargement, est à supprimer.

- À 1440×900, la capture entière, y compris son bord inférieur, doit être visible dans le premier viewport au chargement. Réduire sa largeur si nécessaire ; ne pas la recadrer.
- Sur un viewport plus court ou mobile, conserver une miniature entière dans le flux. Si elle devient trop petite pour lire l'interface, son rôle est d'annoncer la preuve et le lien d'agrandissement fournit la lecture détaillée. Ne pas afficher une demi-capture.
- La capture principale reste stable après son entrée. Les captures floues d'arrière-plan restent décoratives dans ce lot.
- Choisir un seul comportement d'agrandissement pour toutes les captures. Option préférée dans ce lot : nouvel onglet clairement annoncé dans le libellé accessible. Une lightbox ne peut la remplacer qu'avec bouton de fermeture visible, touche `Escape` et restitution du focus. Aucun écran ne doit piéger la navigation.

Critères d'acceptation :

- La hiérarchie titre → promesse → CTA → preuve reste lisible à 390×844 et tient entièrement dans le premier viewport à 1440×900.
- Le visuel ne déborde pas horizontalement et son action d'agrandissement est utilisable au clavier.

### 3. Fiabiliser et simplifier les animations

Targets : `components/Hero.tsx`, `components/Features.tsx`, `app/globals.css`.

- Supprimer le contrôle temporaire « Rejouer l'animation » / « Replay animation » de l'interface livrée.
- Conserver un contrôle discret de pause pour les mouvements ambiants continus, car il répond à un besoin d'accessibilité. Ne pas le présenter comme un outil de test.
- Décaler l'entrée des éléments secondaires après la compréhension du titre. Une animation importante doit rester perceptible ; une animation trop brève ou terminée avant que l'utilisateur ne la voie doit être ralentie, retardée ou supprimée.
- Conserver, dans le parcours, un seul cadre de capture persistant. Le scroll de page reste vertical, tandis que les captures se déplacent horizontalement dans le sens 01 → 02 → 03 et s'inversent quand l'utilisateur remonte. Éviter les remplacements de nœuds ou les transitions simultanées qui peuvent afficher le mauvais écran.
- En mode `prefers-reduced-motion`, afficher directement l'état final et conserver toutes les informations dans le flux.

Critères d'acceptation :

- Aucun flash, écran vide, ancienne capture résiduelle ou changement d'étape en retard lors d'un scroll rapide.
- Aucun mouvement essentiel à la compréhension ; le contenu reste complet quand les animations sont désactivées.
- Les boucles ambiantes se mettent en pause hors viewport et lorsque l'onglet est masqué.

### 4. Faire du parcours en trois étapes une lecture, pas un obstacle

Targets : `components/Features.tsx`, `messages/fr.json`, `messages/en.json`, `app/globals.css`.

- Le scroll de la page reste natif : aucun verrouillage, aucun `scroll-snap` obligatoire et aucune interaction imposée pour atteindre la section suivante.
- Le changement d'étape au scroll est un enrichissement passif. Le visiteur peut continuer vers la conclusion sans cliquer sur les trois étapes ni attendre leurs animations.
- Sur desktop 1440×900, le parcours complet ne doit pas dépasser 180 vh. Aucune étape ne doit conserver la hauteur minimale actuelle de 86 vh si elle n'en a pas besoin pour son contenu.
- Les onglets restent cliquables et accessibles au clavier. Une seule étape possède l'état actif à la fois.
- Sur mobile et en mouvement réduit, conserver une lecture linéaire avec les trois preuves dans le flux. Sur desktop peu haut, compacter le cadre fixe sans désactiver l'animation.
- Ne pas ajouter de texte de redirection ou d'instruction pour contourner le parcours : le scroll natif suffit à le traverser.
- Remplacer la dominante « 01 / 02 / 03 » par les trois verbes métier : « Rédiger », « Trier », « Préparer ». Le numéro peut subsister comme repère secondaire, pas comme titre visuel principal.
- Structurer les grands espaces blancs par un fil visuel discret, des changements de tonalité ou des repères liés au parcours. Ne pas ajouter des cartes décoratives sans fonction.

Critères d'acceptation :

- Un scroll continu permet de passer du prologue à la conclusion sans rupture ni capture du geste.
- Les trois textes, les trois captures et leurs liens d'agrandissement restent accessibles sans JavaScript d'animation.
- L'étape active est cohérente après un scroll vers le haut, un scroll rapide et un clic direct sur un onglet.

### 5. Transformer la fin de page en une conclusion unique

Targets : `components/Features.tsx`, `components/CTA.tsx`, `app/[locale]/page.tsx`, `messages/fr.json`, `messages/en.json`.

- Réunir la question d'entretien, la promesse de décision humaine et l'appel à la démo dans une seule séquence de conclusion.
- La transition doit suivre : preuve issue du produit → ce que le recruteur comprend → ce qu'il décide → demande de démo.
- Conserver un seul CTA principal vers `/contact` dans cette conclusion. Supprimer la succession actuelle de deux conclusions et de deux appels proches vers la même action.
- Terminer par une phrase de réassurance vérifiable : l'analyse prépare la décision, elle ne la prend pas.

Critères d'acceptation :

- La dernière section se comprend sans avoir vu l'animation de révélation.
- Elle ne contient qu'une action principale et ne répète pas le même argument sous deux formes consécutives.

### 6. Retirer les éléments temporaires et les interactions bloquantes

- Retirer tous les libellés et boutons de test visibles, dont le contrôle de relance de l'animation.
- Vérifier chaque capture cliquable, overlay, nouvel onglet et bouton de fermeture. Un nouvel onglet doit être annoncé ; un dialogue doit se fermer à la souris et au clavier puis restituer le focus ; une navigation dans le même onglet doit respecter le bouton Retour du navigateur.
- Ne laisser aucun `console.error`, avertissement React lié aux transitions ou contrôle sans traduction.

## P1 — Clarifier le récit et renforcer l'envie de continuer

### Wording

- Remplacer « Vous connaissez le métier. Par où commencer pour recruter ? » par « Vous devez recruter. Par où commencer ? ».
- Utiliser en anglais une adaptation naturelle centrée sur la même situation : « You need to hire. Where do you start? ».
- Afficher « Vous rencontrez. Vous décidez. » soit sur une seule ligne, soit en deux lignes complètes. Ne jamais isoler « Vous » ou un fragment grammatical à cause d'un retour automatique.
- Appliquer la même règle aux grands titres FR/EN : les coupures doivent suivre le sens, rester stables aux largeurs cibles et ne pas reposer sur des espaces insécables qui créent un débordement mobile.

### Invitation au scroll

- Conserver la flèche descendante existante, mais la rendre suffisamment visible après l'entrée du hero.
- Son mouvement reste court, lent et non essentiel. Il s'arrête avec la réduction des animations.
- Son libellé annonce la suite du récit, pas une instruction générique de type « Scrollez ».

### Rythme et fonds

- Différencier les zones par la composition, la couleur et les preuves produit plutôt que par un simple ajout d'espace vertical.
- Réduire les grandes zones blanches sans fonction ; conserver les respirations qui séparent réellement deux idées.
- Les éléments décoratifs doivent prolonger le vocabulaire du recrutement accompagné : progression, fil, repères et mise en évidence de preuves.

## P2 — Renforcer la marque et la confiance

### Couleur et personnalité

- Conserver le bleu Seeklon, le bleu nuit, le fond brume et le corail existants.
- Tester une utilisation plus franche du bleu électrique et du corail sur des moments ciblés : progression active, focus, ponctuation ou transition. Ne pas créer un arc-en-ciel ni transformer le corail en grand panneau CTA.
- Toute variante doit maintenir les contrastes de texte et de contrôles au niveau WCAG AA.

### Contenu au-delà du produit

- Développer l'histoire, la philosophie et l'équipe sur `/about` plutôt que de transformer l'accueil en page institutionnelle.
- L'ajout sur l'accueil d'un bloc de confiance compact après la démonstration reste une **exploration à confirmer**, car le brief actuel exclut les blocs entreprise de cette page. S'il est validé, il se limite à une vision, un accompagnement réel ou un partenaire vérifié et ne coupe pas les trois étapes.
- Une mention de Bpifrance, d'un accompagnement ou d'un partenaire n'est publiable qu'avec le nom officiel, la nature exacte de la relation, l'autorisation d'utiliser le nom ou le logo et une source interne validée. **À confirmer.**
- Ne pas compenser l'absence actuelle de photos d'équipe, de témoignages ou de chiffres par des contenus générés ou des formulations vagues.

### Captures d'arrière-plan interactives

- Garder cette piste comme exploration après stabilisation du hero et du parcours.
- Si elle est retenue, le changement de visuel doit être explicite, utilisable au clavier et sans lecture automatique. La capture principale ne doit pas changer sans action du visiteur.
- Abandonner la piste si elle concurrence le titre, le CTA ou la preuve principale.

## Chantier séparé — Page tarifs

Target : `app/[locale]/pricing/page.tsx`, `components/Pricing.tsx`, `messages/fr.json`, `messages/en.json`.

- Ce chantier est bloqué jusqu'à validation des prix, quotas, conditions, contenus et publics de chaque pack. Aucun squelette d'offre ne doit être présenté comme une tarification disponible entre-temps.
- Après validation, présenter les packs Brise, Bourrasque, Rafale, Tornade et Cyclone avec un public, un usage et une différence principale immédiatement identifiables.
- Afficher dans le premier niveau de lecture le prix, la période, les limites importantes et ce qui est inclus.
- Utiliser une comparaison scannable pour les fonctionnalités communes et différenciantes. Éviter cinq blocs de texte presque identiques.
- Désigner une offre recommandée uniquement si une logique commerciale validée le justifie.
- Les données commerciales restent **À confirmer**. Seuls le modèle de contenu, l'ordre de lecture et les états d'indisponibilité peuvent être préparés avant leur validation.

## Ordre d'exécution recommandé

1. Nettoyer les contrôles temporaires et corriger les interactions bloquantes.
2. Stabiliser le header et les traductions FR/EN.
3. Corriger le cadrage du hero et le rythme de ses animations.
4. Fiabiliser le parcours en trois étapes, puis valider le scroll natif et le mouvement réduit.
5. Unifier la conclusion et appliquer les nouveaux textes.
6. Renforcer les fonds et les accents de couleur après validation fonctionnelle.
7. Ajouter uniquement les contenus de confiance pour lesquels les preuves ont été fournies.
8. Traiter la page tarifs dans un lot dédié après validation de l'offre commerciale.

## Matrice de validation

Chaque lot doit être validé au minimum sur :

- desktop 1440×900, laptop 1280×720 et mobile 390×844 ;
- français et anglais, y compris changement de langue depuis chaque section concernée ;
- souris, clavier seul et focus visible ;
- mouvement standard et `prefers-reduced-motion` ;
- scroll lent, scroll rapide, retour vers le haut et lien direct par ancre ;
- textes agrandis à 200 %, sans perte de contenu ni débordement horizontal ;
- build de production, lint, absence d'erreur console et contrôle des liens internes.
- une revue visuelle comparative nommée, sur les trois viewports de référence, pour valider le rythme, la densité, la visibilité de l'invitation au scroll et l'intensité des accents de couleur.

## Hors périmètre sans nouvel arbitrage

- Inventer des métriques de performance, des clients, des témoignages ou des partenaires.
- Mettre en avant une décision automatique ou un « scoring IA ».
- Remplacer l'identité actuelle, le logo ou les polices.
- Reconcevoir le blog ou les pages légales dans ce lot.
- Ajouter une nouvelle dépendance d'animation avant d'avoir simplifié l'implémentation existante.

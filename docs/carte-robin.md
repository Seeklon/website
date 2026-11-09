# Carte de visite de Robin Biard

- Route publique : `/carte/robin`, en français, sans authentification. URL canonique, QR, partage et PNG : `https://www.seeklon.com/carte/robin`, dérivée de `SITE_URL`.
- Configuration : `robinCard` dans `lib/business-card.ts`. Nom fourni par l’utilisateur ; rôle « Lead DevOps & SysAdmin » repris des contenus FR/EN de la page « À propos ».
- Coordonnées fournies par l’utilisateur : email `robin.biard@seeklon.com` et LinkedIn `https://www.linkedin.com/in/robin-biard-262248260?utm_source=share_via&utm_content=profile&utm_medium=member_android`. L’email est repris dans le lien `mailto:`, la vCard et le PNG. Téléphone non fourni : `null`, action masquée et champ absent de la vCard. Ne jamais reprendre les coordonnées de Thomas ni déduire un email du nom.
- Même visuel Seeklon fourni, mêmes styles, police et téléchargements que la [carte de Thomas](carte-thomas.md). Le chemin de l’asset commun reste `/cards/thomas/seeklon-sky.jpg` pour éviter une copie du même fichier ; il contient uniquement l’identité Seeklon.
- La page `app/carte/robin/page.tsx` transmet `robinCard` à `BusinessCardPage`, qui partage la génération serveur du QR, des métadonnées et du lien vCard. L’interface existante `ThomasCard.tsx` est déjà pilotée par la configuration ; aucun style global modifié.
- Fichiers téléchargés : `robin-biard-seeklon.vcf` et `robin-biard-seeklon.png` (1080 × 1920). Le PNG utilise le même QR que la vue dédiée, avec une marge de quatre modules et un fond blanc opaque.
- `publicBusinessCards` centralise les deux routes autorisées par le middleware et les deux profils cliquables de « À propos ». Le lien Robin porte `data-native-navigation` pour conserver `html[lang="fr"]` après navigation depuis `/en/about`.

## Vérification

Suivre les contrôles communs de [la carte de Thomas](carte-thomas.md#validation-avant-publication) pour Robin : accès direct/rechargement avec préférence EN, focus et vue QR mobile, liens About FR/EN, vCard téléchargée, PNG téléchargé et décodé, partage/copie. Vérifier explicitement l’absence de coordonnées de Thomas dans les données de Robin, le rôle complet dans le PNG et le maintien de la carte Thomas.

Validation du 8 octobre 2026 : build (76 pages), typecheck et ESLint ciblé réussis ; 17 contrôles navigateur réussis, dont trois tailles d’écran, téléchargements VCF/PNG, décodage indépendant du QR final, partage/copie et parcours About FR/EN. La revue indépendante a comparé les données, métadonnées, QR et vCard de Thomas à la version précédente : résultats identiques. Les styles et dépendances sont inchangés.

L’import dans Contacts et le scan par un second téléphone restent à confirmer sur appareils réels. Après publication, vérifier `/carte/robin` et le lien depuis « À propos » en production.

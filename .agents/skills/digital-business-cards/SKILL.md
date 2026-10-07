---
name: digital-business-cards
description: Modifier une carte de visite publique Seeklon, ses coordonnées, sa vCard, son QR ou son export PNG. Utiliser pour les routes /carte et leurs téléchargements.
---

# Cartes de visite Seeklon

1. Lire `docs/carte-thomas.md`, `lib/business-card.ts`, les composants concernés et `middleware.ts`. Les cartes autonomes sont hors du layout `[locale]` ; leur exemption de langue doit rester exacte.
2. Centraliser les coordonnées dans la configuration. Conserver `null` et masquer les actions sans source explicite ; ne pas déduire un email ni substituer un LinkedIn d’entreprise au profil personnel.
3. Dériver l’URL HTTPS de `SITE_URL` dans `lib/site.ts`, jamais de `window.location`. Réutiliser `pageMetadata` dans `lib/metadata.ts` ; ne pas déclarer de traduction inexistante et conserver l’origine publique de production si `NEXT_PUBLIC_SITE_URL` est défini.
4. Garder le visuel fourni et les styles isolés. Charger les polices et images locales avant l’export Canvas ; conserver la licence des polices.
5. Générer le QR par bibliothèque avec fond blanc opaque et au moins 4 modules de marge. Réutiliser son image pour l’écran et le PNG, sans logo ni réduction floue.
6. Vérifier la vCard UTF-8/CRLF et son pliage en octets, puis télécharger réellement le PNG et décoder le fichier final avec un lecteur indépendant.
7. Contrôler une petite largeur mobile, le clavier/modal, partage/copie/refus, accès direct/reload avec langue EN, typecheck et build. Distinguer émulation navigateur et import Contacts sur téléphone réel.

Documenter les coordonnées manquantes et les contrôles réalisés. Le QR de production n’est utilisable qu’une fois la route déployée ; respecter les autorisations explicites de commit/push/déploiement.

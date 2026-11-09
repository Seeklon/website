# Carte de visite de Thomas Briand

## Configuration et intégration

- Route : `/carte/thomas` (`app/carte/thomas/page.tsx`), en français, accessible sans authentification. La génération serveur (métadonnées, QR, vCard) est partagée dans `components/business-card/BusinessCardPage.tsx` avec la [carte de Robin Biard](carte-robin.md) ; chaque page transmet sa propre configuration.
- Accès depuis « À propos » : toute la fiche de Thomas (portrait compris) est cliquable, avec l’action « Voir la carte de visite » traduite en anglais. `components/about/AboutTeam.tsx` utilise un lien HTML vers `THOMAS_CARD_PATH` : même depuis `/en/about`, la destination reste `/carte/thomas`, sans préfixe de langue. Son attribut `data-native-navigation` est respecté par `PageTransitions` pour charger un nouveau document avec `lang="fr"`, sans conserver la langue de la page anglaise. Les autres profils restent sans lien tant qu’ils n’ont pas de carte configurée.
- Configuration : `lib/business-card.ts`. L’URL est dérivée de `SITE_URL` dans `lib/site.ts` ; ne jamais utiliser l’origine du navigateur pour le QR, le partage ou le PNG. Conserver l’origine HTTPS de production dans `NEXT_PUBLIC_SITE_URL` si cette variable est définie.
- Coordonnées confirmées : `Thomas.briand@seeklon.com` et [LinkedIn personnel de Thomas](https://www.linkedin.com/in/thomas-briand-5ab11725b?utm_source=share_via&utm_content=profile&utm_medium=member_android) fournis par Thomas, site `https://www.seeklon.com` issu de la configuration du dépôt. Téléphone absent : valeur `null`, action masquée. Ne pas remplacer son profil personnel par le LinkedIn de l’entreprise.
- Route hors de `app/[locale]` pour éviter Header/Footer. `middleware.ts` laisse passer uniquement les chemins exacts de `publicBusinessCards` dans `lib/business-card.ts` ; ce même registre détermine les profils cliquables dans « À propos ». Les autres parcours gardent leur comportement next-intl.
- Métadonnées via `pageMetadata` dans `lib/metadata.ts`, avec uniquement l’alternate français et les images de partage propres à la carte. Pas de route anglaise pour cette carte.

## Visuel et téléchargements

- `public/cards/thomas/seeklon-sky.jpg` : second visuel fourni (`1000063135.jpg`), copié sans retouche. Le logo et la signature restent dans le visuel. L’image avec le QR placeholder n’est pas utilisée.
- Styles isolés dans `components/business-card/ThomasCard.module.css`. Aucun changement des styles globaux ou des autres pages.
- Police Plus Jakarta Sans variable hébergée localement pour la carte et le Canvas : `public/fonts/PlusJakartaSans-Variable.ttf`, [source Google Fonts](https://github.com/google/fonts/tree/main/ofl/plusjakartasans), licence OFL conservée à côté. Le reste du site garde son chargement existant.
- QR généré avec [node-qrcode](https://github.com/soldair/node-qrcode), correction M, modules foncés, fond blanc opaque, marge de 4 modules, échelle entière de 16 px. La même image QR est affichée et dessinée sans rééchantillonnage dans le PNG.
- `lib/vcard.ts` génère une vCard 3.0 UTF-8 : CRLF, échappement des valeurs, pliage à 75 octets sans couper un caractère. Téléchargement réel `.vcf` par un lien de données, disponible même sans JavaScript.
- `lib/card-export.ts` génère le PNG 1080 × 1920 côté navigateur, après chargement du visuel, du QR et des polices. Aucun bouton n’est dessiné ; le visuel fourni est repris intégralement. En cas d’échec, l’interface affiche une erreur et permet de réessayer.
- Partage via `navigator.share`, puis `navigator.clipboard` si indisponible ou refusé. Si le presse-papiers est également refusé, un champ sélectionnable affiche le lien réel. L’annulation volontaire du partage reste silencieuse.

## Validation avant publication

1. Lancer `npx tsc --noEmit` et `npm run build`. Le dépôt ne possède pas encore de configuration ESLint : `npm run lint` ouvre son assistant de configuration. Pour un contrôle ponctuel, fournir une configuration temporaire `eslint-config-next/core-web-vitals` directement à `npx eslint --no-eslintrc --config …` sans changer les conventions globales.
2. Démarrer `npm run start -- --port 3100` après le build. Vérifier un accès direct et un rechargement de `/carte/thomas`, y compris avec `NEXT_LOCALE=en` et `Accept-Language: en`.
3. Vérifier 320 × 568, 390 × 844 et un écran desktop : absence de débordement, lisibilité, cibles tactiles, focus clavier, fermeture du QR par le bouton et Échap, retour au déclencheur.
4. Télécharger le VCF ; vérifier l’identité, l’email exact, les fins de ligne et l’absence de coordonnées fictives. L’import dans Contacts iOS/Android doit être confirmé sur un vrai téléphone.
5. Télécharger le PNG ; vérifier ses dimensions, la police, l’absence de recadrage du logo et de boutons. Décoder le PNG final avec jsQR ou un autre lecteur indépendant : destination attendue `https://www.seeklon.com/carte/thomas`. Décoder également la vue QR sur petit écran.
6. Tester le partage natif, son annulation, la copie et le refus du presse-papiers. Vérifier les erreurs console.
7. Vérifier que `/`, `/en`, `/product`, `/en/product`, robots et sitemap gardent les comportements attendus.
8. Sur `/about` et `/en/about`, vérifier le lien du profil de Thomas au clic sur le portrait et au clavier, son focus visible et la destination `/carte/thomas`, y compris avec la préférence de langue anglaise.

## Publication

Le QR encode déjà l’adresse de production. Il ne donnera accès à la carte qu’après publication de ces fichiers sur le projet Seeklon existant. Aucun commit, push ou déploiement n’est autorisé implicitement par cette implémentation. Après déploiement autorisé, ouvrir l’URL HTTPS depuis un autre appareil et scanner le PNG téléchargé.

Contrôles réalisés pour la livraison : [rapport de validation](../design-qa.md). Le build, le typecheck, le lint ciblé et les téléchargements/décodages en navigateur passent. Le dépôt ne possède pas de configuration ESLint générale ; la validation ciblée utilise une configuration temporaire sans modifier les règles des autres pages.

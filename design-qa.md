# Carte Thomas — contrôle du 7 octobre 2026

final result: passed

## Sources et comparaison

- Références utilisateur : `1000063135.jpg` et `1000063136.jpg`, 1280 × 857 chacune, fournies dans `/tmp/codex-remote-attachments/01a1169b-5f40-75f1-937b-4748d91cb2ea/de43b689-c45d-4e5f-a4cd-8c4557562691/`.
- Visuel réellement utilisé : `public/cards/thomas/seeklon-sky.jpg`, identique au second fichier fourni (empreinte vérifiée). Le QR placeholder du premier fichier n’est pas utilisé.
- Route inspectée : `/carte/thomas`, page et vue QR, sans authentification, préférence navigateur/cookie anglais incluse.
- Captures Chromium : `/tmp/seeklon-card-qa/run-3-final/card-320x568.png`, `card-390x844.png`, `card-1440x1000.png`. Viewports CSS correspondants, densité 1. À 320 px, la capture pleine page inclut le défilement vertical normal.
- Comparaison combinée effectivement ouverte : `/tmp/seeklon-card-qa/run-3-final/comparison-full.png`. Références réduites à 50 %, page 390 × 844 à 1:1, export 1080 × 1920 réduit à 31 %. Le changement paysage → vertical est demandé, pas une différence de densité involontaire.
- Contrôles détaillés : PNG exporté ouvert à sa résolution réelle, ainsi que les captures mobile, desktop et QR 320 px. L’original du logo reste intact ; le léger cadrage du ciel dans l’en-tête ne coupe aucun texte. Aucun autre recadrage détaillé n’est nécessaire pour cette composition simple.

## Résultats visuels

- **Typographie** : lettrage Seeklon original dans l’image ; Plus Jakarta Sans locale pour l’identité, le contenu et le PNG. Hiérarchie lisible, aucun texte tronqué ni police manquante.
- **Espacement et composition** : carte compacte, pleine largeur sur téléphone, centrée sur ordinateur. Aucun Header/Footer, aucune section marketing ajoutée, pas de débordement horizontal. Les actions ont une hauteur d’au moins 44 px.
- **Couleurs et contraste** : ciel bleu fourni, aplat bleu et texte blanc. Aucun dégradé CSS, effet de verre ou animation ajouté. Vue QR blanche, modules foncés, focus clavier visible.
- **Images** : même visuel que la référence, sans génération approximative du logo. L’export reprend le visuel intégralement et n’inclut aucun bouton. QR sans logo, blanc opaque et marge de quatre modules vérifiée sur les pixels du PNG.
- **Contenu** : identité, rôle et description demandés ; email et LinkedIn exacts fournis par Thomas ; domaine de production configuré. Téléphone absent masqué. Aucun événement ni date dans la carte.

## Validation fonctionnelle initiale

- Rapport nominal : `/tmp/seeklon-card-qa/run-3-final/report.json`, 12 contrôles réussis.
- HTTP 200 en accès direct et après rechargement sur les trois viewports, même avec préférence anglaise ; canonical FR correct.
- Téléchargement réel de la vCard : UTF-8, CRLF, identité, email, LinkedIn et absence de téléphone vérifiés. Tests complémentaires des échappements et du pliage à 75 octets : `node /tmp/seeklon-vcard-test.cjs`.
- Téléchargement réel PNG 1080 × 1920 ; QR du fichier final et de la vue mobile décodés avec jsQR vers `https://www.seeklon.com/carte/thomas`.
- QR 592 px, version 3, 29 modules de 16 px, quatre modules blancs de marge de chaque côté. Sur écran 320 px, QR affiché à 280 px et décodable.
- Dialog : fermeture par Échap, bouton et fond sur desktop ; focus rendu au déclencheur ; contenu sous le dialog inerte.
- Partage natif testé via simulation de l’API, avec URL exacte ; annulation silencieuse ; copie avec confirmation ; refus du presse-papiers avec champ sélectionnable.
- Police export indisponible simulée : erreur visible, aucun fichier défectueux, bouton réactivé ; nouvelle tentative réussie et PNG décodable.
- Aucune erreur console JavaScript, page ou requête en parcours nominal.

## Build et contrôle de production initiaux

Ces premiers contrôles portent sur le dépôt local avant intégration à la version distante actuelle. Ils incluent les modifications SEO qui étaient déjà présentes localement et qui ne font pas partie de la livraison de la carte.

- `npx tsc --noEmit --incremental false` : réussi.
- `npm run build` : réussi, 73 pages générées et route `/carte/thomas` présente.
- `npm run start -- --hostname 0.0.0.0 --port 3100` : serveur de production local opérationnel. Contrôle navigateur ciblé via `node /tmp/seeklon-card-qa/production.cjs` : accès direct 200, LinkedIn exact, export chargé dynamiquement, PNG téléchargé/décodé, aucune erreur navigateur. Preuves : `/tmp/seeklon-card-qa/production/report.json`, `card-390x844.png`, `thomas-briand-seeklon.png`.
- Contrôles HTTP Node/fetch : `/`, `/en`, `/product`, `/en/product`, `/robots.txt`, `/sitemap.xml`, visuel et police répondent 200. Header/Footer conservés sur les pages existantes ; absents de la carte. Carte toujours FR avec cookie EN ; slash final redirigé en 308.
- `npm run lint` : bloqué par l’absence préexistante de configuration ESLint. `npx eslint --no-eslintrc --config /tmp/seeklon-card-eslint.json` avec `next/core-web-vitals` sur les fichiers ajoutés et `middleware.ts` : réussi. Même contrôle sur l’ensemble `app components lib middleware.ts` : deux erreurs préexistantes `react/no-unescaped-entities` dans `components/SocialProof.tsx:44`, plus avertissements existants de police/image dans `app/layout.tsx` et `components/Hero.tsx`. Aucun de ces fichiers n’a été modifié par cette tâche.
- `git diff --check` ciblé : réussi. Skill locale `digital-business-cards` validée avec `quick_validate.py`.

## Historique et limites

### Validation de la version livrée sur main

- Base distante : `fcd24ea`, intégration isolée dans `/tmp/seeklon-card-main`.
- `npm run build` : réussi (75 pages). `npx tsc --noEmit --incremental false` : réussi. ESLint ciblé avec `next/core-web-vitals`, `git diff --cached --check` et validation de la skill : réussis.
- `node /tmp/seeklon-main-vcard-test.cjs` : champs exacts, pliage, UTF-8 et LinkedIn réussis.
- `node /tmp/seeklon-card-qa/isolated-main.cjs` sur le serveur de production port 3101 : accès direct 200, identité/LinkedIn/canonical corrects, export dynamique, PNG 1080 × 1920 réellement téléchargé et QR décodé exact ; aucune erreur console, page ou requête. Rapport et capture mobile : `/tmp/seeklon-card-qa/isolated-main/`. Capture ouverte et comparée au rendu initial, sans différence de composition.
- Contrôles HTTP : accueil FR/EN, produit FR/EN, robots et sitemap répondent 200. La carte reste française avec préférence EN. Images Open Graph/Twitter sur le domaine public, alternates FR et x-default uniquement.
- Audit indépendant du périmètre : 16 fichiers liés à la carte ; aucune autre route, aucun article, layout ou style global modifié. Aucune version de dépendance existante modifiée, notamment `remark-gfm` conservée.

Première comparaison sans anomalie P0/P1/P2. Puis ajout du LinkedIn fourni pendant la tâche et agrandissement des libellés des actions secondaires à 12 px ; captures et contrôles refaits dans `run-3-final`. Aucune anomalie P0/P1/P2 restante.

Pour la livraison demandée sur `main`, le dépôt distant avait avancé de 57 commits. L’intégration a donc été préparée dans un worktree isolé basé sur `fcd24ea`, sans embarquer les modifications locales préexistantes. La carte réutilise les helpers présents sur cette branche (`lib/site.ts` et `lib/metadata.ts`) ; les composants, styles, assets, vCard et export restent identiques. Le README ne reçoit que sa ligne de route et sa section carte. Les dépendances et fonctionnalités déjà présentes sur `main` sont préservées.

L’émulation Chromium ne remplace pas un import dans Contacts iOS/Android, un partage natif ou un scan sur téléphone physique. Ces contrôles matériels n’ont pas été réalisés. Les preuves sous `/tmp` sont locales à cette session. La route publique doit être déployée avec autorisation avant utilisation du QR par des tiers.

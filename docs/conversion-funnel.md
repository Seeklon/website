# Parcours vitrine → application

Décision de Thomas, 9 novembre 2026 : inscription autonome en priorité, démo en complément.

Gratuité précisée par Thomas le 9 novembre 2026 : **la bêta est gratuite jusqu’au
31 janvier 2027**. Les mentions FR/EN et la communication reprennent cette date. Cette
précision ne définit ni les tarifs ultérieurs, ni une facturation automatique.

## Destinations

- Inscription : `https://app.seeklon.com/register`.
- Connexion : `https://app.seeklon.com/login`.
- Démonstration : page Contact de la vitrine, localisée en français ou en anglais.

Les deux routes de l'application ont répondu HTTP 200 le 9 novembre 2026. Le formulaire
d'inscription public propose d'abord l'entreprise, puis le compte de son propriétaire.
La création effective d'un compte n'a pas été exécutée pendant cette vérification.
L'application affiche actuellement l'inscription en français, quelle que soit la langue
de la vitrine : ne pas fabriquer de route `/en/register`.

## Points d'entrée

La navigation, l'accueil, le parcours mobile, le plan bêta des tarifs et les appels à
l'action de fin de page conduisent directement à l'inscription. Les liens « Connexion »
dans la navigation et le pied de page conduisent au compte existant. La page Contact
propose aussi l'inscription à côté des informations sur la bêta.

Les liens de démonstration ouvrent toujours Contact. Les packs futurs restent reliés à
la liste d'information sur les tarifs. Le CTA explicite de la page introuvable garde sa
destination Contact. Les formulaires et les cartes de visite conservent leur parcours.

## Provenance

`lib/app-links.ts` centralise les destinations ; `components/SignupLink.tsx` rend un lien
HTML vers l'application dans le même onglet, sans passer par le routeur de langue.

Chaque lien d'inscription porte uniquement ces paramètres publics :

| Paramètre | Valeur |
| --- | --- |
| `utm_source` | `seeklon_website` |
| `utm_medium` | `website` |
| `utm_campaign` | `beta` |
| `utm_content` | Emplacement fixe et langue, par exemple `home-hero_fr` ou `pricing-beta_en` |

Ces liens ne recopient pas les paramètres de l'URL courante et n'ajoutent aucun cookie,
appel de collecte ou script de mesure à la vitrine. Ils préparent l'attribution des
arrivées côté application ; ils ne constituent pas un tableau de conversion ni un suivi
des abandons sur la vitrine.

Le code d'inscription de l'application contient déjà les événements
`register_page_view`, `register_step_completed`, `register_submitted`, `register_success`
et `register_error`. Leur émission dépend du consentement et de la configuration
analytique de l'application ; leur collecte et leurs rapports n'ont pas été validés
dans ce chantier vitrine.

## Sources

- [Inscription publique](https://app.seeklon.com/register), consultée le 9 novembre 2026.
- [Connexion publique](https://app.seeklon.com/login), consultée le 9 novembre 2026.
- Code produit consulté en lecture seule :
  `apps/frontend/webapp/app/(public)/register/page.tsx`, `lib/gaEvents.ts` et
  `lib/analyticsPrivacy.ts` du dépôt produit Seeklon.
- Consignes d'entrée : dépôt Agentic, profil Seeklon, procédure `saas-copywriting` ;
  charte locale `.claude/skills/vitrine-design-system/SKILL.md` pour le rendu.

## Vérifications du 9 novembre 2026

- `npm run build` : réussi, 76 pages générées et types validés.
- Navigateur : 58 combinaisons de page, langue et taille vérifiées ; pas de débordement
  horizontal ni de chevauchement entre liens de navigation. Accueil et tarifs couvrent
  sept largeurs de 360 à 1440 px ; à propos, blog, article, contact et produit en couvrent trois.
- Menu mobile, fermeture au clavier, inscription sans JavaScript, destinations démo,
  packs futurs et page introuvable vérifiés.
- Un clic réel depuis l'accueil arrive au formulaire public `/register` avec ses UTM.
  Aucun formulaire de création de compte n'a été soumis.
- Captures locales : accueil et tarifs sur ordinateur et mobile, arrivée sur l'inscription.
- Détecteur visuel : les trois signalements restants concernent du code préexistant
  (taille du filigrane du footer historique, image à props déstructurées du parcours,
  titre en dégradé de la page Produit).

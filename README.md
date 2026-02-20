# Seeklon — Site web (landing & blog)

Documentation du projet **Seeklon Web** : site vitrine et blog multilingue (FR/EN) pour l’ATS Seeklon (recrutement assisté par IA).

---

## Sommaire

- [Vue d’ensemble](#vue-densemble)
- [Stack technique](#stack-technique)
- [Prérequis et installation](#prérequis-et-installation)
- [Scripts](#scripts)
- [Structure du projet](#structure-du-projet)
- [Internationalisation (i18n)](#internationalisation-i18n)
- [Blog](#blog)
- [Pages et routes](#pages-et-routes)
- [Composants](#composants)
- [Styles et thème](#styles-et-thème)
- [SEO : sitemap et robots](#seo--sitemap-et-robots)
- [Configuration](#configuration)
- [Déploiement](#déploiement)

---

## Vue d’ensemble

- **Produit** : Seeklon — ATS (Applicant Tracking System) avec tri des candidatures par IA sémantique.
- **Site** : landing (accueil, produit, tarifs, contact, à propos, mentions légales, confidentialité, RGPD) + blog d’articles (conseils recrutement, marque employeur, tech RH).
- **Langues** : français (par défaut) et anglais. Contenu UI et articles de blog gérés par locale.
- **URL de production** : `https://landing.seeklon.com`.

---

## Stack technique

| Technologie | Usage |
|-------------|--------|
| **Next.js 14** | App Router, SSR, génération statique |
| **React 18** | UI |
| **TypeScript** | Typage |
| **next-intl** | i18n (routing, messages, middleware) |
| **Tailwind CSS** | Styles + thème (couleurs, polices) |
| **Framer Motion** | Animations |
| **gray-matter** | Frontmatter des articles (Markdown) |
| **react-markdown** | Rendu du contenu blog |
| **Lucide React** | Icônes |

---

## Prérequis et installation

- **Node.js** : 18+ (recommandé 20+)
- **npm** (ou yarn/pnpm)

```bash
# Cloner le dépôt (si besoin) puis aller dans le dossier du site
cd website

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

Le site est disponible en local sur [http://localhost:3000](http://localhost:3000). La locale par défaut est `fr` ; l’anglais est sous `/en` (ex. `/en`, `/en/blog`).

---

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (hot reload) |
| `npm run build` | Build de production (Next.js) |
| `npm run start` | Serveur de production (après `build`) |
| `npm run lint` | ESLint (règles Next.js) |

---

## Structure du projet

```
website/
├── app/                      # Next.js App Router
│   ├── [locale]/             # Toutes les pages sous une locale
│   │   ├── layout.tsx        # Layout avec Header, Footer, next-intl
│   │   ├── page.tsx          # Accueil
│   │   ├── about/
│   │   ├── blog/
│   │   │   ├── page.tsx       # Liste des articles
│   │   │   └── [slug]/page.tsx
│   │   ├── contact/
│   │   ├── legal/
│   │   ├── pricing/
│   │   ├── privacy/
│   │   ├── product/
│   │   └── rgpd/
│   ├── globals.css
│   ├── layout.tsx            # Root layout (html, body, fonts)
│   ├── robots.ts             # Génération de robots.txt
│   └── sitemap.ts            # Génération du sitemap XML
├── components/               # Composants réutilisables
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── WhyAtsIA.tsx
│   ├── Features.tsx
│   ├── TrustBar.tsx
│   ├── SocialProof.tsx
│   ├── Newsletter.tsx
│   ├── Pricing.tsx
│   ├── CTA.tsx
│   └── Button.tsx
├── content/
│   └── blog/
│       ├── fr/               # Articles en français (.md)
│       └── en/               # Articles en anglais (.md)
├── i18n/
│   ├── routing.ts            # Locales, defaultLocale, localePrefix
│   ├── request.ts            # Chargement des messages par locale
│   └── navigation.ts         # Link, useRouter, usePathname (next-intl)
├── lib/
│   └── blog.ts               # Lecture des articles (getAllPosts, getPostBySlug)
├── messages/
│   ├── fr.json               # Traductions françaises
│   └── en.json               # Traductions anglaises
├── public/                   # Assets statiques (images, vidéos, fonts)
├── middleware.ts            # next-intl (détection locale, redirections)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Internationalisation (i18n)

### Configuration

- **Fichier central** : `i18n/routing.ts`
  - `locales` : `['fr', 'en']`
  - `defaultLocale` : `'fr'`
  - `localePrefix` : `'as-needed'` → l’URL par défaut n’a pas de préfixe (`/`, `/blog`), l’anglais est préfixé (`/en`, `/en/blog`).

### Utilisation dans le code

- **Liens et navigation** : utiliser `Link`, `useRouter`, `usePathname` depuis `@/i18n/navigation` (et non depuis `next/link` / `next/navigation`) pour que les URLs incluent la locale quand il le faut.
- **Traductions** : `useTranslations('Namespace')` (client) ou `getTranslations('Namespace')` (server). Les clés sont dans `messages/fr.json` et `messages/en.json` par namespace (ex. `Header`, `Footer`, `Hero`, `Blog`, etc.).
- **Locale dans les pages** : les pages sous `app/[locale]/` reçoivent `params.locale`. Pour la génération statique : `generateStaticParams()` retourne `routing.locales.map(locale => ({ locale }))` (et pour le blog, les paires `{ locale, slug }`).

### Middleware

`middleware.ts` utilise `createMiddleware(routing)` de `next-intl` pour :
- Détecter la locale (préfixe URL, en-têtes, préférence navigateur),
- Exclure les chemins statiques (`api`, `_next`, `_vercel`, fichiers avec extension).

---

## Blog

### Organisation du contenu

- Un dossier par locale : `content/blog/fr/` et `content/blog/en/`.
- Un article = un fichier `.md` avec le même **slug** dans les deux langues (ex. `entretien-embauche-ia.md`).
- Le slug est le nom du fichier sans `.md` et sert d’URL : `/blog/entretien-embauche-ia` ou `/en/blog/entretien-embauche-ia`.

### Frontmatter (YAML)

Chaque article doit contenir :

```yaml
---
title: "Titre de l’article"
date: "2026-02-15"
publishDate: "2026-02-23"   # optionnel, sinon date utilisée
category: "Conseils Recrutement"
excerpt: "Résumé court pour les cartes et SEO."
coverImage: "/logo.png"
draft: false
---
```

- **En production** : les articles avec `draft: true` ou avec `publishDate` dans le futur ne sont pas listés ni accessibles.
- **En développement** : tous les articles sont visibles (brouillons et dates futures inclus).

### API blog (`lib/blog.ts`)

- `getAllPosts(locale)` : liste des articles publiés pour une locale, triés par date (décroissant).
- `getPostBySlug(slug, locale)` : un article par slug et locale, ou `null` si absent / non publié.

Les pages sous `app/[locale]/blog/` appellent ces fonctions avec la `locale` courante.

### Ajouter un article

1. Créer `content/blog/fr/mon-slug.md` (et `content/blog/en/mon-slug.md` pour l’anglais).
2. Remplir le frontmatter et le contenu Markdown.
3. Les pages blog et le sitemap prennent en compte les nouveaux fichiers au prochain build.

---

## Pages et routes

| Route | Description |
|-------|-------------|
| `/` | Accueil (Hero, WhyAtsIA, Features, TrustBar, SocialProof, Newsletter) |
| `/about` | À propos |
| `/blog` | Liste des articles du blog |
| `/blog/[slug]` | Article de blog |
| `/contact` | Contact / demande de démo |
| `/pricing` | Tarifs |
| `/product` | Page produit (fonctionnalités, avantages) |
| `/legal` | Mentions légales |
| `/privacy` | Politique de confidentialité |
| `/rgpd` | Page RGPD |

- **Redirection** : `/demo` → `/contact` (permanent), configurée dans `next.config.js`.

---

## Composants

- **Header** : navigation (liens i18n), CTA « Testez le produit ».
- **Footer** : liens (Produit, À propos, Blog, Contact, Légal, Confidentialité, Cookies), tagline, copyright.
- **Hero** : titre, sous-titre, CTA, visuel dashboard.
- **WhyAtsIA** : valeur ajoutée ATS IA (chiffres, avantages, confiance).
- **Features** : étapes du parcours (rédaction, diffusion, tri IA, entretien).
- **TrustBar** : compatibilité plateformes (job boards, etc.).
- **SocialProof** : témoignages / citations.
- **Newsletter** : formulaire d’inscription.
- **Pricing** : blocs tarifaires (si présente sur la page tarifs).
- **CTA** : boutons d’action réutilisables.
- **Button** : bouton de base (variantes, liens).

Les textes affichés viennent des namespaces dans `messages/fr.json` et `messages/en.json`.

---

## Styles et thème

- **Tailwind CSS** : configuration dans `tailwind.config.js` et styles globaux dans `app/globals.css`.
- **Couleurs** :
  - `background` : `#F0F5FF`
  - `primary` (DEFAULT, light, dark) : bleu Seeklon
  - `text.main` / `text.muted`
  - `glass.border` / `glass.surface`
- **Polices** :
  - Sans : **Plus Jakarta Sans** (variable `--font-jakarta`), chargée dans le root layout.
  - Titres : **Satoshi** (Fontshare), chargée via lien dans `app/layout.tsx`.
- **Typographie** : plugin `@tailwindcss/typography` pour le contenu prose (blog).

---

## SEO : sitemap et robots

### Sitemap (`app/sitemap.ts`)

- **URL** : `https://landing.seeklon.com/sitemap.xml`
- Génère des entrées pour :
  - Chaque **locale** (fr sans préfixe, en avec préfixe `/en`).
  - Toutes les **pages statiques** (accueil, about, blog, contact, pricing, product, legal, privacy, rgpd).
  - Chaque **article de blog** par locale (`/blog/[slug]` ou `/en/blog/[slug]`).
- `lastModified` : date du jour pour les pages, `publishDate` ou `date` pour les articles.
- `changeFrequency` : weekly pour les pages, monthly pour les articles.
- `priority` : 1 pour l’accueil, 0.8 pour les autres pages, 0.7 pour les articles.

### Robots (`app/robots.ts`)

- **URL** : `https://landing.seeklon.com/robots.txt`
- Contenu :
  - `host` : `https://landing.seeklon.com`
  - `allow: /` pour tout le site
  - `sitemap` : `https://landing.seeklon.com/sitemap.xml`

---

## Configuration

### next.config.js

- Plugin **next-intl** (`withNextIntl`) pour l’i18n.
- **Redirects** : `/demo` → `/contact` (301).

### Variables d’environnement

Aucune variable obligatoire documentée pour le build. Si des services (newsletter, formulaire contact) utilisent des clés API, les définir dans `.env.local` (et ne pas les committer).

### Métadonnées

- **Root** : `app/layout.tsx` définit `metadataBase`, `title` (template `%s | Seeklon`), `description`, icônes.
- Les pages peuvent surcharger `title` et `description` via `generateMetadata` (ex. page d’accueil avec namespace `Metadata`).

---

## Déploiement

1. **Build** : `npm run build`
2. **Lancer** : `npm run start` (ou déploiement sur Vercel/autre avec la même commande de build/start).
3. **Domaine** : le site est conçu pour `https://landing.seeklon.com`. Si le domaine change, mettre à jour :
   - `metadataBase` dans `app/layout.tsx`
   - `baseUrl` dans `app/sitemap.ts` et `app/robots.ts`

---

## Résumé des points importants

- **i18n** : toujours utiliser `@/i18n/navigation` pour les liens et la navigation ; utiliser les namespaces de `messages/*.json` pour les textes.
- **Blog** : un fichier `.md` par article et par locale dans `content/blog/{locale}/`, avec frontmatter valide ; en prod, `draft` et `publishDate` contrôlent la visibilité.
- **SEO** : sitemap et robots sont générés dynamiquement et incluent toutes les locales et tous les articles publiés.

Pour toute question sur l’architecture ou l’ajout de fonctionnalités, se référer à cette documentation et au code dans `app/`, `components/`, `i18n/` et `lib/`.

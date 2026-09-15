# Pages secondaires — extension du langage de l'accueil

## Direction contract

THESIS. Prolonger le site existant sur Tarifs, À propos et l'index du blog, sans transformer les articles ni inventer des offres commerciales.

OWN-WORLD. Bleu nuit, bleu Seeklon, brume ; titres Bricolage, texte Cabinet, liens lisibles et captures entières. Les pages héritent de l'accueil ; aucune nouvelle identité ni comp de remplacement.

STORY. Tarifs : noms des packs, limites commerciales explicites, contact. À propos : intention, exemple produit, principes, démo. Blog : article récent, thèmes existants, lecture d'un article.

FIRST VIEWPORT. Bandeau bleu nuit avec grand titre et accent bleu clair, texte 18px, action lisible. Tarifs affiche les cinq noms sans faux comparatif ; À propos mène à une capture entière ; le blog privilégie le titre du dernier article plutôt que des logos répétés.

FORM. Extension ciblée du système actuel demandé par l'utilisateur, sans tirage de nouvelle identité. Liste compacte des cinq packs, récit produit et principes ouverts, index éditorial à navigation thématique. L'utilisateur a confirmé « Tarifs à venir » et le classement éditorial par thèmes existants.

FINISH. unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Contraintes : FR/EN ; aucun changement content/blog, lib/blog.ts ou blog/[slug] ; conserver dates, titres, extraits et liens des articles. Pas de photos d'équipe inventées. Réduction du mouvement ; titres seuls en entrée courte, aucune boucle décorative supplémentaire.

## Evidence and finish review — 2026-09-15

- Référence : extension du monde existant, menée depuis le code ; aucune comp générée approuvée n'est revendiquée.
- Preuve À propos : capture réelle existante `public/marketing/app-screens/17-interview-guide-1920x1080.png`, réutilisée entière et sans modification du raster. Données de démonstration identifiées ; lien d'agrandissement et textes alternatifs FR/EN adaptés au guide. Aucun nouvel asset généré.
- Revue indépendante de substitution au rôle spécialisé indisponible : captures FR Tarifs et À propos entières à 1440px/390px, ouvertures et sections thématiques du blog aux mêmes largeurs ; lecture des composants et du CSS. La revue n'est pas une validation esthétique finale de l'utilisateur.
- Verdict initial : `fix`, car la capture du profil mettait un score de 96 % en vedette. Correction : remplacement par le guide d'entretien existant. Les captures À propos entières à 1440px et 390px ont été examinées à nouveau : défaut résolu, sans défaut matériel restant sur le périmètre visuel inspecté.
- Verdict final : `ship` sur ce périmètre. DESIGN.md et son sidecar consignent l'extension réelle ; les articles restent hors périmètre.
- Vérifications rapportées par l'agent principal, non réexécutées par le reviewer : build réussi (72 routes), détecteur sans résultats, contrôles DOM FR/EN à 1440px/390px/320px sans débordement et agrandissement du texte à 200 % sur FR390 sans débordement. La seconde compilation après remplacement de capture a également réussi.
- Conserver : ouvertures bleu nuit, accents bleu clair, espaces de lecture, packs sans prix inventés, guide entier, navigation thématique et textes existants des articles.

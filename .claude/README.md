# Outils Claude Code du dépôt

- `skills/vitrine-design-system` : les tokens, le gabarit et les règles du site vitrine
  reconstruit depuis Figma (accueil, tarifs).
- `skills/vitrine-page-from-figma` : comment reconstruire ou resynchroniser une page à
  partir du fichier Figma, et comment la vérifier.
- `skills/impeccable` (Apache 2.0, https://github.com/pbakaus/impeccable) : skill de design
  pour agents, avec ses 4 agents `impeccable-*`. Le lanceur télécharge son binaire au
  premier usage dans `~/.impeccable/bin/`.
  Le hook automatique n'est pas activé ici : `/impeccable hooks on` l'ajoute pour ce dépôt.
- `agents/vitrine-design-reviewer` : relecture d'un diff du site vitrine contre son design
  system.

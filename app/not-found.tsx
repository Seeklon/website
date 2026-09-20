// Last resort, outside any locale segment. The root layout supplies <html>/<body>, so this
// renders a fragment; the localized 404 (app/[locale]/not-found.tsx) is the one people see.
export default function RootNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="text-[15px] text-text-muted">Erreur 404</p>
        <h1 className="mt-4 text-4xl font-bold">Cette page n’existe pas.</h1>
        <a href="/" className="mt-8 inline-block text-primary underline underline-offset-4">
          Retour à l’accueil
        </a>
      </div>
    </main>
  )
}

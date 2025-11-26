// Component: CTA
import Button from './Button'
import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 bg-seeklon-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à recruter durablement ?</h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Rejoignez la beta et découvrez comment Seeklon peut transformer votre gestion RH.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/contact">
            <Button variant="white" className="px-8 py-4 text-lg">
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

import React from 'react';
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Charte RGPD & Cookies - Seeklon',
  description: 'Charte RGPD et politique de cookies Seeklon : vos droits, notre utilisation des cookies et comment nous contacter.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://landing.seeklon.com/rgpd',
  },
}

export default function Rgpd() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="font-heading text-4xl font-bold mb-8 text-primary">Charte RGPD & Cookies</h1>
      
      <div className="space-y-8 text-text-main font-sans">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Vos Droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Droit d'accès : Vous avez le droit de demander des copies de vos données personnelles.</li>
            <li>Droit de rectification : Vous avez le droit de nous demander de corriger toute information que vous jugez inexacte.</li>
            <li>Droit à l'effacement : Vous avez le droit de nous demander d'effacer vos données personnelles, sous certaines conditions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Cookies</h2>
          <p>
            Notre site utilise des cookies pour améliorer votre expérience de navigation. Ces cookies sont essentiels au fonctionnement du site et nous aident à comprendre comment vous l'utilisez. Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Contact DPO</h2>
          <p>
            Pour toute question relative à la protection de vos données ou pour exercer vos droits, vous pouvez contacter notre Délégué à la Protection des Données à l'adresse suivante : contact@seeklon.com
          </p>
        </section>
      </div>
    </div>
  );
}

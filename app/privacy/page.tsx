import React from 'react';

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="font-heading text-4xl font-bold mb-8 text-primary">Politique de Confidentialité</h1>
      
      <div className="space-y-8 text-text-main font-sans">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Collecte des données</h2>
          <p>
            Nous collectons les informations que vous nous fournissez directement lorsque vous utilisez notre formulaire de contact ou créez un compte. Ces informations peuvent inclure votre nom, adresse email, nom de société et numéro de téléphone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Utilisation des données</h2>
          <p>
            Les informations que nous collectons nous permettent de :
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Fournir, exploiter et maintenir notre site web</li>
            <li>Améliorer, personnaliser et développer notre site web</li>
            <li>Comprendre et analyser la façon dont vous utilisez notre site web</li>
            <li>Communiquer avec vous, notamment pour le service client</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Sécurité</h2>
          <p>
            Nous prenons la sécurité de vos données très au sérieux. Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre la destruction accidentelle ou illicite, la perte, l'altération, la divulgation ou l'accès non autorisé.
          </p>
        </section>
      </div>
    </div>
  );
}

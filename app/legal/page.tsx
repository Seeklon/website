import React from 'react';

export default function Legal() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <h1 className="font-heading text-4xl font-bold mb-8 text-primary">Mentions Légales</h1>
      
      <div className="space-y-8 text-text-main font-sans">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Éditeur du site</h2>
          <p>
            Le site Seeklon est édité par la société Seeklon SAS (en cours d'immatriculation).<br />
            Siège social : Paris, France.<br />
            Email : contact@seeklon.com
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Hébergement</h2>
          <p>
            Le site est hébergé par Vercel Inc.<br />
            Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Propriété Intellectuelle</h2>
          <p>
            L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>
        </section>
      </div>
    </div>
  );
}

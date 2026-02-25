import React from 'react';
import { Helmet } from 'react-helmet-async';

type FAQ = { question: string; answer: string };

export default function FAQSchema({ faqs, name }: { faqs: FAQ[]; name?: string }) {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: name ?? undefined,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(json)}</script>
    </Helmet>
  );
}


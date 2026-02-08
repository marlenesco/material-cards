"use client";

import { Heart } from "lucide-react";
import { MaterialCard } from "@material-cards/react";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <MaterialCard
        color="teal"
        defaultOpen={false}
        card={{
          title: "Next Demo",
          subtitle: "Material Card",
          description: "Card React usata dentro Next.js.",
          image: {
            src: "https://images.unsplash.com/photo-1477506350614-975d8d6b6d65?auto=format&fit=crop&w=900&q=80",
            alt: "Landscape"
          },
          actions: [{ id: "fav", label: "Preferiti", Icon: Heart }],
          links: [{ label: "Docs", href: "https://nextjs.org", target: "_blank" }]
        }}
      />
    </main>
  );
}

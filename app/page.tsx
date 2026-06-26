"use client";
import { useState } from "react";

// Stops in walking order: arrive at Place Poelaert → descend into the Marolles
const allStops = [
  {
    id: 1,
    name: "Palais de Justice",
    address: "Place Poelaert, 1000 Bruxelles",
    epochs: ["XIXe siècle", "Contemporain"],
    short: true,
    context: "Plus grand bâtiment en pierre de taille du XIXe siècle — plus vaste que Saint-Pierre de Rome. Coupole à 104 m.",
    anecdotes: [
      {
        title: "«Schieven architekt» — l'architecte de travers",
        text: "Pour bâtir ce colosse, Poelaert rase des centaines de maisons marolliennes. La rancœur est telle qu'une insulte entre dans le dictionnaire bruxellois : «schieven architekt». Elle s'utilise encore aujourd'hui.",
      },
      {
        title: "Le bâtiment a tué son architecte",
        text: "Épuisé par 17 ans de chantier, Poelaert meurt d'un AVC en 1879, avant l'inauguration. La légende veut que les Marolliens aient fêté la nouvelle.",
      },
    ],
    funFact: "De 1964 à 2002, la coupole abritait les équipements de diffusion de l'Eurovision. La voûte de la justice belge servait d'antenne de télévision.",
    pause: "Bancs sur la terrasse de la Place Poelaert — vue panoramique sur toute la ville. Idéal avant de prendre l'ascenseur.",
  },
  {
    id: 2,
    name: "Notre-Dame de la Chapelle",
    address: "Place de la Chapelle, 1000 Bruxelles",
    epochs: ["XIIe siècle", "XVIIe siècle"],
    short: true,
    context: "La plus vieille église de Bruxelles (1134). Construite hors des remparts — c'est autour d'elle que naissent les Marolles.",
    anecdotes: [
      {
        title: "Bruegel s'y est marié et y est enterré",
        text: "En 1563, Pieter Bruegel l'Ancien épouse ici sa femme — imposé par sa belle-mère pour l'avoir à l'œil. Il est inhumé dans l'église en 1569. Son monument funéraire porte la devise : «Nul n'est prophète en son pays».",
      },
      {
        title: "Le clocher baroque, souvenir d'un bombardement",
        text: "En 1695, Louis XIV bombarde Bruxelles 36 heures, détruisant 4 000 maisons. C'est à ce désastre que l'église doit son clocher baroque du XVIIIe — contraste saisissant avec la nef gothique du XIIe.",
      },
    ],
    funFact: "Un train passe sous l'église. Le tunnel ferroviaire Nord-Midi a fissuré les fondations du XIIe siècle — l'édifice avait survécu aux guerres, mais pas aux vibrations du chemin de fer.",
    pause: "Bancs ombragés sur la Place de la Chapelle, face à l'église. Calme et à l'abri du soleil l'après-midi.",
  },
  {
    id: 3,
    name: "Tour Anneessens",
    address: "Boulevard de l'Empereur, 1000 Bruxelles",
    epochs: ["XIIIe siècle", "XVIIIe siècle"],
    short: false,
    context: "Vestige de la première enceinte médiévale de Bruxelles (XIIIe s.) : 4 km de remparts, quarante tours, un fossé inondable.",
    anecdotes: [
      {
        title: "Un héros décapité lui a donné son nom",
        text: "François Anneessens, doyen des guildes, refuse les impôts autrichiens au nom de 49 corporations bruxelloises. Emprisonné dans cette tour, il est décapité sur la Grand-Place en 1719. La Belgique en fera un héros national.",
      },
      {
        title: "Redécouverte par hasard en 1887",
        text: "Enfouie sous des maisons pendant des siècles, la tour réapparaît lors d'une démolition voisine. Elle allait être rasée — le bourgmestre Charles Buls la sauve in extremis.",
      },
    ],
    funFact: "La première enceinte de Bruxelles court encore sous les rues du centre-ville. On marche sur le Moyen Âge sans le savoir.",
    pause: "Quelques pas vers la Gare Centrale — hall ouvert, bancs, toilettes publiques accessibles.",
  },
  {
    id: 4,
    name: "Maison de Bruegel",
    address: "132, rue Haute, 1000 Bruxelles",
    epochs: ["XVIe siècle"],
    short: true,
    context: "Maison à pignons à gradins du XVIe siècle, classée monument. Connue comme la «Maison Bruegel» — bien que sa présence réelle ici reste débattue.",
    anecdotes: [
      {
        title: "Bruegel ou pas Bruegel ?",
        text: "Les archives placent Bruegel ici en 1563. Mais les poutres du toit ont été datées de 1541 — avant son arrivée. Ce qui est sûr : ses deux fils naissent dans cette maison. Pieter («d'Enfer») en 1564, Jan («de Velours») en 1568.",
      },
      {
        title: "Quatre générations de peintres sous le même toit",
        text: "L'arrière-petit-fils de Bruegel, David Teniers III, décède dans cette maison en 1685. Ces murs ont traversé quatre générations d'artistes.",
      },
    ],
    funFact: "Un musée Bruegel était prévu ici dans les années 2010. Il a été abandonné en 2018 pour «une raison un peu surréaliste» — titre littéral d'un article de La Libre Belgique.",
    pause: "La Rue Haute est bordée de cafés et brasseries — terrasses aux n° 100 à 140, à deux pas de la maison.",
  },
  {
    id: 5,
    name: "Rue Haute & Cité Hellemans",
    address: "Rue Haute / Rue Blaes, 1000 Bruxelles",
    epochs: ["Moyen Âge", "1912", "1942"],
    short: false,
    context: "L'épine dorsale des Marolles — la rue Haute suit une voie romaine. Les rues transversales portent encore les noms des anciens métiers : Tanneurs, Orfèvres, Chaisiers.",
    anecdotes: [
      {
        title: "La Cité Hellemans : l'Art Nouveau pour les pauvres",
        text: "En 1912, 2 164 personnes s'entassaient dans 152 masures insalubres. L'architecte Hellemans construit 272 logements sociaux avec arcades et allées piétonnes (1915) — l'un des premiers de Belgique.",
      },
      {
        title: "La rafle du 3 septembre 1942",
        text: "À 20h30, des policiers allemands fouillent systématiquement toutes les maisons. 718 habitants juifs sont emmenés à Malines, avec «Judenrein» inscrit sur les portes. Seuls 18 survivront.",
      },
    ],
    funFact: "Au XIXe siècle, la rue Blaes n'avait que deux commerces : papiers peints et lustres. Aujourd'hui c'est le cœur des antiquaires bruxellois.",
    pause: "Les allées piétonnes de la Cité Hellemans (Rue Blaes, côté pair) ont des bancs à l'ombre sous les arcades.",
  },
  {
    id: 6,
    name: "Place du Jeu de Balle",
    address: "Place du Jeu de Balle, 1000 Bruxelles",
    epochs: ["XIXe siècle", "Contemporain"],
    short: true,
    context: "Le cœur des Marolles. Marché tous les jours depuis 1919, de 6h à 14h. Parfait pour terminer la balade — terrasses et cafés tout autour.",
    anecdotes: [
      {
        title: "Tintin y a chiné",
        text: "Hergé s'inspire directement de ce marché pour «Le Secret de la Licorne». Tintin y découvre la maquette du bateau qui révèle une histoire de piraterie. Spielberg reproduit le décor fidèlement pour son film.",
      },
      {
        title: "En 1999, les habitants ont acheté leurs pavés",
        text: "Face à un projet de réaménagement, les Marolliens lancent un parrainage symbolique : acheter un pavé pour bloquer la transformation. Le projet est abandonné.",
      },
    ],
    funFact: "Un bunker de 175 m² dort sous vos pieds — construit en 1942, avec bancs, eau et sanitaires encore intacts. Classé patrimoine bruxellois en 2018.",
    pause: "Le Jeu de Balle est entouré de terrasses sur les quatre côtés. Idéal pour une pause café ou une bière belge bien méritée.",
  },
  {
    id: 7,
    name: "La Bataille des Marolles",
    address: "Autour de la Place du Jeu de Balle",
    epochs: ["1969"],
    short: false,
    context: "Juillet 1969 : plus de 1 200 Marolliens reçoivent une lettre d'expropriation pour construire une annexe du Palais de Justice.",
    anecdotes: [
      {
        title: "Un prêtre mène la résistance",
        text: "Le vicaire Jacques Van der Biest fonde le Comité d'Action des Marolles. Méthode : pacifique. Affiches «NON», télégrammes aux ministres, façades rénovées bénévolement pour prouver que le quartier vaut mieux que la démolition.",
      },
      {
        title: "Victoire en quarante jours",
        text: "Fin août 1969, les autorités capitulent. Le quartier est sauvé. C'est la première grande victoire populaire contre l'urbanisme moderniste bruxellois.",
      },
    ],
    funFact: "La Bataille inspire la création de l'ARAU et d'Inter-Environnement Bruxelles — deux associations qui défendent encore aujourd'hui la ville contre les projets destructeurs.",
    pause: "Les cafés autour du Jeu de Balle sont ouverts toute la journée — profitez-en, c'est le cœur du quartier.",
  },
  {
    id: 8,
    name: "Manneken Pis",
    address: "Angle rue de l'Étuve / rue du Chêne",
    epochs: ["XIVe siècle", "Contemporain"],
    short: false,
    context: "À la lisière nord des Marolles. La fontaine existe depuis 1388 au moins — en pierre d'abord, en bronze depuis 1619.",
    anecdotes: [
      {
        title: "Plus de mille costumes",
        text: "Le premier costume date de 1698 — cadeau d'un gouverneur espagnol. La garderobe dépasse aujourd'hui le millier de tenues : armure de samouraï, Elvis Presley, Diables Rouges… Il en reçoit encore 20 à 30 par an.",
      },
      {
        title: "Trois légendes, aucune prouvée",
        text: "Un enfant éteint une bombe en urinant dessus. Ou : le fils d'un duc urine sur ses ennemis depuis son berceau. Ou : une sorcière pétrifie un gamin mal élevé. Les trois sont bruxelloises. Choisissez la vôtre.",
      },
    ],
    funFact: "La statue a été volée plusieurs fois. En 1817, le voleur est condamné aux travaux forcés — et la ville offre à la statue un costume royal doré pour fêter son retour.",
    pause: "La rue du Midi et la rue de l'Étuve ont plusieurs cafés et boulangeries. Idéal pour une pause avant de remonter vers la Grand-Place.",
  },
  {
    id: 9,
    name: "Théâtre Royal de Toone",
    address: "Impasse de la Fidélité 6, 1000 Bruxelles",
    epochs: ["XVIe siècle", "1830", "UNESCO 2025"],
    short: false,
    context: "La seule marionnetterie de tradition bruxelloise encore active. La lignée «Toone» remonte à 1830 — transmission par le talent, pas par la famille.",
    anecdotes: [
      {
        title: "Né pour contourner la censure espagnole",
        text: "Philippe II ferme les théâtres à Bruxelles au XVIe siècle pour éviter les rassemblements. Les Bruxellois remplacent les acteurs par des marionnettes («poechenelles»). Le théâtre de marionnettes naît comme résistance.",
      },
      {
        title: "Toone I ne savait ni lire ni écrire",
        text: "Antoine Genty crée son théâtre vers 1830 sans jamais avoir été scolarisé. Il inventait ses pièces de tête — légendes, opéras entendus en ville, faits d'actualité. Les marionnettes étaient le journal du peuple.",
      },
    ],
    funFact: "En 2025, le Théâtre de Toone est inscrit au Patrimoine Culturel Immatériel de l'UNESCO — la même liste que les pyramides d'Égypte.",
    pause: "Le Théâtre Toone possède son propre café-estaminet au rez-de-chaussée — bières belges, décor d'époque. Ouvert même sans voir le spectacle.",
  },
  {
    id: 10,
    name: "Le Dialecte Marollien",
    address: "Partout — cafés, marché, murs",
    epochs: ["XVIe siècle", "Aujourd'hui"],
    short: false,
    context: "Le marollien (brusseleer) mélange français, flamand, wallon et espagnol. Classé Patrimoine Culturel Immatériel de la Région bruxelloise.",
    anecdotes: [
      {
        title: "La grande invention : le suffixe -eire",
        text: "Le marollien germanise les verbes français : «autoriseire», «applaudisseire», «constateire». Une grammaire germanique pour des mots latins — la recette d'une langue unique.",
      },
      {
        title: "Trois mots qui ont survécu",
        text: "Le brol (bric-à-brac), la zwanze (humour pince-sans-rire, se moquer de tout y compris de soi), le ketje (le gamin de Bruxelles, débrouillard et roublard). Trois mots, tout un caractère.",
      },
    ],
    funFact: "À Bruxelles, «architek» est resté une insulte. Se comporter «comme un architek» signifie détruire ce qui est beau pour faire quelque chose de grand et inutile.",
    pause: "N'importe quel café des Marolles fera l'affaire — commandez un «demi» (bière pression) et regardez le quartier vivre.",
  },
];

const shortRouteIds = [1, 2, 4, 6];

const generalAnecdotes = [
  {
    title: "L'ascenseur de la Place Poelaert",
    text: "Un ascenseur gratuit relie la Place Poelaert (niveau Palais de Justice) à la rue de la Paille (cœur des Marolles). Un lien physique entre la ville bourgeoise sur sa colline et le quartier populaire en contrebas — libre d'accès à tous, 7j/7.",
  },
  {
    title: "La «bruxellisation» — un mot universel",
    text: "Les urbanistes du monde entier utilisent le mot «bruxellisation» pour désigner la destruction du tissu historique populaire au profit de grands projets modernistes. Ce terme est né ici, à Bruxelles, dans les années 1960–70.",
  },
  {
    title: "Un quartier jamais officiel",
    text: "Pendant des siècles, les Marolles étaient délibérément placées hors des remparts. La ville ne voulait pas des artisans et des réfugiés. Résultat : le quartier a forgé sa propre langue, ses propres fêtes, son propre humour — une ville dans la ville.",
  },
  {
    title: "La zwanze — l'humour qui résiste à tout",
    text: "Pince-sans-rire, auto-dérisoire, capable de se moquer de tout y compris de soi-même : la zwanze est l'humour bruxellois né aux Marolles. La réponse du peuple à la misère, aux destructions, aux pouvoirs successifs.",
  },
];

function EpochTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-stone-100 text-stone-600 mr-1 mb-1 border border-stone-200">
      {label}
    </span>
  );
}

function AnecdoteCarousel({
  anecdotes,
}: {
  anecdotes: { title: string; text: string }[];
}) {
  const [idx, setIdx] = useState(0);
  const total = anecdotes.length;
  const a = anecdotes[idx];

  return (
    <div className="rounded-xl border border-stone-200 overflow-hidden mb-4">
      {/* Card body */}
      <div className="px-4 pt-4 pb-3 min-h-[110px]">
        <p className="font-semibold text-stone-800 mb-1.5 text-[15px]">{a.title}</p>
        <p className="text-stone-600 text-[14px] leading-relaxed">{a.text}</p>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-stone-100 px-3 py-2 bg-stone-50">
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="w-9 h-9 rounded-full flex items-center justify-center text-stone-500 disabled:opacity-20 active:bg-stone-200 hover:bg-stone-200 transition-colors text-lg"
          aria-label="Anecdote précédente"
        >
          ‹
        </button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {anecdotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === idx ? "bg-stone-600" : "bg-stone-300"
              }`}
              aria-label={`Anecdote ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}
          disabled={idx === total - 1}
          className="w-9 h-9 rounded-full flex items-center justify-center text-stone-500 disabled:opacity-20 active:bg-stone-200 hover:bg-stone-200 transition-colors text-lg"
          aria-label="Anecdote suivante"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function StopCard({
  stop,
  index,
  total,
}: {
  stop: (typeof allStops)[0];
  index: number;
  total: number;
}) {
  return (
    <section id={`stop-${stop.id}`} className="scroll-mt-16">
      <div className="flex items-start gap-4 mb-4">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ backgroundColor: "oklch(30% 0.04 60)" }}
        >
          {String(stop.id).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-stone-900 leading-snug">
            {stop.name}
          </h3>
          <p className="text-sm text-stone-400 mt-0.5">{stop.address}</p>
          <div className="mt-1.5">
            {stop.epochs.map((e) => (
              <EpochTag key={e} label={e} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-stone-500 italic leading-relaxed mb-4 pl-4 border-l-2 border-stone-200 text-[15px]">
        {stop.context}
      </p>

      <AnecdoteCarousel anecdotes={stop.anecdotes} />

      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 mb-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-1">
          Le saviez-vous ?
        </p>
        <p className="text-stone-700 leading-relaxed text-sm">{stop.funFact}</p>
      </div>

      {stop.pause && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 mb-1">
            Pause
          </p>
          <p className="text-stone-700 leading-relaxed text-sm">{stop.pause}</p>
        </div>
      )}

      {index < total - 1 && <div className="mt-10 border-t border-stone-100" />}
    </section>
  );
}

export default function Home() {
  const shortStops = allStops.filter((s) => shortRouteIds.includes(s.id));

  return (
    <>
      {/* Hero */}
      <header
        style={{ backgroundColor: "oklch(22% 0.04 60)" }}
        className="text-white px-5 pt-12 pb-10"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-4">
          Bruxelles · 28 juin 2026
        </p>
        <h1
          className="font-bold tracking-tight mb-2 text-white"
          style={{ fontSize: "clamp(2.8rem, 10vw, 4.5rem)", lineHeight: 1.05 }}
        >
          Les Marolles
        </h1>
        <p className="text-stone-300 text-lg mb-8">Guide de visite à pied</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-stone-400">
          <span>Départ : Sainte-Catherine</span>
          <span>·</span>
          <span>Parcours court : 4 arrêts · 1h</span>
          <span>·</span>
          <span>Parcours complet : 10 arrêts · 2h</span>
        </div>
      </header>

      {/* Sticky section nav */}
      <nav className="sticky top-0 z-20 bg-white border-b border-stone-200 overflow-x-auto">
        <div className="flex gap-0 px-2 py-0 min-w-max">
          {[
            { href: "#venir", label: "Y aller" },
            { href: "#marolles", label: "Les Marolles" },
            { href: "#anecdotes", label: "Anecdotes" },
            { href: "#court", label: "Parcours court" },
            { href: "#complet", label: "Parcours complet" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-3 text-sm whitespace-nowrap text-stone-500 hover:text-stone-900 transition-colors border-b-2 border-transparent hover:border-stone-400"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4">
        {/* ─── SECTION 1 : COMMENT VENIR ─── */}
        <section id="venir" className="py-10 scroll-mt-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-6">
            Depuis Sainte-Catherine
          </h2>

          <div className="space-y-4">
            {/* Option 1 */}
            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: "oklch(30% 0.04 60)" }}
                >
                  A
                </span>
                <p className="font-semibold text-stone-800">
                  Recommandé — Bus jusqu'au Palais de Justice
                </p>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-2">
                Depuis l'arrêt <strong>Sainte-Catherine</strong>, prenez le{" "}
                <strong>bus 27 ou 95</strong> en direction du sud (quelques
                arrêts) jusqu'à <strong>Place Poelaert</strong>. Durée : environ
                10 min. Vous arrivez directement devant le Palais de Justice,
                premier arrêt du parcours.
              </p>
              <p className="text-stone-600 text-sm leading-relaxed">
                Depuis la Place Poelaert, prenez{" "}
                <strong>l'ascenseur gratuit</strong> (entrée rue de la
                Montagne-aux-Herbes-Potagères, côté gauche du Palais) qui
                descend directement dans les Marolles — et vous épargne une côte
                abrupte. C'est l'entrée royale dans le quartier.
              </p>
            </div>

            {/* Option 2 */}
            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: "oklch(50% 0.03 60)" }}
                >
                  B
                </span>
                <p className="font-semibold text-stone-800">
                  À pied (terrain plat) — entrée par le bas
                </p>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                Depuis Sainte-Catherine, marchez vers le sud par la{" "}
                <strong>Rue Antoine Dansaert</strong> → passez devant la{" "}
                <strong>Bourse</strong> → continuez par le{" "}
                <strong>Boulevard Lemonnier</strong> → entrez dans les Marolles
                par la <strong>Place du Jeu de Balle</strong>. Environ 25 min de
                marche, tout plat. Parcours alors inversé (du bas vers le haut).
              </p>
            </div>

            {/* Option 3 */}
            <div className="rounded-xl border border-stone-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: "oklch(60% 0.02 60)" }}
                >
                  C
                </span>
                <p className="font-semibold text-stone-800">Taxi / Uber</p>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                5 min depuis Sainte-Catherine, environ <strong>6–8 €</strong>.
                Demandez <em>«Place Poelaert»</em> pour l'option recommandée, ou{" "}
                <em>«Place du Jeu de Balle»</em> pour l'entrée par le bas.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-stone-100" />

        {/* ─── SECTION 2 : VUE MACRO ─── */}
        <section id="marolles" className="py-10 scroll-mt-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Les Marolles en un coup d'œil
          </h2>
          <p className="text-stone-400 text-sm mb-6">Vue d'ensemble du quartier</p>

          <div className="space-y-4 text-stone-600">
            <p className="text-[15px] leading-relaxed">
              Les Marolles occupent la <strong>partie basse de Bruxelles</strong>, coincées entre la colline du Palais de Justice et le boulevard du Midi. Deux rues parallèles (Rue Haute, Rue Blaes) et une grande place (Jeu de Balle) forment son cœur. On y descend depuis la ville haute par un ascenseur gratuit, on le quitte vers le nord en remontant vers le Manneken Pis.
            </p>
            <p className="text-[15px] leading-relaxed">
              Le nom vient de religieuses apostolines — les <em>«Maricolles»</em>, celles qui honorent la Vierge Marie — installées ici au XVIIe siècle. Elles partent en 1715, laissent leur nom. Autre théorie : <em>marolle</em> = flaque de boue en vieux brabançon. Bruxelles garde les deux, selon l'humeur.
            </p>

            <div className="rounded-xl bg-stone-50 border border-stone-200 p-4 mt-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Fondation", "XIIe siècle"],
                  ["Personnage clé", "Pieter Bruegel l'Ancien"],
                  ["Résistance", "Bataille de 1969"],
                  ["Marché", "Tous les jours, 6h–14h"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-stone-400 text-xs">{k}</p>
                    <p className="text-stone-700 font-medium text-[13px]">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-stone-100" />

        {/* ─── SECTION 3 : ANECDOTES GÉNÉRALES ─── */}
        <section id="anecdotes" className="py-10 scroll-mt-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">
            Anecdotes générales
          </h2>
          <p className="text-stone-400 text-sm mb-6">
            Ce que le quartier dit de lui-même
          </p>

          <div className="space-y-5">
            {generalAnecdotes.map((a) => (
              <div
                key={a.title}
                className="rounded-xl border border-stone-200 p-4"
              >
                <p className="font-semibold text-stone-800 mb-1.5">{a.title}</p>
                <p className="text-stone-600 text-[15px] leading-relaxed">
                  {a.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-stone-100" />

        {/* ─── SECTION 4 : PARCOURS COURT ─── */}
        <section id="court" className="py-10 scroll-mt-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-1">
            Parcours court
          </h2>
          <p className="text-stone-400 text-sm mb-1">
            4 arrêts · ~1h · descente depuis le Palais de Justice
          </p>
          <p className="text-stone-500 text-sm mb-8">
            Recommandé pour commencer par l'ascenseur de la Place Poelaert, puis
            descendre naturellement dans le quartier jusqu'au Jeu de Balle.
          </p>

          <div className="space-y-0">
            {shortStops.map((stop, i) => (
              <StopCard
                key={stop.id}
                stop={stop}
                index={i}
                total={shortStops.length}
              />
            ))}
          </div>
        </section>

        <div className="border-t border-stone-100" />

        {/* ─── SECTION 5 : PARCOURS COMPLET ─── */}
        <section id="complet" className="py-10 scroll-mt-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-1">
            Parcours complet
          </h2>
          <p className="text-stone-400 text-sm mb-8">
            10 arrêts · ~2h · avec tous les détails et anecdotes
          </p>

          <div className="space-y-0">
            {allStops.map((stop, i) => (
              <StopCard
                key={stop.id}
                stop={stop}
                index={i}
                total={allStops.length}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="mt-8 px-5 py-12 text-center"
        style={{ backgroundColor: "oklch(22% 0.04 60)" }}
      >
        <p className="text-2xl font-bold text-white mb-2">Bonne visite !</p>
        <p className="text-stone-400 text-sm">
          Les Marolles · Bruxelles · 28 juin 2026
        </p>
      </footer>
    </>
  );
}

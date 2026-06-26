"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import type { StopCoord } from "./components/MapView";

const MapView = dynamic(() => import("./components/MapView"), { ssr: false });

// Coords (WGS84) for each stop in the Marolles
const COORDS: Record<number, [number, number]> = {
  1: [50.8374, 4.3522], // Palais de Justice
  2: [50.8444, 4.3480], // Notre-Dame de la Chapelle
  3: [50.8456, 4.3543], // Tour Anneessens
  4: [50.8430, 4.3495], // Maison de Bruegel — 132 rue Haute
  5: [50.8418, 4.3483], // Rue Haute & Cité Hellemans
  6: [50.8400, 4.3465], // Place du Jeu de Balle
  7: [50.8405, 4.3468], // Bataille des Marolles
  8: [50.8450, 4.3499], // Manneken Pis
  9: [50.8473, 4.3527], // Théâtre Royal de Toone
  10: [50.8415, 4.3475], // Dialecte Marollien (centre quartier)
};

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

// ─── Anecdotes pêle-mêle ───────────────────────────────────────────────────
const ANECDOTE_THEMES = [
  {
    id: "chemin",
    label: "Sur le chemin",
    anecdotes: [
      {
        title: "Le Grand Sablon — l'autre marché",
        text: "À 5 min à pied en montant depuis les Marolles, la Place du Grand Sablon abrite chaque week-end un marché d'antiquités et de livres anciens. Plus chic que le Jeu de Balle, moins populaire, mais les deux se font concurrence depuis des décennies. Les brocanteurs des deux places se connaissent tous.",
      },
      {
        title: "La Porte de Hal — l'unique rescapée",
        text: "À 10 min au sud du Jeu de Balle : la Porte de Hal est la seule porte médiévale encore debout de la deuxième enceinte de Bruxelles (XIVe siècle). Les autres ont été rasées au XIXe siècle pour fluidifier la circulation. Napoléon l'avait transformée en prison ; aujourd'hui c'est un musée d'histoire médiévale.",
      },
      {
        title: "La Galerie Royale Saint-Hubert — la première d'Europe",
        text: "Inaugurée en 1847, c'est la première galerie marchande couverte d'Europe — avant les passages parisiens. Victor Hugo et Alexandre Dumas y flânaient. Aujourd'hui, chocolatiers, chapeliers et libraires y tiennent encore boutique, à deux pas de la Grand-Place.",
      },
      {
        title: "Les Musées Royaux des Beaux-Arts — le trésor Bruegel",
        text: "À 10 min en remontant vers le centre, les MRBAB possèdent la plus grande collection de peintures de Pieter Bruegel l'Ancien au monde — dont «La Chute des Anges Rebelles» (1562). Ce tableau était accroché dans l'église Notre-Dame de la Chapelle que vous venez de visiter.",
      },
    ],
  },
  {
    id: "insolite",
    label: "Bruxelles insolite",
    anecdotes: [
      {
        title: "Karl Marx a écrit le Manifeste ici",
        text: "En 1848, Karl Marx vit en exil à Bruxelles (rue d'Alliance, Ixelles) et y rédige le Manifeste du Parti Communiste avec Engels. Il est expulsé vers la France 48 heures après sa publication, sur ordre du roi Léopold Ier qui craignait une révolution. Le document qui allait changer le monde a été imprimé à Bruxelles.",
      },
      {
        title: "Le saxophone est belge",
        text: "Adolphe Sax, natif de Dinant, invente le saxophone dans son atelier bruxellois vers 1840. Il dépose le brevet à Paris en 1846. L'instrument révolutionne la musique militaire, puis le jazz — mais Sax mourra ruiné, incapable de défendre ses droits contre les contrefacteurs.",
      },
      {
        title: "Audrey Hepburn est née à Bruxelles",
        text: "Audrey Hepburn (Audrey Kathleen Ruston) naît le 4 mai 1929 dans une villa d'Ixelles, commune voisine de Bruxelles. Elle passe une partie de son enfance aux Pays-Bas et à Bruxelles. Pendant la guerre, elle souffre de malnutrition à Arnhem — ce qui influencera son engagement pour l'UNICEF jusqu'à sa mort.",
      },
      {
        title: "Plus d'Art Nouveau par habitant qu'ailleurs",
        text: "Bruxelles est la capitale mondiale de l'Art Nouveau : on y dénombre plus de 1 000 bâtiments du mouvement, la densité la plus élevée au monde par rapport à la population. Victor Horta y invente le style en 1893 avec la Maison Tassel — la première maison entièrement conçue en Art Nouveau.",
      },
      {
        title: "Saint-Gilles, «Petite Saigon» des Marolles",
        text: "Après 1975, des milliers de réfugiés vietnamiens arrivent en Belgique et s'installent à Saint-Gilles, commune qui borde les Marolles au sud. Chaussée de Waterloo et rue Haute : épiceries asiatiques, traiteurs pho, restaurants thaï se mêlent aux brasseries bruxelloises traditionnelles. Cette présence indochinoise discutée a enrichi la palette culinaire et culturelle du quartier populaire.",
      },
    ],
  },
  {
    id: "table",
    label: "À table",
    anecdotes: [
      {
        title: "Les frites ne sont pas françaises",
        text: "La Belgique revendique l'invention de la frite, placée dans la vallée de la Meuse au XVIIe siècle — les habitants y faisaient frire du poisson, mais gelaient en hiver et faisaient frire des pommes de terre à la place. Les soldats américains de la Première Guerre mondiale les découvrent grâce aux soldats belges et français, et appellent la recette «French» parce qu'ils entendent du français autour d'eux.",
      },
      {
        title: "La gaufre de Bruxelles contre la gaufre de Liège",
        text: "Deux gaufres, deux pays distincts. La gaufre de Bruxelles est rectangulaire, légère, croustillante, à manger chaude avec crème fouettée. La gaufre de Liège est ronde, dense, sucrée à la cassonade, à manger froide dans la rue. La bruxelloise est popularis  ée à l'Expo 58 de 1958 ; la liégeoise est la vraie recette historique.",
      },
      {
        title: "Le lambic — une bière qui fermente seule",
        text: "Le lambic est une bière unique au monde : elle fermente grâce à la levure sauvage présente dans l'air de la vallée de la Senne, autour de Bruxelles. Impossible à reproduire ailleurs. La gueuze est un assemblage de lambics jeunes et vieux, légèrement pétillante. La brasserie Cantillon, à Anderlecht (15 min du Jeu de Balle), brasse toujours selon cette méthode depuis 1900.",
      },
      {
        title: "Les moules-frites — un plat d'adoption",
        text: "Les moules-frites ne sont pas d'origine belge : elles viennent des Zélandais néerlandais. Mais au XIXe siècle, le chemin de fer permet d'acheminer des coquillages frais très rapidement jusqu'à Bruxelles. Les brasseries populaires s'en emparent et en font le plat national à prix populaire. La moule-frite est un enfant du train.",
      },
    ],
  },
  {
    id: "perso",
    label: "Personnages",
    anecdotes: [
      {
        title: "Jacques Brel — il a quitté Bruxelles pour en parler",
        text: "Né à Schaerbeek (commune de Bruxelles) en 1929, Brel détestait la bourgeoisie bruxelloise et ne supportait pas sa ville natale. Il la quittera définitivement et chantera «Bruxelles» comme une lettre d'amour à distance. Il finira par s'installer aux Marquises, où il est mort en 1978. Sa chanson reste la plus belle déclaration jamais faite à la ville.",
      },
      {
        title: "René Magritte — le voisin discret",
        text: "Magritte vécut 24 ans dans une maison ordinaire de la rue Mimosas, à Jette (commune bruxelloise). Il peignait dans sa salle à manger, en costume et chapeau melon, sans studio d'artiste. Ses voisins l'ignoraient. «Ceci n'est pas une pipe» a été peint dans cette pièce banale. La maison est aujourd'hui le Musée Magritte de Jette.",
      },
      {
        title: "Victor Horta — l'homme qui a réinventé l'architecture",
        text: "En 1893, Victor Horta construit la Maison Tassel (rue Paul-Émile Janson, Ixelles) : première maison Art Nouveau au monde. Courbes végétales, ferronneries apparentes, lumière naturelle partout — il brise tous les codes du XIXe siècle. Sa propre maison-atelier (rue Américaine) est classée UNESCO. Ironie : à la fin de sa vie, il conçoit des bâtiments Art Déco très conventionnels.",
      },
      {
        title: "Django Reinhardt — né dans une caravane",
        text: "Django Reinhardt naît en 1910 dans une roulotte près de Liverchies (Belgique) de parents manouches. Il perd l'usage de deux doigts de la main gauche dans un incendie à 18 ans — et invente un style de guitare jazz qui n'utilise que deux doigts, influençant toute la guitare moderne. Il passe une grande partie de sa vie entre Bruxelles, Paris et les routes de Belgique.",
      },
      {
        title: "Indochine — la Belgique, leur deuxième pays",
        text: "Formé à Paris en 1981 par Nicola Sirkis, Indochine est le groupe de rock francophone qui a connu la plus longue carrière en Belgique. Forest National à Bruxelles a accueilli leurs concerts dès les années 80. La Belgique, carrefour entre culture française et monde anglo-saxon, a nourri le son new wave d'Indochine — et le groupe le reconnaît volontiers : «Sans la Belgique, on n'existerait peut-être plus.»",
      },
    ],
  },
  {
    id: "art",
    label: "Art & ville",
    anecdotes: [
      {
        title: "L'Atomium devait être démoli",
        text: "L'Atomium est construit pour l'Expo 58 (1958) pour représenter un atome de fer grossi 165 milliards de fois. Comme la Tour Eiffel en 1889, il était prévu pour être démonté après l'exposition. Les Bruxellois ont voté pour le garder. Il est aujourd'hui l'un des monuments les plus visités de Belgique — et l'acier de ses sphères a été entièrement remplacé en 2006.",
      },
      {
        title: "Hergé a cartographié Bruxelles dans Tintin",
        text: "Georges Remi (Hergé) est né à Etterbeek (Bruxelles) en 1907. Il passe sa vie à Bruxelles et y dessine son studio jusqu'à sa mort. Les rues du Jeu de Balle, la Grand-Place, l'architecture Art Nouveau — tout Bruxelles se retrouve dans les albums de Tintin si on regarde attentivement les décors en arrière-plan.",
      },
      {
        title: "La «jonction» — 40 ans de chantier sous Bruxelles",
        text: "La jonction ferroviaire Nord-Midi relie les deux grandes gares de Bruxelles sous le centre-ville. Elle est décidée en 1903, les travaux durent jusqu'en 1952 — 40 ans de chantier qui perturbent le quartier des Marolles, fissurent Notre-Dame de la Chapelle et font remonter l'eau souterraine dans les caves pendant des années.",
      },
      {
        title: "Le Petit Sablon — 48 statues oubliées",
        text: "Le Petit Sablon (à 5 min des Marolles en montant) est une petite place-jardin ceinte de 48 statues représentant les guildes médiévales de Bruxelles. Chaque statue tient l'outil de son métier. Inaugurée en 1890, la place est aujourd'hui l'une des plus belles de Bruxelles et l'une des moins fréquentées par les touristes.",
      },
    ],
  },
];

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
          className="w-11 h-11 rounded-full flex items-center justify-center text-stone-500 disabled:opacity-20 active:bg-stone-200 hover:bg-stone-200 transition-colors text-xl"
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
          className="w-11 h-11 rounded-full flex items-center justify-center text-stone-500 disabled:opacity-20 active:bg-stone-200 hover:bg-stone-200 transition-colors text-xl"
          aria-label="Anecdote suivante"
        >
          ›
        </button>
      </div>
    </div>
  );
}

function AnecdotesTab() {
  const [activeTheme, setActiveTheme] = useState(ANECDOTE_THEMES[0].id);
  const theme = ANECDOTE_THEMES.find((t) => t.id === activeTheme)!;

  return (
    <div className="pb-10">
      {/* Theme pills — horizontal scroll */}
      <div className="overflow-x-auto -mx-4 px-4 mb-6">
        <div className="flex gap-2 min-w-max">
          {ANECDOTE_THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTheme(t.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                t.id === activeTheme
                  ? "text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
              style={
                t.id === activeTheme
                  ? { backgroundColor: "oklch(30% 0.04 60)" }
                  : undefined
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Anecdote cards */}
      <div className="space-y-4">
        {theme.anecdotes.map((a) => (
          <div key={a.title} className="rounded-xl border border-stone-200 p-4">
            <p className="font-semibold text-stone-800 mb-2 text-[15px]">
              {a.title}
            </p>
            <p className="text-stone-600 text-[14px] leading-relaxed">{a.text}</p>
          </div>
        ))}
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
    <section id={`stop-${stop.id}`} className="scroll-mt-24">
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

type Tab = "guide" | "anecdotes" | "carte";

export default function Home() {
  const shortStops = allStops.filter((s) => shortRouteIds.includes(s.id));
  const [view, setView] = useState<Tab>("guide");
  const [mapMode, setMapMode] = useState<"short" | "full">("short");

  const stopCoords: StopCoord[] = allStops.map((s) => ({
    id: s.id,
    name: s.name,
    address: s.address,
    coords: COORDS[s.id],
    short: s.short,
  }));

  const NAV_TABS: { id: Tab; label: string }[] = [
    { id: "guide", label: "Guide" },
    { id: "anecdotes", label: "Anecdotes" },
    { id: "carte", label: "Carte" },
  ];

  return (
    <>
      {/* Hero compact — masqué en mode carte pour que la carte prenne tout l'écran */}
      {view !== "carte" && <header
        style={{ backgroundColor: "oklch(22% 0.04 60)" }}
        className="text-white px-5 pt-8 pb-7"
      >
        <p className="text-[11px] font-semibold tracking-widest uppercase text-amber-400 mb-2">
          Bruxelles · 28 juin 2026
        </p>
        <h1
          className="font-bold tracking-tight mb-1.5 text-white"
          style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", lineHeight: 1.05 }}
        >
          Les Marolles
        </h1>
        <p className="text-stone-300 text-sm mb-4">
          Départ Sainte-Catherine · Court 1h · Complet 2h
        </p>
        <p className="text-stone-400 text-xs italic border-t border-stone-700 pt-4">
          Pour Bon Papa et Bonne Maman — Joséphine & Aurélien
        </p>
      </header>}

      {/* Sticky nav — 3 equal tabs */}
      <nav className="sticky top-0 z-20 bg-white border-b border-stone-200">
        {/* Main tabs */}
        <div className="grid grid-cols-3">
          {NAV_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`py-3.5 text-sm font-medium transition-colors ${
                view === tab.id
                  ? "text-stone-900 border-b-2 border-stone-800"
                  : "text-stone-400 active:text-stone-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sub-row: section links for Guide, mode toggle for Carte */}
        {view === "guide" && (
          <div className="overflow-x-auto border-t border-stone-100">
            <div className="flex min-w-max px-2">
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
                  className="px-3 py-2 text-[12px] whitespace-nowrap text-stone-400 hover:text-stone-800 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {view === "carte" && (
          <div className="flex items-center gap-2 px-4 py-2 border-t border-stone-100">
            <span className="text-xs text-stone-400">Parcours :</span>
            {(["short", "full"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMapMode(m)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  mapMode === m
                    ? "text-white"
                    : "bg-stone-100 text-stone-600"
                }`}
                style={
                  mapMode === m
                    ? { backgroundColor: "oklch(30% 0.04 60)" }
                    : undefined
                }
              >
                {m === "short" ? "Court (4 arrêts)" : "Complet (10 arrêts)"}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ─── VUE CARTE ─── */}
      {view === "carte" && (
        <div style={{ height: "calc(100dvh - 96px)" }} className="w-full">
          <MapView stops={stopCoords} mode={mapMode} />
        </div>
      )}

      {/* ─── VUE ANECDOTES ─── */}
      {view === "anecdotes" && (
        <div className="max-w-2xl mx-auto px-4 pt-6">
          <h2 className="text-xl font-bold text-stone-900 mb-1">
            Anecdotes pêle-mêle
          </h2>
          <p className="text-stone-400 text-sm mb-5">
            Marolles, Bruxelles, et autour
          </p>
          <AnecdotesTab />
        </div>
      )}

      {/* ─── VUE GUIDE ─── */}
      <main
        className="max-w-2xl mx-auto px-4"
        style={{ display: view === "guide" ? undefined : "none" }}
      >
        {/* ─── SECTION 1 : COMMENT VENIR ─── */}
        <section id="venir" className="py-10 scroll-mt-24">
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
        <section id="marolles" className="py-10 scroll-mt-24">
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
        <section id="anecdotes" className="py-10 scroll-mt-24">
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
        <section id="court" className="py-10 scroll-mt-24">
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
        <section id="complet" className="py-10 scroll-mt-24">
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

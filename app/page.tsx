const stops = [
  {
    id: 1,
    name: "Place du Jeu de Balle",
    address: "Place du Jeu de Balle, 1000 Bruxelles",
    epochs: ["XIXe siècle", "1940–45", "Contemporain"],
    context:
      "La place est créée en 1853 sur les ruines d'une usine de locomotives — l'usine Renard. Son nom vient d'un jeu de balle pelote qui s'y pratiquait avant l'arrivée des marchands.",
    anecdotes: [
      {
        title: "Le marché le plus vieux de Bruxelles",
        text: "Un «Oude Merct» (Vieux Marché) vendait déjà des nippes place Anneessens depuis 1640. Le conseil communal le transfère au Jeu de Balle en 1873, parce qu'il «faisait tache» sur les nouveaux boulevards bourgeois.",
      },
      {
        title: "Tintin y a chiné",
        text: "Hergé s'est directement inspiré du marché pour «Le Secret de la Licorne» : Tintin y déniche la maquette qui révèle toute une histoire de piraterie. Quand Spielberg adapte l'album au cinéma, le décor est reproduit fidèlement en studio.",
      },
      {
        title: "En 1999, les habitants ont acheté leurs pavés",
        text: "Face à un projet de réaménagement menaçant l'âme du marché, les Marolliens lancent une opération de parrainage symbolique : acheter un pavé pour bloquer la transformation. Le projet est abandonné. Les pavés sont toujours là.",
      },
    ],
    funFact:
      "Un bunker de la Seconde Guerre mondiale dort sous vos pieds : 175 m², construit en 1942, avec bancs en bois, eau, électricité et sanitaires — encore intacts aujourd'hui. Classé patrimoine bruxellois en 2018.",
  },
  {
    id: 2,
    name: "Notre-Dame de la Chapelle",
    address: "Place de la Chapelle, 1000 Bruxelles",
    epochs: ["XIIe siècle", "XVIIe siècle", "Contemporain"],
    context:
      "La plus vieille église de Bruxelles, fondée en 1134 par le duc Godefroid le Barbu. À l'époque, elle est construite hors des remparts, dans un no man's land marécageux peuplé d'artisans — c'est autour d'elle que naissent les Marolles.",
    anecdotes: [
      {
        title: "Bruegel s'y est marié et y est enterré",
        text: "En 1563, Pieter Bruegel l'Ancien épouse Mayken Coecke ici — sa belle-mère avait exigé qu'il quitte Anvers pour l'avoir à l'œil. Six ans plus tard, il meurt. Son monument funéraire, encore visible, porte la devise : «Nemo propheta in patria» — nul n'est prophète en son pays.",
      },
      {
        title: "Le clocher baroque, rescapé d'un bombardement",
        text: "En août 1695, Louis XIV ordonne le bombardement de Bruxelles pendant 36 heures consécutives, détruisant 4 000 maisons. L'église est endommagée — et c'est à ce désastre qu'elle doit son superbe clocher baroque du XVIIIe siècle, contraste saisissant avec la nef gothique du XIIe.",
      },
      {
        title: "Un héros y repose aussi",
        text: "François Anneessens, doyen des guildes bruxelloises décapité en 1719 pour avoir défendu les artisans contre les impôts autrichiens, est inhumé ici — à deux pas de la Tour qui porte son nom.",
      },
    ],
    funFact:
      "Un train passe sous l'église. La construction du tunnel ferroviaire Nord-Midi a provoqué des tassements et des fissures dans les fondations du XIIe siècle. Le monument avait survécu aux guerres et aux bombardements — il a failli être emporté par les vibrations du chemin de fer.",
  },
  {
    id: 3,
    name: "Maison de Bruegel",
    address: "132, rue Haute (angle rue de la Porte Rouge)",
    epochs: ["XVIe siècle"],
    context:
      "Une maison à pignons à gradins, façade du XVIe siècle, classée monument depuis 1960. Connue comme la «Maison Bruegel» même si la question de savoir si le peintre y a réellement habité reste débattue.",
    anecdotes: [
      {
        title: "Bruegel ou pas Bruegel ?",
        text: "Les archives indiquent que Bruegel s'installe ici en 1563. Mais une étude dendrochronologique a daté les poutres du toit de 1541 — avant son arrivée. Ce qui est certain : ses deux fils y naissent. Pieter Brueghel le Jeune (dit «d'Enfer») en 1564, et Jan Brueghel l'Ancien (dit «de Velours») en 1568. Deux peintres majeurs de la Renaissance flamande nés dans cette rue.",
      },
      {
        title: "Quatre générations de peintres",
        text: "David Teniers III, arrière-petit-fils de Bruegel et peintre lui aussi, décède dans cette même maison en 1685. Ces murs ont vu quatre générations d'artistes.",
      },
      {
        title: "Le musée qui n'a jamais vu le jour",
        text: "Dans les années 2010, un projet de musée Bruegel est lancé ici avec enthousiasme, reçoit beaucoup de soutien… puis s'enlise dans un imbroglio administratif kafkaïen typiquement bruxellois. En 2018, pour «une raison un peu surréaliste» (titre littéral d'un article de La Libre Belgique), le projet est abandonné.",
      },
    ],
    funFact:
      "Bruegel était surnommé «Bruegel le Paysan» parce qu'il peignait des scènes de la vie populaire. Révolution esthétique à l'époque : les artistes peignaient des saints et des princes. Bruegel observait les gens des Marolles depuis sa fenêtre — et en faisait de l'art universel.",
  },
  {
    id: 4,
    name: "Rue Haute & Cité Hellemans",
    address: "Rue Haute / Rue Blaes, 1000 Bruxelles",
    epochs: ["Moyen Âge", "XIXe siècle", "1942"],
    context:
      "Ces deux rues parallèles sont l'épine dorsale des Marolles. La rue Haute suit le tracé d'une voie romaine menant vers le sud du Brabant — l'une des plus vieilles routes de Bruxelles. Les rues transversales portent encore les noms des métiers qui s'y pratiquaient : rue des Tanneurs, des Orfèvres, des Chaisiers.",
    anecdotes: [
      {
        title: "Une terre d'accueil depuis toujours",
        text: "Situé délibérément hors des premières murailles de Bruxelles, le quartier a toujours accueilli ceux que la ville officielle rejetait : réfugiés protestants au XVIe siècle, républicains espagnols en 1936, Juifs polonais fuyant les pogroms. Dans les années 1930, plus de 4 000 habitants juifs vivaient ici — un tiers de la population — avec 117 commerces dans les dix rues principales.",
      },
      {
        title: "La Cité Hellemans : l'Art Nouveau pour les pauvres",
        text: "En 1912, 2 164 personnes s'entassaient dans 152 masures sans eau ni hygiène sur un seul bloc. L'architecte Émile Hellemans construit 272 logements sociaux avec larges allées piétonnes et passages sous arcades, inaugurés en 1915. L'un des premiers ensembles de logements sociaux de Belgique. Les allées portent les noms des anciens métiers du quartier.",
      },
      {
        title: "Une rafle le 3 septembre 1942",
        text: "À 20h30, des policiers allemands bloquent plusieurs rues. Toutes les maisons sont fouillées. Après les arrestations, les Allemands inscrivent «Judenrein» sur les portes. 718 personnes sont emmenées à la caserne Dossin de Malines. Seules 18 survivent.",
      },
    ],
    funFact:
      "Au XIXe siècle, la rue Blaes n'avait que deux types de commerces : des marchands de papiers peints et des vendeurs de lustres. Tout le quartier se tapissait et s'éclairait dans la même rue. Aujourd'hui c'est le cœur des antiquaires et brocanteurs de Bruxelles.",
  },
  {
    id: 5,
    name: "Tour Anneessens",
    address: "Boulevard de l'Empereur, 1000 Bruxelles",
    epochs: ["XIIIe siècle", "XVIIIe siècle", "XIXe siècle"],
    context:
      "L'un des vestiges les mieux conservés de la première enceinte médiévale de Bruxelles, construite au début du XIIIe siècle. Le rempart faisait 4 km de long, avec une quarantaine de tours et un fossé pouvant être inondé.",
    anecdotes: [
      {
        title: "Un homme décapité a donné son nom à la tour",
        text: "François Anneessens (1660–1719), doyen de la corporation des Quatre Couronnés, refuse au nom des 49 corporations bruxelloises de plier devant les nouveaux impôts autrichiens. Il est arrêté, emprisonné — selon la tradition, dans cette tour —, jugé et décapité sur la Grand-Place le 19 septembre 1719. La Belgique indépendante en fera un héros national.",
      },
      {
        title: "La tour dormait cachée sous des maisons",
        text: "Après le Moyen Âge, la tour fut progressivement enfouie sous de nouvelles constructions et disparut du paysage urbain. En 1887, lors de la démolition d'un vieux quartier voisin, on la redécouvre par hasard. Menacée immédiatement de démolition, c'est l'intervention du bourgmestre Charles Buls qui la sauve.",
      },
      {
        title: "Un train la blesse à nouveau",
        text: "En 1957, les travaux du tunnel ferroviaire Nord-Midi la percent et l'endommagent. Restaurée en 1967, classée officiellement en 1992.",
      },
    ],
    funFact:
      "Quand les ouvriers ont redécouvert la tour en 1887, ils ont aussi trouvé un chapiteau roman sculpté et des fragments de muraille médiévale sous les fondations des maisons démolies. La première enceinte de Bruxelles court toujours sous les rues du centre-ville — on marche sur le Moyen Âge sans le savoir.",
  },
  {
    id: 6,
    name: "Le Palais de Justice",
    address: "Place Poelaert, 1000 Bruxelles",
    epochs: ["XIXe siècle", "1944", "Contemporain"],
    context:
      "Surface au sol : 26 000 m². Jusqu'en 1965 et le Vehicle Assembly Building de la NASA, c'était le plus grand bâtiment construit en pierre de taille au monde — plus grand que Saint-Pierre de Rome. Sa coupole culmine à 104 mètres. Paul Verlaine l'a dit «piranésien avec une touche de folie».",
    anecdotes: [
      {
        title: "L'architecte a détruit la moitié d'un quartier",
        text: "Joseph Poelaert reçoit la commande en 1861. Pour construire ce colosse sur la colline de Coudenberg, il faut raser une partie des Marolles. Des centaines de familles sont expropriées. La colère est immense. C'est à cette époque qu'entre dans le vocabulaire marollien l'insulte : «schieven architekt» — «l'architecte de travers». À ce jour, l'une des insultes les plus lourdes du dialecte local.",
      },
      {
        title: "Le bâtiment a tué son architecte",
        text: "Poelaert passe 17 ans à se battre avec ce chantier monstrueux. En 1879, épuisé, un AVC l'emporte avant qu'il voie son œuvre terminée. La légende locale raconte que les Marolliens rancuniers ont fêté sa mort. L'inauguration a lieu sans lui, le 15 octobre 1883.",
      },
      {
        title: "Les échafaudages qui n'en finissent pas",
        text: "En 1944, les Allemands en retraite incendient délibérément les archives et une partie du bâtiment. La coupole brûle. La reconstruction durera des décennies. Depuis 1984, les échafaudages ne quittent plus le Palais — ils sont devenus si permanents qu'ils nécessitent eux-mêmes des travaux d'entretien.",
      },
    ],
    funFact:
      "Depuis 1951, un pendule de Foucault est installé à l'intérieur pour démontrer la rotation de la Terre. Et de 1964 à 2002, la coupole abritait les équipements de diffusion de l'Eurovision. La voûte pharaonique de la justice belge servait d'antenne de télévision.",
  },
  {
    id: 7,
    name: "La Bataille des Marolles (1969)",
    address: "Autour de la Place du Jeu de Balle et des rues adjacentes",
    epochs: ["1969"],
    context:
      "En juillet 1969, les habitants de cinq îlots reçoivent une lettre d'expropriation : raser le quartier pour construire une annexe du Palais de Justice. Plus de 1 200 personnes — artisans, personnes âgées, immigrés — sont menacées d'expulsion.",
    anecdotes: [
      {
        title: "Un prêtre mène la rébellion",
        text: "Jacques Van der Biest, vicaire de la paroisse des Marolles, fonde le Comité Général d'Action des Marolles (CGAM). Méthode radicalement pacifique : affiches «NON» sur tous les murs, conférences de presse, télégrammes aux ministres, et des façades bénévolement rénovées pour prouver que le quartier mérite d'être gardé.",
      },
      {
        title: "La victoire en quarante jours",
        text: "Fin août 1969 — moins de deux mois après les premières lettres — les autorités capitulent. Le quartier est sauvé. Un programme de rénovation est lancé en préservant la structure des rues. C'est une victoire totale et sans précédent pour un quartier populaire face aux pouvoirs publics belges.",
      },
      {
        title: "Une victoire qui dépasse les Marolles",
        text: "La Bataille inspire la création de l'ARAU (Atelier de Recherche et d'Action Urbaines) et d'Inter-Environnement Bruxelles. Ces deux associations existent toujours et continuent de défendre la ville contre les projets destructeurs.",
      },
    ],
    funFact:
      "Contrairement à une légende tenace, la Bataille des Marolles de 1969 n'était pas liée à la construction du métro. C'était bien l'extension du Palais de Justice qui était en jeu. Pour les Marolliens de 1969, l'ennemi portait la robe de magistrat.",
  },
  {
    id: 8,
    name: "Théâtre Royal de Toone",
    address: "Impasse de la Fidélité 6, 1000 Bruxelles",
    epochs: ["XVIe siècle", "1830", "2025"],
    context:
      "La seule marionnetterie de tradition bruxelloise encore en activité. «Toone» est le diminutif bruxellois d'Antoine. La lignée remonte à 1830 et chaque Toone intronise lui-même son successeur — la transmission ne passe pas par la famille, mais par le talent.",
    anecdotes: [
      {
        title: "L'origine est un acte de résistance",
        text: "Au XVIe siècle, Philippe II d'Espagne fait fermer les théâtres à Bruxelles pour éviter tout rassemblement contestataire. Réponse des Bruxellois : ils remplacent les acteurs par des marionnettes («poechenelles»), contournant ainsi l'interdiction. Le théâtre de marionnettes naît comme une résistance populaire à la censure espagnole.",
      },
      {
        title: "Le premier Toone ne savait ni lire ni écrire",
        text: "Antoine Genty — Toone I — crée son théâtre vers 1830 sans jamais avoir appris à lire. Il invente ses pièces de tête, improvise sur des légendes populaires, des opéras entendus en ville, des événements de l'actualité. Les marionnettes étaient aussi un journal parlé pour un public largement illettré.",
      },
      {
        title: "Toone VIII prononce toutes les voix seul",
        text: "Le Toone actuel (Nicolas Géal) est la voix de tous les personnages — parfois simultanément — dans plusieurs langues : bruxellois, français, anglais, néerlandais, allemand. Le théâtre possède aujourd'hui 1 400 marionnettes.",
      },
    ],
    funFact:
      "En décembre 2025, le Théâtre de Toone a été inscrit au Patrimoine Culturel Immatériel de l'UNESCO. La même instance qui classe les pyramides d'Égypte protège maintenant le poechenelle en dialecte marollien.",
  },
  {
    id: 9,
    name: "Le Manneken Pis",
    address: "Angle rue de l'Étuve / rue du Chêne, 1000 Bruxelles",
    epochs: ["XIVe siècle", "XVIIe siècle", "Contemporain"],
    context:
      "Techniquement à la lisière nord des Marolles, la statue appartient à l'imaginaire populaire bruxellois né précisément dans ce quartier. Et son histoire est beaucoup plus étrange qu'on ne l'imagine.",
    anecdotes: [
      {
        title: "Il existe depuis plus de six siècles",
        text: "Les archives de la cathédrale Saints-Michel-et-Gudule attestent d'une fontaine représentant un enfant qui urine à cet endroit dès 1388 — en pierre à l'origine. La version en bronze actuelle est commandée en 1619 au sculpteur Jérôme Duquesnoy l'Ancien pour remplacer l'original abîmé.",
      },
      {
        title: "Plus de mille costumes",
        text: "Le premier vêtement offert au Manneken Pis date de 1698, cadeau d'un gouverneur des Pays-Bas espagnols. Depuis, les dons n'ont jamais cessé : la garderobe dépasse aujourd'hui le millier de costumes, conservés au musée GardeRobe MannekenPis. Parmi les tenues : une armure de samouraï japonaise, un costume d'Elvis Presley, et la tenue de l'équipe nationale de football.",
      },
      {
        title: "Trois légendes, aucune prouvée",
        text: "Un enfant éteint la mèche d'une bombe en urinant dessus, sauvant la ville. Ou : le fils de Godefroid le Barbu, sorti de son berceau pendant une bataille, est retrouvé en train d'uriner sur les ennemis. Ou encore : une sorcière pétrifie un gamin qui urine sur son mur. Les trois sont bruxelloises. Aucune n'est vérifiable.",
      },
    ],
    funFact:
      "La statue originale a été volée plusieurs fois. En 1817, le voleur est condamné aux travaux forcés. En remerciement pour sa «libération», la ville de Bruxelles lui offre un nouveau costume royal doré. Même enlevé, il revient habillé.",
  },
  {
    id: 10,
    name: "Le Dialecte Marollien",
    address: "Partout dans le quartier — dans les cafés, au marché, sur les murs",
    epochs: ["XVIe siècle", "XIXe siècle", "Aujourd'hui"],
    context:
      "Le marollien — aussi appelé brusseleer — est l'une des langues les plus étranges jamais parlées en Europe occidentale. Ni vraiment français, ni vraiment flamand, ni wallon, ni espagnol — et pourtant tout cela à la fois. Né du brassage de populations qui se sont succédé dans les Marolles, il est aujourd'hui classé au Patrimoine Culturel Immatériel de la Région de Bruxelles-Capitale.",
    anecdotes: [
      {
        title: "La langue vivait à l'oral, presque sans traces écrites",
        text: "Le premier texte littéraire authentiquement marollien documenté remonte à 1871 — un pamphlet signé «Coco Lulu». Un témoignage de 1851 décrit le quartier peuplé d'une population qui parle «une vraie mosaïque de vocables» mêlant le brabançon, le wallon, le picard, le français et l'espagnol — héritage des siècles de domination ibérique.",
      },
      {
        title: "La grande invention : le suffixe -eire",
        text: "La grande invention du marollien : ajouter le suffixe germanique -eire aux verbes français pour créer des verbes hybrides. «Autoriseire» (autoriser), «applaudisseire» (applaudir), «constateire» (constater). Une grammaire germanique pour des mots latins. C'est à cela qu'on reconnaît le vrai Marollien.",
      },
      {
        title: "Trois mots qui ont survécu",
        text: "De ce dialecte presque disparu, quelques mots résistent dans l'usage courant bruxellois : le brol (les objets inutiles, le bric-à-brac), la zwanze (l'humour pince-sans-rire bruxellois, l'art de se moquer de tout), et le ketje (le gamin de Bruxelles, plein de débrouillardise). Ces trois mots résument l'esprit du quartier.",
      },
    ],
    funFact:
      "À Bruxelles, «architek» tout court est resté une insulte. Dire à quelqu'un qu'il se comporte «comme un architek» sous-entend qu'il détruit ce qui est beau pour faire quelque chose d'inutilement grand et prétentieux. Un legs linguistique de la rancœur populaire contre Poelaert.",
  },
];

function EpochTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-stone-200 text-stone-700 mr-1 mb-1">
      {label}
    </span>
  );
}

function Anecdote({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-4">
      <p className="font-semibold text-stone-800 mb-1">{title}</p>
      <p className="text-stone-700 leading-relaxed">{text}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <header
        style={{ backgroundColor: "oklch(22% 0.04 60)" }}
        className="text-white px-6 py-14 pb-10"
      >
        <p className="text-xs font-medium tracking-widest uppercase text-amber-300 mb-4">
          Bruxelles · Quartier des Marolles
        </p>
        <h1
          className="font-bold tracking-tight mb-3"
          style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}
        >
          Les Marolles
        </h1>
        <p className="text-lg text-stone-300 mb-6">
          Guide de visite · 28 juin 2026
        </p>
        <p className="text-stone-300 leading-relaxed max-w-xl mb-6">
          Au XVIIe siècle, des religieuses apostolines — les{" "}
          <em className="text-amber-200">«Maricolles»</em>, celles qui honorent
          la Vierge Marie — s&apos;installent dans ce bas de la ville pour
          secourir les plus pauvres. Elles repartiront en 1715, laissant leur
          nom derrière elles. Certains disent que le nom vient plutôt du vieux
          mot brabançon <em className="text-amber-200">marolle</em>, la flaque
          de boue — ce quartier était autrefois marécageux. Bruxelles a gardé
          les deux versions, selon l&apos;humeur.
        </p>
        <div className="flex gap-4 text-sm text-stone-400">
          <span>10 arrêts</span>
          <span>·</span>
          <span>~2h à pied</span>
          <span>·</span>
          <span>Tout plat ou presque</span>
        </div>
      </header>

      {/* Table of contents */}
      <nav className="sticky top-0 z-10 bg-white border-b border-stone-200 overflow-x-auto">
        <div className="flex gap-1 px-4 py-2 min-w-max">
          {stops.map((stop) => (
            <a
              key={stop.id}
              href={`#stop-${stop.id}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors hover:bg-stone-100 text-stone-600"
            >
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: "oklch(32% 0.04 60)" }}
              >
                {stop.id}
              </span>
              <span className="hidden sm:inline">
                {stop.name.split("(")[0].trim()}
              </span>
            </a>
          ))}
        </div>
      </nav>

      {/* Stops */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-12">
        {stops.map((stop, i) => (
          <section key={stop.id} id={`stop-${stop.id}`} className="scroll-mt-14">
            {/* Stop header */}
            <div className="flex items-start gap-4 mb-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white"
                style={{ backgroundColor: "oklch(32% 0.04 60)" }}
              >
                {String(stop.id).padStart(2, "0")}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-stone-900 leading-tight">
                  {stop.name}
                </h2>
                <p className="text-sm text-stone-500 mt-0.5">{stop.address}</p>
                <div className="mt-2">
                  {stop.epochs.map((e) => (
                    <EpochTag key={e} label={e} />
                  ))}
                </div>
              </div>
            </div>

            {/* Context */}
            <p className="text-stone-600 italic leading-relaxed mb-5 pl-4 border-l-2 border-stone-200">
              {stop.context}
            </p>

            {/* Anecdotes */}
            <div className="space-y-4 mb-5">
              {stop.anecdotes.map((a) => (
                <Anecdote key={a.title} title={a.title} text={a.text} />
              ))}
            </div>

            {/* Fun fact */}
            <div className="rounded-lg bg-amber-50 border-l-4 border-amber-400 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">
                Le saviez-vous ?
              </p>
              <p className="text-stone-700 leading-relaxed text-sm">
                {stop.funFact}
              </p>
            </div>

            {/* Divider */}
            {i < stops.length - 1 && (
              <div className="mt-10 border-t border-stone-200" />
            )}
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer
        className="mt-16 px-6 py-12 text-center"
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

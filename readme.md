# Stuðningsbankinn

## Almennt

### Hvað er Stuðningsbankinn?
Stuðningsbankinn er gagnagrunnur sem heldur utan upplýsingar um aðgengi og úrræði fyrir fólk með fatlanir eða sértæka námsörðugleika.

Grunnurinn er er unnin af vinnuhópi í námskeiðinu Raunhæft verkefni sem er kennt í MPM náminu við HR.


### Hvernig virkar Stuðningsbankinn?
Í kerfinu er hægt að skrá fyrirtæki og stofnanir og útbúa spurningalista til að senda á viðkomandi stað.

Þannig er hægt að útbúa sérhæfðan spurningalista fyrir framhaldsskóla, annan fyrir bókasöfn, og þann þriðja fyrir sundlaugar. Viðkomandi staður svarar svo spurningunum samviskusamlega og þannig safnast saman upplýsingar í grunninn.

Dæmi um spurningu sem væri send á framhaldsskóla væri t.d. hvort það séu lyftur fyrir hreyfihamlaða til að komast á milli hæða. Niðurstöðurnar vistast í grunninn og er hægt að nota til að meta eða bera saman aðgengi.

### Hvernig sæki ég um aðgang?
 ....

### Hvernig tilkynni ég villur í kerfinu?
Best er að stofna verkbeiðni undir issues: https://github.com/lidtaek/studningsbankinn-api/issues

## Tæknilegt
Kerfið er einföld REST þjónusta skrifað í NodeJS með Postgres bakenda og Redis.

### Uppsetning
Til að setja upp kerfið og þróa þarft þú að:
- Setja upp NodeJS og NPM á tölvuna þína https://nodejs.org/en/
- Hafa góðan editor eins og t.d. VS Code https://code.visualstudio.com/
- Hafa tengistreng fyrir Postgres gagnagrunninn og Redis. (hafa samband við Berg)
- Setja local.studningsbankinn.is í host töfluna þína fyrir localhost.

### Keyra locally
Þegar allt er uppsett er nóg að gera `npm install` og svo `npm run start` og opna vafrann á http://local.studningsbankinn.is:3001

### Hvernig kem ég út breytingum?
 - Ef þú ert hluti af lidtaek teyminu á github.com/lidtaek þá geturðu sett beint á master.
 - Ef þú ert utan teymisins er best að forka og óska eftir pull-request.

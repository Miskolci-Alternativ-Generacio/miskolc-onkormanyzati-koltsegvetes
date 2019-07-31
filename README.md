# Önkormányzati költségvetés vizualizáció 2.0+

*KÖKÖ: Közérthető Költségvetés*

Az oldal alapja a StartBootstrap / Creative sablon.



## Beüzemelés

A weboldal a Gridsome keretrendszeren alapul, ami a forrásfájlokból egy optimalizált weboldalt generál.

A beüzemelés lépései:

1. Telepíts Node.js-t és Yarn-t, ezek adják az alapvető környezetet a projekthez.
1. Telepítsd a Gridsome-ot parancssorból: `yarn global add @gridsome/cli`, ez fogja legenerálni a kész weboldalt.
1. A projekt mappájában futtasd le a `yarn install` parancsot, ez letölti a szükséges csomagokat a `node_modules` mappába.
1. Másold be az önkormányzattól kapott XLSX fájlt az `input` mappába, `budget.xlsx` néven.
1. A projekt mappájában futtasd le a `node scrips/prepare` parancsot, ez az `input` mappában levő fájlokban rejlő adatokat átalakítja a vizualizációnak megfelelő formátumra. A generált adatfájlok az `src/data` mappába kerülnek, a weboldal fejlesztésekor és generálásakor innen lesznek kiolvasva.
1. Szerkeszd a `src/data/tooltips.json` és `milestones.json` fájlokat, hogy testreszabd a vizualizáció szövegeit (részletek alább).
1. Szerkeszd a `src/data/config.js` fájlban a változókat, hogy testreszabd a weboldal szövegeit és beállításait (részletek alább).
1. A projekt mappájában indítsd el a `gridsome develop` parancsot, mely egy lokális webszervert nyit. Ezután a http://localhost:8080/ címen meg tudod tekinteni a weboldal előnézetét. Ahogy módosítod a fájlokat, az előnézet is frissülni fog. A programot a `Ctrl+C` kombinációval lehet leállítani.
1. A weboldal legenerálásához használd a `gridsome build` parancsot. A kész weboldal a `dist` mappába kerül, ennek tartalmát kell a webszervereddel hosztolnod.
1. A kereső naplózás funkciójához szükség van telepített PHP interpreterre is, valamint a következő parancs lefuttatására a hosztolt mappában: `touch search.log && sudo chown www-data:www-data search.log`. A `search.log` fájlt érdemes publikusan elérhetetlenné tenni. Ha erre a naplózó funkcióra nincs szükség, a `track-search.php` fájlt ajánlott törölni a webszerverről.



## Mappastruktúra

- **dist/ (generált)** - Ebbe a mappába generálja a Gridsome a kész weboldalt.
- **input/** - Ebbe a mappába ajánlott helyezni az önkormányzati XLSX fájlt.
- **scripts/** - Ebben a mappába segédszkriptek vannak.
- **src/** - A weboldal forrásfájljai.


## Adatok

A vizualizáció az alábbi adatfájlokból dolgozik:

- **input/budget.xlsx** - A vizualizáció adatainak forrása.
- **input/tags.xlsx** - A kereső által használt címkehalmazok.
- **src/data/config.js** - A weboldal beállításai, szövegei.
- **src/data/data.json (generált)** - A vizualizáció adatai előkészítve.
- **src/data/functions.tsv** - A funkcionális kategóriák fa struktúrája.
- **src/data/milestones.json** - A fejlesztések leírásai.
- **src/data/tags.json (generált)** - A kereső által használt címkehalmazok előkészítve.
- **src/data/tooltips.json** - Az egyes kategóriákhoz tartozó tooltip-ek szövegei.



### input/budget.xlsx

Az általános KGR rendszer importja. A munkafüzet több munkalapból állhat, melyek elnevezése a következő lehet: `ÉVSZÁM <TÍPUS>`, ahol a `<TÍPUS>` helyén `BEVÉTEL` vagy `KIADÁS` állhat.

A munkalapoknak 2 formátumát ismeri a program. Az egyik az elmúlt évekre vonatkozik, a másik a prognózisokra. A bevételi és kiadási oldal adott éven belül azonos formátumú. Prognózisok esetében a funkcionális bontást nem tartalmazza az input.



#### Elmúlt évekre vonatkozó formátum

Az ilyen munkalapokon megtalálható a mátrix, vagyis nem csak közgazdasági bontásban vannak az adatok, hanem funkcionális bontásban is. Elvárt formátum:

- 1. sor: lényegtelen
- 2. sor: a 4. (D) oszloptól kezdve funkcionális kategóriák `<AZONOSÍTÓSZÁM> <ELNEVEZÉS>` formában. Az elnevezés lényegtelen. A programnak csak az azonosítószám kell, amit szóközzel kell elválasztani a többi adattól, pl.: *"042120 Mezőgazdasági támogatások"*.
- 3. sortól kezdve:
	- 1. oszlop: közgazdasági kategória azonosítószáma, legalább kétjegyű, pl.: `01`
	- 2. oszlop: közgazdasági kategória elnevezése és kiegészítő információi.
		- A cellák végén `(B123)` vagy `(K123)` formában alternatív azonosító szerepelhet, de ezt a program nem használja.
		- Az elnevezés után opcionálisan szerepelhet egy formula, mely azt mondja meg, hogy az adott sor mely más kategóriákat összegzi. Ennek a formulának zárójelben kell lennie és szóközzel kell elválasztani az elnevezéstől. A formula csak számokat és `+` jelet tartalmazhat. A nyitó zárójel után opcionálisan szerepelhet valamennyi `=` vagy `>` karakter. Intervallum jelölésére használható `.` vagy `…`, 2 `+` jel között.
		- Példa: *"Működési célú támogatások államháztartáson belülről (=07+...+10+21+32) (B1)"*
	- 3. oszlop: az adott közgazdasági kategóriához tartozó összeg
	- 4. oszloptól kezdve: az adott közgazdasági (sor) és funkcionális (oszlop) kategóriához tartozó számérték.
	- A számértékből beolvasáskor a `,` és szóköz karakterek eltávolításra kerülnek.



#### Prognózisra vonatkozó formátum

Az ilyen munkalapokról hiányzik a funkcionális bontás. A formátum hasonló az előbbiekben leírtakhoz, az alábbi módosításokkal:

- 1.-3. sor: lényegtelen
- a közgazdasági kategóriák bontása a 4. sortól kezdődik



### input/tags.xlsx

A kereső funkciónak 4 címkehalmazra van szüksége:

- bevételi oldal, közgazdasági bontás
- bevételi oldal, funkcionális bontás
- kiadási oldal, közgazdasági bontás
- kiadási oldal, funkcionális bontás

Ezeket az adatokat a `tags.xlsx`-ben, egyetlen munkalapon (az elsőn!) kell megadni, az alábbi szerkezetben:

- az 1. sor opcionálisan lehet fejléc
- további sorok:
	- 1. oszlop az oldalt jelöli: `expense` (kiadás) vagy `income` (bevétel)
	- 2. oszlop a bontást jelöli: `econ` (közgazdasági) vagy `func` (funkcionális)
	- 3. oszlop a kategória azonosítót tartalmazza: funkcionális bontásnál egy természetes szám, közgazdasági bontásnál ajánlott a `B123/K123` alakú azonosítókat használni. A cellában az azonosító után opcionálisan szerepelhet egy szóköz után a kategória elnevezése is a szerkesztést segítendő, de ezt a program nem fogja olvasni.
	- 4. oszlop tartalmazza a címkéket: vesszővel, és opcionálisan még szóközzel is elválasztott kifejezések



### src/data/functions.tsv

A funkcionális kategóriák fa struktúráját írja le.

Formátuma TSV, oszlopai: kategória azonosító, címke, szülő kategória azonosító.

Ha az utóbbi oszlopba olyan érték kerül, amihez nem tartozik sor, akkor az adott kategória a gyökérben lesz látható.

```tsv
107054	Családsegítés	1070
107014	Támogatott lakhatás hajléktalan személyek részére	1070
900070	Fejezeti és általános tartalékok elszámolása	9000
...
```



### src/data/milestones.json

A *Fejlesztések* szakasz tartalmát definiálja.

Formátuma JSON: egy tömb, az alábbi mezőkből álló objektumokból:

- `picture`: a képfájl elérési útvonala
- `title`: fejléc
- `description`: szövegtörzs
- `text`: további szövegmező, mely jelenleg a szövegtörzs alatt jelenik meg

```json
[
	{
		"picture": "/assets/img/milestone/0_2019.jpg",
		"title": "Ülésezik Mintaváros képviselő-testülete",
		"description": "A közel 12 ezer lakosú Mintaváros önkormányzata ...",
		"text": "Mintaváros idei költségvetése"
	},
	...
]
```



### src/data/tooltips.json

A kategóriákhoz tartozó tooltip-ek szövegeit tartalmazza.

Formátuma JSON: egyetlen objektum, benne kulcs érték párok, ahol a kulcs a kategória alternatív azonosítója (`B1`, `B2`, `K1`, `K2`, stb.), az érték pedig a tooltip szövege.

Ha egy kategóriához nem szerepel tooltip szöveg ebben a fájlban, ott nem fog megjelenni a tooltip.

```json
{
	"B1": "Lorem ipsum for B1",
	"B2": "Lorem ipsum for B2",
	...
}
```



### src/data/data.json (generált)

Ezt a fájlt a `budget.xlsx` tartalmából generálja a `prepare-data.js` szkript. Ez a fájl tartalmazza a több éves költségvetési adatokat az alábbi struktúrában:

```json
{
	"<évszám>": {
		"expense": {
			"econ": { ... },
			"func": { ... }
		},
		"income": {
			"econ": { ... },
			"func": { ... }
		}
	},
	...
}
```

Az `expense` mező a kiadások, az `income` a bevételek adatait tartalmazza. Az `econ` a közgazdasági, míg a `func` a funkcionális bontásban írja le az adatokat. Mindkét bontás 1-1 gyökér node-ot tartalmaz. A node-ok struktúrája:

```json
{
	"id": 123,
	"altID": "X123",
	"name": "...",
	"value": 12345678,
	"children": [ ... ]
}
```

- **id** - A kategória azonosítója, természetes szám.
- **altId** - A közgazdasági kategóriák `B123` vagy `K123` alakú azonosítója.
- **name** - A kategória elnevezése.
- **value** - Az adott node-hoz tartozó összeg.
- **children** - Gyerek node-ok tömbje.



### src/data/tags.json (generált)

Ezt a fájlt a `tags.xlsx` tartalmából generálja a `prepare-tags.js` szkript. Ez a fájl tartalmazza a 4 címkehalmazt a 2 költségvetési oldalhoz és 2 bontáshoz.

Formátuma hasonló struktúrát követ, mint a `data.json`, csak itt nincsenek évszámok, és node-ok helyett címkehalmazokat ír le.

```json
{
	"expense": {
		"econ": [ "címke1", "címke2", ... ],
		"func": [ ... ]
	},
	"income": {
		"econ": [ ... ],
		"func": [ ... ]
	}
}
```



## Szövegek és beállítások

Az oldalon megjelenő szövegeket és a SEO beállításokat (amik nem a `data.json`-ból jönnek) az `src/data/config.js` fájlban lehet szerkeszteni.

A `config.js` fájlban ezen kívül beállítható a kanonikus URL:

```js
const url = 'http://koko.deepdata.hu/';
```

Az alapértelmezetten megjelenítendő év:

```js
const defaultYear = 2018;
```

Illetve a megjelenítendő modulok:

```js
const modules = {
	income: false,
	inex: false,
	milestones: true
};
```

- Az `income` a *Bevételek* szakaszt jelenti. Ha ez ki van kapcsolva, akkor a *Köszöntőből* indítható útmutató a *Kiadások* szakaszon mutatja be a vizualizáció elemeit. Az `income` automatikusan kikapcsol, ha a `data.json` nem tartalmaz `income` mezőt valamelyik évhez.
- Az `inex` a *Mérleg* szakaszt, a nyitóábrát jelenti. Automatikusan kikapcsol, ha az `income` ki van kapcsolva.
- A `milestones` a *Fejlesztések* szakaszt jelenti.

A fejléc képet az `src/scss/_variables.scss` fájlban lehet módosítani. Itt lehet módosítani a színeket is.



## Keresési napló

Az oldalon található kereső naplózza a beírt keresőkifejezéseket és a találatok számát. Mindezt a `search.log` fájlba menti ki, melynek formátuma TSV, oszlopai:

- előfordulások száma (hányszor szerepelt az alábbi keresőkifejezés az alábbi találatszámmal)
- keresőkifejezés
- találatok száma

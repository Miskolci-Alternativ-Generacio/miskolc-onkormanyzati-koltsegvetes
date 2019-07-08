// Settings

const defaultYear = 2018;
const modules = {
	income: true,
	inex: true,
	milestones: true
};

// Texts

const navBar = {
	city: 'Mintaváros',
	welcome: 'Köszöntő',
	inex: 'Költségvetés',
	milestones: 'Fejlesztések'
};

const header = {
	title: `${navBar.city} költségvetése`,
	headline: `Ezen az oldalon megtekintheted ${navBar.city} költségvetését és fejlesztéseit, átlátható módon, interaktív vizualizációk segítségével!`,
	button: 'Tovább'
};

const welcome = {
	title: 'TISZTELT MINTAVÁROSI POLGÁROK!',
	leftParagraphs: [
		'Egy önkormányzat feladatai sokrétűek, állampolgári szemmel nehezen áttekinthetőek. Mintavárosban azonban nincs takargatni valónk, ezért úgy döntöttünk, hogy a modern technika segítségével bemutatjuk Önökek településünk gazdálkodását úgy, ahogyan azt korábban csak kevesek láthatták!',
		'A XXI. század embere joggal várhatja el egy önkormányzattól, hogy az interneten is utánanézhessen, mennyit költ a település oktatásra, egészségügyre vagy épp a parkok rendben tartására. A helyi demokráciára is igaz, kettőn áll a vásár. A tisztességes településvezetés mellé tájékozott polgárok is kellenek, akik nyomon követik a döntések ésszerűségét. A közpénzek átlátható felhasználásáért küzdő K-Monitor és a Költségvetési Felelősségi Intézet szakmai segítségével létrehozott alkalmazás, amit pillanatokon belül használatba vehet, Magyarországon elsőként arra törekszik, hogy mindenki számára könnyen befogadható és értelmezhető képet adjon az önkormányzat gazdálkodásáról.'
	],
	rightParagraphs: [
		'A weboldal testre szabható és egyszerűen feltölthető bármely település adataival. Reméljük, Mintaváros igyekezete ragadós lesz és egyre többen teszik meg ezt az egyáltalán nem megerőltető, mégis fontos lépést az átláthatóság felé.'
	],
	aboveSignature: 'Kellemes böngészést kívánok,',
	name: 'Példa Imre',
	role: `${navBar.city} polgármestere`
};

const inex = {
	title: 'Mérleg',
	income: 'Bevételek',
	expense: 'Kiadások',
	details: 'Részletek',
	text: 'Lórum ipse természetesen szedősödik ámít a fegyező számára. Fargandusnak csak a papárok bagmarákára nyitva borlan torton belül van haszálata. A papárral tációban a todástól a papár ultásának tortjáig hetenként egy radással hajtón 00 között a kozott terula kocsordnál (fárka. Hájdás dolca bőgős zsírnök) lehet kabikát vigyogtannia. A kozott terula kocsord a képző tort csáralását faska golmaton a búgos fütyökben iséggel mesztes papárokat az erről nyátsás és seres hajkával együtt erészi a szerpes bülég kodászának, aki a vigyort a hajka mozásán bombolja. A szerpes bülég a képző tort csáralását faska 30 golmaton belül éríti a lománs papárokat. Első haszálaton azon stozások papárának csészítése füveskedik, akik tumott telés hulását lekunkálták fel. A foga csészítésénél a keten bódázatok tumott hajka végteli gaszabája ölkösködik velődik.'
};

const vis = {
	income: 'Bevételek',
	expense: 'Kiadások',
	econ: 'Közgazdasági nézet',
	econHint: 'Működési vagy felhalmozási jellegük alapján mutatja meg a kiadások összetételét, hogy mekkora a személyi kiadások, a kapcsolódó munkáltatói járulékok, a dologi kiadások, a beruházási és felújítási kiadások, az államháztartáson belüli és kívüli támogatások, transzferek összege a költségvetésben.',
	func: 'Funkcionális nézet',
	funcHint: 'A költségvetési kiadásokat osztályozza, azok társadalmi-gazdasági cél szerinti összetételét mutatja. Az általános közszolgáltatásoktól a védelmi kiadásokig összesen 10 kategóriában tartalmazza a kerület működésének területeit.'
};

const milestones = {
	title: 'Fejlesztések'
};

// ---

module.exports = {
	defaultYear,
	header,
	inex,
	milestones,
	modules,
	navBar,
	vis,
	welcome
};
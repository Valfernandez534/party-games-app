const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

const server = http.createServer(app);
const io = new Server(server);

// ==================================================================
// 1. DATA UNDERCOVER (MASSIVE LIST - NO LEVELS - CLEAN FUN)
// ==================================================================
const undercoverData = [
  // --- NOURRITURE & BOISSONS ---
  { civil: 'Bière', under: 'Cidre' }, { civil: 'Vin Rouge', under: 'Vin Blanc' },
  { civil: 'Champagne', under: 'Prosecco' }, { civil: 'Eau plate', under: 'Eau gazeuse' },
  { civil: 'Coca-Cola', under: 'Pepsi' }, { civil: 'Thé', under: 'Café' },
  { civil: 'McDonalds', under: 'Burger King' }, { civil: 'KFC', under: 'Popeyes' },
  { civil: 'Ketchup', under: 'Mayonnaise' }, { civil: 'Moutarde', under: 'Tabasco' },
  { civil: 'Pizza', under: 'Pâtes' }, { civil: 'Sushi', under: 'Maki' },
  { civil: 'Tacos', under: 'Kebab' }, { civil: 'Frite', under: 'Chips' },
  { civil: 'Raclette', under: 'Fondue' }, { civil: 'Tartiflette', under: 'Gratin dauphinois' },
  { civil: 'Nutella', under: 'Confiture' }, { civil: 'Beurre', under: 'Margarine' },
  { civil: 'Pain au chocolat', under: 'Croissant' }, { civil: 'Baguette', under: 'Pain de mie' },
  { civil: 'Crêpe', under: 'Gaufre' }, { civil: 'Donut', under: 'Beignet' },
  { civil: 'Chocolat au lait', under: 'Chocolat blanc' }, { civil: 'Cookie', under: 'Brownie' },
  { civil: 'Glace', under: 'Sorbet' }, { civil: 'Yaourt', under: 'Fromage blanc' },
  { civil: 'Pomme', under: 'Poire' }, { civil: 'Banane', under: 'Concombre' },
  { civil: 'Fraise', under: 'Framboise' }, { civil: 'Orange', under: 'Clémentine' },
  { civil: 'Citron', under: 'Pamplemousse' }, { civil: 'Pêche', under: 'Abricot' },
  { civil: 'Tomate', under: 'Poivron' }, { civil: 'Carotte', under: 'Radis' },
  { civil: 'Oignon', under: 'Échalote' }, { civil: 'Ail', under: 'Épice' },
  { civil: 'Sel', under: 'Poivre' }, { civil: 'Sucre', under: 'Édulcorant' },
  { civil: 'Lait', under: 'Crème' }, { civil: 'Farine', under: 'Maïzena' },
  { civil: 'Riz', under: 'Semoule' }, { civil: 'Spaghetti', under: 'Tagliatelle' },
  { civil: 'Thon', under: 'Saumon' }, { civil: 'Poulet', under: 'Dinde' },
  { civil: 'Bœuf', under: 'Porc' }, { civil: 'Saucisson', under: 'Chorizo' },

  // --- OBJET DU QUOTIDIEN ---
  { civil: 'Fourchette', under: 'Cuillère' }, { civil: 'Couteau', under: 'Ciseaux' },
  { civil: 'Stylo', under: 'Crayon' }, { civil: 'Gomme', under: 'Correcteur' },
  { civil: 'Chaise', under: 'Tabouret' }, { civil: 'Canapé', under: 'Fauteuil' },
  { civil: 'Lit', under: 'Hamac' }, { civil: 'Oreiller', under: 'Coussin' },
  { civil: 'Couette', under: 'Couverture' }, { civil: 'Drap', under: 'Nappe' },
  { civil: 'Lunettes', under: 'Lentilles' }, { civil: 'Montre', under: 'Bracelet' },
  { civil: 'Bague', under: 'Alliance' }, { civil: 'Collier', under: 'Chaîne' },
  { civil: 'Chapeau', under: 'Casquette' }, { civil: 'Bonnet', under: 'Béret' },
  { civil: 'Écharpe', under: 'Foulard' }, { civil: 'Gants', under: 'Moufles' },
  { civil: 'Manteau', under: 'Veste' }, { civil: 'Pull', under: 'Sweat' },
  { civil: 'Pantalon', under: 'Jean' }, { civil: 'Short', under: 'Caleçon' },
  { civil: 'Chaussettes', under: 'Collants' }, { civil: 'Chaussures', under: 'Baskets' },
  { civil: 'Sac à dos', under: 'Valise' }, { civil: 'Portefeuille', under: 'Porte-monnaie' },
  { civil: 'Clé', under: 'Badge' }, { civil: 'Téléphone', under: 'Tablette' },
  { civil: 'Ordinateur', under: 'Télévision' }, { civil: 'Lampe', under: 'Bougie' },
  { civil: 'Miroir', under: 'Vitre' }, { civil: 'Tapis', under: 'Moquette' },
  { civil: 'Shampoing', under: 'Gel douche' }, { civil: 'Savon', under: 'Détergent' },
  { civil: 'Brosse à dents', under: 'Dentifrice' }, { civil: 'Peigne', under: 'Brosse' },
  { civil: 'Parfum', under: 'Déodorant' }, { civil: 'Maquillage', under: 'Peinture' },
  { civil: 'Parapluie', under: 'Imperméable' }, { civil: 'Éponge', under: 'Serpillière' },

  // --- NATURE & ANIMAUX ---
  { civil: 'Chien', under: 'Loup' }, { civil: 'Chat', under: 'Tigre' },
  { civil: 'Lion', under: 'Panthère' }, { civil: 'Cheval', under: 'Ane' },
  { civil: 'Vache', under: 'Taureau' }, { civil: 'Mouton', under: 'Chèvre' },
  { civil: 'Poule', under: 'Canard' }, { civil: 'Oie', under: 'Dinde' },
  { civil: 'Aigle', under: 'Faucon' }, { civil: 'Pigeon', under: 'Mouette' },
  { civil: 'Requin', under: 'Dauphin' }, { civil: 'Baleine', under: 'Orque' },
  { civil: 'Saumon', under: 'Truite' }, { civil: 'Crabe', under: 'Homard' },
  { civil: 'Abeille', under: 'Guêpe' }, { civil: 'Mouche', under: 'Moustique' },
  { civil: 'Papillon', under: 'Libellule' }, { civil: 'Araignée', under: 'Scorpion' },
  { civil: 'Serpent', under: 'Lézard' }, { civil: 'Grenouille', under: 'Crapaud' },
  { civil: 'Tortue', under: 'Escargot' }, { civil: 'Lapin', under: 'Hamster' },
  { civil: 'Rat', under: 'Souris' }, { civil: 'Ours', under: 'Panda' },
  { civil: 'Girafe', under: 'Zèbre' }, { civil: 'Éléphant', under: 'Hippopotame' },
  { civil: 'Gorille', under: 'Singe' }, { civil: 'Kangourou', under: 'Autruche' },
  { civil: 'Soleil', under: 'Lune' }, { civil: 'Nuage', under: 'Fumée' },
  { civil: 'Pluie', under: 'Neige' }, { civil: 'Vent', under: 'Tempête' },
  { civil: 'Mer', under: 'Océan' }, { civil: 'Lac', under: 'Rivière' },
  { civil: 'Montagne', under: 'Colline' }, { civil: 'Forêt', under: 'Jungle' },
  { civil: 'Désert', under: 'Plage' }, { civil: 'Volcan', under: 'Incendie' },
  { civil: 'Arbre', under: 'Buisson' }, { civil: 'Fleur', under: 'Plante' },

  // --- CULTURE & LOISIRS ---
  { civil: 'Harry Potter', under: 'Seigneur des Anneaux' }, { civil: 'Batman', under: 'Superman' },
  { civil: 'Star Wars', under: 'Star Trek' }, { civil: 'Avengers', under: 'Justice League' },
  { civil: 'Spider-Man', under: 'Iron Man' }, { civil: 'Joker', under: 'Harley Quinn' },
  { civil: 'Mario', under: 'Luigi' }, { civil: 'Pokemon', under: 'Digimon' },
  { civil: 'Pikachu', under: 'Sonic' }, { civil: 'Zelda', under: 'Link' },
  { civil: 'Minecraft', under: 'Roblox' }, { civil: 'Fortnite', under: 'Call of Duty' },
  { civil: 'FIFA', under: 'PES' }, { civil: 'PlayStation', under: 'Xbox' },
  { civil: 'Netflix', under: 'Disney+' }, { civil: 'YouTube', under: 'Twitch' },
  { civil: 'Facebook', under: 'Instagram' }, { civil: 'Twitter', under: 'LinkedIn' },
  { civil: 'Snapchat', under: 'TikTok' }, { civil: 'Tinder', under: 'Bumble' },
  { civil: 'iPhone', under: 'Samsung' }, { civil: 'Windows', under: 'Mac' },
  { civil: 'Google', under: 'Bing' }, { civil: 'Amazon', under: 'AliExpress' },
  { civil: 'Football', under: 'Rugby' }, { civil: 'Tennis', under: 'Ping-pong' },
  { civil: 'Basket', under: 'Handball' }, { civil: 'Volley', under: 'Badminton' },
  { civil: 'Ski', under: 'Snowboard' }, { civil: 'Surf', under: 'Skate' },
  { civil: 'Natation', under: 'Plongée' }, { civil: 'Vélo', under: 'Moto' },
  { civil: 'Course', under: 'Marche' }, { civil: 'Yoga', under: 'Gym' },
  { civil: 'Danse', under: 'Chant' }, { civil: 'Piano', under: 'Guitare' },
  { civil: 'Batterie', under: 'Violon' }, { civil: 'Peinture', under: 'Dessin' },
  { civil: 'Cinéma', under: 'Théâtre' }, { civil: 'Livre', under: 'Magazine' },

  // --- LIEUX & VILLES ---
  { civil: 'Paris', under: 'Londres' }, { civil: 'Marseille', under: 'Lyon' },
  { civil: 'Bordeaux', under: 'Toulouse' }, { civil: 'New York', under: 'Los Angeles' },
  { civil: 'Espagne', under: 'Italie' }, { civil: 'France', under: 'Belgique' },
  { civil: 'Chine', under: 'Japon' }, { civil: 'Brésil', under: 'Argentine' },
  { civil: 'Maison', under: 'Appartement' }, { civil: 'Château', under: 'Palais' },
  { civil: 'École', under: 'Collège' }, { civil: 'Lycée', under: 'Université' },
  { civil: 'Bureau', under: 'Usine' }, { civil: 'Hôpital', under: 'Clinique' },
  { civil: 'Pharmacie', under: 'Boulangerie' }, { civil: 'Supermarché', under: 'Marché' },
  { civil: 'Restaurant', under: 'Cantine' }, { civil: 'Bar', under: 'Café' },
  { civil: 'Musée', under: 'Galerie' }, { civil: 'Bibliothèque', under: 'Librairie' },
  { civil: 'Piscine', under: 'Plage' }, { civil: 'Parc', under: 'Jardin' },
  { civil: 'Zoo', under: 'Cirque' }, { civil: 'Aéroport', under: 'Gare' },
  { civil: 'Métro', under: 'Bus' }, { civil: 'Train', under: 'Tramway' },
  { civil: 'Ascenseur', under: 'Escalier' }, { civil: 'Toilettes', under: 'Salle de bain' },
  { civil: 'Cuisine', under: 'Salon' }, { civil: 'Chambre', under: 'Grenier' },
  { civil: 'Cave', under: 'Garage' }, { civil: 'Balcon', under: 'Terrasse' }
];

// ==================================================================
// 2. DATA PICOLO (3 NIVEAUX BIEN REMPLIS)
// ==================================================================
// ==================================================================
// 2. DATA PICOLO (400+ CARTES - NIVEAUX 1, 2, 3)
// ==================================================================
const picoloData = [
  // ==========================
  // LEVEL 1 : SOFT & FUN
  // ==========================
  { text: "{p1} doit parler avec l'accent québécois pendant 2 tours.", level: 1 },
  { text: "{p1} doit imiter une poule à chaque fois qu'il/elle boit.", level: 1 },
  { text: "{p1} ne doit plus utiliser la lettre 'E' en parlant.", level: 1 },
  { text: "{p1} est le roi du silence. S'il parle, il boit 2 gorgées.", level: 1 },
  { text: "Le dernier à toucher son nez boit 2 gorgées.", level: 1 },
  { text: "Le dernier à lever la main boit 2 gorgées.", level: 1 },
  { text: "Le premier qui touche du bois distribue 2 gorgées.", level: 1 },
  { text: "{p1} raconte une blague. Si personne ne rit, il boit.", level: 1 },
  { text: "Pierre-Feuille-Ciseau entre {p1} et {p2}. Le perdant boit.", level: 1 },
  { text: "Bataille de regards entre {p1} et {p2}. Le premier qui rit boit.", level: 1 },
  { text: "Jeu des marques de voitures. {p1} commence.", level: 1 },
  { text: "Jeu des capitales. {p1} commence.", level: 1 },
  { text: "Ni OUI ni NON pour {p1} pendant 3 tours.", level: 1 },
  { text: "Les filles boivent 1 gorgée.", level: 1 },
  { text: "Les garçons boivent 1 gorgée.", level: 1 },
  { text: "Ceux qui ont des lunettes boivent.", level: 1 },
  { text: "Ceux qui ont un chat boivent.", level: 1 },
  { text: "Ceux qui sont célibataires boivent.", level: 1 },
  { text: "Le plus jeune boit 2 gorgées.", level: 1 },
  { text: "Le plus vieux distribue 2 gorgées.", level: 1 },
  { text: "Tout le monde boit à la santé de l'hôte !", level: 1 },
  { text: "{p1} et {p2} échangent leurs prénoms pour 3 tours.", level: 1 },
  { text: "{p1} doit faire 10 pompes ou boire 3 gorgées.", level: 1 },
  { text: "{p1} doit chanter une chanson de Disney.", level: 1 },
  { text: "{p1} doit faire un discours de 1 minute sur les escargots.", level: 1 },
  { text: "{p1} doit boire avec la main gauche (ou droite si gaucher).", level: 1 },
  { text: "{p1} choisit un mot interdit. Celui qui le dit boit.", level: 1 },
  { text: "Le dernier à se mettre debout sur sa chaise boit.", level: 1 },
  { text: "{p1} mime un métier, les autres devinent.", level: 1 },
  { text: "{p1} doit faire un selfie avec {p2} et le garder en fond d'écran 10min.", level: 1 },
  { text: "{p1} doit citer 5 films avec Leonardo DiCaprio.", level: 1 },
  { text: "Jeu de la valise : 'Je pars en voyage et je prends...'. {p1} commence.", level: 1 },
  { text: "{p1} doit réciter l'alphabet à l'envers. S'il rate, il boit.", level: 1 },
  { text: "Shi-Fu-Mi général ! Tout le monde joue contre {p1}. Les perdants boivent.", level: 1 },
  { text: "Ceux qui ont un iPhone boivent 1 gorgée (Team Pigeon).", level: 1 },
  { text: "Ceux qui ont un Android boivent 1 gorgée (Team Pauvre).", level: 1 },
  { text: "{p1} doit faire la conversation à une chaise pendant 1 minute.", level: 1 },
  { text: "Le sol est de la lave ! Le dernier à décoller les pieds boit.", level: 1 },
  { text: "{p1} doit boire son verre sans les mains.", level: 1 },
  { text: "{p1} et {p2} sont siamois : ils doivent rester collés pendant 2 tours.", level: 1 },
  { text: "Votez pour le plus bordélique. Le gagnant boit 2 gorgées.", level: 1 },
  { text: "Votez pour le plus gros dormeur. Le gagnant boit 2 gorgées.", level: 1 },
  { text: "{p1} doit lécher son coude. S'il n'y arrive pas, il boit.", level: 1 },
  { text: "Jeu des rimes en 'ETTE'. {p1} commence (ex: Crevette).", level: 1 },
  { text: "{p1} doit faire une déclaration d'amour à son verre.", level: 1 },
  { text: "Flash ! La dernière personne prise en photo par {p1} boit.", level: 1 },
  { text: "{p1} imite un autre joueur. Les autres doivent deviner qui c'est.", level: 1 },
  { text: "{p1} doit inventer un nouveau surnom pour {p2}.", level: 1 },
  { text: "{p1} distribue autant de gorgées qu'il a de frères et soeurs.", level: 1 },
  { text: "Ceux qui ont les yeux bleus boivent.", level: 1 },
  { text: "Ceux qui ont les yeux marrons distribuent.", level: 1 },
  { text: "{p1} doit raconter sa pire honte. Ou boire 3 gorgées.", level: 1 },
  { text: "{p1} doit chanter le refrain de 'La Reine des Neiges'.", level: 1 },
  { text: "{p1} doit faire le poirier contre un mur (ou boire 3 gorgées).", level: 1 },
  { text: "Concours de grimaces. {p1} est juge et fait boire le perdant.", level: 1 },
  { text: "{p1} doit parler en chuchotant jusqu'au prochain tour.", level: 1 },
  { text: "{p1} doit citer 3 qualités de {p2}.", level: 1 },
  { text: "{p1} doit citer 3 défauts de {p2} (attention aux embrouilles !).", level: 1 },
  { text: "Tout le monde change de place !", level: 1 },
  { text: "{p1} doit boire une gorgée pour chaque année d'étude qu'il a fait après le bac.", level: 1 },
  { text: "{p1} doit faire un pierre-feuille-ciseau avec ses pieds contre {p2}.", level: 1 },
  { text: "Jeu des animaux : Chacun imite un cri, {p1} commence.", level: 1 },
  { text: "{p1} devient le majordome. Il doit appeler tout le monde 'Monsieur' ou 'Madame'.", level: 1 },
  { text: "Tous ceux qui sont nés en été boivent.", level: 1 },
  { text: "Tous ceux qui ont un tatouage boivent.", level: 1 },
  { text: "{p1} doit boire une gorgée d'eau (l'hydratation c'est important).", level: 1 },
  { text: "Medusa : Tout le monde baisse la tête. À 3, on lève. Si deux personnes se regardent, elles boivent.", level: 1 },
  { text: "{p1} doit faire 10 squats.", level: 1 },
  { text: "{p1} doit envoyer un emoji au hasard à son dernier contact.", level: 1 },
  { text: "{p1} est immunisé contre les gages pendant 2 tours.", level: 1 },
  { text: "Le joueur avec le moins de batterie boit 2 gorgées.", level: 1 },
  { text: "{p1} doit lire son dernier SMS reçu à voix haute.", level: 1 },
  { text: "Dans ma valise il y a... {p1} commence.", level: 1 },
  { text: "{p1} doit citer 5 marques de bières.", level: 1 },
  { text: "Le premier qui rit boit 2 gorgées.", level: 1 },
  { text: "{p1} doit tourner 10 fois sur lui-même puis essayer de marcher droit.", level: 1 },

  // ==========================
  // LEVEL 2 : HOT & DRAGUE
  // ==========================
  { text: "{p1} doit faire un massage à {p2} pendant 1 minute.", level: 2 },
  { text: "{p1} doit embrasser {p2} dans le cou.", level: 2 },
  { text: "{p1} doit s'asseoir sur les genoux de {p2}.", level: 2 },
  { text: "{p1} et {p2} doivent se tenir la main jusqu'au prochain tour.", level: 2 },
  { text: "{p1} doit faire un suçon (ou une marque) à {p2}.", level: 2 },
  { text: "{p1} doit laisser {p2} lire son dernier SMS.", level: 2 },
  { text: "{p1} doit citer 3 parties du corps qu'il aime chez {p2}.", level: 2 },
  { text: "{p1} doit enlever un vêtement (chaussettes comptent).", level: 2 },
  { text: "{p1} doit danser de manière sexy sur une musique choisie par {p2}.", level: 2 },
  { text: "{p1} doit murmurer un truc cochon à l'oreille de {p2}.", level: 2 },
  { text: "{p1} doit embrasser {p2} sur la bouche (avec ou sans langue).", level: 2 },
  { text: "Les célibataires boivent 2 gorgées.", level: 2 },
  { text: "{p1} doit boire un shot sur le corps de {p2}.", level: 2 },
  { text: "{p1} doit mimer sa position préférée, les autres devinent.", level: 2 },
  { text: "{p1} et {p2} doivent s'embrasser ou finir leur verre.", level: 2 },
  { text: "{p1} doit caresser les cheveux de {p2}.", level: 2 },
  { text: "{p1} doit faire un compliment sexy à {p2}.", level: 2 },
  { text: "{p1} doit révéler la couleur de ses sous-vêtements.", level: 2 },
  { text: "{p1} doit laisser {p2} lui mettre la main aux fesses.", level: 2 },
  { text: "{p1} doit manger un fruit de manière sensuelle.", level: 2 },
  { text: "{p1} doit lécher le lobe d'oreille de {p2}.", level: 2 },
  { text: "{p1} doit regarder {p2} dans les yeux en disant 'J'ai envie de toi'.", level: 2 },
  { text: "{p1} doit passer un glaçon sur le cou de {p2}.", level: 2 },
  { text: "{p1} doit deviner la couleur des sous-vêtements de {p2}. Si faux, il boit.", level: 2 },
  { text: "{p1} doit défaire le haut de {p2} avec ses dents (ou boire 5 gorgées).", level: 2 },
  { text: "{p1} doit embrasser le ventre de {p2}.", level: 2 },
  { text: "Votez pour la personne la plus sexy. Le gagnant distribue 2 gorgées.", level: 2 },
  { text: "{p1} doit mordre doucement la lèvre de {p2}.", level: 2 },
  { text: "{p1} doit faire un câlin de 30 secondes à {p2}.", level: 2 },
  { text: "{p1} doit passer sa main sous le t-shirt de {p2}.", level: 2 },
  { text: "{p1} doit laisser {p2} l'embrasser où il veut.", level: 2 },
  { text: "{p1} doit masser les épaules de {p2}.", level: 2 },
  { text: "{p1} doit boire une gorgée dans le verre de {p2} sans les mains.", level: 2 },
  { text: "{p1} doit raconter son premier baiser.", level: 2 },
  { text: "{p1} doit raconter son pire râteau.", level: 2 },
  { text: "{p1} doit dire quel est son tue-l'amour.", level: 2 },
  { text: "{p1} doit dire ce qu'il regarde en premier chez une personne.", level: 2 },
  { text: "{p1} doit simuler une demande en mariage à {p2}.", level: 2 },
  { text: "{p1} et {p2} doivent se regarder dans les yeux sans rire pendant 30s. Le perdant boit.", level: 2 },
  { text: "{p1} doit faire un bisou esquimau à {p2}.", level: 2 },
  { text: "{p1} doit enlever les chaussettes de {p2} avec ses dents.", level: 2 },
  { text: "{p1} doit avouer s'il a déjà eu un rêve érotique sur quelqu'un ici.", level: 2 },
  { text: "{p1} doit laisser {p2} s'asseoir sur son visage (ou ses genoux si trop soft).", level: 2 },
  { text: "{p1} doit lécher une goutte d'alcool sur le poignet de {p2}.", level: 2 },
  { text: "{p1} doit mettre ses mains dans les poches arrière de {p2}.", level: 2 },
  { text: "{p1} doit décrire son style de partenaire idéal.", level: 2 },
  { text: "{p1} doit danser un slow avec {p2}.", level: 2 },
  { text: "{p1} doit porter {p2} dans ses bras (style mariés) pendant 1 tour.", level: 2 },
  { text: "{p1} doit laisser {p2} lui faire une queue de cheval ou une coiffure moche.", level: 2 },
  { text: "{p1} doit embrasser le genou de {p2}.", level: 2 },
  { text: "{p1} doit sentir le cou de {p2} et dire ce que ça sent.", level: 2 },
  { text: "{p1} doit se faire porter sur le dos par {p2}.", level: 2 },
  { text: "{p1} doit faire deviner une position du Kamasutra en mimant.", level: 2 },
  { text: "{p1} doit laisser {p2} vérifier l'étiquette de son t-shirt (par l'intérieur).", level: 2 },
  { text: "{p1} doit dire quel sous-vêtement il/elle préfère sur le sexe opposé.", level: 2 },
  { text: "{p1} doit faire un bisou sur le front de {p2}.", level: 2 },
  { text: "{p1} doit laisser {p2} lui toucher les abdos (ou le ventre).", level: 2 },
  { text: "{p1} doit avouer son fantasme le plus soft.", level: 2 },
  { text: "{p1} doit dire s'il est plutôt domination ou soumission.", level: 2 },
  { text: "{p1} doit faire un clin d'œil sexy à {p2}.", level: 2 },
  { text: "{p1} doit laisser {p2} lui caresser la main pendant 1 minute.", level: 2 },
  { text: "{p1} doit dire quel est le détail physique qui le fait craquer.", level: 2 },
  { text: "{p1} doit dire s'il préfère la lumière allumée ou éteinte.", level: 2 },
  { text: "{p1} doit boire si il a déjà envoyé un nude.", level: 2 },
  { text: "{p1} doit boire si il a déjà utilisé une appli de rencontre.", level: 2 },
  { text: "Tournée générale des bisous ! Tout le monde fait la bise à son voisin de droite.", level: 2 },
  { text: "{p1} doit mordre l'oreille de {p2}.", level: 2 },
  { text: "{p1} doit dire qui est la personne la plus attirante du groupe.", level: 2 },
  
  // ==========================
  // LEVEL 3 : TRASH / HARDCORE
  // ==========================
  { text: "{p1} doit boire son verre cul-sec.", level: 3 },
  { text: "{p1} doit boire une gorgée du verre de tout le monde (cocktail de l'enfer).", level: 3 },
  { text: "{p1} doit envoyer un texto risqué à la personne choisie par {p2}.", level: 3 },
  { text: "{p1} doit montrer sa galerie photo à tout le monde.", level: 3 },
  { text: "{p1} doit simuler un orgasme très bruyant.", level: 3 },
  { text: "{p1} doit appeler son ex en haut-parleur.", level: 3 },
  { text: "{p1} doit se mettre en sous-vêtements.", level: 3 },
  { text: "{p1} doit laisser {p2} lui écrire un mot sur le corps au marqueur.", level: 3 },
  { text: "{p1} doit révéler avec qui il coucherait ici.", level: 3 },
  { text: "{p1} doit sucer le doigt de {p2} pendant 20 secondes.", level: 3 },
  { text: "{p1} doit mettre sa main dans le pantalon de {p2} pendant 30 secondes.", level: 3 },
  { text: "{p1} doit mimer une fellation sur une bouteille.", level: 3 },
  { text: "{p1} doit échanger ses vêtements avec {p2}.", level: 3 },
  { text: "{p1} doit raconter son pire moment au lit.", level: 3 },
  { text: "{p1} doit montrer son historique de navigation Internet.", level: 3 },
  { text: "{p1} doit faire un lap dance à {p2}.", level: 3 },
  { text: "{p1} doit lécher le mamelon de {p2} (par dessus les vêtements).", level: 3 },
  { text: "{p1} doit embrasser {p2} avec la langue pendant 10 secondes.", level: 3 },
  { text: "{p1} doit envoyer un nude à quelqu'un (hors du jeu).", level: 3 },
  { text: "{p1} doit laisser {p2} lui cracher de l'alcool dans la bouche.", level: 3 },
  { text: "{p1} doit poster une story honteuse sur Instagram.", level: 3 },
  { text: "{p1} doit révéler son fantasme le plus inavouable.", level: 3 },
  { text: "{p1} doit lécher le pied de {p2}.", level: 3 },
  { text: "{p1} doit se faire fesser par {p2} 5 fois.", level: 3 },
  { text: "{p1} doit avaler une cuillère de moutarde/piquant ou boire 5 gorgées.", level: 3 },
  { text: "{p1} doit lire son dernier DM Instagram à voix haute.", level: 3 },
  { text: "{p1} doit appeler ses parents et leur dire qu'il a un problème de drogue.", level: 3 },
  { text: "{p1} doit simuler une position sexuelle avec {p2} (habillés).", level: 3 },
  { text: "{p1} doit montrer sa dernière photo 'Dossier'.", level: 3 },
  { text: "{p1} doit lécher le visage de {p2} du menton au front.", level: 3 },
  { text: "{p1} doit boire une gorgée de la bouche de {p2} (bouche-à-bouche).", level: 3 },
  { text: "{p1} doit faire un strip-tease intégral (il peut garder les sous-vêtements).", level: 3 },
  { text: "{p1} doit laisser {p2} lui verser un verre d'eau dessus.", level: 3 },
  { text: "{p1} doit dire quelle personne ici il aime le moins.", level: 3 },
  { text: "{p1} doit mettre un glaçon dans son slip/sa culotte et attendre qu'il fonde.", level: 3 },
  { text: "{p1} doit laisser {p2} poster un statut Facebook/Twitter à sa place.", level: 3 },
  { text: "{p1} doit embrasser les fesses de {p2} (par dessus le pantalon).", level: 3 },
  { text: "{p1} doit raconter sa dernière expérience sexuelle en détail.", level: 3 },
  { text: "{p1} doit laisser {p2} fouiller dans ses photos 'Masquées'.", level: 3 },
  { text: "{p1} doit mordre les fesses de {p2}.", level: 3 },
  { text: "{p1} doit manger un aliment de manière érotique en regardant {p2}.", level: 3 },
  { text: "{p1} doit donner son téléphone déverrouillé à {p2} pendant 1 minute.", level: 3 },
  { text: "{p1} doit dire le nom de la personne avec qui il a eu le meilleur rapport.", level: 3 },
  { text: "{p1} doit laisser {p2} lui dessiner une moustache au marqueur.", level: 3 },
  { text: "{p1} doit boire un shot de vinaigre ou de sauce soja.", level: 3 },
  { text: "{p1} doit faire 20 tours sur lui-même puis boire un shot.", level: 3 },
  { text: "{p1} doit dire ce qu'il changerait physiquement chez {p2}.", level: 3 },
  { text: "{p1} doit envoyer 'Je t'aime' à la 3ème personne de ses contacts.", level: 3 },
  { text: "{p1} doit faire un slow langoureux avec un balai.", level: 3 },
  { text: "{p1} doit lécher le sol (ou boire 10 gorgées).", level: 3 },
  { text: "{p1} doit laisser {p2} lui couper une mèche de cheveux.", level: 3 },
  { text: "{p1} doit boire un mélange fait par les autres joueurs.", level: 3 },
  { text: "{p1} doit montrer le contenu de son sac/portefeuille.", level: 3 },
  { text: "{p1} doit faire le chien et aboyer sur les passants (si fenêtre ouverte).", level: 3 },
  { text: "{p1} doit sentir les aisselles de {p2}.", level: 3 },
  { text: "{p1} doit dire qui a les plus beaux pieds ici.", level: 3 },
  { text: "{p1} doit laisser {p2} choisir sa photo de profil pour 24h.", level: 3 },
  { text: "{p1} doit appeler un numéro au hasard et chanter joyeux anniversaire.", level: 3 },
  { text: "{p1} doit dire s'il a déjà trompé quelqu'un ici.", level: 3 },
  { text: "{p1} doit boire un cul-sec sans utiliser ses mains.", level: 3 },
  { text: "{p1} doit sucer un glaçon jusqu'à la fin.", level: 3 },
  { text: "{p1} doit laisser {p2} lui faire un 'hickey' (suçon).", level: 3 },
  { text: "{p1} doit raconter son fantasme le plus bizarre.", level: 3 },
  { text: "{p1} doit dire s'il a déjà pensé à quelqu'un d'autre pendant l'acte.", level: 3 },
  { text: "{p1} doit se faire bander les yeux et deviner qui l'embrasse.", level: 3 }
];

// ==================================================================
// 3. DATA NEVER HAVE I EVER (3 NIVEAUX BIEN REMPLIS)
// ==================================================================
// ==================================================================
// 3. DATA NEVER HAVE I EVER (400+ PHRASES - NIVEAUX 1, 2, 3)
// ==================================================================
const neverData = [
  // ==========================
  // LEVEL 1 : SOFT & FUN
  // ==========================
  { text: "Je n'ai jamais menti sur mon âge.", level: 1 },
  { text: "Je n'ai jamais volé quelque chose (même un bonbon).", level: 1 },
  { text: "Je n'ai jamais fait pipi sous la douche.", level: 1 },
  { text: "Je n'ai jamais triché à un examen.", level: 1 },
  { text: "Je n'ai jamais vomi à cause de l'alcool.", level: 1 },
  { text: "Je n'ai jamais pleuré devant un film.", level: 1 },
  { text: "Je n'ai jamais eu peur du noir.", level: 1 },
  { text: "Je n'ai jamais mangé de la nourriture pour animaux.", level: 1 },
  { text: "Je n'ai jamais fait semblant d'être malade pour rater les cours/le boulot.", level: 1 },
  { text: "Je n'ai jamais porté le même slip 2 jours de suite.", level: 1 },
  { text: "Je n'ai jamais stalké quelqu'un sur les réseaux sociaux.", level: 1 },
  { text: "Je n'ai jamais eu de contravention.", level: 1 },
  { text: "Je n'ai jamais cassé un truc et accusé quelqu'un d'autre.", level: 1 },
  { text: "Je n'ai jamais chanté sous la douche.", level: 1 },
  { text: "Je n'ai jamais eu le béguin pour un prof.", level: 1 },
  { text: "Je n'ai jamais utilisé la brosse à dents de quelqu'un d'autre.", level: 1 },
  { text: "Je n'ai jamais ri à un enterrement ou un moment inapproprié.", level: 1 },
  { text: "Je n'ai jamais envoyé de SMS à la mauvaise personne.", level: 1 },
  { text: "Je n'ai jamais oublié l'anniversaire de mes parents.", level: 1 },
  { text: "Je n'ai jamais pris un bain de minuit.", level: 1 },
  { text: "Je n'ai jamais essayé de couper mes propres cheveux.", level: 1 },
  { text: "Je n'ai jamais eu d'ami imaginaire.", level: 1 },
  { text: "Je n'ai jamais trébuché en public.", level: 1 },
  { text: "Je n'ai jamais fait tomber mon téléphone dans les toilettes.", level: 1 },
  { text: "Je n'ai jamais menti sur mon CV.", level: 1 },
  { text: "Je n'ai jamais pété dans un ascenseur bondé.", level: 1 },
  { text: "Je n'ai jamais mangé de la nourriture tombée par terre (règle des 5 secondes).", level: 1 },
  { text: "Je n'ai jamais googlé mon propre nom.", level: 1 },
  { text: "Je n'ai jamais eu de compte fake sur les réseaux.", level: 1 },
  { text: "Je n'ai jamais menti pour annuler une soirée.", level: 1 },
  { text: "Je n'ai jamais pleuré pour éviter une amende.", level: 1 },
  { text: "Je n'ai jamais pris une photo de moi en pleurant.", level: 1 },
  { text: "Je n'ai jamais envoyé un message que j'ai regretté immédiatement.", level: 1 },
  { text: "Je n'ai jamais fait de somnambulisme.", level: 1 },
  { text: "Je n'ai jamais été viré d'un cours.", level: 1 },
  { text: "Je n'ai jamais eu de coupe de cheveux horrible.", level: 1 },
  { text: "Je n'ai jamais porté de Crocs.", level: 1 },
  { text: "Je n'ai jamais volé de verre dans un bar.", level: 1 },
  { text: "Je n'ai jamais réutilisé un cadeau qu'on m'avait offert.", level: 1 },
  { text: "Je n'ai jamais regardé l'historique de quelqu'un d'autre.", level: 1 },
  { text: "Je n'ai jamais mis un vêtement à l'envers sans m'en rendre compte.", level: 1 },
  { text: "Je n'ai jamais mangé tout seul au restaurant.", level: 1 },
  { text: "Je n'ai jamais raté mon avion/train.", level: 1 },
  { text: "Je n'ai jamais liké une photo Instagram datant d'il y a 3 ans par erreur.", level: 1 },
  { text: "Je n'ai jamais fait semblant d'être au téléphone pour éviter quelqu'un.", level: 1 },
  { text: "Je n'ai jamais eu peur d'un film d'horreur.", level: 1 },
  { text: "Je n'ai jamais gardé un secret qu'on m'avait demandé de ne pas répéter.", level: 1 },
  { text: "Je n'ai jamais eu honte de ma playlist musicale.", level: 1 },
  { text: "Je n'ai jamais fait pipi dans la mer.", level: 1 },
  { text: "Je n'ai jamais vomi dans un taxi/Uber.", level: 1 },
  { text: "Je n'ai jamais essayé de fumer.", level: 1 },
  { text: "Je n'ai jamais menti à un jeu à boire.", level: 1 },
  { text: "Je n'ai jamais été amoureux d'un personnage de dessin animé.", level: 1 },
  { text: "Je n'ai jamais fait de 'Dab' en public.", level: 1 },
  { text: "Je n'ai jamais dansé la Macarena sobre.", level: 1 },
  { text: "Je n'ai jamais marché dans une crotte de chien.", level: 1 },
  { text: "Je n'ai jamais confondu quelqu'un avec une autre personne dans la rue.", level: 1 },
  { text: "Je n'ai jamais claqué tout mon argent dans des trucs inutiles.", level: 1 },
  { text: "Je n'ai jamais regardé une saison entière d'une série en une nuit.", level: 1 },
  { text: "Je n'ai jamais dormi pendant un film au cinéma.", level: 1 },
  { text: "Je n'ai jamais mangé de la neige.", level: 1 },
  { text: "Je n'ai jamais essayé de lécher mon coude.", level: 1 },
  { text: "Je n'ai jamais cru au Père Noël après 10 ans.", level: 1 },
  { text: "Je n'ai jamais eu de surnom ridicule.", level: 1 },
  { text: "Je n'ai jamais envoyé 'Bonne année' à mon ex.", level: 1 },
  { text: "Je n'ai jamais oublié de tirer la chasse d'eau chez des invités.", level: 1 },
  { text: "Je n'ai jamais eu de trou noir après une soirée.", level: 1 },
  { text: "Je n'ai jamais pris la voiture alors que je n'aurais pas dû.", level: 1 },
  { text: "Je n'ai jamais dragué un policier.", level: 1 },
  { text: "Je n'ai jamais été mis à la porte d'une boîte de nuit.", level: 1 },
  { text: "Je n'ai jamais eu de relation amoureuse virtuelle.", level: 1 },
  { text: "Je n'ai jamais fait semblant de connaitre une chanson en soirée.", level: 1 },
  { text: "Je n'ai jamais roté bruyamment en public.", level: 1 },
  { text: "Je n'ai jamais supprimé un post parce qu'il n'avait pas assez de likes.", level: 1 },
  { text: "Je n'ai jamais menti sur ma taille.", level: 1 },
  { text: "Je n'ai jamais porté de pyjama pour aller faire une course.", level: 1 },
  { text: "Je n'ai jamais pleuré en écoutant une chanson.", level: 1 },
  { text: "Je n'ai jamais eu le hoquet au pire moment.", level: 1 },
  { text: "Je n'ai jamais fait tomber mon plateau à la cantine.", level: 1 },

  // ==========================
  // LEVEL 2 : HOT & DRAGUE
  // ==========================
  { text: "Je n'ai jamais embrassé quelqu'un dans cette pièce.", level: 2 },
  { text: "Je n'ai jamais envoyé de nude.", level: 2 },
  { text: "Je n'ai jamais fouillé dans le téléphone de mon copain/copine.", level: 2 },
  { text: "Je n'ai jamais trompé mon partenaire.", level: 2 },
  { text: "Je n'ai jamais utilisé des menottes.", level: 2 },
  { text: "Je n'ai jamais fait l'amour dans un lieu public.", level: 2 },
  { text: "Je n'ai jamais couché le premier soir.", level: 2 },
  { text: "Je n'ai jamais eu de plan cul.", level: 2 },
  { text: "Je n'ai jamais utilisé Tinder.", level: 2 },
  { text: "Je n'ai jamais dormi nu(e).", level: 2 },
  { text: "Je n'ai jamais fait de sexting.", level: 2 },
  { text: "Je n'ai jamais eu de fantasme sur un collègue.", level: 2 },
  { text: "Je n'ai jamais embrassé plus de 2 personnes en 24h.", level: 2 },
  { text: "Je n'ai jamais eu de relation à distance.", level: 2 },
  { text: "Je n'ai jamais été surpris en train de le faire.", level: 2 },
  { text: "Je n'ai jamais fait de strip-tease.", level: 2 },
  { text: "Je n'ai jamais fait l'amour dans une voiture.", level: 2 },
  { text: "Je n'ai jamais fait l'amour dans la nature.", level: 2 },
  { text: "Je n'ai jamais douté de mon orientation sexuelle.", level: 2 },
  { text: "Je n'ai jamais embrassé quelqu'un du même sexe.", level: 2 },
  { text: "Je n'ai jamais regretté d'avoir couché avec quelqu'un.", level: 2 },
  { text: "Je n'ai jamais simulé un orgasme.", level: 2 },
  { text: "Je n'ai jamais eu de rencard Tinder catastrophique.", level: 2 },
  { text: "Je n'ai jamais couché avec un ex.", level: 2 },
  { text: "Je n'ai jamais fait l'amour dans une piscine/jacuzzi.", level: 2 },
  { text: "Je n'ai jamais eu de rêve érotique impliquant une personne ici.", level: 2 },
  { text: "Je n'ai jamais menti pour ne pas coucher avec quelqu'un.", level: 2 },
  { text: "Je n'ai jamais fait l'amour sur une machine à laver.", level: 2 },
  { text: "Je n'ai jamais été 'Friendzoné'.", level: 2 },
  { text: "Je n'ai jamais flashé quelqu'un.", level: 2 },
  { text: "Je n'ai jamais couché avec quelqu'un dont je ne connaissais pas le nom.", level: 2 },
  { text: "Je n'ai jamais embrassé quelqu'un juste pour rendre une autre personne jalouse.", level: 2 },
  { text: "Je n'ai jamais utilisé de la nourriture au lit.", level: 2 },
  { text: "Je n'ai jamais eu de 'Walk of shame' (rentrer le matin en tenue de soirée).", level: 2 },
  { text: "Je n'ai jamais fait l'amour dans la chambre de mes parents.", level: 2 },
  { text: "Je n'ai jamais eu de relation 'pansement'.", level: 2 },
  { text: "Je n'ai jamais rompu par SMS.", level: 2 },
  { text: "Je n'ai jamais été rompu par SMS.", level: 2 },
  { text: "Je n'ai jamais fait l'amour sur un canapé pendant une soirée.", level: 2 },
  { text: "Je n'ai jamais dragué quelqu'un en couple.", level: 2 },
  { text: "Je n'ai jamais couché avec un(e) étranger(ère) ne parlant pas ma langue.", level: 2 },
  { text: "Je n'ai jamais fait l'amour sur la plage.", level: 2 },
  { text: "Je n'ai jamais eu de 'Sex friend'.", level: 2 },
  { text: "Je n'ai jamais reçu de 'Dick pic' non sollicitée.", level: 2 },
  { text: "Je n'ai jamais envoyé de photo de mes parties intimes.", level: 2 },
  { text: "Je n'ai jamais embrassé le/la frère/sœur d'un ami.", level: 2 },
  { text: "Je n'ai jamais fantasmé sur un personnage de dessin animé.", level: 2 },
  { text: "Je n'ai jamais donné un faux numéro.", level: 2 },
  { text: "Je n'ai jamais fait l'amour dans une tente.", level: 2 },
  { text: "Je n'ai jamais eu de panne au lit.", level: 2 },
  { text: "Je n'ai jamais couché avec quelqu'un juste parce qu'il avait une voiture.", level: 2 },
  { text: "Je n'ai jamais eu de marque de suçon visible au travail/école.", level: 2 },
  { text: "Je n'ai jamais joué au 'Docteur' étant petit.", level: 2 },
  { text: "Je n'ai jamais fait l'amour dans une cabine d'essayage.", level: 2 },
  { text: "Je n'ai jamais retiré mon sous-vêtement en soirée.", level: 2 },
  { text: "Je n'ai jamais fait l'amour dans un ascenseur.", level: 2 },
  { text: "Je n'ai jamais flirté pour obtenir une boisson gratuite.", level: 2 },
  { text: "Je n'ai jamais eu de relation avec quelqu'un de plus de 10 ans mon aîné.", level: 2 },
  { text: "Je n'ai jamais embrassé plus de 5 personnes en une soirée.", level: 2 },
  { text: "Je n'ai jamais pleuré après l'amour.", level: 2 },
  { text: "Je n'ai jamais dit le mauvais prénom pendant l'acte.", level: 2 },
  { text: "Je n'ai jamais fait l'amour dans une salle de bain lors d'une fête.", level: 2 },
  { text: "Je n'ai jamais eu de relation secrète.", level: 2 },
  { text: "Je n'ai jamais envoyé de sexto à ma mère par erreur.", level: 2 },
  { text: "Je n'ai jamais fait l'amour au cinéma.", level: 2 },
  { text: "Je n'ai jamais fait de jeu de rôle au lit.", level: 2 },
  { text: "Je n'ai jamais utilisé un accessoire insolite (cravate, écharpe...) au lit.", level: 2 },
  { text: "Je n'ai jamais fait l'amour sur un bureau.", level: 2 },
  { text: "Je n'ai jamais ghosté quelqu'un après avoir couché avec.", level: 2 },

  // ==========================
  // LEVEL 3 : TRASH / TABOO / HARD
  // ==========================
  { text: "Je n'ai jamais fait de plan à 3.", level: 3 },
  { text: "Je n'ai jamais filmé mes ébats.", level: 3 },
  { text: "Je n'ai jamais eu d'expérience homosexuelle.", level: 3 },
  { text: "Je n'ai jamais couché avec le/la partenaire d'un ami.", level: 3 },
  { text: "Je n'ai jamais eu de MST.", level: 3 },
  { text: "Je n'ai jamais payé pour du sexe.", level: 3 },
  { text: "Je n'ai jamais avalé.", level: 3 },
  { text: "Je n'ai jamais utilisé un objet du quotidien pour me masturber.", level: 3 },
  { text: "Je n'ai jamais fait d'anal.", level: 3 },
  { text: "Je n'ai jamais surpris mes parents en train de baiser.", level: 3 },
  { text: "Je n'ai jamais couché avec un membre de ma famille (cousin...).", level: 3 },
  { text: "Je n'ai jamais eu un orgasme en public (sans contact).", level: 3 },
  { text: "Je n'ai jamais pratiqué le BDSM.", level: 3 },
  { text: "Je n'ai jamais envoyé un nude à ma famille par erreur.", level: 3 },
  { text: "Je n'ai jamais fait l'amour pendant les règles.", level: 3 },
  { text: "Je n'ai jamais fantasmé sur la mère/le père d'un ami.", level: 3 },
  { text: "Je n'ai jamais léché des pieds.", level: 3 },
  { text: "Je n'ai jamais participé à une orgie.", level: 3 },
  { text: "Je n'ai jamais couché avec quelqu'un de plus de 20 ans mon aîné.", level: 3 },
  { text: "Je n'ai jamais couché pour obtenir quelque chose (job, note...).", level: 3 },
  { text: "Je n'ai jamais eu de rapport non protégé avec un inconnu.", level: 3 },
  { text: "Je n'ai jamais fait caca sur moi étant adulte.", level: 3 },
  { text: "Je n'ai jamais goûté mes propres fluides corporels.", level: 3 },
  { text: "Je n'ai jamais fait l'amour dans un cimetière.", level: 3 },
  { text: "Je n'ai jamais eu de fantasme sur un animal (furry).", level: 3 },
  { text: "Je n'ai jamais utilisé les toilettes handicapés pour baiser.", level: 3 },
  { text: "Je n'ai jamais masturbé quelqu'un au cinéma.", level: 3 },
  { text: "Je n'ai jamais fait l'amour alors qu'il y avait quelqu'un d'autre dans la pièce (qui dormait).", level: 3 },
  { text: "Je n'ai jamais reniflé les sous-vêtements sales de quelqu'un.", level: 3 },
  { text: "Je n'ai jamais fait caca pendant l'acte (accident).", level: 3 },
  { text: "Je n'ai jamais couché avec deux membres de la même famille (frère/soeur).", level: 3 },
  { text: "Je n'ai jamais trompé quelqu'un avec son meilleur ami.", level: 3 },
  { text: "Je n'ai jamais envoyé de photo de mes fesses à un inconnu.", level: 3 },
  { text: "Je n'ai jamais volé de l'argent dans le portefeuille de mes parents/amis.", level: 3 },
  { text: "Je n'ai jamais eu envie de tuer quelqu'un (sérieusement).", level: 3 },
  { text: "Je n'ai jamais fait l'amour dans une église/lieu de culte.", level: 3 },
  { text: "Je n'ai jamais regardé du porno bizarre (hentai, fétichiste...).", level: 3 },
  { text: "Je n'ai jamais couché avec un voisin.", level: 3 },
  { text: "Je n'ai jamais fait l'amour dans les toilettes d'un avion/train.", level: 3 },
  { text: "Je n'ai jamais été surpris en train de me masturber.", level: 3 },
  { text: "Je n'ai jamais porté de couche.", level: 3 },
  { text: "Je n'ai jamais fait pipi sur mon partenaire (Golden shower).", level: 3 },
  { text: "Je n'ai jamais léché un anus (Anulingus).", level: 3 },
  { text: "Je n'ai jamais eu d'objet coincé en moi (Urgence médicale).", level: 3 },
  { text: "Je n'ai jamais fait l'amour sur le lieu de travail.", level: 3 },
  { text: "Je n'ai jamais couché avec le copain/copine de mon frère/ma sœur.", level: 3 },
  { text: "Je n'ai jamais été dans un club échangiste.", level: 3 },
  { text: "Je n'ai jamais fait de webcam coquine.", level: 3 },
  { text: "Je n'ai jamais vomi pendant l'acte.", level: 3 },
  { text: "Je n'ai jamais eu de relation avec un mineur (alors que j'étais majeur).", level: 3 },
  { text: "Je n'ai jamais utilisé de légume comme sextoy.", level: 3 },
  { text: "Je n'ai jamais fait l'amour dans une aire de jeux pour enfants la nuit.", level: 3 },
  { text: "Je n'ai jamais donné de nom à mes parties intimes.", level: 3 },
  { text: "Je n'ai jamais déchiré les vêtements de quelqu'un.", level: 3 },
  { text: "Je n'ai jamais fait l'amour dans un hôpital.", level: 3 },
  { text: "Je n'ai jamais couché avec mon boss.", level: 3 },
  { text: "Je n'ai jamais fantasmé sur la torture.", level: 3 },
  { text: "Je n'ai jamais fait l'amour avec des règles d'hygiène douteuses.", level: 3 },
  { text: "Je n'ai jamais eu de relation incestueuse.", level: 3 },
  { text: "Je n'ai jamais été excité par une situation dangereuse.", level: 3 },
  { text: "Je n'ai jamais fait semblant d'être vierge.", level: 3 },
  { text: "Je n'ai jamais couché avec quelqu'un juste par pitié.", level: 3 },
  { text: "Je n'ai jamais pris de drogue pour être performant au lit.", level: 3 },
  { text: "Je n'ai jamais regardé quelqu'un faire l'amour en cachette.", level: 3 }
];

let rooms = {};

// --- FILTRES ---
function filterData(data, maxLevel) {
  return data.filter(item => item.level <= maxLevel);
}

function getPicoloChallenge(players, filteredData) {
  if (filteredData.length === 0) return "Plus de cartes pour ce niveau !";
  let item = filteredData[Math.floor(Math.random() * filteredData.length)];
  let challenge = item.text;
  let shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
  
  if (shuffledPlayers.length > 0) challenge = challenge.replace(/{p1}/g, shuffledPlayers[0].name);
  if (shuffledPlayers.length > 1) challenge = challenge.replace(/{p2}/g, shuffledPlayers[1].name);
  if (shuffledPlayers.length > 2) challenge = challenge.replace(/{p3}/g, shuffledPlayers[2].name);
  
  if (shuffledPlayers.length > 0) {
      challenge = challenge.replace(/{p2}/g, shuffledPlayers[0].name);
      challenge = challenge.replace(/{p3}/g, shuffledPlayers[0].name);
  } else {
      challenge = challenge.replace(/{p1}/g, "Quelqu'un");
  }
  return challenge;
}

io.on('connection', (socket) => {
  console.log(`Socket: ${socket.id}`);

  // CREATE ROOM avec MODE
  socket.on('create_room', ({ gameType, username, mode }) => {
    const roomId = Math.random().toString(36).substring(2, 6).toUpperCase();
    rooms[roomId] = {
      gameType, 
      mode: mode || 1, 
      players: [], 
      hostId: socket.id, 
      status: 'waiting', 
      votes: {}
    };
    if (username && username.trim() !== "") {
      rooms[roomId].players.push({ id: socket.id, name: username, score: 0 });
    }
    socket.join(roomId);
    socket.emit('room_created', roomId);
    io.to(roomId).emit('player_joined', rooms[roomId].players);
  });

  socket.on('join_room', ({ roomId, username }) => {
    const id = roomId.toUpperCase(); 
    if (rooms[id]) {
      rooms[id].players.push({ id: socket.id, name: username, score: 0 });
      socket.join(id);
      io.to(id).emit('player_joined', rooms[id].players);
    } else {
      socket.emit('error_msg', 'Salle introuvable');
    }
  });

  socket.on('start_game', (roomId) => {
    const room = rooms[roomId];
    if (room) {
      room.status = 'playing';
      const mode = room.mode; 

      // UNDERCOVER : PAS DE NIVEAU, TOUTE LA LISTE
      if (room.gameType === 'undercover') {
        const players = room.players;
        // On prend directement dans undercoverData sans filtrer
        const words = undercoverData[Math.floor(Math.random() * undercoverData.length)];

        let nbUndercover = 1;
        let nbMrWhite = 0;
        if (players.length >= 5) nbMrWhite = 1;
        if (players.length >= 7) nbUndercover = 2;
        
        let roles = [];
        for (let i = 0; i < nbUndercover; i++) roles.push('undercover');
        for (let i = 0; i < nbMrWhite; i++) roles.push('mrwhite');
        while (roles.length < players.length) roles.push('civil');
        roles.sort(() => Math.random() - 0.5);

        players.forEach((p, i) => {
           let w = words.civil;
           if(roles[i] === 'undercover') w = words.under;
           else if(roles[i] === 'mrwhite') w = "???";
           p.role = roles[i];
           io.to(p.id).emit('game_started', { gameType: 'undercover', role: roles[i], secretWord: w, isPlayer: true });
        });
        if(!players.find(p => p.id === room.hostId)) {
           io.to(room.hostId).emit('game_started', { gameType: 'undercover', isPlayer: false });
        }
      }

      else if (room.gameType === 'picolo') {
        const filteredPicolo = filterData(picoloData, mode);
        const challenge = getPicoloChallenge(room.players, filteredPicolo);
        io.to(roomId).emit('game_started', { gameType: 'picolo', challenge: challenge });
      }

      else if (room.gameType === 'never') {
        const filteredNever = filterData(neverData, mode);
        const item = filteredNever[Math.floor(Math.random() * filteredNever.length)];
        io.to(roomId).emit('game_started', { gameType: 'never', phrase: item ? item.text : "Fin du jeu !" });
      }
    }
  });

  socket.on('next_turn', (roomId) => {
    const room = rooms[roomId];
    if(room) {
        const mode = room.mode;
        if(room.gameType === 'picolo') {
            const filtered = filterData(picoloData, mode);
            const challenge = getPicoloChallenge(room.players, filtered);
            io.to(roomId).emit('new_card', { text: challenge });
        }
        else if(room.gameType === 'never') {
            const filtered = filterData(neverData, mode);
            const item = filtered[Math.floor(Math.random() * filtered.length)];
            io.to(roomId).emit('new_card', { text: item ? item.text : "Fin !" });
        }
    }
  });

  socket.on('start_voting', (id) => { 
    if(rooms[id]) { rooms[id].votes={}; io.to(id).emit('voting_started'); }
  });

  socket.on('submit_vote', ({roomId, targetId}) => {
      const room = rooms[roomId];
      if(room) {
        room.votes[socket.id] = targetId;
        if(Object.keys(room.votes).length >= room.players.length) {
           const voteCounts = {};
           let maxVotes = 0; let eliminatedId = null;
           Object.values(room.votes).forEach(t => {
             voteCounts[t] = (voteCounts[t] || 0) + 1;
             if(voteCounts[t] > maxVotes) { maxVotes = voteCounts[t]; eliminatedId = t; }
           });
           const p = room.players.find(x => x.id === eliminatedId);
           io.to(roomId).emit('voting_ended', { eliminatedName: p ? p.name : 'Égalité', role: p ? p.role : '?' });
        }
      }
  });
});

app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));
server.listen(process.env.PORT || 3001, () => console.log('✅ SERVER OK'));
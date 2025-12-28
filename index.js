const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Servir les fichiers du build React
app.use(express.static(path.join(__dirname, 'build')));

const server = http.createServer(app);
const io = new Server(server);

// --- BANQUE DE MOTS MASSIVE (200+ Paires) ---
const undercoverWords = [
  // --- APÉRO & ALCOOL ---
  { civil: 'Bière', under: 'Cidre' },
  { civil: 'Vin Rouge', under: 'Vin Blanc' },
  { civil: 'Vodka', under: 'Gin' },
  { civil: 'Whisky', under: 'Rhum' },
  { civil: 'Mojito', under: 'Caïpirinha' },
  { civil: 'Champagne', under: 'Prosecco' },
  { civil: 'Tequila', under: 'Mezcal' },
  { civil: 'Ricard', under: 'Pastis' },
  { civil: 'Shot', under: 'Gorgée' },
  { civil: 'Bar', under: 'Boîte de nuit' },
  { civil: 'Ivresse', under: 'Gueule de bois' },

  // --- NOURRITURE (MIAM) ---
  { civil: 'McDonalds', under: 'Burger King' },
  { civil: 'Ketchup', under: 'Mayonnaise' },
  { civil: 'Pizza', under: 'Pâtes' },
  { civil: 'Nutella', under: 'Confiture' },
  { civil: 'Pain au chocolat', under: 'Croissant' },
  { civil: 'Sushi', under: 'Maki' },
  { civil: 'Tacos', under: 'Kebab' },
  { civil: 'Raclette', under: 'Fondue' },
  { civil: 'Crêpe', under: 'Gaufre' },
  { civil: 'Frite', under: 'Chips' },
  { civil: 'Poulet', under: 'Dinde' },
  { civil: 'Bœuf', under: 'Porc' },
  { civil: 'Thon', under: 'Saumon' },
  { civil: 'Chocolat au lait', under: 'Chocolat blanc' },
  { civil: 'Baguette', under: 'Pain de mie' },
  { civil: 'Beurre', under: 'Margarine' },
  { civil: 'Spaghetti', under: 'Tagliatelle' },
  { civil: 'Cookie', under: 'Brownie' },
  { civil: 'Glace', under: 'Sorbet' },
  { civil: 'Yaourt', under: 'Fromage blanc' },
  { civil: 'Olive verte', under: 'Olive noire' },
  { civil: 'Oignon', under: 'Échalote' },

  // --- OBJET DU QUOTIDIEN ---
  { civil: 'Fourchette', under: 'Cuillère' },
  { civil: 'Stylo', under: 'Crayon' },
  { civil: 'Chaise', under: 'Tabouret' },
  { civil: 'Lunettes', under: 'Lentilles' },
  { civil: 'Montre', under: 'Bracelet' },
  { civil: 'Oreiller', under: 'Coussin' },
  { civil: 'Couette', under: 'Couverture' },
  { civil: 'Shampoing', under: 'Gel douche' },
  { civil: 'Brosse à dents', under: 'Dentifrice' },
  { civil: 'Parapluie', under: 'Imperméable' },
  { civil: 'Sac à dos', under: 'Valise' },
  { civil: 'Lampe', under: 'Bougie' },
  { civil: 'Tapis', under: 'Moquette' },
  { civil: 'Miroir', under: 'Vitre' },
  { civil: 'Clé', under: 'Badge' },
  { civil: 'Portefeuille', under: 'Porte-monnaie' },

  // --- TECH & GEEK ---
  { civil: 'iPhone', under: 'Samsung' },
  { civil: 'Mac', under: 'PC' },
  { civil: 'Facebook', under: 'Instagram' },
  { civil: 'Twitter', under: 'LinkedIn' },
  { civil: 'Snapchat', under: 'TikTok' },
  { civil: 'Netflix', under: 'YouTube' },
  { civil: 'Amazon', under: 'AliExpress' },
  { civil: 'Google', under: 'Bing' },
  { civil: 'PlayStation', under: 'Xbox' },
  { civil: 'Clavier', under: 'Souris' },
  { civil: 'Wifi', under: '4G' },
  { civil: 'Email', under: 'SMS' },
  { civil: 'Emoji', under: 'Sticker' },
  { civil: 'Tinder', under: 'Bumble' },
  { civil: 'Uber', under: 'Taxi' },

  // --- POP CULTURE ---
  { civil: 'Harry Potter', under: 'Seigneur des Anneaux' },
  { civil: 'Batman', under: 'Superman' },
  { civil: 'Star Wars', under: 'Star Trek' },
  { civil: 'Pokemon', under: 'Digimon' },
  { civil: 'Mario', under: 'Luigi' },
  { civil: 'Naruto', under: 'Dragon Ball' },
  { civil: 'Avengers', under: 'Justice League' },
  { civil: 'Simpsons', under: 'South Park' },
  { civil: 'Game of Thrones', under: 'Vikings' },
  { civil: 'Spider-Man', under: 'Iron Man' },
  { civil: 'Joker', under: 'Harley Quinn' },
  { civil: 'Vampire', under: 'Loup-garou' },
  { civil: 'Zombie', under: 'Fantôme' },

  // --- SPORT ---
  { civil: 'Football', under: 'Rugby' },
  { civil: 'Tennis', under: 'Ping-pong' },
  { civil: 'Basket', under: 'Handball' },
  { civil: 'Ski', under: 'Snowboard' },
  { civil: 'Natation', under: 'Plongée' },
  { civil: 'Vélo', under: 'Moto' },
  { civil: 'Yoga', under: 'Pilates' },
  { civil: 'Courir', under: 'Marcher' },
  { civil: 'Messi', under: 'Ronaldo' },
  { civil: 'Zidane', under: 'Mbappé' },
  { civil: 'Nadal', under: 'Federer' },
  { civil: 'PSG', under: 'OM' },

  // --- ANIMAUX ---
  { civil: 'Chien', under: 'Loup' },
  { civil: 'Chat', under: 'Tigre' },
  { civil: 'Cheval', under: 'Ane' },
  { civil: 'Aigle', under: 'Faucon' },
  { civil: 'Requin', under: 'Dauphin' },
  { civil: 'Abeille', under: 'Guêpe' },
  { civil: 'Mouche', under: 'Moustique' },
  { civil: 'Serpent', under: 'Lézard' },
  { civil: 'Poule', under: 'Canard' },
  { civil: 'Vache', under: 'Taureau' },
  { civil: 'Lion', under: 'Panthère' },
  { civil: 'Gorille', under: 'Singe' },
  { civil: 'Papillon', under: 'Libellule' },

  // --- LIEUX ---
  { civil: 'Paris', under: 'Londres' },
  { civil: 'Marseille', under: 'Lyon' },
  { civil: 'Espagne', under: 'Italie' },
  { civil: 'Plage', under: 'Piscine' },
  { civil: 'Cinéma', under: 'Théâtre' },
  { civil: 'Prison', under: 'Hôpital' },
  { civil: 'École', under: 'Collège' },
  { civil: 'Montagne', under: 'Campagne' },
  { civil: 'Cuisine', under: 'Salon' },
  { civil: 'Chambre', under: 'Hôtel' },
  { civil: 'Musée', under: 'Galerie' },
  { civil: 'Supermarché', under: 'Marché' },
  { civil: 'Ascenseur', under: 'Escalier' },

  // --- CORPS HUMAIN ---
  { civil: 'Main', under: 'Pied' },
  { civil: 'Oeil', under: 'Oreille' },
  { civil: 'Nez', under: 'Bouche' },
  { civil: 'Cheveux', under: 'Poils' },
  { civil: 'Dent', under: 'Langue' },
  { civil: 'Cœur', under: 'Cerveau' },
  { civil: 'Bras', under: 'Jambe' },
  { civil: 'Doigt', under: 'Orteil' },

  // --- CONCEPTS / ABSTRAIT ---
  { civil: 'Amour', under: 'Amitié' },
  { civil: 'Rêve', under: 'Cauchemar' },
  { civil: 'Mariage', under: 'Divorce' },
  { civil: 'Paradis', under: 'Enfer' },
  { civil: 'Guerre', under: 'Paix' },
  { civil: 'Vérité', under: 'Mensonge' },
  { civil: 'Chaud', under: 'Froid' },
  { civil: 'Riche', under: 'Pauvre' },
  { civil: 'Joie', under: 'Tristesse' },
  { civil: 'Hier', under: 'Demain' },
  { civil: 'Jour', under: 'Nuit' }
];

let rooms = {};

io.on('connection', (socket) => {
  console.log(`Socket connecté : ${socket.id}`);

  // 1. CRÉATION SALLE
  socket.on('create_room', ({ gameType, username }) => {
    const roomId = Math.random().toString(36).substring(2, 6).toUpperCase();
    rooms[roomId] = {
      gameType,
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
    console.log(`Salle ${roomId} (${gameType}) créée.`);
  });

  // 2. REJOINDRE
  socket.on('join_room', ({ roomId, username }) => {
    const id = roomId.toUpperCase(); 
    if (rooms[id] && rooms[id].status === 'waiting') {
      rooms[id].players.push({ id: socket.id, name: username, score: 0 });
      socket.join(id);
      io.to(id).emit('player_joined', rooms[id].players);
    } else {
      socket.emit('error_msg', 'Salle introuvable.');
    }
  });

  // 3. LANCER LA PARTIE
  socket.on('start_game', (roomId) => {
    const room = rooms[roomId];
    if (room) {
      room.status = 'playing';

      if (room.gameType === 'undercover') {
        const players = room.players;
        const count = players.length;
        
        // --- CHOIX DU MOT ---
        const words = undercoverWords[Math.floor(Math.random() * undercoverWords.length)];

        // --- CALCUL DES RÔLES (EQUILIBRAGE) ---
        let nbUndercover = 1;
        let nbMrWhite = 0;

        if (count >= 5) { nbMrWhite = 1; }           // A partir de 5 joueurs
        if (count >= 7) { nbUndercover = 2; }        // A partir de 7 joueurs
        if (count >= 10) { nbMrWhite = 2; nbUndercover = 3; } // Gros groupes

        let roles = [];
        for (let i = 0; i < nbUndercover; i++) roles.push('undercover');
        for (let i = 0; i < nbMrWhite; i++) roles.push('mrwhite');
        
        while (roles.length < count) {
          roles.push('civil');
        }

        // Mélange aléatoire
        for (let i = roles.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [roles[i], roles[j]] = [roles[j], roles[i]];
        }

        // --- DISTRIBUTION ---
        players.forEach((player, index) => {
          const role = roles[index];
          player.role = role; // Sauvegarde

          let secretWord = "";
          if (role === 'civil') secretWord = words.civil;
          else if (role === 'undercover') secretWord = words.under;
          else if (role === 'mrwhite') secretWord = "???";

          io.to(player.id).emit('game_started', {
            gameType: 'undercover',
            role: role,
            secretWord: secretWord,
            isPlayer: true
          });
        });

        if (!players.find(p => p.id === room.hostId)) {
             io.to(room.hostId).emit('game_started', { gameType: 'undercover', isPlayer: false });
        }
      }
    }
  });

  // 4. VOTE
  socket.on('start_voting', (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].votes = {};
      io.to(roomId).emit('voting_started');
    }
  });

  // 5. SOUMETTRE VOTE
  socket.on('submit_vote', ({ roomId, targetId }) => {
    const room = rooms[roomId];
    if (room) {
      room.votes[socket.id] = targetId;

      const votersCount = Object.keys(room.votes).length;
      const totalPlayers = room.players.length;

      if (votersCount >= totalPlayers) {
        // COMPTAGE
        const voteCounts = {};
        let maxVotes = 0;
        let eliminatedId = null;

        Object.values(room.votes).forEach(target => {
          voteCounts[target] = (voteCounts[target] || 0) + 1;
          if (voteCounts[target] > maxVotes) {
            maxVotes = voteCounts[target];
            eliminatedId = target;
          }
        });

        const eliminatedPlayer = room.players.find(p => p.id === eliminatedId);

        io.to(roomId).emit('voting_ended', { 
          eliminatedName: eliminatedPlayer ? eliminatedPlayer.name : "Personne",
          role: eliminatedPlayer ? eliminatedPlayer.role : "Inconnu"
        });
      }
    }
  });

  socket.on('disconnect', () => { console.log('Déconnexion'); });
});

// ROUTE WILDCARD
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ SERVEUR PRET SUR LE PORT ${PORT}`);
});
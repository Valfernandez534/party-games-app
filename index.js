// CHEMIN : party-games/server/index.js

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

const server = http.createServer(app);

// --- MODIFIÉ : On retire les configurations CORS compliquées car tout est au même endroit ---
const io = new Server(server);

// --- BASE DE DONNÉES DES MOTS ---
const undercoverWords = [
  { civil: 'Guitare', under: 'Violon' },
  { civil: 'Bière', under: 'Cidre' },
  { civil: 'Facebook', under: 'Twitter' },
  { civil: 'McDonalds', under: 'Burger King' },
  { civil: 'Harry Potter', under: 'Luke Skywalker' },
  { civil: 'Chat', under: 'Lion' },
  { civil: 'Plage', under: 'Piscine' },
  { civil: 'Paris', under: 'Marseille' },
  { civil: 'Vin', under: 'Champagne' },
  { civil: 'Thé', under: 'Café' }
];

let rooms = {};

io.on('connection', (socket) => {
  console.log(`Socket connecté : ${socket.id}`);

  // 1. CRÉATION DE LA SALLE
  socket.on('create_room', ({ gameType, username }) => {
    const roomId = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    rooms[roomId] = {
      gameType,
      players: [],
      hostId: socket.id,
      status: 'waiting',
      votes: {}
    };

    // Si l'hôte met un pseudo, il joue. Sinon il est juste écran TV.
    if (username && username.trim() !== "") {
      rooms[roomId].players.push({
        id: socket.id,
        name: username,
        score: 0
      });
    }

    socket.join(roomId);
    socket.emit('room_created', roomId);
    io.to(roomId).emit('player_joined', rooms[roomId].players);
    console.log(`Salle ${roomId} créée par ${username || "Ecran TV"}`);
  });

  // 2. REJOINDRE UNE SALLE
  socket.on('join_room', ({ roomId, username }) => {
    const id = roomId.toUpperCase(); 
    if (rooms[id] && rooms[id].status === 'waiting') {
      rooms[id].players.push({ id: socket.id, name: username, score: 0 });
      socket.join(id);
      io.to(id).emit('player_joined', rooms[id].players);
    } else {
      socket.emit('error_msg', 'Erreur : Salle introuvable ou partie commencée.');
    }
  });

  // 3. LANCER LA PARTIE
  socket.on('start_game', (roomId) => {
    const room = rooms[roomId];
    if (room) {
      room.status = 'playing';

      if (room.gameType === 'undercover') {
        const players = room.players;
        const playerCount = players.length;
        
        // Choix des mots
        const words = undercoverWords[Math.floor(Math.random() * undercoverWords.length)];

        // Distribution des rôles
        let roles = Array(playerCount).fill('civil');
        if (playerCount > 0) roles[0] = 'undercover';
        if (playerCount > 4) roles[1] = 'mrwhite';
        
        // Mélange
        roles = roles.sort(() => Math.random() - 0.5);

        // Envoi individuel
        players.forEach((player, index) => {
          const role = roles[index];
          
          // IMPORTANT : On sauvegarde le rôle dans l'objet player du serveur
          player.role = role;

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

        // Si l'hôte est juste un écran (pas dans la liste des joueurs)
        if (!players.find(p => p.id === room.hostId)) {
             io.to(room.hostId).emit('game_started', { gameType: 'undercover', isPlayer: false });
        }
      }
    }
  });

  // 4. DÉMARRER LE VOTE
  socket.on('start_voting', (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].votes = {}; // Reset des votes
      io.to(roomId).emit('voting_started');
    }
  });

  // 5. RECEVOIR UN VOTE
  socket.on('submit_vote', ({ roomId, targetId }) => {
    const room = rooms[roomId];
    if (room) {
      // Enregistre le vote
      room.votes[socket.id] = targetId;

      const votersCount = Object.keys(room.votes).length;
      const totalPlayers = room.players.length;

      // Si tout le monde a voté
      if (votersCount >= totalPlayers) {
        const voteCounts = {};
        let maxVotes = 0;
        let eliminatedId = null;

        // Comptage
        Object.values(room.votes).forEach(target => {
          voteCounts[target] = (voteCounts[target] || 0) + 1;
          if (voteCounts[target] > maxVotes) {
            maxVotes = voteCounts[target];
            eliminatedId = target;
          }
        });

        // Récupération des infos du perdant
        const eliminatedPlayer = room.players.find(p => p.id === eliminatedId);

        io.to(roomId).emit('voting_ended', { 
          eliminatedName: eliminatedPlayer ? eliminatedPlayer.name : "Personne",
          role: eliminatedPlayer ? eliminatedPlayer.role : "Inconnu"
        });
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('Déconnexion');
  });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// IMPORTANT : Render nous donne un port dynamique, il faut utiliser process.env.PORT
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ SERVEUR EN LIGNE SUR LE PORT ${PORT}`);
});
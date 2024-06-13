# Utiliser l'image officielle de Node.js
FROM node:16

# Créer un répertoire de travail
WORKDIR /usr/src/app

# Copier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Compiler les fichiers TypeScript
RUN npx tsc server.ts --outDir .

# Exposer le port utilisé par le serveur WebSocket
EXPOSE 8080

# Commande pour lancer le serveur
CMD ["node", "server.js"]

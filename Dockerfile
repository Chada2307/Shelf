# Dockerfile

# Używamy oficjalnego obrazu Node.js (wersja 20 w lekkiej dystrybucji Alpine)
FROM node:20-alpine

# Ustaw katalog roboczy wewnątrz kontenera na /app
WORKDIR /app

# Kopiuj pliki manifestu zależności (package.json i package-lock.json)
# Robimy to osobno, aby Docker mógł je cachować i nie instalować ich za każdym razem,
# gdy zmieniasz kod źródłowy.
COPY package*.json ./

# Instaluj zależności Node.js
# Używamy --omit=dev, aby przyspieszyć instalację, ale do środowiska dev (dla Prismy)
# potrzebujemy devDependencies. Zmieńmy na pełną instalację:
RUN npm install
# Lub dla szybszego budowania: RUN npm install --frozen-lockfile

# Kopiuj resztę kodu źródłowego do kontenera
COPY . .

# Wystawiamy port, na którym działa Express (używamy portu 3000)
EXPOSE 3000

# To polecenie będzie domyślnie uruchamiane przy starcie kontenera (możemy je nadpisać w docker-compose)
CMD [ "npm", "start" ]
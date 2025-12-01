# Usa a imagem mais recente do Node.js LTS como base
FROM node:lts-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos do projeto para o contêiner
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos para o contêiner
COPY . .

# Expõe a porta padrão do Vite (5173)
EXPOSE 3000

# Comando para rodar o Vite no modo desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]

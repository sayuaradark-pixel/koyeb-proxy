# සැහැල්ලු Node.js image එකක් පාවිච්චි කරමු
FROM node:20-slim

# Working directory එක හදනවා
WORKDIR /app

# Package files කොපි කරලා dependencies install කරනවා
COPY package*.json ./
RUN npm install --production

# කෝඩ් එක කොපි කරනවා
COPY . .

# Koyeb default port එක
ENV PORT=8080
EXPOSE 8080

# සර්වර් එක ස්ටාර්ට් කරනවා
CMD ["node", "index.js"]

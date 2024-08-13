# Използване на официалния Node.js образ като базов образ
FROM node:18-alpine

# Създаване и задаване на работна директория
WORKDIR /app

# Копиране на package.json и package-lock.json
COPY package*.json ./

# Инсталиране на зависимостите
RUN npm install

# Копиране на останалата част от приложението
COPY . .

# Компилиране на приложението
RUN npm run build

# Указване на порта, който приложението ще слуша
EXPOSE 3000

# Старт на приложението
CMD ["npm", "run", "start"]
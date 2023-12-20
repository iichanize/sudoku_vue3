FROM node:latest
WORKDIR /app

RUN git clone -b main https://github.com/iichanize/sudoku_vue3.git
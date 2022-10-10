FROM node:16.16-alpine
WORKDIR /code
COPY ./package.json /code
RUN corepack enable
RUN yarn install
EXPOSE 3000
COPY ./dist /code
#CMD ["yarn","run","dev"]
CMD ["yarn", "run", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]

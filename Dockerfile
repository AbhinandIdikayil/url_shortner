FROM node:alpine as builder

WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i

COPY . .

RUN npm run build
CMD [ "npm","start" ]

# FROM node:alpine as runner

# WORKDIR /server

# COPY --from=builder /build/node_modules .
# COPY --from=builder /build/package.json .
# COPY --from=builder /build/package-lock.json .
# COPY --from=builder /build/build .

# CMD [ "npm","start" ]

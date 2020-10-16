# Builder image
FROM node:10.12.0-jessie AS builder

# Copy source code
WORKDIR /package
COPY . /package

# Install dependencies
RUN npm install

# Final image
FROM node:10.12.0-jessie AS final

WORKDIR /app
COPY --from=builder /package .

EXPOSE 8080
# Execute

CMD ["npm", "start"]
FROM node:22-slim

# Install curl and dos2unix
RUN apt-get update && apt-get install -y curl dos2unix procps && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /compile_page.sh
RUN dos2unix /compile_page.sh && chmod +x /compile_page.sh

# Install Next.js app and shadcn components
WORKDIR /home/user/nextjs-app

RUN npx --yes create-next-app@16.3.1 . --yes
RUN npx --yes shadcn@4.18.0 init -y -d -f
RUN npx --yes shadcn@4.18.0 add --all --yes

# Move everything (including dotfiles) to /home/user and clean up
RUN cp -a /home/user/nextjs-app/. /home/user/ && rm -rf /home/user/nextjs-app

# Pre-compile the application to warm up the E2B sandbox cache
WORKDIR /home/user
RUN /compile_page.sh

# Start the dev server when the sandbox boots up
CMD ["npm", "run", "dev"]

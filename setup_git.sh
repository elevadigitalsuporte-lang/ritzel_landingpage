#!/usr/bin/env bash
# ------------------------------------------------------------
# Script de configuração do Git para o projeto Ritzel Landing Page
# ------------------------------------------------------------
# 1. Inicializa o repositório Git
# 2. Cria o primeiro commit
# 3. Configura o branch principal como 'main'
# 4. Adiciona o remote do GitHub (substitua <SEU_USUARIO> pelo seu nome de usuário)
# 5. Envia o commit para o GitHub (é necessário um Personal Access Token - PAT)

set -e

# Inicializa o repositório (se ainda não existir)
if [ ! -d ".git" ]; then
  git init
fi

git add .

git commit -m "Initial commit: landing page"

# Define o branch principal
git branch -M main

# Configura o remote (substitua <SEU_USUARIO>)
REMOTE_URL="https://github.com/<SEU_USUARIO>/ritzel_landingpage.git"
git remote remove origin || true
git remote add origin "$REMOTE_URL"

# Envia para o GitHub (você precisará de um PAT com permissão 'repo')
# Exemplo de uso com token armazenado em variável de ambiente GITHUB_TOKEN:
#   export GITHUB_TOKEN=seu_token_aqui
#   git push https://$GITHUB_TOKEN@github.com/<SEU_USUARIO>/ritzel_landingpage.git main

echo "-------------------------------------------------------------------"
echo "⚠️  PASSO FINAL:"
echo "1. Crie um repositório vazio no GitHub (nome: ritzel_landingpage)."
echo "2. Substitua <SEU_USUARIO> no script acima pelo seu usuário do GitHub."
echo "3. Defina a variável de ambiente GITHUB_TOKEN com seu Personal Access Token."
echo "4. Execute o script: ./setup_git.sh"

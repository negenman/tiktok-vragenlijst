#!/bin/bash

# TikTok Vragenlijst - GitHub Pages Deployment Script
# Dit script maakt automatisch een GitHub repository en publiceert het formulier

set -e

echo "🚀 TikTok Vragenlijst - GitHub Pages Deployment"
echo "================================================"
echo ""

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is niet geïnstalleerd."
    echo ""
    echo "Installeer het via:"
    echo "  macOS:   brew install gh"
    echo "  Windows: winget install GitHub.cli"
    echo "  Linux:   zie https://github.com/cli/cli#installation"
    echo ""
    exit 1
fi

# Check if logged in
if ! gh auth status &> /dev/null; then
    echo "📝 Log in met je GitHub account..."
    gh auth login
fi

echo ""
echo "✅ GitHub CLI is klaar!"
echo ""

# Get repository name
read -p "📦 Repository naam (bijv: tiktok-vragenlijst): " REPO_NAME
REPO_NAME=${REPO_NAME:-tiktok-vragenlijst}

echo ""
echo "🔨 Bezig met:"
echo "  1. Git repository initialiseren"
echo "  2. Repository aanmaken op GitHub"
echo "  3. Code uploaden"
echo "  4. GitHub Pages activeren"
echo ""

# Initialize git if needed
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "Initial commit: TikTok vragenlijst formulier"
fi

# Create repository and push
echo "📤 Repository aanmaken en uploaden..."
gh repo create "$REPO_NAME" --public --source=. --push || {
    echo "⚠️  Repository bestaat mogelijk al. Probeer te pushen..."
    git branch -M main
    git remote add origin "https://github.com/$(gh api user -q .login)/$REPO_NAME.git" 2>/dev/null || true
    git push -u origin main
}

# Get username
USERNAME=$(gh api user -q .login)

echo ""
echo "⏳ GitHub Pages activeren (dit kan 1-2 minuten duren)..."

# Wait a bit for repo to be ready
sleep 3

# Enable GitHub Pages via API
gh api "repos/$USERNAME/$REPO_NAME/pages" -X POST -f source='{"branch":"main","path":"/"}' 2>/dev/null || {
    echo "ℹ️  Pages worden geactiveerd via GitHub Actions..."
}

echo ""
echo "✅ Klaar!"
echo ""
echo "📍 Je formulier wordt gepubliceerd op:"
echo "   https://$USERNAME.github.io/$REPO_NAME/"
echo ""
echo "⏰ Het kan 1-2 minuten duren voordat de site live is."
echo ""
echo "🔗 Repository: https://github.com/$USERNAME/$REPO_NAME"
echo ""

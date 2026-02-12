# TikTok Vragenlijst voor Redacties

Dit is een online formulier voor het verzamelen van informatie over het TikTok-gebruik van redacties.

## Publiceren op GitHub Pages

### Methode 1: Via GitHub CLI (snelst)

```bash
# Installeer GitHub CLI indien nodig
# Op macOS: brew install gh
# Op Windows: winget install GitHub.cli

# Log in
gh auth login

# Maak repository en push
cd tiktok-vragenlijst-github
git init
git add .
git commit -m "Initial commit: TikTok vragenlijst"
gh repo create tiktok-vragenlijst --public --source=. --push

# Activeer GitHub Pages
gh api repos/:owner/tiktok-vragenlijst/pages -X POST -f source='{"branch":"main","path":"/"}'
```

### Methode 2: Via GitHub Website

1. **Maak een ZIP van deze folder**
2. **Ga naar github.com en maak nieuwe repository:**
   - Naam: `tiktok-vragenlijst`
   - Public
   - Voeg GEEN README toe
3. **Upload alle bestanden uit deze folder**
4. **GitHub Actions activeren:**
   - Ga naar **Actions** tab
   - Klik op **"Set up a workflow yourself"**
   - Vervang de inhoud met onderstaand bestand (zie `.github/workflows/deploy.yml`)
   - Commit
5. **Na 1 minuut is je site live op:**
   ```
   https://[jouw-gebruikersnaam].github.io/tiktok-vragenlijst/
   ```

## Link delen

Zodra gepubliceerd, deel deze link met collega's die het formulier moeten invullen.

Ingevulde formulieren worden als e-mail verstuurd naar het opgegeven adres.

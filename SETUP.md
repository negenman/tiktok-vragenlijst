# 🚀 TikTok Vragenlijst - Setup Instructies

## Overzicht

Dit systeem bestaat uit 3 delen:
1. **HTML Formulier** (`index.html`) - Hosten op GitHub Pages
2. **Google Spreadsheet** - Voor data opslag
3. **Google Apps Script** - Backend die formulier met spreadsheet verbindt

---

## Stap 1: Google Spreadsheet aanmaken

1. **Ga naar** [https://sheets.google.com](https://sheets.google.com)

2. **Maak een nieuwe spreadsheet:**
   - Klik op **"Blank"** (leeg bestand)
   - Naam het: **"TikTok Vragenlijst Responses"**

3. **Laat het blad leeg** - Het script maakt automatisch de headers aan

---

## Stap 2: Google Apps Script installeren

1. **Open de spreadsheet** die je zojuist hebt gemaakt

2. **Ga naar Extensions > Apps Script**
   - Menu bovenaan: `Extensions` → `Apps Script`
   - Er opent een nieuw tabblad met de Apps Script editor

3. **Plak de code:**
   - Open het bestand `google-script.js` uit deze folder
   - **Kopieer de hele inhoud**
   - **Plak** in de Apps Script editor (vervang de standaard `function myFunction(){}`)

4. **Sla op:**
   - Klik op het **💾 icoon** of druk **Ctrl+S** (Cmd+S op Mac)
   - Geef het project een naam: `TikTok Vragenlijst API`

5. **Deploy als Web App:**
   - Klik rechtsboven op **"Deploy"** → **"New deployment"**
   - Bij "Select type": klik op ⚙️ → kies **"Web app"**

   **Belangrijke instellingen:**
   - **Description:** `TikTok Vragenlijst`
   - **Execute as:** `Me (jouw-email@gmail.com)`
   - **Who has access:** `Anyone` ⚠️ **Belangrijk!**

   - Klik **"Deploy"**

6. **Autorisatie vereist:**
   - Klik **"Authorize access"**
   - Kies je Google account
   - Klik **"Advanced"** (linksonder)
   - Klik **"Go to TikTok Vragenlijst API (unsafe)"**
   - Klik **"Allow"**

7. **Kopieer de Web App URL:**
   - Je krijgt nu een **"Web app URL"**
   - Ziet eruit als: `https://script.google.com/macros/s/ABCD.../exec`
   - **Kopieer deze URL!** ✨ Je hebt hem zo nodig

---

## Stap 3: Formulier configureren

1. **Open `index.html`** in een tekst editor (VSCode, Notepad++, etc.)

2. **Zoek deze regel** (rond regel 408):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'VERVANG_MET_JOUW_GOOGLE_SCRIPT_URL';
   ```

3. **Vervang met jouw Web App URL:**
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABCD.../exec';
   ```

4. **Sla op!**

---

## Stap 4: Publiceren op GitHub Pages

### Optie A: Via DEPLOY.sh script (aanbevolen)

```bash
cd tiktok-vragenlijst-github
./DEPLOY.sh
```

Het script doet automatisch:
- ✅ Git repository initialiseren
- ✅ GitHub repository aanmaken
- ✅ Code uploaden
- ✅ GitHub Pages activeren

### Optie B: Handmatig via GitHub.com

1. **Ga naar** [https://github.com/new](https://github.com/new)

2. **Maak repository:**
   - Repository name: `tiktok-vragenlijst`
   - Public
   - **GEEN** README toevoegen
   - Klik **"Create repository"**

3. **Upload bestanden:**
   - Klik **"uploading an existing file"**
   - Sleep ALLE bestanden uit `tiktok-vragenlijst-github` folder
   - **Inclusief** de `.github` folder!
   - Commit message: "Initial commit"
   - Klik **"Commit changes"**

4. **GitHub Pages activeren:**
   - Wacht 30 seconden na upload
   - Ga naar **"Actions"** tab
   - Je ziet **"Deploy to GitHub Pages"** workflow
   - Wacht tot deze **groen** is (✓)
   - Klaar!

---

## Stap 5: Delen

Je formulier is nu live op:
```
https://[jouw-username].github.io/tiktok-vragenlijst/
```

**Bijvoorbeeld:**
- `https://joostnegenman.github.io/tiktok-vragenlijst/`

Deel deze link met iedereen die het formulier moet invullen!

---

## 📊 Antwoorden bekijken

Alle ingevulde formulieren verschijnen automatisch in je Google Spreadsheet:

1. **Open je spreadsheet:** [https://sheets.google.com](https://sheets.google.com)
2. Klik op **"TikTok Vragenlijst Responses"**
3. Alle antwoorden staan hier met timestamp!

**Tips:**
- Elke rij = 1 ingevuld formulier
- Kolom A = Timestamp (wanneer ingevuld)
- Filter/sorteer op datum, omroep, etc.
- Export naar Excel: `File` → `Download` → `Microsoft Excel`

---

## ❓ Problemen oplossen

### "Google Script URL is nog niet geconfigureerd"
➡️ Je hebt stap 3 nog niet gedaan - vervang de URL in `index.html`

### Formulier verstuurt maar data komt niet aan
1. Open de **Google Spreadsheet**
2. Refresh de pagina (F5)
3. Staat de data er nog niet? Check:
   - Is de Web App URL correct in `index.html`?
   - Bij "Who has access" moet **"Anyone"** staan
   - Probeer de Apps Script opnieuw te deployen

### "Actions" tab werkt niet op GitHub
1. Ga naar **Settings** > **Actions** > **General**
2. Zet "Workflow permissions" op **"Read and write permissions"**
3. Klik **"Save"**
4. Ga terug naar **Actions** → **"Re-run all jobs"**

### Formulier is incompleet
➡️ De huidige `index.html` bevat alleen secties 1 (voorbeeld)
➡️ Alle 15 secties moeten nog worden toegevoegd aan het HTML bestand
➡️ Kopieer de vraag-structuur van sectie 1 en herhaal voor sectie 2-15

---

## 🔧 Updates maken

### Formulier updaten:
1. Pas `index.html` aan lokaal
2. Upload naar GitHub (replace file)
3. Wacht 1-2 minuten → automatisch live!

### Google Script updaten:
1. Ga naar Apps Script editor
2. Pas code aan
3. Klik **"Deploy"** → **"Manage deployments"**
4. Klik ⚙️ naast deployment → **"Edit"**
5. Klik **"Version: New version"**
6. Klik **"Deploy"**

---

## 💡 Extra functies

### Data exporteren naar Excel
```
Spreadsheet → File → Download → Microsoft Excel (.xlsx)
```

### Automatische e-mail notificaties
Voeg toe aan `google-script.js` na regel met `sheet.appendRow(rowData)`:

```javascript
// Stuur e-mail notificatie
MailApp.sendEmail({
  to: "jouw-email@npo.nl",
  subject: "Nieuwe TikTok vragenlijst ingevuld",
  body: "Omroep: " + data.omroep + "\nIngevuld door: " + data.ingevuldDoor
});
```

### Backup maken
1. Open spreadsheet
2. **File** → **Make a copy**
3. Sla op met datum: "TikTok Responses Backup 2026-02-12"

---

## ✅ Checklist

- [ ] Google Spreadsheet aangemaakt
- [ ] Google Apps Script geïnstalleerd en gedeployd
- [ ] Web App URL gekopieerd
- [ ] URL in `index.html` geplakt
- [ ] Formulier gepubliceerd op GitHub Pages
- [ ] Link getest (formulier werkt)
- [ ] Test-inzending gedaan (data komt aan in spreadsheet)
- [ ] Link gedeeld met redacties

**Veel success!** 🎉

Bij vragen, check de Google Apps Script logs:
- Open Apps Script editor
- Klik **"Executions"** (links in menu)
- Zie hier alle formulier-inzendingen en eventuele errors

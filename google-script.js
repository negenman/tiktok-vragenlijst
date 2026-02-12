/**
 * TikTok Vragenlijst - Google Apps Script Backend
 *
 * INSTALLATIE INSTRUCTIES:
 * 1. Open je Google Spreadsheet
 * 2. Klik op Extensions > Apps Script
 * 3. Plak deze hele code
 * 4. Klik op Deploy > New deployment
 * 5. Type: Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Deploy en kopieer de URL
 * 9. Plak die URL in index.html bij GOOGLE_SCRIPT_URL
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse incoming data
    const data = JSON.parse(e.postData.contents);

    // Check if header row exists, if not create it
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Omroep/Programma Redactie',
        'Namen',
        'TikTok Account',
        'Ingevuld Door',
        'Account Type',
        'Doelgroep',
        'Doelgroep Specifiek',
        'Content Type',
        'Content Type Anders',
        'Functionaliteiten',
        'Functionaliteiten Anders',
        'Wie mag reageren',
        'Wie mag duetten maken',
        'Wie mag stitches maken',
        'Wie mag downloaden',
        'Reacties standaard aan',
        'Wie mag taggen',
        'Geoblocking',
        'Hashtagbeleid',
        'Branded hashtag',
        'Trending hashtags',
        'Locatietags',
        'Andere accounts taggen',
        'Gevoelige hashtags',
        'Adverteren',
        'Posts promoten',
        'Samenwerking creators',
        'Gelinkte kanalen',
        'Gelinkte kanalen anders',
        'Auto-delen',
        'Auto-delen anders',
        'Delen naar TikTok',
        'Website link',
        'DMs mogelijk',
        'Wie mag DMs sturen',
        'DMs beantwoorden',
        'Communicatiebeleid',
        'DM afhandeling',
        'DM afhandeling anders',
        'DM bewaartermijn',
        'Reactie afhandeling',
        'Reactie afhandeling anders',
        'Reacties beantwoorden',
        'Negatieve reacties verwijderen',
        'Verwijderbeleid',
        'Type verwijderde reacties',
        'Type verwijderde reacties anders',
        'Gebruikers blokkeren',
        'Blokkerbeleid',
        'Aantal personen toegang',
        'Toegangsmethode',
        'Toegangsmethode anders',
        'Verschillende rechten',
        'Accountbeheer',
        'Accountbeheer anders',
        'Device types',
        'Eigendom devices',
        'Aantal devices',
        'App of browser',
        'Externe tools',
        'Externe tools specificatie',
        'Netwerken',
        'Logging systeem',
        'Logging methode',
        'Logging methode anders',
        'Post herleidbaar',
        'Reactie/DM herleidbaar',
        'Statistieken bekijken',
        'Gevolgde metrics',
        'Analytics waar',
        'Two-factor authenticatie',
        'Wachtwoordbeheer',
        'Wachtwoordbeheer anders',
        'Sterk wachtwoord',
        'Wachtwoord wijzigen',
        'Wachtwoord wijzigen maanden',
        'Intrekken toegang',
        'In verwerkingsregister',
        'In privacyverklaring',
        'Aanvullende opmerkingen'
      ];
      sheet.appendRow(headers);

      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4A5FBF');
      headerRange.setFontColor('#FFFFFF');
    }

    // Prepare row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.omroep || '',
      data.namen || '',
      data.tiktokAccount || '',
      data.ingevuldDoor || '',
      data.accountType || '',
      data.targetAudience || '',
      data.targetAudienceSpecific || '',
      data.contentType || '',
      data.contentTypeOther || '',
      data.features || '',
      data.featuresOther || '',
      data.whoCanComment || '',
      data.whoCanDuet || '',
      data.whoCanStitch || '',
      data.whoCanDownload || '',
      data.commentsDefault || '',
      data.whoCanTag || '',
      data.geoblocking || '',
      data.hashtagPolicy || '',
      data.brandedHashtag || '',
      data.trendingHashtags || '',
      data.locationTags || '',
      data.tagOtherAccounts || '',
      data.sensitiveHashtags || '',
      data.advertising || '',
      data.promotePosts || '',
      data.workWithCreators || '',
      data.linkedChannels || '',
      data.linkedChannelsOther || '',
      data.autoShare || '',
      data.autoShareOther || '',
      data.shareToTikTok || '',
      data.websiteLink || '',
      data.dmEnabled || '',
      data.whoCanDM || '',
      data.dmAnswered || '',
      data.commPolicy || '',
      data.dmHandling || '',
      data.dmHandlingOther || '',
      data.dmRetention || '',
      data.commentHandling || '',
      data.commentHandlingOther || '',
      data.commentsAnswered || '',
      data.negativeDeleted || '',
      data.deletionPolicy || '',
      data.deletedComments || '',
      data.deletedCommentsOther || '',
      data.usersBlocked || '',
      data.blockPolicy || '',
      data.accessPeople || '',
      data.accessMethod || '',
      data.accessMethodOther || '',
      data.differentRights || '',
      data.accountManagement || '',
      data.accountManagementOther || '',
      data.deviceType || '',
      data.deviceOwnership || '',
      data.deviceCount || '',
      data.appOrBrowser || '',
      data.externalTools || '',
      data.externalToolsSpecify || '',
      data.networks || '',
      data.loggingSystem || '',
      data.loggingMethod || '',
      data.loggingMethodOther || '',
      data.traceablePost || '',
      data.traceableReply || '',
      data.viewAnalytics || '',
      data.metrics || '',
      data.analyticsWhere || '',
      data.twoFactorAuth || '',
      data.passwordManagement || '',
      data.passwordManagementOther || '',
      data.strongPassword || '',
      data.passwordChange || '',
      data.passwordChangeMonths || '',
      data.revokeAccess || '',
      data.processingRegister || '',
      data.privacyStatement || '',
      data.additionalComments || ''
    ];

    // Append the data
    sheet.appendRow(rowData);

    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);

    // Return success
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'row': sheet.getLastRow()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'error': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function
function doGet(e) {
  return ContentService.createTextOutput('TikTok Vragenlijst API is actief! Gebruik POST om data te versturen.');
}

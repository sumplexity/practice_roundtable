/**
 * The Practice Roundtable — RSVP capture endpoint.
 *
 * Deploy as: Apps Script web app
 *   - Execute as: Me (your account)
 *   - Who has access: Anyone
 *
 * The deployment URL goes into index.html as ENDPOINT_URL.
 *
 * Sheet expectation: a sheet named "Signups" with a header row:
 *   timestamp | name | email | practice | source
 */

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Signups');
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'sheet_not_found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const params = (e && e.parameter) || {};
  sheet.appendRow([
    new Date(),
    params.name || '',
    params.email || '',
    params.practice || '',
    params.source || 'unknown'
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional sanity check — visit the web app URL in a browser.
function doGet() {
  return ContentService
    .createTextOutput('Practice Roundtable RSVP endpoint is live.')
    .setMimeType(ContentService.MimeType.TEXT);
}

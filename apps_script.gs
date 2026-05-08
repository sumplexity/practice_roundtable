/**
 * The Practice Roundtable — RSVP capture endpoint.
 *
 * Deploy as: Apps Script web app
 *   - Execute as: Me (your account)
 *   - Who has access: Anyone
 *
 * The deployment URL goes into index.html as ENDPOINT_URL.
 *
 * Sheet expectation: a sheet named "Signups".
 * If the header row is blank, this script will add one automatically.
 */

const HEADERS = [
  'timestamp_server',
  'name',
  'email',
  'practice',
  'source',
  'page_url',
  'page_path',
  'page_host',
  'referrer',
  'submitted_at_client',
  'user_agent',
  'language',
  'languages',
  'platform',
  'vendor',
  'timezone',
  'timezone_offset_minutes',
  'screen_width',
  'screen_height',
  'viewport_width',
  'viewport_height',
  'color_depth',
  'pixel_ratio',
  'touch_points',
  'cookie_enabled',
  'do_not_track',
  'online',
  'device_memory_gb',
  'hardware_concurrency'
];

function ensureHeaderRow(sheet) {
  const lastRow = sheet.getLastRow();
  const existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const firstFive = existing.slice(0, 5).join('|');
  const isBlank = existing.every(function(cell) {
    return cell === '';
  });
  const isLegacy = firstFive === 'timestamp|name|email|practice|source';

  if (lastRow === 0 || isBlank || isLegacy) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function getParam(params, key) {
  return params[key] || '';
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Signups');
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'sheet_not_found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const params = (e && e.parameter) || {};
  ensureHeaderRow(sheet);

  sheet.appendRow([
    new Date(),
    getParam(params, 'name'),
    getParam(params, 'email'),
    getParam(params, 'practice'),
    getParam(params, 'source') || 'unknown',
    getParam(params, 'page_url'),
    getParam(params, 'page_path'),
    getParam(params, 'page_host'),
    getParam(params, 'referrer'),
    getParam(params, 'submitted_at_client'),
    getParam(params, 'user_agent'),
    getParam(params, 'language'),
    getParam(params, 'languages'),
    getParam(params, 'platform'),
    getParam(params, 'vendor'),
    getParam(params, 'timezone'),
    getParam(params, 'timezone_offset_minutes'),
    getParam(params, 'screen_width'),
    getParam(params, 'screen_height'),
    getParam(params, 'viewport_width'),
    getParam(params, 'viewport_height'),
    getParam(params, 'color_depth'),
    getParam(params, 'pixel_ratio'),
    getParam(params, 'touch_points'),
    getParam(params, 'cookie_enabled'),
    getParam(params, 'do_not_track'),
    getParam(params, 'online'),
    getParam(params, 'device_memory_gb'),
    getParam(params, 'hardware_concurrency')
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

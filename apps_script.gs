/**
 * The Practice Roundtable — RSVP capture + visit tracking.
 *
 * Deploy as: Apps Script web app
 *   - Execute as: Me (your account)
 *   - Who has access: Anyone
 *
 * After any code changes, you must create a NEW deployment
 * (not update existing) for changes to take effect.
 */

var SIGNUP_HEADERS = [
  'timestamp', 'name', 'email', 'practice', 'source',
  'page_url', 'page_path', 'page_host', 'referrer', 'submitted_at_client',
  'user_agent', 'language', 'languages', 'platform', 'vendor',
  'timezone', 'timezone_offset_minutes',
  'screen_width', 'screen_height', 'viewport_width', 'viewport_height',
  'color_depth', 'pixel_ratio', 'touch_points',
  'cookie_enabled', 'do_not_track', 'online',
  'device_memory_gb', 'hardware_concurrency',
  'session_id', 'is_qr',
  'geo_city', 'geo_region', 'geo_country', 'geo_postal', 'geo_org',
  'geo_latitude', 'geo_longitude',
  'visibility_state', 'device_type', 'connection_type'
];

var VISIT_HEADERS = [
  'timestamp', 'session_id', 'source', 'is_qr',
  'page_url', 'referrer',
  'city', 'region', 'country', 'postal', 'org', 'latitude', 'longitude',
  'standalone', 'connection_type', 'return_visitor', 'visibility_state', 'device_type',
  'user_agent', 'language', 'platform', 'timezone',
  'screen_width', 'screen_height', 'viewport_width', 'viewport_height'
];

function doGet(e) {
  var action = e.parameter.action || '';
  if (action === 'ping') {
    return handlePing(e);
  }
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'Practice Roundtable RSVP endpoint is live.' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var params = e.parameter || {};

    ensureHeaders(sheet, SIGNUP_HEADERS);

    sheet.appendRow([
      new Date(),
      params.name || '',
      params.email || '',
      params.practice || '',
      params.source || 'page',
      params.page_url || '',
      params.page_path || '',
      params.page_host || '',
      params.referrer || '',
      params.submitted_at_client || '',
      params.user_agent || '',
      params.language || '',
      params.languages || '',
      params.platform || '',
      params.vendor || '',
      params.timezone || '',
      params.timezone_offset_minutes || '',
      params.screen_width || '',
      params.screen_height || '',
      params.viewport_width || '',
      params.viewport_height || '',
      params.color_depth || '',
      params.pixel_ratio || '',
      params.touch_points || '',
      params.cookie_enabled || '',
      params.do_not_track || '',
      params.online || '',
      params.device_memory_gb || '',
      params.hardware_concurrency || '',
      params.session_id || '',
      params.is_qr || '',
      params.geo_city || '',
      params.geo_region || '',
      params.geo_country || '',
      params.geo_postal || '',
      params.geo_org || '',
      params.geo_latitude || '',
      params.geo_longitude || '',
      params.visibility_state || '',
      params.device_type || '',
      params.connection_type || ''
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    var debugSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    debugSheet.appendRow(['ERROR', new Date(), err.toString(), e.postData ? e.postData.contents : 'no postData']);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function handlePing(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Visits');
    if (!sheet) {
      sheet = ss.insertSheet('Visits');
    }
    ensureHeaders(sheet, VISIT_HEADERS);

    var p = e.parameter;
    sheet.appendRow([
      new Date(),
      p.session_id || '',
      p.source || '',
      p.is_qr || '',
      p.page_url || '',
      p.referrer || '',
      p.city || '',
      p.region || '',
      p.country || '',
      p.postal || '',
      p.org || '',
      p.latitude || '',
      p.longitude || '',
      p.standalone || '',
      p.connection_type || '',
      p.return_visitor || '',
      p.visibility_state || '',
      p.device_type || '',
      p.user_agent || '',
      p.language || '',
      p.platform || '',
      p.timezone || '',
      p.screen_width || '',
      p.screen_height || '',
      p.viewport_width || '',
      p.viewport_height || ''
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok' })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    var existing = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (existing.length < headers.length) {
      var add = [];
      for (var i = existing.length; i < headers.length; i++) {
        add.push(headers[i]);
      }
      sheet.getRange(1, existing.length + 1, 1, add.length).setValues([add]);
    }
  }
}

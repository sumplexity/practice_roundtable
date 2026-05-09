/**
 * The Practice Roundtable — RSVP capture endpoint.
 *
 * Deploy as: Apps Script web app
 *   - Execute as: Me (your account)
 *   - Who has access: Anyone
 *
 * After any code changes, you must create a NEW deployment
 * (not update existing) for changes to take effect.
 *
 * The deployment URL goes into index.html as ENDPOINT_URL.
 */

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'Practice Roundtable RSVP endpoint is live.' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var params = e.parameter || {};

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'timestamp',
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
      ]);
    }

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
      params.hardware_concurrency || ''
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

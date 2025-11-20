/**
 * Google Apps Script for Rent Capital Waitlist Form
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code
 * 4. Paste this entire file
 * 5. Replace the sheet names in SHEET_MAP below with your actual tab names
 * 6. Click "Deploy" > "New deployment"
 * 7. Select type: "Web app"
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone" (or "Anyone with Google account" if you prefer)
 * 10. Click "Deploy"
 * 11. Copy the Web app URL and use it in your form
 */

const SHEET_MAP = {
  landlord: "Landlord Waitlist",        // rename to your landlord tab
  "property-manager": "PM Waitlist",    // rename to your property manager tab
};
const DEFAULT_SHEET = "Landlord Waitlist"; // fallback tab name

function doPost(e) {
  try {
    // Parse the incoming data - handle both JSON and form data
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Fallback to form parameters if JSON parsing fails
      data = e.parameter;
    } else {
      throw new Error('No data received');
    }
    
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheetName = SHEET_MAP[data.source] || DEFAULT_SHEET;
    const sheet = spreadsheet.getSheetByName(sheetName);
    
    // If sheet doesn't exist, create it
    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found. Please update SHEET_MAP in the script.`);
    }
    
    // Prepare the row data matching your column order: name, email, number, units, monthlyIncome
    const rowData = [
      data.name || '',
      data.email || '',
      data.number || '',
      data.units || '',
      data.monthlyIncome || '',
      data.source || '',
      new Date() // Timestamp
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
  } catch (error) {
    // Return error response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

// Handle OPTIONS request for CORS preflight
function doOptions() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doGet() {
  return ContentService.createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Test function (optional - you can run this to test the script)
function test() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    number: '555-1234',
    units: '5',
    monthlyIncome: '15000'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}


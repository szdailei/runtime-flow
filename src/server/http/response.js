import http from 'http';

/**
@require res.headersSent is false
*/
function sendResponse(res, code, msg, length) {
  if (msg) {
    res.writeHead(code, { 'Content-Length': length });
    res.end(msg);
  } else {
    res.writeHead(code);
    res.end();
  }
}

function notFound(res) {
  if (res.headersSent) {
    res.end();
    return;
  }
  res.setHeader('Content-Type', 'text/plain');
  sendResponse(res, 404, http.STATUS_CODES[404], http.STATUS_CODES[404].length);
}

function forbidden(res) {
  if (res.headersSent) {
    res.end();
    return;
  }
  res.setHeader('Content-Type', 'text/plain');
  sendResponse(res, 403, http.STATUS_CODES[403], http.STATUS_CODES[403].length);
}

export { sendResponse, notFound, forbidden };

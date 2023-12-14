/*
(c) Copyright 2020 Akamai Technologies, Inc. Licensed under Apache 2 license.

Version: 0.9
Purpose:  EdgeWorker that generates a simple html page at the Edge and adds a response header

*/

// Import logging module
import { logger } from 'log';
import {Cookies, SetCookie} from 'cookies';

export function onClientRequest (request) {
  // Outputs a message to the X-Akamai-EdgeWorker-onClientRequest-Log header.
  logger.log('Responding with hello world from the path: %s', request.path);
  let beginHtmlText = "<html><body>"
  let htmlTitle = "<h1>Hello World From Akamai EdgeWorkers: Version 0.</h1><br>"
  let cookieText = "<br>" + request.getHeader("Cookie") + "<br>"
  let htmlBody = htmlTitle+cookieText
  let endHtmlText ="</body></html>"
  let allHtml = beginHtmlText+htmlBody+endHtmlText
  request.respondWith(200, 
    {}, 
    allHtml);
}

export function onClientResponse (request, response) {
  // Outputs a message to the X-Akamai-EdgeWorker-onClientResponse-Log header.
  logger.log('Adding a header in ClientResponse');

  response.setHeader('X-Hello-World', 'From Akamai EdgeWorkers');
  response.setHeader('X-Path',request.url);

  var cookie = new SetCookie();
  cookie.name = 'akamaiCookie';
  cookie.value = 'Value1';
 response.setHeader('Set-Cookie', cookie.toHeader());
}

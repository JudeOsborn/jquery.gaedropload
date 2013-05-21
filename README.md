JQuery GAE Dropload
===================

A jQuery plugin that enables HTML5 drag and drop functionality and file uploads to a GAE (AppEngine) blobstore. Consists of two ajax calls: The first gets a blobstore URL and the second sends a file to the blobstore via a FormData() object.

Usage
-----

Apply to a droppable HTML element like this:

	$('.draggable-element').gaeDropload();

The above declaration with no parameters assumes a URL called "generate_upload_url", which should be a GAE URL that returns a blobstore URL.

Options
-------

 * generate_url: A GAE URL that returns a blobstore URL.
 * extraFormData: Extra data to be sent along with the file data. Can be a function.
 * The following events can receive a callback: dragstart, dragover, dragenter, dragleave, 
 	beforeDrop, afterDrop, dropSuccess

Copyright (c) 2013 Jude Osborn

Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)

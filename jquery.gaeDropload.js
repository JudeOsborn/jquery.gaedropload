/*
* JQuery GAE Dropload
*
* A jQuery plugin that enables HTML5 drag and drop functionality and file 
* uploads to a GAE (AppEngine) blobstore. 

* Consists of two ajax calls: The first gets a blobstore URL and the second 
* sends a file to the blobstore via a FormData() object.
*
* Usage:
* Apply to an droppable HTML element like this:
*	$('.draggable-element').gaeDropload();
*
* Options:
*
* Copyright (c) 2013 Jude Osborn
*
* Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
*/

(function($) {
	$.fn.gaeDropload = function(options) {
		var settings = {
			generate_url: '/generate_upload_url',
			extraFormData: null,
			dragstart: empty,
			dragover: empty,
			dragenter: empty,
			dragleave: empty,
			beforeDrop: empty,
			afterDrop: empty,
			dropSuccess: empty
		};

		if (options) {
			jQuery.extend(settings, options);
		}

		var $document = $(document);

		// Stop the docment's default drag events.
		$document.on('dragstart', function(e) {
			e.preventDefault();
			e.stopPropagation();
		});

		$document.on('dragover', function(e) {
			e.preventDefault();
			e.stopPropagation();
		});

		$document.on('dragenter', function(e) {
			e.preventDefault();
			e.stopPropagation();
		});

		$document.on('dragleave', function(e) {
			e.preventDefault();
			e.stopPropagation();
		});

		$document.on('drop', function(e) {
			e.preventDefault();
			e.stopPropagation();
		});

		return this.each(function () {
			$this = $(this);

			// Stop the element's default drag events.
			$this.on('dragstart', function(e) {
				e.preventDefault();
				e.stopPropagation();
				dragstart();
			});

			$this.on('dragover', function(e) {
				e.preventDefault();
				e.stopPropagation();
				settings.dragover();
			});

			$this.on('dragenter', function(e) {
				e.preventDefault();
				e.stopPropagation();
				settings.dragenter();
			});

			$this.on('dragleave', function(e) {
				e.preventDefault();
				e.stopPropagation();
				settings.dragleave();
			});

			$this.on('drop', function(e) {
				settings.beforeDrop();

				// Get a blobstore upload URL.
				$.ajax({
					url: settings.generate_url,
					async: false,
					success: function(url) {
						var files = e.originalEvent.dataTransfer.files;

						var fd = new FormData();
						for (var i = 0; i < files.length; i++) {
							fd.append('file' + i, files[i]);
						}

						// Extra data can be represented by a callback.
						if (typeof(settings.extraFormData) === 'function') {
							settings.extraFormData = settings.extraFormData();
						}

						$.each(settings.extraFormData, function(key, value) {
							fd.append(key, value);
						});

						$.ajax({
							processData: false,
							contentType: false,
							type: 'post',
							url: url,
							data: fd,
							async: true,
							success: function() {
								settings.dropSuccess();
							}
						});
					}
				});

				settings.afterDrop();
			});
		});
	};

	function empty() {}
}(jQuery));
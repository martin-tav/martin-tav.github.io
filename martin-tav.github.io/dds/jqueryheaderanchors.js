/*
	Automatic Anchor Links from Headers- By Jon Muller
	Author Site: http://ergonomictrends.com/
*/

jQuery(function($){
	var targetels= ['h1', 'h2', 'h3', '.customheader']
	var outputdivid = 'tocbox' // id of empty element to house TOC links
	var headerlength = 70 // max length of each header link
	var trailingmark = '...' // trailing text to add to each of header link if necessary
	var animated = true // animate scrolling?
	var uloutput = '<ul class="tableofcontents">\n' // UL and classname to use for the generated TOC container

	var $output = $('#' + outputdivid)
	var $headers = $(targetels.join(', '))
	var anchortxtarray = []

	if ($output.length == 0 || $headers.length == 0)
		return

	$headers.each(function(i){
		var $header = $(this)
		var headertext = $header.text()

		var defaultheaderlength = headertext.length
		headertext = headertext.substr(0, headerlength)
		var anchortext = headertext.replace(/ /g, "_") // replace space with _ to generate anchor link text
		anchortext = anchortext.replace(/\W/g, "") // Remove weird characters for jQuery selector sake
		if (jQuery.inArray(anchortext, anchortxtarray) != -1){ // check if this anchor link already exists (happens if two headers have the same exact text)
			anchortext += '_' + (i+1) // if so, append a number to this anchor text to make it unique
		}
		anchortxtarray.push(anchortext)
		$header.prepend('<span id="' + anchortext + '"/>')
		//uloutput += '<li><a href="#' + anchortext + '">' + headertext + (headertext.length < defaultheaderlength? trailingmark : '') + '</a></li>'
		uloutput += '<li class=li'+$header.prop("tagName")+'><a href="#' + anchortext + '">' + headertext + (headertext.length < defaultheaderlength? trailingmark : '') + '</a></li>'
	})
	uloutput += '</ul>'
	$output.html( uloutput )

	if (animated === true){
		$output.bind('click', function(e){
			var $target = $(e.target)
			if ($target.is('a') && $target.attr('href').indexOf('#') != -1){
				var $header = $($target.attr('href'))
				$('html,body').animate({scrollTop: $header.offset().top}, 'normal', function(){
					location.hash = $target.attr('href')
				})
				return false
			}
		})
	}
})
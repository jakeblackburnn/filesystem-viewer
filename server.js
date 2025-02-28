// 
// Created by J. Blackburn - Dec 19 2024
//



const http = require( 'http' );
const path = require( 'path' );
const fs   = require( 'fs'   );


	// path to index.html

const TopologyViewPath = path.join(__dirname, 'topology.html')
const FileViewPath     = path.join(__dirname, 'file.html')

const cssPath          = path.join(__dirname, 'styles.css')
const scriptPath       = path.join(__dirname, 'script.js')

const rootPath   = process.argv[2]

const server = http.createServer( (req, res) => {

	
		// serve index
	if (req.url === '/') {
		
		fs.readFile(TopologyViewPath, (err, data) => {

			if (err) {

			  res.writeHead(404, { 'Content-Type': 'text/plain' } );
			  res.end('could not find index.html');

			} else {

		  	  res.writeHead(200, { 'Content-Type': 'text/html' });
			  res.end(data);

			}
		});
	
		// serve filesystem topology
		// TODO: recursively get all text files, skip directories
	} else if (req.url === '/fs') {

		console.log('filemap requested, establishing connection... completing the transfer...')

		fs.readdir(rootPath, (err, content) => {

				// handle errors
			if (err) {
				console.error( 'something went wrong reading directory' );
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('error reading directory');
				return;
			}

				// remove hidden files from directory contents
			const files = content.filter( (file) => file.charAt(0) != '.' )

				// TODO: handle directories

				// send list of files as json
			res.writeHead(200, { 'Content-Type': 'application/json' })
			res.end( JSON.stringify(files) );
		})

	} else if ( req.url.match(/^\/fs\/(.+)$/) ) {

		const match = req.url.match(/^\/fs\/(.+)$/) // if file matches /fs/<filename>, serve content from filesystem

		fileName = match[1]
		filePath = path.join(rootPath, fileName)

			// try to read the file contents
		
		fs.readFile(filePath, 'utf8', (err, fileData) => {

			if (err) {
				res.writeHead(404, { 'Content-Type': 'text/plain' });
				res.end('404 - file not found');
			} else {

					// try to get the file view html

				fs.readFile(FileViewPath, (err, templateData) => {

					if (err) {
						res.writeHead(500, { 'Content-Type': 'text/plain' });
						res.end('500 - error loading file view template');
					} else {
						
							// insert file contents to file view html

						const startTag = '<div class="file">';
						const endTag = '</div>';

						const startIndex = templateData.indexOf(startTag);
						const endIndex = templateData.indexOf(endTag, startIndex);

						const outputHtml = 
							templateData.slice(0, startIndex + startTag.length) +
							`<pre>${fileData}</pre>` +
							templateData.slice(endIndex);

						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.end(outputHtml);
					}
				});
			}
});
		
	} else {

		var filename = req.url                          // served file is url by default
		var filepath = path.join(__dirname, filename);  // path is server directory by default


			// determine content type
		const extension = path.extname( filename ) // file extension

			// map extension to content type
		const mime_types = {                         
			'.html': 'text/html',
			'.js':   'application/javascript',
			'.css':  'text/css',
			'.txt':  'text/plain',
			'':      'text/plain', 
		};


		var content_type = mime_types[ extension ]; 
		content_type = content_type === undefined ? 'text/plain' : content_type;



		
			// serve the file
		fs.readFile(filepath, (err, data) => {

			if (err) {

			  res.writeHead(404, { 'Content-Type': 'text/plain' } );
			  res.end('404 - file not found');

			} else {

			  res.writeHead(200, { 'Content-Type': content_type });
			  res.end(data);

			}
		});



	}

}); // end http server



server.listen(  3000,  () => console.log( 'Server listening @ localhost:3000' )  );

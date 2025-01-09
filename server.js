// 
// Created by J. Blackburn - Dec 19 2024
//



const http = require( 'http' );
const path = require( 'path' );
const fs   = require( 'fs'   );



const server = http.createServer( (req, res) => {

		// serve list of files 
	
	if (req.url === '/file-map') {

		fs.readdir(__dirname, (err, content) => {

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
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end( JSON.stringify(files) );
		})

		// serve files
		
	} else {

			// if file requested, get the file name
			// else serve index.html
		const file_name = req.url === '/' ?   'index.html'  :  req.url;

		const extension = path.extname( file_name ); // file extension

			// map extension to content type
		const mime_types = {                         
			'.html': 'text/html',
			'.js':   'application/javascript',
			'.txt':  'text/plain',
			'':      'text/plain', 
		};

		var content_type = mime_types[ extension ]; 
		
			// if content type is undefined, default to plain text
		content_type = content_type === undefined ? 'text/plain' : content_type;



			// serve the file

		const file_path = path.join(__dirname, file_name);
			
		fs.readFile(file_path, (err, data) => {

			if (err) {

			  res.writeHead(404, { 'Content-Type': 'text/plain' } );
			  res.end('404 - file not found');

			} else {

			  res.writeHead(200, { 'Content-Type': content_type });
			  res.end(data);

			}
		});
	} 
});



server.listen(  3000,  () => console.log( 'Server listening @ localhost:3000' )  );

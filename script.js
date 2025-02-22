//
// Created by J. Blackburn - Dec 19 2024
//

function loadFileMap() {

	const fileMapElement = document.getElementById('file-map');

	fetch('/fs')
		.then(response => response.json()) // convert to json
		.then(files => {
			fileMapElement.innerHTML = ''; // clear map contents
			files.forEach(file => {

					// create list item for each file
				const li = document.createElement('li');
				li.textContent = file

				const filepath = 'fs/' + file

				li.addEventListener('click', () => loadFileContentIntoElement(filepath, 'content'));
				fileMapElement.appendChild(li);

                    });

		});
}

function loadFileContentIntoElement(filepath, elementId) {

	console.log('requesting filepath: ' + filepath);

	fetch(filepath).then(response => {

	    if (!response.ok) {     // check that file is served correctly

	      throw new Error('Network response was not ok');
	    }


	    return response.text(); // Convert the response to text

	  }).then(data => {         // then load the text into element

	    document.getElementById(elementId).textContent = data;

	  })

	  .catch(error => {         // or load error message instead

	    console.error('Error fetching the file:', error);
	    document.getElementById(elementId).textContent = 'Error loading file content';

	  });
}



loadFileMap();

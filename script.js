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

				const a = document.createElement('a');
				a.textContent = file;

				const filepath = 'fs/' + file
				a.href = filepath;

				const li = document.createElement('li');
				li.appendChild(a);

				fileMapElement.appendChild(li);
                    });

		});
}

loadFileMap();

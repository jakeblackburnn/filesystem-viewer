//
// Created by J. Blackburn - Dec 19 2024
//

function renderFilesystemTree(tree, parentPath="") {
	const ul = document.createElement('ul');

	tree.forEach( item => {
		const li = document.createElement('li');
		const fullPath = parentPath ? `${parentPath}/${item.name}` : item.name;

		if ( item.type === 'dir' ) {

			const span = document.createElement('span');
			span.textContent = item.name;

			li.appendChild(span);
			if ( item.children && item.children.length > 0 ) {
				li.appendChild( renderFilesystemTree( item.children, fullPath) );
			}

		} else if ( item.type === 'file' ) {

			const a = document.createElement('a');
			a.href = 'fs/' + fullPath;
			a.textContent = item.name;
			
			li.appendChild(a);

		}
		ul.appendChild(li);

	}); // end for each

	return ul;
}

function loadFileMap() {

	const fileMapElement = document.getElementById('file-map');

	fetch('/fs')
		.then(response => response.json()) // convert to json
		.then(fsTree => {
			fileMapElement.innerHTML = ''; // clear map contents
			fileMapElement.appendChild( renderFilesystemTree(fsTree) );
		});
}

loadFileMap();

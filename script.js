//
// Created by J. Blackburn - Dec 19 2024
//

fetch('/file.txt').then(response => {

    if (!response.ok) {     // check that file is served correctly

      throw new Error('Network response was not ok');

    }


    return response.text(); // Convert the response to text

  }).then(data => {         // then load the text into element

    document.getElementById('root').textContent = data;

  })

  .catch(error => {         // or load error message instead

    console.error('Error fetching the file:', error);
    document.getElementById('root').textContent = 'Error loading file content';

  });

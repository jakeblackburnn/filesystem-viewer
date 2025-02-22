### FILESYSTEM VIEW DESIGN NOTES


## components

1. Topology - map of provided root

2. File View - contents of individual file


## Topology Specs

- found at localhost/

- recursive depiction of root contents, linked to file views

## File View Specs

- found at localhost/fs/[filename]

- thin header, links to topology and neighboring files

- fullscreen view of file contents, formatting specific to file type

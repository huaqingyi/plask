const div = document.createElement('div');
const input = document.createElement('input');

div.appendChild(input);
const first = document.body.firstChild;
document.body.insertBefore(div, first);
import setManyAttributes from '../helper/htmlHelpers.js';

const nav = document.createElement('nav');
nav.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-dark');

const navLink = document.createElement('a');
navLink.classList.add('navbar-brand');
navLink.setAttribute('href', '#');
navLink.innerText = 'Connect 4';

const navbarToggler = document.createElement('button');
setManyAttributes(navbarToggler, {
  class: 'navbar-toggler',
  type: 'button',
  'data-toggle': 'collapse',
  'data-target': '#navbarNavDropdown',
  'aria-controls': 'navbarNavDropdown',
  'aria-expanded': 'false',
  'aria-label': 'Toggle navigation',
});

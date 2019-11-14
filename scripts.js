const API_URL = 'https://apis.is/company?name=';
const loadingImg = '.loading.gif';

/**
 * Leit að fyrirtækjum á Íslandi gegnum apis.is
 */

document.addEventListener('DOMContentLoaded', function () {
  const companies = document.querySelector('.companies');
  program.init(companies);
});

const program = (() => {
  let companiesSection;
  let container;


  function init(_companies) {
    companiesSection = _companies;
    container = companiesSection.querySelector('.results');

    // eslint-disable-next-line no-undef
    const form = companiesSection.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  function onSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    getData(input.value);
  }

  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function displayCompanies(companiesList) {
    if (companiesList.length === 0) {
      empty('Ekkert fyrirtæki fannst fyrir leitarstreng');
      return;
    }
  }

  function getData(number) {
    fetch(`${API_URL}${number}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Villa við að sækja gögn');
        }
        return response.json();
      })
      .then((data) => {
        displayCompanies(data.results);
      })
      .catch((error) => {
        empty('Ekkert fyrirtæki fannst fyrir leitarstreng');
        console.error(error);
      });
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const item of companiesList.results) {
    // eslint-disable-next-line no-use-before-define
    const div = el('div',
      el('dl',
        el('dt', 'name'),
        el('dd', item.name),
        el('dt', 'sn'),
        el('dd', '' + item.sn),
        el('dt', 'active'),
        el('dd', '' + item.active),
        el('dt', 'address'),
        el('dd', item.address),
      ));

    div.classlist.add('company--inactive');
    div.classlist.add('company--active');
    container.appendChild(div);
  }


  /*hjálparfall til að búa til element*/
  function el(name, ...children) {
    const element = document.createElement(name);

    for (const child of children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      };
    }

    return element;
  }
  //* loading gif 
  function loadingGif() {
    div.classlist.add('loading');
    var docs = document.getElementById("img");
    docs.setAttribute("src", "gif_path");

    ... // other code
  }

  return {
    init,
  };
})();
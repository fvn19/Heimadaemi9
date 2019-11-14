const API_URL = 'https://apis.is/company?name=';

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

    const form = companiesSection.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  function onSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    getData(input.value);
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

  function displayCompanies(companiesList) {
    if (companiesList.length === 0) {
      const emptyString = document.createElement('span');
      emptyString.setAttribute('text', 'Lén verður að vera strengur');
      console.log(emptyString);
    }
    for (const item of companiesList) {
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
      if (active = true) {
        div.classList.add('company--active');
      } else if (active = false) {
        div.classList.add('company--inactive');
      }
      container.appendChild(div);
      console.log(div);
    }

  }

  function getData(number) {
    const img = document.createElement('img');
    img.setAttribute('src', 'loading.gif');

    function loadingGif() {
      document.getElementsByTagName('img').innerHTML = 'Leita að fyrirtækjum...';
    }
    img.addEventListener('load', loadingGif());
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
        console.error(error);
      });
    img.removeEventListener('load', loadingGif());
  }

  return {
    init,
  };
})();
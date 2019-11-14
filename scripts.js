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

  function displayCompanies(companiesList) {
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
      if (item.active === 1) {
        div.classList.add('company');
        div.classList.add('company--active');

      } else if (item.active === 0) {
        div.classList.add('company');
        div.classList.add('company--inactive');
      }
      container.appendChild(div);
      console.log(div);
    }
  }

  function getData(number) {
    const img = document.createElement('img');
    img.setAttribute('src', 'loading.gif');

    const text = document.createElement('span');
    text.innerHTML = 'Leita að fyrirtækjum...';

    const villa = document.createElement('span');
    villa.innerHTML = 'Villa við að sækja gögn';

    const nonExist = document.createElement('span');
    nonExist.innerHTML = 'Ekkert fyrirtæki fannst fyrir leitarstreng';

    container.appendChild(img);
    container.appendChild(text);


    fetch(`${API_URL}${number}`)
      .then((response) => {
        if (!response.ok) {
          container.appendChild(villa);
        }
        return response.json();
      })
      .then((data) => {
        if (data.results.length === 0) {
          container.appendChild(nonExist);
        }
        displayCompanies(data.results);
      })
      .catch((error) => {
        container.appendChild(villa);
      })
      .finally(() => {
        img.remove();
        text.remove();
      });
  }

  function onSubmit(e) {
    container.innerHTML = '';
    e.preventDefault();
    const input = e.target.querySelector('input');
    if (input.value === '') {
      const emptyString = document.createElement('span');
      emptyString.innerHTML = 'Lén verður að vera strengur';
      container.appendChild(emptyString);
      return;
    }
    getData(input.value);
  }

  //*  hjálparfall til að búa til element
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



  return {
    init,
  };
})();
'use strict'


const inputUsername = document.querySelector('.username');
const inputPassword = document.querySelector('.password');
const btnLogin = document.querySelector('.btn-login');
const btnLogout = document.querySelector('.btn-logout');

const singleItems = document.querySelectorAll('.single-item');
const cart = document.querySelector('.items-container');


const account1 = {
    user: 'Marko Markovic',
    budget: 1430,
    password: 1111,
};
  

const account2 = {
    user: 'Petar Peric',
    budget: 2100,
    password: 2222,
};


const account3 = {
    user: 'Sara Saric',
    budget: 1910,
    password: 3333,
};


const accounts = [account1, account2, account3];


const createUsername = function() {
    accounts.forEach(acc => {
        acc.username = acc.user
        .toLocaleLowerCase()
        .split(' ')
        .map(name => name[0])
        .join('')
    })
};


createUsername();


let currentAccount;

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputUsername.value && acc.password === +inputPassword.value);
    
    if (!currentAccount) return;

    const name = currentAccount.user.split(' ')[0];

    document.querySelector('.login-section').classList.add('hidden');
    document.querySelector('.main-section').classList.remove('hidden');
    document.querySelector('h1').textContent = `Welcome ${name}!`
    document.querySelector('.budget').innerHTML = `Budget: <span>${currentAccount.budget}$</span>`;

    inputUsername.value = '';
    inputPassword.value = '';

});





singleItems.forEach(item => {

    item.addEventListener('click', (e) => {
        const addBtn = e.target;

        if (!addBtn.classList.contains('add-btn')) return;
        
        const itemName = item.querySelector('h3').textContent;
        const itemPrice = +item.querySelector('span').textContent.slice(0,-1);


        document.querySelector('.budget').innerHTML = `Budget: <span>${currentAccount.budget}$</span>`;

        if (currentAccount.budget < itemPrice) {
            document.querySelector('.budget').innerHTML +=
              `<p>Vas budžet nije dovoljan za ${itemName}!</p>`;
            return;
          }
    
          currentAccount.budget -= itemPrice;
          console.log(currentAccount.budget);
    
        document.querySelector('.budget').innerHTML = `
            Budget: <span>${currentAccount.budget}$</span> 
            <p class="add-message">Uspjesno ste dodali ${itemName}!</p>
            `;
    
          cart.innerHTML += `<div class="added-items">${itemName} - ${itemPrice}$ <button class="remove-btn">Remove</button></div>`;
    
          addBtn.style.background = 'gray';
          addBtn.setAttribute('disabled', 'disabled');
    })
});





cart.addEventListener('click', (e) => {
  if (!e.target.classList.contains('remove-btn')) return;

    const item = e.target.closest('.added-items');
    const itemName = item.textContent.split('-')[0].trim(' ');
    const itemPrice = +item.textContent.split('-')[1].trim(' ').split(' ')[0].slice(0, -1);

    item.remove();


    singleItems.forEach(item => {
        const name = item.querySelector('.single-item h3').textContent;
        const addBtn = item.querySelector('.add-btn');

        if (name === itemName) {
            addBtn.style.background = 'orange';
            addBtn.removeAttribute('disabled');

            currentAccount.budget += itemPrice;
            document.querySelector('.budget').innerHTML = `Budget: <span>${currentAccount.budget}$</span>`;
        }
    })
});



btnLogout.addEventListener('click', () => {
    document.querySelector('.login-section').classList.remove('hidden');
    document.querySelector('.main-section').classList.add('hidden');
});
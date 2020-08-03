const app = require('./app/index.js');
const axios = require('axios');

const button = document.getElementById('run');
const browserBtn = document.getElementById('open-browser');

browserBtn.onclick = async () => {
    await app.openBrowser();
}

button.onclick = async () => {
    let items = await axios.get('https://www.supremenewyork.com/shop.json');

    let keywords = document.getElementById('keywords').value;
    let type = document.getElementById('type').value;

    let url;

    for (item in await items.data.products_and_categories[type]) {
        let name = await items.data.products_and_categories[type][item].name;
        if (name.includes(keywords)) {
            url = `https://www.supremenewyork.com/shop/${await items.data.products_and_categories[type][item].id}`;
        }
    }

    // let url = document.getElementById('url').value;

    let fullName = document.getElementById('full-name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let zip = document.getElementById('zip').value;
    let cardnr = document.getElementById('cardnr').value;
    let country = document.getElementById('country').value;
    let payment = document.getElementById('payment').value;
    let month = document.getElementById('month').value;
    let year = document.getElementById('year').value;
    let cvv = document.getElementById('cvv').value;
    let color = document.getElementById('color').value;
    let delay = document.getElementById('delay').value;

    if (delay == "") { delay = 0 } else { delay = parseInt(delay) }

    await app.addToCart(url, color);
    await app.fillDetails(fullName, email, phone, address, city, zip, country,
    payment, cardnr, month, year, cvv, delay);
}

let openSettings = () => {
    document.querySelector('.settings').style.display = 'block';
    document.querySelector('.taskrunner').style.display = 'none';
    document.querySelector('.task-item').classList.remove('current');
    document.querySelector('.settings-item').classList.add('current');
}

let openTaskRunner = () => {
    document.querySelector('.taskrunner').style.display = 'block';
    document.querySelector('.settings').style.display = 'none';
    document.querySelector('.task-item').classList.add('current');
    document.querySelector('.settings-item').classList.remove('current');

}
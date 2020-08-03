const puppeteer = require('puppeteer-firefox');

const BASE_URL = "https://www.supremenewyork.com/shop/jackets/jji786yum/zw4mqlxcp";

const data = {
    full_name: "Code Maniaq",
    email: "supremebot@app.nl",
    tel: '0600000000',
    bo: 'De Dam, 1',
    city: 'Amsterdam',
    zip: '2001XS',
    country: 'NL',
    payment: {
        name: 'master',
        number: '5168441223630339',
        month: '08',
        year: '2021',
        cvv: '391' 
    }
}

const app = {
    browser: null,
    page: null,
    openBrowser: async () => {
        app.browser = await puppeteer.launch({
            headless: false
        });
        app.page = await app.browser.newPage();
    },
    addToCart: async (url, color) => { 
        await app.page.goto(url);
        await app.page.waitFor(250);

        if (color !== "") {
            await app.page.click(`a[data-style-name="${color}"]`, { delay: 50 });
        }
        await app.page.waitFor(100);

        await app.page.waitFor(100);

        await app.page.click('input[name="commit"]', { delay: 50 });

        await app.page.waitFor(250);
          
        await app.page.click('a.checkout', { delay: 50 });
    },
    fillDetails: async (fullName, email, phone, address, city, zip, country,
        payment, cardnr, month, year, cvv, delay) => {
        await app.page.waitFor(2000);

        // Details.
        await app.page.type('#order_billing_name', fullName, { delay: 1 });
        await app.page.type('#order_email', email, { delay: 1 });
        await app.page.type('#order_tel', phone, { delay: 1 });
        
        // Address.
        await app.page.type('#bo', address, { delay: 1 });
        await app.page.type('#order_billing_city', city, { delay: 1});
        await app.page.type('#order_billing_zip', zip, { delay: 1});
        await app.page.select('#order_billing_country', country );

        // Creditcard.
        await app.page.select('#credit_card_type', payment );
        await app.page.waitFor(250);
        await app.page.type('#cnb', cardnr, { delay: 1});
        await app.page.select('#credit_card_month', month );
        await app.page.select('#credit_card_year', year );
        await app.page.type('#vval', cvv, { delay: 1});

        // Delay.
        await app.page.waitFor(delay * 1000);

        // Agree to terms & checkout.
        await app.page.click('#order_terms', { delay: 1 });
        await app.page.click('input[name="commit"]');
    }
}
module.exports = app;
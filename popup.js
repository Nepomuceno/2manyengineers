
const regex = /((?<=data-asin=\")(?<name>[a-zA-Z0-9\.\,]*))|(?<=data-asin-price=\")(?<price>[0-9\.\,]*)/gm;


chrome.runtime.onMessage.addListener(function (request, sender) {

    if (request.action == "getSource") {
        console.log(request.source);
        let content = regex.exec(request.source);
        console.info(content);
        let m;

        var prices = this.GetLower(content.groups.name, content.groups.price);
        if (prices.length > 0) {
            let productNameEl = document.getElementById('product');
            let charityLogo = document.getElementById('charityLogo');
            let charityEl = document.getElementById('charity');
            let savings = document.getElementById('savings');
            let savingLink = document.getElementById('savingLink');
            let result = document.getElementById('result');
            console.log('Changing');
            console.info(productNameEl);
            productNameEl.innerHTML = prices[0].name;
            charityLogo.setAttribute('src', 'images/wateraid.png')
            charityEl.innerHTML = charity;
            savings.innerHTML = `£${prices[0].difference}`;
            savingLink.setAttribute('href', prices[0].url);
            console.log(percentage);
            result.innerHTML = `Water for children for ${(prices[0].difference * percentage) / 5} months`
        }


    }
});
/*
<img src="http://charityLogo/" id="charityLogo" />
    <p id="charity">Unicef</p>
    <p id="savings">£10.00</p>
    <a href="http://www.amazing.com" id="savingLink"></a>
    <p id="result">Saves 3 childrem</p>
    */
let charity = "Unicef";
let percentage = 0.5;
chrome.storage.sync.get('percentage', function (data) {
    console.info(data);
    percentage = data.percentage;
});

chrome.storage.sync.get('charity', function (data) {
    console.info(data);
    charity = data.charity;
});

function GetLower(product, price) {
    return [{
        name: "Adidas Originals Gazelle Trainers In Navy",
        url: "https://cheapandcheerful.azurewebsites.net/products",
        difference: "30.00",

    }];
}




function onWindowLoad() {

    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function () {

        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });

}

window.onload = onWindowLoad;
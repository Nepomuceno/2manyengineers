let savenow = document.getElementById('savenow');
let charity = "Unicef";
let percentage = 0.5;

chrome.storage.sync.get('color', function (data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
});

chrome.storage.sync.get('percentage', function (data) {
    console.info(data);
    percentage = data.percentage;
});

chrome.storage.sync.get('charity', function (data) {
    console.info(data);
    charity = data.charity;
});



changeColor.onclick = function (element) {
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'document.body.style.backgroundColor = "' + color + '";' });

    });
};
const regex = /((?<=data-asin=\")(?<name>[a-zA-Z0-9\.\,]*))|(?<=data-asin-price=\")(?<price>[0-9\.\,]*)/gm;

function GetLower(product, price) {
    return [{
        url: "",
        difference: "30.00"
    }];
}


chrome.runtime.onMessage.addListener(function (request, sender) {

    if (request.action == "getSource") {
        console.log(request.source);
        let content = regex.exec(request.source);
        console.info(content);
        let m;

        var prices = this.GetLower(content.groups.name, content.groups.price);
        if (prices.length > 0) {
            message.innerText += `Save £${prices[0].difference} and donate £${prices[0].difference * percentage} to save a child`
            if(savenow){
                savenow.href = `${prices[0].url}`
            }
        }

        while ((m = regex.exec(request.source)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                console.log(match);
            });
        }
    }
});

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
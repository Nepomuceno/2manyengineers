
let selectionValue = document.getElementById('charity');
let percentageValue = document.getElementById('percentageChange');

selectionValue.addEventListener('change', (src, ev) => {
    chrome.storage.sync.set(
        {
            color: '#3aa757',
            percentage: percentageValue.value,
            charity: selectionValue.value,
        }, function () {
            console.info(ev);
        })
})

percentageValue.addEventListener('change', (src, ev) => {
    chrome.storage.sync.set(
        {
            color: '#3aa757',
            percentage: percentageValue.value,
            charity: selectionValue.value,
        }, function () {
            console.info(ev);
        })
})

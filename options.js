
let selectionValue = document.getElementById('charity');
let percentageValue = document.getElementById('percentageChange');

selectionValue.addEventListener('change', (src, ev) => {
    console.log(percentageValue.value);
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
    console.log(percentageValue.value);
    chrome.storage.sync.set(
        {
            color: '#3aa757',
            percentage: percentageValue.value,
            charity: selectionValue.value,
        }, function () {
            console.info(ev);
        })
})


$(function() {
    $('.project').each(function() {
      var $projectBar = $(this).find('.bar');
      var $projectPercent = $(this).find('.percent');
      $projectBar.slider({
        range: "min",
        animate: true,
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        slide: function(event, ui) {
          $projectPercent.val(ui.value * 100 + "%");
        },
        change: function(event, ui) {
          var $projectRange = $(this).find('.ui-slider-range');
          var percent = ui.value;
          if (percent < 30) {
            $projectPercent.css({
              'color': 'red'
            });
            $projectRange.css({
              'background': '#f20000'
            });
          } else if (percent > 31 && percent < 70) {
            $projectPercent.css({
              'color': 'gold'
            });
            $projectRange.css({
              'background': 'gold'
            });
          } else if (percent > 70) {
            $projectPercent.css({
              'color': 'green'
            });
            $projectRange.css({
              'background': 'green'
            });
          }
        }
      });
    })
  })
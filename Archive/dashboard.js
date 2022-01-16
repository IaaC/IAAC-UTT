//Dashboard function
(function () {
  "use strict";

  feather.replace({ "aria-hidden": "true" });

  // Graphs
  var ctx = document.getElementById("myChart");
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Hasel Complex",
        "Fred. Market",
        "Vika Hospital",
        "Bislett Tower",
        "Old Town Station",
      ],
      datasets: [
        {
          data: [8, 4, 3, 6, 7, 3, 0, 10],
          lineTension: 0,
          backgroundColor: "transparent",
          borderColor: "rgb(30, 36, 88)",
          borderWidth: 4,
          pointRadius: 10,
          pointBackgroundColor: "rgb(30, 36, 88)",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
})();

// window.onload = () => {
//   const base = `${window.location.href}v2/`;
//   const ctx = document.getElementById('chart');
//   const ctx1 = document.getElementById('chart1');
//   const url = window.location.href.toString();
//   if (url.endsWith('#/') || url.endsWith('#')) location = url.replace('#', '');

//   async function query(endpoint) {
//     const res = await fetch(`${base}${endpoint}`);
//     const body = res.json();
//     return body;
//   }

//   function addEntry(day, cases, deaths, id) {
//     document.querySelector(id).innerHTML += `<tr>
//     <th scope="row">${day}</th>
//     <td>${cases}</td>
//     <td>${deaths}</td>
//   </tr>`;
//   }

//   function addData(chart, label, data, index, addLabel = true) {
//     if (addLabel) chart.data.labels.push(label);
//     chart.data.datasets[index].data.push(data);
//     chart.update();
//   }

//   function removeData(chart) {
//     chart.data.labels.pop();
//     chart.data.datasets.forEach((dataset) => {
//       dataset.data.pop();
//     });
//     chart.update();
//   }

//   async function init() {
//     let data = {
//       labels: [],
//       datasets: [
//         {
//           label: 'Total Cases',
//           data: [],
//           backgroundColor: '#FD9D52',
//           borderColor: '#FD9D52',
//           fill: false,
//           lineTension: 0,
//           radius: 3.5,
//           fontFamily: 'IBM Plex Sans',
//         },
//         {
//           label: 'Total Deaths',
//           data: [],
//           backgroundColor: '#DD45D3',
//           borderColor: '#DD45D3',
//           fill: false,
//           lineTension: 0,
//           radius: 3.5,
//           fontFamily: 'IBM Plex Sans',
//         },
//         {
//           label: 'Predicted Total Cases',
//           data: [],
//           backgroundColor: '#943CFF',
//           borderColor: '#943CFF',
//           fill: false,
//           lineTension: 0,
//           radius: 3.5,
//           fontFamily: 'IBM Plex Sans',
//         },
//         {
//           label: 'Predicted Total Deaths',
//           data: [],
//           backgroundColor: '#000',
//           borderColor: '#000',
//           fill: false,
//           lineTension: 0,
//           radius: 3.5,
//           fontFamily: 'IBM Plex Sans',
//         },
//       ],
//     };
//     let options = {
//       responsive: true,
//       title: {
//         display: true,
//         position: 'top',
//         text: '',
//         fontSize: 16,
//         fontColor: '#111',
//         fontFamily: 'IBM Plex Sans',
//       },
//       legend: {
//         display: true,
//         position: 'bottom',
//         labels: {
//           fontColor: '#333',
//           fontSize: 16,
//         },
//         fontFamily: 'IBM Plex Sans',
//       },
//       scales: {
//         xAxes: [
//           {
//             display: true,
//           },
//         ],
//         yAxes: [
//           {
//             display: true,
//             // type: 'logarithmic',
//           },
//         ]
//       },
//     };

//     /*let chart = new Chart(ctx, {
//       type: 'line',
//       data: data,
//       options: options,
//     });

//     const globalTimelineCases = await query('global/timeline/cases');
//     const globalTimelineDeath = await query('global/timeline/death');
//     const globalTimelineCasesPredictions = await query('global/timeline/cases/predictions');
//     const globalTimelineDeathPredictions = await query('global/timeline/death/predictions');

//     let i;
//     for (i = 0; i < globalTimelineDeath.death.length; i++) {
//       addData(chart, globalTimelineCases.cases[i][0], globalTimelineCases.cases[i][1], 0, true);
//       addData(chart, globalTimelineDeath.death[i][0], globalTimelineDeath.death[i][1], 1, false);
//       addData(
//         chart,
//         globalTimelineCases.cases[i][0],
//         globalTimelineDeath.death.length - 1 === i ? globalTimelineCases.cases[i][1] : undefined,
//         2,
//         false
//       );
//       addData(
//         chart,
//         globalTimelineDeath.death[i][0],
//         globalTimelineDeath.death.length - 1 === i ? globalTimelineDeath.death[i][1] : undefined,
//         3,
//         false
//       );
//       // addEntry(
//       //   globalTimelineDeath.death[i][0],
//       //   globalTimelineCases.cases[i][1],
//       //   globalTimelineDeath.death[i][1],
//       //   '#dateTable'
//       // );
//     }

//     for (let j = i; j < globalTimelineDeathPredictions.death.length + i; j++) {
//       addData(chart, `P${j}`, globalTimelineCasesPredictions.cases[j - i], 2, true);
//       addData(chart, `P${j}`, globalTimelineDeathPredictions.death[j - i], 3, false);
//       // addEntry(
//       //   `<i class="fas fa-exclamation-triangle"></i> Prediction: ${j}`,
//       //   globalTimelineCasesPredictions.cases[j - i],
//       //   globalTimelineDeathPredictions.death[j - i],
//       //   '#dateTable'
//       // );
//     }
//   }*/

//   //init();
// };
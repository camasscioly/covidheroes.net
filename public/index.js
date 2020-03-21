const base = `${window.location.href}v2/`;
const ctx = document.getElementById('chart');
const ctx1 = document.getElementById('chart1');
const url = window.location.href.toString();
if (url.endsWith('#/') || url.endsWith('#')) location = url.replace('#', '');

async function query(endpoint) {
  const res = await fetch(`${base}${endpoint}`);
  const body = res.json();
  return body;
}

function addEntry(key, val, id) {
  document.querySelector(id).innerHTML += `<tr>
    <th scope="row">${key}</th>
    <td>${val}</td>
  </tr>`;
}

function addData(chart, label, data, index, addLabel = true) {
  if (addLabel) chart.data.labels.push(label);
  chart.data.datasets[index].data.push(data);
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}

async function init() {
  let data = {
    labels: [],
    datasets: [
      {
        label: 'Total Cases',
        data: [],
        backgroundColor: 'rgba(252, 153, 89, 0.05)',
        borderColor: '#DD45D3',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total Deaths',
        data: [],
        backgroundColor: 'rgba(148, 60, 255, 0.05)',
        borderColor: '#943CFF',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
    ],
  };
  let options = {
    responsive: true,
    title: {
      display: true,
      position: 'top',
      text: '',
      fontSize: 16,
      fontColor: '#111',
      fontFamily: 'IBM Plex Sans',
    },
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        fontColor: '#333',
        fontSize: 16,
      },
      fontFamily: 'IBM Plex Sans',
    },
  };

  let chart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options,
  });

  let counter = 0;
  // const usRes = await query('us');
  // const globalRes = await query('global');
  const globalTimelineCases = await query('global/timeline/cases');
  const globalTimelineDeath = await query('global/timeline/death');
  const globalTimelineCasesPredictions = await query('global/timeline/cases/predictions');
  const globalTimelineDeathPredictions = await query('global/timeline/death/predictions');
  // const usTimelinePredictionsRes = await query('us/timeline/predictions');
  /*for (const prop in globalRes) {
    addEntry(prop, globalRes[prop][0], '#globalTable');
    if (counter < 8) addData(chart1, prop, globalRes[prop][0], counter++, false);
  }
  counter = 0;
  for (const prop in usRes) {
    addEntry(prop, usRes[prop][0], '#usTable');
    if (counter < 8) addData(chart1, prop, usRes[prop][0], counter++, false);
  }*/
  let i;
  for (i = 0; i < globalTimelineDeath.death.length; i++) {
    addData(chart, globalTimelineCases.cases[i][0], globalTimelineCases.cases[i][1], 0, true);
    addData(chart, globalTimelineDeath.death[i][0], globalTimelineDeath.death[i][1], 1, false);
  }

  for (let j = i; j < globalTimelineDeathPredictions.death.length; j++) {
    addData(chart, j, globalTimelineCasesPredictions.cases[j], 0, true);
    addData(chart, j, globalTimelineDeathPredictions.death[j], 1, false);
  }
  /*for (const prop in usTimelinePredictionsRes) {
    if (new Date().toLocaleDateString('en-US') === prop) return;
    const {
      new_daily_cases,
      new_daily_deaths,
      total_cases,
      total_deaths,
      total_recoveries,
    } = usTimelineRes[prop];
    addData(chart, `P: ${prop}`, new_daily_cases, 0, true);
    addData(chart, `P: ${prop}`, new_daily_deaths, 1, false);
    addData(chart, `P: ${prop}`, total_cases, 2, false);
    addData(chart, `P: ${prop}`, total_deaths, 3, false);
    addData(chart, `P: ${prop}`, total_recoveries, 4, false);
    addEntry(
      `Prediction: ${prop}`,
      `New Cases: ${new_daily_cases}, New Deaths: ${new_daily_deaths}, Total Cases: ${total_cases}, Total Deaths: ${total_deaths}, Total Recoveries: ${total_recoveries}`,
      '#dateTable'
    );
  }*/
}

init();

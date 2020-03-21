/*if ('serviceWorker' in navigator)
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));*/

const base = 'http://localhost:3000/v1/';
let ctx = document.getElementById('chart');
let ctx1 = document.getElementById('chart1');

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
        label: 'New Cases',
        data: [],
        backgroundColor: 'rgba(252, 153, 89, 0.05)',
        borderColor: '#FC9959',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'New Deaths',
        data: [],
        backgroundColor: 'rgba(252, 153, 89, 0.05)',
        borderColor: '#DD45D3',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total Cases',
        data: [],
        backgroundColor: 'rgba(148, 60, 255, 0.05)',
        borderColor: '#943CFF',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total Deaths',
        data: [],
        backgroundColor: 'rgba(106, 17, 234, 0.05)',
        borderColor: '#6A11EA',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total Recovered',
        data: [],
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderColor: '#000',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
    ],
  };
  let data1 = {
    labels: [
      'Global',
      'US'
    ],
    datasets: [
      {
        label: 'Total Active Cases',
        data: [],
        backgroundColor: 'rgba(252, 153, 89, 1)',
        borderColor: '#FC9959',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total Cases',
        data: [],
        backgroundColor: '#DD45D3',
        borderColor: '#DD45D3',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total Deaths',
        data: [],
        backgroundColor: 'rgba(148, 60, 255, 1)',
        borderColor: '#943CFF',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total New Cases Today',
        data: [],
        backgroundColor: 'rgba(106, 17, 234, 1)',
        borderColor: '#6A11EA',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total New Deaths Today',
        data: [],
        backgroundColor: 'rgba(0, 0, 0, 1)',
        borderColor: '#000',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total Recovered',
        data: [],
        backgroundColor: 'rgba(252, 153, 89, 1)',
        borderColor: '#FC9959',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total Serious Cases',
        data: [],
        backgroundColor: '#DD45D3',
        borderColor: '#DD45D3',
        fill: true,
        lineTension: 0,
        radius: 1,
        fontFamily: 'IBM Plex Sans',
      },
      {
        label: 'Total Unresolved',
        data: [],
        backgroundColor: 'rgba(148, 60, 255, 1)',
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

  let chart1 = new Chart(ctx1, {
    type: 'bar',
    data: data1,
    options: options,
  });

  let counter = 0;
  const usRes = await query('us');
  const globalRes = await query('global');
  const usTimelineRes = await query('us/timeline');
  for (const prop in globalRes) {
    addEntry(prop, globalRes[prop][0], '#globalTable');
    if (counter < 8) addData(chart1, prop, globalRes[prop][0], counter++, false);
  }
  counter = 0;
  for (const prop in usRes) {
    addEntry(prop, usRes[prop][0], '#usTable');
    if (counter < 8) addData(chart1, prop, usRes[prop][0], counter++, false);
  }
  for (const prop in usTimelineRes) {
    if (new Date().toLocaleDateString('en-US') === prop) return;
    const {
      new_daily_cases,
      new_daily_deaths,
      total_cases,
      total_deaths,
      total_recoveries,
    } = usTimelineRes[prop];
    addData(chart, prop, new_daily_cases, 0, true);
    addData(chart, prop, new_daily_deaths, 1, false);
    addData(chart, prop, total_cases, 2, false);
    addData(chart, prop, total_deaths, 3, false);
    addData(chart, prop, total_recoveries, 4, false);
    addEntry(
      prop,
      `New Cases: ${new_daily_cases}, New Deaths: ${new_daily_deaths}, Total Cases: ${total_cases}, Total Deaths: ${total_deaths}, Total Recoveries: ${total_recoveries}`,
      '#dateTable'
    );
  }
}

init();

// PIE CHART
const attackTypes = ["Blocked login", "Suspicious packet", "Firewall trigger", "Encrypted tunnel", "Port scan"];
let attackCounts = [0, 0, 0, 0, 0];

const pieCtx = document.getElementById("pieChart");
const pieChart = new Chart(pieCtx.getContext('2d'), {
    type: 'pie',
    data: {
        labels: attackTypes,
        datasets: [{
            data: attackCounts,
            backgroundColor: ['#ef4444', '#f59e0b', '#38bdf8', '#10b981', '#8b5cf6']
        }]
    },
    options: {
        plugins: {
            legend: {
                position: 'right',
                align: 'center',
                labels: {
                    color: 'white',
                    font: { size: 11 },
                    padding: 10,
                    boxWidth: 15
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

function updatePie(type) {
    const idx = attackTypes.indexOf(type);
    if (idx > -1) {
        attackCounts[idx]++;
        pieChart.update();
    }
}

// BANDWIDTH LINE CHART
const lineCtx = document.getElementById("lineChart").getContext('2d');
const lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: ["-50s", "-40s", "-30s", "-20s", "-10s", "Live"],
        datasets: [{
            label: 'Bandwidth (Gbps)',
            data: [45, 52, 48, 70, 65, 58],
            borderColor: '#38bdf8',
            backgroundColor: 'rgba(56, 189, 248, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: '#000',
            pointBorderColor: '#38bdf8',
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#64748b', font: { family: 'monospace' } }
            },
            y: {
                grid: { color: 'rgba(51, 65, 85, 0.4)' },
                ticks: { color: '#64748b', font: { family: 'monospace' } }
            }
        }
    }
});

function updateCharts(attackIdx) {
    lineChart.data.datasets[0].data.shift();
    lineChart.data.datasets[0].data.push(Math.floor(Math.random() * 40) + 40);
    lineChart.update();

    pieChart.data.datasets[0].data[attackIdx]++;
    pieChart.update();
}

// in simulation.js (inside simulateAttack or wherever you want activity)
terminalLog(`Attack event: ${sev.toUpperCase()} anomaly in ${region}`);
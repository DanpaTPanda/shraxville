// SIMULATION FUNCTIONS
function simulateAttack() {
    const regions = Object.keys(regionMap);
    const region = regions[Math.floor(Math.random() * regions.length)];
    const start = [Math.random() * 100 - 50, Math.random() * 200 - 100];
    const end = regionMap[region];
    const sev = Math.random() < 0.35 ? "high" : (Math.random() < 0.55 ? "medium" : "low");
    const color = sev === "high" ? "#ef4444" : (sev === "medium" ? "#f59e0b" : "#10b981");
    createAttackArc(start, end, color);
    const attackIdx = Math.floor(Math.random() * attackTypes.length);
    anomalyCount++;
    if (sev === "high") {
        activeIncidents++;
        threatScore = Math.min(100, threatScore + 3);
        playSound(200, 'square', 0.2, 0.05);
        logFeed(`CRITICAL: External breach detected from ${region}`, "#ef4444");
        addAlert(`High severity attack detected on ${region}`, 'high');
    } else {
        playSound(400 + Math.random() * 300, 'square', 0.08, 0.05);
        logFeed(`Alert: ${sev.toUpperCase()} anomaly in ${region}`, "#f59e0b");
        addAlert(`${sev.toUpperCase()} anomaly detected in ${region}`, sev);
    }
    updateCharts(attackIdx);
    updateMetricsUI();
}

function attackStorm() {
    const status = document.getElementById("sysStatus");
    status.innerText = "CRITICAL FAILURE";
    status.style.color = "#ef4444";
    document.body.classList.add("siren-active");
    startGlobalSiren();
    const stormInterval = setInterval(() => simulateAttack(), 100);
    setTimeout(() => {
        clearInterval(stormInterval);
        stopGlobalSiren();
        document.body.classList.remove("siren-active");
        status.innerText = "OPTIMAL";
        status.style.color = "#10b981";
        updateMetricsUI();
    }, 5000);
}

function runScan() {
    const status = document.getElementById("scanStatus");
    status.innerText = "Scan started...";
    let progress = 0;
    const anomaliesDetected = Math.floor(Math.random() * 10) + 1;
    const findings = Array.from({ length: anomaliesDetected }, () => ({
        target: ["Database Cluster", "Edge Node", "Auth Gateway", "Internal Mail", "Web Gateway"][Math.floor(Math.random() * 5)],
        vuln: ["Buffer Overflow", "Zero-Day Attempt", "DDoS Spike", "Credential Stuffing", "Port Scan"][Math.floor(Math.random() * 5)],
        severity: ["high", "medium", "low"][Math.floor(Math.random() * 3)]
    }));
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            status.innerText = "Scan Complete!";
            addScanToHistory(findings);
            downloadJSON(`scan_${Date.now()}.json`, findings);
            setTimeout(() => status.innerText = "", 2000);
        } else status.innerText = `Scanning network... ${progress}%`;
    }, 300);
}

function addScanToHistory(findings) {
    const tbody = document.getElementById("scanHistoryBody");
    const timestamp = new Date().toLocaleTimeString('en-GB');
    const anomalies = findings.length;
    tbody.innerHTML += `<tr>
        <td>${timestamp}</td>
        <td>Complete</td>
        <td>${anomalies}</td>
        <td><button class="mitigate-btn" onclick="downloadJSON('scan_${timestamp.replace(/[: ]/g, '_')}.json', ${JSON.stringify(findings)})">Download</button></td>
    </tr>`;
}

function downloadJSON(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
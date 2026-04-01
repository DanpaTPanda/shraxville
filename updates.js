// UI UPDATE FUNCTIONS
function updateMetricsUI() {
    document.getElementById("threatScore").innerText = threatScore + "%";
    document.getElementById("attackRate").innerText = anomalyCount;
    document.getElementById("alerts").innerText = activeIncidents;
    document.getElementById("mitigatedCount").innerText = mitigatedCount.toLocaleString();
}

function logFeed(msg, color = "#6366f1") {
    const feed = document.getElementById("feed");
    const div = document.createElement("div");
    div.style.marginBottom = "5px";
    div.innerHTML = `<span style="color:${color}">[${new Date().toLocaleTimeString()}]</span> ${msg}`;
    feed.prepend(div);
    if (feed.children.length > 12) feed.removeChild(feed.lastChild);
}
function mitigate(btn) {
    const row = btn.closest('tr');

    // remove the row that was clicked
    row.remove();

    // update stats
    mitigatedCount++;
    if (activeIncidents > 0) activeIncidents--;
    threatScore = Math.max(5, threatScore - 2);
    playSound(1000, 'sine', 0.2, 0.05);
    updateMetricsUI();

    logFeed(`Mitigated: ${row.cells[1]?.innerText || "Unknown target"}`, "#10b981");
    addAlert(`Mitigated: ${row.cells[1]?.innerText || "Unknown"}`, "low");

    // If the table is now empty, spawn new ones
    const tableBody = document.getElementById("tableBody");
    if (tableBody.children.length === 0) {
        setTimeout(() => {
            generateRandomFindings();
            logFeed("RE-SCAN COMPLETE: New vulnerabilities identified.", "#f59e0b");
        }, 800);
    }
}

function generateRandomFindings() {
    const tableBody = document.getElementById("tableBody");

    // Randomly spawn 1, 2, or 3
    const numToSpawn = Math.floor(Math.random() * 3) + 1;

    const targets = ["Cloud Storage A", "API Gateway", "User Auth Service", "IoT Sensor 07", "Backup Node", "Virtual Desk 04"];
    const threats = ["Credential Stuffing", "DDoS Signature", "Unauthorized Access", "Packet Fragmentation", "SSH Tunneling", "Malware Beacon"];
    const severities = ["high", "medium", "low"];

    for (let i = 0; i < numToSpawn; i++) {
        const sev = severities[Math.floor(Math.random() * severities.length)];
        const target = targets[Math.floor(Math.random() * targets.length)];
        const threat = threats[Math.floor(Math.random() * threats.length)];

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><span class="badge ${sev}">${sev}</span></td>
            <td>${target}</td>
            <td>${threat}</td>
            <td><button class="mitigate-btn" onclick="mitigate(this)">MITIGATE</button></td>
        `;
        tableBody.appendChild(tr);
    }

    playSound(400, 'square', 0.3, 0.05);
}

function runCommand(cmd) {
    const terminal = document.getElementById("terminal");
    if (cmd === "scan") {
        runScan();
        terminalLog("Running network scan...");
    } else if (cmd === "storm") {
        attackStorm();
        terminalLog("Launching attack simulation...");
    } else if (cmd === "clear") {
        terminal.innerHTML = "";
    } else {
        terminalLog("Unknown command: " + cmd);
    }
}

function terminalLog(msg) {
    const terminal = document.getElementById("terminal");
    const line = document.createElement("div");
    line.innerText = "> " + msg;
    terminal.prepend(line);
}

function addAlert(message, severity = 'low') {
    const list = document.getElementById('alertList');
    const count = document.getElementById('alertCount');
    const empty = list.querySelector('.alertEmpty');
    if (empty) empty.remove();

    const entry = document.createElement('div');
    entry.className = 'alertEntry';
    entry.innerHTML = `
        <span class="severity ${severity}">${severity}</span>
        <span>${new Date().toLocaleTimeString('en-GB')}</span>
        <span>${message}</span>
    `;
    list.prepend(entry);

    while (list.children.length > 6) list.removeChild(list.lastChild);
    count.innerText = list.children.length;
}

function toggleTheme() {
    document.body.classList.toggle("light");
    if (document.body.classList.contains("light")) {
        map.removeLayer(darkTiles);
        map.addLayer(lightTiles);
    } else {
        map.removeLayer(lightTiles);
        map.addLayer(darkTiles);
    }
}

function exportToPDF() {
    alert("Exporting report to PDF...");
    // Placeholder for PDF export logic
}
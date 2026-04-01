// CORE SYSTEM STATE (Shared Variables)
let threatScore = 24;
let anomalyCount = 0;
let activeIncidents = 0;
let mitigatedCount = 0;

// INITIAL DATA AND EVENT LISTENERS
// Show/Hide Password
document.getElementById("showPass").addEventListener("change", function() {
    const passInput = document.getElementById("pass");
    passInput.type = this.checked ? "text" : "password";
    // Add visual feedback
    const label = this.parentElement;
    if (this.checked) {
        label.classList.add("active");
    } else {
        label.classList.remove("active");
    }
});

// Initial Findings Data
document.getElementById("tableBody").innerHTML = `
    <tr>
        <td><span class="badge high">high</span></td>
        <td>Database Cluster 01</td>
        <td>SQL Injection Probe</td>
        <td><button class="mitigate-btn" onclick="mitigate(this)">MITIGATE</button></td>
    </tr>
    <tr>
        <td><span class="badge medium">medium</span></td>
        <td>Edge Node 04</td>
        <td>Port 80 Scan</td>
        <td><button class="mitigate-btn" onclick="mitigate(this)">MITIGATE</button></td>
    </tr>
    <tr>
        <td><span class="badge high">high</span></td>
        <td>Internal Mail Server</td>
        <td>Zero-Day Attempt</td>
        <td><button class="mitigate-btn" onclick="mitigate(this)">MITIGATE</button></td>
    </tr>
    <tr>
        <td><span class="badge medium">medium</span></td>
        <td>Web Gateway 02</td>
        <td>Brute Force Attack</td>
        <td><button class="mitigate-btn" onclick="mitigate(this)">MITIGATE</button></td>
    </tr>
    <tr>
        <td><span class="badge low">low</span></td>
        <td>Network Switch 09</td>
        <td>Unusual Latency Spike</td>
        <td><button class="mitigate-btn" onclick="mitigate(this)">MITIGATE</button></td>
    </tr>
`;
updateMetricsUI();

const terminalInput = document.getElementById("terminalInput");
terminalInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const cmd = terminalInput.value.trim().toLowerCase();
        runCommand(cmd);
        terminalInput.value = "";
    }
});

// AI & SYSTEM ACTIVITY SIMULATION
setInterval(() => {
    // AI Log Updates
    const aiLogs = [
        "Analyzing traffic patterns...",
        "Scanning for anomalies...",
        "Updating threat models...",
        "Processing firewall logs...",
        "Detecting potential breaches..."
    ];
    const aiLog = document.getElementById("aiLog");
    aiLog.innerHTML = aiLogs[Math.floor(Math.random() * aiLogs.length)];
}, 3000);

// LIVE UPDATES
setInterval(() => {
    updateMetricsUI();
    document.getElementById("clock").innerText = new Date().toLocaleTimeString('en-GB');
}, 2500);

// SIMULATE ATTACK
setInterval(simulateAttack, 4000);

setInterval(() => {
    const aiLog = document.getElementById("aiLog");
    const msgs = [
        "Credential Stuffing",
        "Behavioral Alert: Hidden Process",
        "Suspicious Login Pattern",
        "Anomaly: Data Exfiltration",
        "Unauthorized Access Attempt"
    ];
    const line = document.createElement("div");
    line.innerHTML = `<span style="color:#8b5cf6">AI_CORE ></span> ${msgs[Math.floor(Math.random() * msgs.length)]}`;
    aiLog.prepend(line);
    if (aiLog.children.length > 4) aiLog.removeChild(aiLog.lastChild);
}, 4000);

setInterval(() => {
    const terminal = document.getElementById("terminal");
    const logs = ["SYN flood filtered", "IDS rule 104 triggered", "Packet inspection complete", "Established tunnel: node_04", "Dropping malformed packet"];
    const line = document.createElement("div");
    line.innerText = `System Activity: [${new Date().toLocaleTimeString()}] ${logs[Math.floor(Math.random() * logs.length)]}`;
    terminal.prepend(line);
    terminal.scrollTop = 0;
    if (terminal.children.length > 10) terminal.removeChild(terminal.lastChild);
}, 2500);

setInterval(() => {
    document.getElementById("clock").innerText = new Date().toLocaleTimeString();
}, 1000);

setInterval(simulateAttack, 3000);
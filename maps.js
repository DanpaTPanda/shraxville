// Map tiles sourced from CartoDB (open library) and OpenStreetMap (open source project)

const regionMap = { 
    "UK": [51.5074, -0.1278], // London
    "USA": [40.7128, -74.0060], // New York
    "Japan": [35.6762, 139.6503], // Tokyo
    "China": [39.9042, 116.4074], // Beijing
    "Australia": [-33.8688, 151.2093], // Sydney
    "Brazil": [-15.8267, -47.9218], // Brasília
    "Germany": [52.5200, 13.4050], // Berlin
    "France": [48.8566, 2.3522], // Paris
    "India": [28.6139, 77.2090], // Delhi
    "Russia": [55.7558, 37.6176], // Moscow
    "South Korea": [37.5665, 126.9780], // Seoul
    "Canada": [45.4215, -75.6972], // Ottawa
    "Mexico": [19.4326, -99.1332], // Mexico City
    "South Africa": [-25.7479, 28.2293], // Pretoria
    "Argentina": [-34.6118, -58.3965], // Buenos Aires
    "Italy": [41.9028, 12.4964] // Rome
};

const map = L.map("map", { zoomControl: false, attributionControl: true }).setView([20, 0], 2);
let darkTiles = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { attribution: '© CartoDB' }).addTo(map);
let lightTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: '© OpenStreetMap contributors' });

function createAttackArc(start, end, color) {
    const arcPoints = [];
    const numPoints = 50;
    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const lat = start[0] + (end[0] - start[0]) * t;
        const lng = start[1] + (end[1] - start[1]) * t;
        const arcHeight = Math.sin(t * Math.PI) * 20; // Arc height
        arcPoints.push([lat + arcHeight, lng]);
    }
    const arc = L.polyline(arcPoints, { color: color, weight: 2, opacity: 0.8 }).addTo(map);
    const marker = L.circleMarker(end, { radius: 5, color: color, fillColor: color, fillOpacity: 0.7 }).addTo(map);
    setTimeout(() => {
        map.removeLayer(arc);
        map.removeLayer(marker);
    }, 3000);
}
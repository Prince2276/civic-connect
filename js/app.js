document.addEventListener("DOMContentLoaded", () => {

    const map = L.map("cityMap").setView([22.5726, 88.3639], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    const issues = [
        {
            title: "Pothole near Park Street",
            coords: [22.5510, 88.3520]
        },
        {
            title: "Water leakage in Salt Lake",
            coords: [22.5726, 88.4330]
        },
        {
            title: "Garbage overflow in Howrah",
            coords: [22.5958, 88.2636]
        }
    ];

    issues.forEach(issue => {
        L.marker(issue.coords)
            .addTo(map)
            .bindPopup(issue.title);
    });

});
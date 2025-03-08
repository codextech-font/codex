document.addEventListener('DOMContentLoaded', function() {
    // Fetch statistics from the server
    fetch('http://localhost:3000/api/stats')
        .then(response => response.json())
        .then(data => {
            document.getElementById('total-visitors').innerText = data.totalVisitors;
            document.getElementById('total-subscribers').innerText = data.totalSubscribers;

            // Populate recent subscribers
            const subscriberList = document.getElementById('subscriber-list');
            subscriberList.innerHTML = ''; // Clear existing entries
            data.subscribers.forEach(subscriber => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${subscriber.email}</td><td>${new Date(subscriber.date).toLocaleDateString()}</td>`;
                subscriberList.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching stats:', error));

    // Fetch page views and unique visitors (for demonstration, using static values)
    document.getElementById('page-views').innerText = 5000; // This would be fetched from your database
    document.getElementById('unique-visitors').innerText = 300; // This would be fetched from your database

    // Export functionality (placeholder)
    document.getElementById('export-button').addEventListener('click', function() {
        alert('Export functionality not implemented yet.');
    });
});

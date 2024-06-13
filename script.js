document.addEventListener('DOMContentLoaded', () => {
    console.log("New tab page loaded.");

    function updateClock() {
        const clockElement = document.getElementById('clock');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        clockElement.textContent = `${hours}:${minutes}`;
    }

    function performSearch(engine) {
        const searchInput = document.getElementById("search-input");
        const query = searchInput.value.trim();
        if (query) {
            let searchUrl;
            switch (engine) {
                case 'duckduckgo':
                    searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
                    break;
                case 'google':
                    searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                    break;
                case 'yahoo':
                    searchUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
                    break;
                case 'bing':
                    searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
                    break;
                default:
                    break;
            }
            window.location.href = searchUrl;
        }
    }

    function showDate() {
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var monthIndex = now.getMonth();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var monthName = months[monthIndex];
        var date = day + " " + monthName;
        document.getElementById("date").textContent = date;
    }

    async function fetchImages() {
        try {
            const response = await fetch('image.json');
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const images = await response.json();
            return images;
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    async function changeBackground() {
        const images = await fetchImages();
        if (images) {
            const img = new Image();
            const randomIndex = Math.floor(Math.random() * images.length);
            const selectedImage = images[randomIndex];
            img.src = selectedImage.image;
            img.onload = () => {
                document.body.style.backgroundImage = `url(${img.src})`;
                document.getElementById('author').textContent = `Autor: ${selectedImage.author}`;
            };
        } else {
            console.error('No images were loaded.');
        }
    }
    
    changeBackground();
    setInterval(updateClock, 1000);
    showDate();
    updateClock();

    const searchButtons = document.querySelectorAll(".select");
    searchButtons.forEach(button => {
        button.addEventListener("click", () => performSearch(button.id.replace('-button', '')));
    });

    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            performSearch(searchButtons[0].id.replace('-button', ''));
        }
    });
    document.getElementById('about').addEventListener('click', function() {
        var card = document.getElementById('about-card');
        var button_open = document.getElementById('about');
        card.style.display = 'block'; 
        button_open.style.display = 'none';
    });
    document.getElementById('about-close').addEventListener('click', function() {
        var card = document.getElementById('about-card');
        var button_close = document.getElementById('about-close');
        var button_open = document.getElementById('about');
        card.style.display = 'none';
        button_open.style.display = 'block';
    });
});



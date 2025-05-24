// YouTube API Key
const API_KEY = 'AIzaSyCDr6lj3pe9n9Jsh5cqSpg_soBmD_7Q0M0'; // Replace with your own API key

// Elements
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const player = document.getElementById('player');
const errorMessage = document.getElementById('errorMessage');
const playlistContainer = document.getElementById('playlist');

// Initialize Playlist from localStorage
let playlist = JSON.parse(localStorage.getItem('playlist')) || [];

// Event listener for search input
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length > 2) {
        searchYouTube(query);
    } else {
        resultsContainer.innerHTML = '';
    }
});

// Search YouTube for videos
function searchYouTube(query) {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoCategoryId=10&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.items.length === 0) {
                showError("No results found.");
            } else {
                displayResults(data.items);
            }
        })
        .catch(error => {
            console.error("Error fetching YouTube data:", error);
            showError("Failed to fetch data. Please try again.");
        });
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Display search results
function displayResults(videos) {
    hideError();
    resultsContainer.innerHTML = '';
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('result-item');
        videoItem.innerHTML = `
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">
            <h3>${video.snippet.title}</h3>
            <button class="add-to-playlist" data-video-id="${video.id.videoId}">Add to Playlist</button>
        `;
        
        // Add event listener to "Add to Playlist" button
        const addButton = videoItem.querySelector('.add-to-playlist');
        addButton.addEventListener('click', () => addToPlaylist(video));
        
        videoItem.addEventListener('click', () => playVideo(video.id.videoId));
        resultsContainer.appendChild(videoItem);
    });
}

// Play selected video
function playVideo(videoId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.frameborder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowfullscreen = true;
    player.innerHTML = '';
    player.appendChild(iframe);
}

// Add video to playlist
function addToPlaylist(video) {
    // Check if video is already in the playlist
    const isInPlaylist = playlist.some(item => item.id === video.id.videoId);
    if (!isInPlaylist) {
        playlist.push({
            id: video.id.videoId,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url
        });
        localStorage.setItem('playlist', JSON.stringify(playlist));
        displayPlaylist();
    }
}

// Display playlist
function displayPlaylist() {
    playlistContainer.innerHTML = '';
    playlist.forEach(video => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-item');
        playlistItem.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" width="50">
            <h3>${video.title}</h3>
        `;
        
        // Add event listener to play video from playlist
        playlistItem.addEventListener('click', () => playVideo(video.id));
        playlistContainer.appendChild(playlistItem);
    });
}

// Initialize playlist display
displayPlaylist();

// Elements
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const player = document.getElementById('player');
const errorMessage = document.getElementById('errorMessage');
const playPauseBtn = document.getElementById('playPauseBtn');

// Initialize Playlists from localStorage
let playlist1 = JSON.parse(localStorage.getItem('playlist1')) || [];
let playlist2 = JSON.parse(localStorage.getItem('playlist2')) || [];




// Show random songs on page load
function showRandomSongs(count = 5) {
    let shuffled = staticSongs.slice().sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, Math.min(count, staticSongs.length));
    displayResults(selected);
}

// Search static songs
function searchStaticSongs(query) {
    const lower = query.toLowerCase();
    const results = staticSongs.filter(song =>
        song.snippet.title.toLowerCase().includes(lower)
    );
    displayResults(results);
}

// Event listener for search input (updates on every keystroke)
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length > 2) {
        searchStaticSongs(query);
    } else {
        showRandomSongs();
    }
});

// --- QUEUE LOGIC ---
let songQueue = [];
let currentQueueIndex = -1;

// Add song to queue and play if nothing is playing
function addToQueue(video) {
    songQueue.push(video);
    if (currentQueueIndex === -1) {
        currentQueueIndex = 0;
        playQueueSong();
    }
}

// Play current song in queue
function playQueueSong() {
    if (currentQueueIndex >= 0 && currentQueueIndex < songQueue.length) {
        playVideo(songQueue[currentQueueIndex].id.videoId);
    }
}

// Skip to next song
function skipNext() {
    if (currentQueueIndex < songQueue.length - 1) {
        currentQueueIndex++;
        playQueueSong();
    }
}

// Skip to previous song
function skipPrev() {
    if (currentQueueIndex > 0) {
        currentQueueIndex--;
        playQueueSong();
    }
}

// Clear queue (optional)
function clearQueue() {
    songQueue = [];
    currentQueueIndex = -1;
}

// Display search results
function displayResults(videos) {
    resultsContainer.innerHTML = '';
    if (videos.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('result-item');
        videoItem.innerHTML = `
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">
            <h3>${video.snippet.title}</h3>
            <button class="add-to-playlist" data-video-id="${video.id.videoId}">Add to Playlist</button>
            <button class="add-to-queue" data-video-id="${video.id.videoId}">Queue</button>
        `;
        // Add to playlist
        const addButton = videoItem.querySelector('.add-to-playlist');
        addButton.addEventListener('click', (event) => {
            event.stopPropagation();
            addToPlaylist(video, 1);
        });
        // Add to queue
        const queueButton = videoItem.querySelector('.add-to-queue');
        queueButton.addEventListener('click', (event) => {
            event.stopPropagation();
            addToQueue(video);
        });
        videoItem.addEventListener('click', (event) => {
            // Prevent playVideo when clicking the button
            if (event.target !== addButton && event.target !== queueButton) {
                playVideo(video.id.videoId);
            }
        });
        resultsContainer.appendChild(videoItem);
    });
}

// Play selected video
function playVideo(videoId) {
    const ytplayer = document.getElementById('ytplayer');
    if (ytplayer) {
        // If the video is already loaded, just play it
        const currentSrc = ytplayer.src;
        if (currentSrc.includes(videoId)) {
            ytplayer.contentWindow.postMessage(JSON.stringify({
                event: 'command',
                func: 'playVideo',
                args: []
            }), '*');
        } else {
            ytplayer.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1`;
        }
    }
}

// Add video to a playlist (default to playlist1 for now)
function addToPlaylist(video, playlistNum = 1) {
    let playlist = playlistNum === 1 ? playlist1 : playlist2;
    const isInPlaylist = playlist.some(item => item.id === video.id.videoId);
    if (!isInPlaylist) {
        playlist.push({
            id: video.id.videoId,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url
        });
        displayPlaylist(`playlist${playlistNum}`, playlist);
        localStorage.setItem(`playlist${playlistNum}`, JSON.stringify(playlist));
    }
}

// Display playlist
function displayPlaylist(playlistId, items) {
    const playlistContainer = document.getElementById(playlistId);
    if (!playlistContainer) {
        console.error('Playlist container not found:', playlistId);
        return;
    }
    playlistContainer.innerHTML = '';
    items.forEach(video => {
        const playlistItem = document.createElement('div');
        playlistItem.classList.add('playlist-item');
        playlistItem.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" width="50">
            <h3>${video.title}</h3>
        `;
        playlistItem.addEventListener('click', () => playVideo(video.id));
        playlistContainer.appendChild(playlistItem);
    });
}
displayPlaylist('playlist2', playlist2);// --- SKIP BUTTONS ---
document.getElementById('prevBtn').addEventListener('click', skipPrev);
document.getElementById('nextBtn').addEventListener('click', skipNext);

// Show random songs on page load
showRandomSongs();

// Render queue display
function renderQueue() {
    const queueDisplay = document.getElementById('queueDisplay');
    if (!queueDisplay) return;
    if (songQueue.length === 0) {
        queueDisplay.innerHTML = "<h3>Queue</h3><p>No songs in queue.</p>";
        return;
    }
    let html = "<h3>Queue</h3><ul class='queue-list'>";
    songQueue.forEach((song, idx) => {
        html += `<li class="${idx === currentQueueIndex ? 'active' : ''}">
            <img src="${song.snippet?.thumbnails?.high?.url || song.thumbnail}" alt="">
            ${song.snippet?.title || song.title}
            <button class="remove-from-queue" data-idx="${idx}" title="Remove">🗑️</button>
        </li>`;
    });
    html += "</ul>";
    queueDisplay.innerHTML = html;

    // Add event listeners to remove buttons
    queueDisplay.querySelectorAll('.remove-from-queue').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const idx = parseInt(this.getAttribute('data-idx'));
            removeFromQueue(idx);
        });
    });
}

// Call renderQueue() after queue changes
// Example: after addToQueue, skipNext, skipPrev, playQueueSong, and clearQueue
// For example, add renderQueue(); at the end of these functions:
function addToQueue(video) {
    songQueue.push(video);
    if (currentQueueIndex === -1) {
        currentQueueIndex = 0;
        playQueueSong();
    }
    renderQueue();
}
function playQueueSong() {
    if (currentQueueIndex >= 0 && currentQueueIndex < songQueue.length) {
        playVideo(songQueue[currentQueueIndex].id.videoId);
        renderQueue();
    }
}
function skipNext() {
    if (currentQueueIndex < songQueue.length - 1) {
        currentQueueIndex++;
        playQueueSong();
    }
}
function skipPrev() {
    if (currentQueueIndex > 0) {
        currentQueueIndex--;
        playQueueSong();
    }
}
function clearQueue() {
    songQueue = [];
    currentQueueIndex = -1;
    renderQueue();
}

// --- PLAY/PAUSE BUTTON LOGIC ---
let isPlaying = false;
playPauseBtn.onclick = function() {
    const ytplayer = document.getElementById('ytplayer');
    if (!ytplayer) return;
    playPauseBtn.classList.add('pressed');
    setTimeout(() => playPauseBtn.classList.remove('pressed'), 150);

    if (!isPlaying) {
        ytplayer.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'playVideo',
            args: []
        }), '*');
        playPauseBtn.textContent = '⏸️';
    } else {
        ytplayer.contentWindow.postMessage(JSON.stringify({
            event: 'command',
            func: 'pauseVideo',
            args: []
        }), '*');
        playPauseBtn.textContent = '▶️';
    }
    isPlaying = !isPlaying;
};

// --- SHUFFLE BUTTON LOGIC ---
document.getElementById('shuffleBtn').addEventListener('click', function() {
    if (songQueue.length > 1) {
        // Shuffle the queue except the current song
        const current = songQueue[currentQueueIndex];
        const rest = songQueue.slice(0, currentQueueIndex).concat(songQueue.slice(currentQueueIndex + 1));
        for (let i = rest.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [rest[i], rest[j]] = [rest[j], rest[i]];
        }
        songQueue = [current, ...rest];
        currentQueueIndex = 0;
        renderQueue();
    }
});

// Initial render of the queue
renderQueue();

function removeFromQueue(idx) {
    // If removing the current song, skip to next or previous
    if (idx === currentQueueIndex) {
        if (songQueue.length === 1) {
            clearQueue();
            return;
        } else if (currentQueueIndex < songQueue.length - 1) {
            skipNext();
        } else {
            skipPrev();
        }
    }
    songQueue.splice(idx, 1);
    if (currentQueueIndex > idx) currentQueueIndex--;
    if (songQueue.length === 0) {
        currentQueueIndex = -1;
    } else if (currentQueueIndex >= songQueue.length) {
        currentQueueIndex = songQueue.length - 1;
    }
    renderQueue();
}

// Elements
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
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
    renderQueue();
}

// Play current song in queue
function playQueueSong() {
    if (currentQueueIndex >= 0 && currentQueueIndex < songQueue.length) {
        playVideo(songQueue[currentQueueIndex].id.videoId);
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
        renderQueue();
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
    renderQueue();
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

// --- YOUTUBE PLAYER LOGIC ---
let ytApiPlayer;
let isPlaying = false;

function onYouTubeIframeAPIReady() {
    let firstVideoId = (songQueue.length > 0 && currentQueueIndex >= 0)
        ? songQueue[currentQueueIndex].id.videoId
        : "fJ9rUzIMcZQ";
    ytApiPlayer = new YT.Player('player', {
        height: '225',
        width: '400',
        videoId: firstVideoId,
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        if (loopMode === 2) {
            // Repeat one ONCE, then reset to no repeat
            playQueueSong();
            loopMode = 0;
            updateLoopBtn();
        } else if (currentQueueIndex < songQueue.length - 1) {
            // Play next
            skipNext();
        } else if (loopMode === 1 && songQueue.length > 0) {
            // Repeat all
            currentQueueIndex = 0;
            playQueueSong();
        }
        // else: no repeat, do nothing
    }
}

function playVideo(videoId) {
    if (ytApiPlayer && ytApiPlayer.loadVideoById) {
        ytApiPlayer.loadVideoById(videoId);
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
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

// --- SKIP BUTTONS ---
document.getElementById('prevBtn').addEventListener('click', skipPrev);
document.getElementById('nextBtn').addEventListener('click', skipNext);

// --- PLAY/PAUSE BUTTON LOGIC ---
playPauseBtn.onclick = function() {
    if (!ytApiPlayer) return;
    playPauseBtn.classList.add('pressed');
    setTimeout(() => playPauseBtn.classList.remove('pressed'), 150);

    if (!isPlaying) {
        ytApiPlayer.playVideo();
        playPauseBtn.textContent = '⏸️';
    } else {
        ytApiPlayer.pauseVideo();
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

// --- QUEUE DISPLAY ---
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

// Remove from queue
function removeFromQueue(idx) {
    // If removing the current song, skip to next or previous
    if (idx === currentQueueIndex) {
        if (songQueue.length === 1) {
            clearQueue();
            renderQueue();
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

// --- MEDIA SESSION API (HEADPHONE BUTTONS) ---
if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => {
        document.getElementById('playPauseBtn').click();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
        document.getElementById('playPauseBtn').click();
    });
    navigator.mediaSession.setActionHandler('previoustrack', () => {
        document.getElementById('prevBtn').click();
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
        document.getElementById('nextBtn').click();
    });
}

// --- MEDIA SESSION METADATA (OPTIONAL) ---
function updateMediaSessionMetadata(song) {
    if ('mediaSession' in navigator && song) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.snippet?.title || song.title || 'Unknown',
            artist: '',
            album: '',
            artwork: [
                { src: song.snippet?.thumbnails?.high?.url || song.thumbnail, sizes: '512x512', type: 'image/png' }
            ]
        });
    }
}

// --- LOOP BUTTON LOGIC ---
let loopMode = 0; // 0 = no repeat, 1 = repeat all, 2 = repeat one
const loopBtn = document.getElementById('loopBtn');

function updateLoopBtn() {
    loopBtn.classList.remove('repeat-all', 'repeat-one', 'no-repeat');
    if (loopMode === 0) {
        loopBtn.textContent = '🔁';
        loopBtn.title = 'No repeat';
        loopBtn.style.color = '';
        loopBtn.classList.add('no-repeat');
    } else if (loopMode === 1) {
        loopBtn.textContent = '🔁';
        loopBtn.title = 'Repeat all';
        loopBtn.style.color = '#1db954';
        loopBtn.classList.add('repeat-all');
    } else if (loopMode === 2) {
        loopBtn.textContent = '🔂';
        loopBtn.title = 'Repeat one';
        loopBtn.style.color = '#fff';
        loopBtn.classList.add('repeat-one');
    }
}

loopBtn.addEventListener('click', () => {
    loopMode = (loopMode + 1) % 3;
    updateLoopBtn();
});
updateLoopBtn();

// --- INITIALIZE ---
showRandomSongs();
renderQueue();

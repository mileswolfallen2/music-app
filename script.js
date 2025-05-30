// --- ELEMENTS ---
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const loopBtn = document.getElementById('loopBtn');
const queueDisplay = document.getElementById('queueDisplay');
const songTitle = document.getElementById('songTitle');
const exploreBtn = document.getElementById('exploreBtn');
const recentSearches = document.getElementById('recentSearches');

// --- STATE ---
let songQueue = [];
let currentQueueIndex = -1;
let ytApiPlayer;
let isPlaying = false;
let loopMode = 0; // 0 = no repeat, 1 = repeat all, 2 = repeat one
let recentSearchList = JSON.parse(localStorage.getItem('recentSearches') || '[]');

// --- YOUTUBE PLAYER ---
function onYouTubeIframeAPIReady() {
    ytApiPlayer = new YT.Player('player', {
        height: '225',
        width: '400',
        videoId: '', // Start empty, only play after user action
        events: { 'onStateChange': onPlayerStateChange }
    });
}

function playVideo(videoId) {
    if (ytApiPlayer && ytApiPlayer.loadVideoById) {
        ytApiPlayer.loadVideoById(videoId);
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
        updateSongTitle();
    }
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        if (loopMode === 2) {
            playQueueSong();
            loopMode = 0;
            updateLoopBtn();
        } else if (currentQueueIndex < songQueue.length - 1) {
            skipNext();
        } else if (loopMode === 1 && songQueue.length > 0) {
            currentQueueIndex = 0;
            playQueueSong();
        }
    }
}

// --- QUEUE LOGIC ---
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

// --- DISPLAY ---
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
            <button class="add-to-queue">Queue</button>
        `;
        const queueButton = videoItem.querySelector('.add-to-queue');
        queueButton.addEventListener('click', (event) => {
            event.stopPropagation();
            addToQueue(video);
        });
        videoItem.addEventListener('click', () => {
            playVideo(video.id.videoId);
        });
        resultsContainer.appendChild(videoItem);
    });
}

function renderQueue() {
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
    queueDisplay.querySelectorAll('.remove-from-queue').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const idx = parseInt(this.getAttribute('data-idx'));
            removeFromQueue(idx);
        });
    });
}

function updateSongTitle() {
    if (currentQueueIndex >= 0 && songQueue[currentQueueIndex]) {
        songTitle.textContent = songQueue[currentQueueIndex].snippet?.title || songQueue[currentQueueIndex].title;
    } else {
        songTitle.textContent = '';
    }
}

// --- SEARCH ---
function showRandomSongs(count = 5) {
    let shuffled = staticSongs.slice().sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, Math.min(count, staticSongs.length));
    displayResults(selected);
}

function searchStaticSongs(query) {
    const lower = query.toLowerCase();
    const results = staticSongs.filter(song =>
        song.snippet.title.toLowerCase().includes(lower)
    );
    displayResults(results);
}

function showRecentSearches() {
    if (recentSearchList.length === 0) {
        recentSearches.style.display = 'none';
        return;
    }
    recentSearches.innerHTML = '';
    recentSearchList.slice(-5).reverse().forEach(term => {
        const li = document.createElement('li');
        li.textContent = term;
        li.onclick = () => {
            searchInput.value = term;
            searchInput.dispatchEvent(new Event('input'));
            recentSearches.style.display = 'none';
        };
        recentSearches.appendChild(li);
    });
    recentSearches.style.display = 'block';
}

function centerSearchBar() {
    resultsContainer.style.display = 'flex';
    resultsContainer.style.flexDirection = 'column';
    resultsContainer.style.alignItems = 'center';
}

function uncenterSearchBar() {
    resultsContainer.style.display = '';
    resultsContainer.style.flexDirection = '';
    resultsContainer.style.alignItems = '';
}

searchInput.addEventListener('focus', () => {
    exploreBtn.style.display = 'none';
});
searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        exploreBtn.style.display = 'inline-block';
    }, 200); // Wait for recentSearches click
});

// Save search term on Enter
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const term = searchInput.value.trim();
        if (term) {
            searchStaticSongs(term);
            centerSearchBar();
            // Save recent search
            if (!recentSearchList.includes(term)) {
                recentSearchList.push(term);
                if (recentSearchList.length > 10) recentSearchList.shift();
                localStorage.setItem('recentSearches', JSON.stringify(recentSearchList));
            }
        }
    }
});
searchInput.addEventListener('blur', uncenterSearchBar);

// --- CONTROLS ---
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

prevBtn.onclick = skipPrev;
nextBtn.onclick = skipNext;

shuffleBtn.onclick = function() {
    if (songQueue.length > 1) {
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
};

// --- LOOP BUTTON ---
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
loopBtn.onclick = function() {
    loopMode = (loopMode + 1) % 3;
    updateLoopBtn();
};
updateLoopBtn();

// --- REMOVE FROM QUEUE ---
function removeFromQueue(idx) {
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

// --- INITIALIZE ---
showRandomSongs();
renderQueue();

exploreBtn.onclick = function() {
    // Shuffle all songs and show them
    let shuffled = staticSongs.slice().sort(() => 0.5 - Math.random());
    displayResults(shuffled);
};
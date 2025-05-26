async function fetchPlaylist() {
  const playlistUrl = document.getElementById('playlistUrl').value.trim();
  const apiKey = document.getElementById('apiKey').value.trim();
  const output = document.getElementById('output');
  const playlistId = new URL(playlistUrl).searchParams.get('list');

  if (!playlistId || !apiKey) {
    output.textContent = '// Please provide a valid playlist URL and API key.';
    return;
  }

  let nextPageToken = '';
  let allItems = [];

  output.textContent = '// Fetching playlist data...';

  do {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}&pageToken=${nextPageToken}`
    );
    const data = await res.json();

    if (data.error) {
      output.textContent = `// Error: ${data.error.message}`;
      return;
    }

    allItems.push(...data.items);
    nextPageToken = data.nextPageToken || '';
  } while (nextPageToken);

  const songsArray = allItems
    .map(item => {
      const id = item.snippet.resourceId.videoId;
      const title = item.snippet.title.replace(/"/g, '\\"');
      const thumb = item.snippet.thumbnails.high.url;
      return `  {
    id: { videoId: "${id}" },
    snippet: {
      title: "${title}",
      thumbnails: { high: { url: "${thumb}" } }
    }
  }`;
    })
    .join(',\n');

  output.textContent = `const staticSongs = [\n${songsArray}\n];`;
}

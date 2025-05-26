// Elements
const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const player = document.getElementById('player');
const errorMessage = document.getElementById('errorMessage');

// Initialize Playlists from localStorage
let playlist1 = JSON.parse(localStorage.getItem('playlist1')) || [];
let playlist2 = JSON.parse(localStorage.getItem('playlist2')) || [];

// Static songs (add more as needed)
const staticSongs = [
  
  {
    id: { videoId: "sfoKu6BvWUs" },
    snippet: {
      title: "Plantera (from \"Terraria\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/sfoKu6BvWUs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "_ObcCtgOcHU" },
    snippet: {
      title: "Empress of Light",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/_ObcCtgOcHU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Dz3tP8IVhFY" },
    snippet: {
      title: "Boss2",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Dz3tP8IVhFY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "xW6nipLFOZA" },
    snippet: {
      title: "Boss 3",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/xW6nipLFOZA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "pBygBkCmE9o" },
    snippet: {
      title: "Boss 1",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/pBygBkCmE9o/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "qH5hM1ILuFQ" },
    snippet: {
      title: "Fallen Down",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/qH5hM1ILuFQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "o0tky2O8NlY" },
    snippet: {
      title: "Ghost Fight",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/o0tky2O8NlY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "BJEqdto_uGw" },
    snippet: {
      title: "Snowy",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/BJEqdto_uGw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Hgns7m6xufo" },
    snippet: {
      title: "Boom Boom Boom Boom Boom Boom Boom Boom Boom Boom Boom Boom Boom",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Hgns7m6xufo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "_3ngiSxVCBs" },
    snippet: {
      title: "Sweden",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/_3ngiSxVCBs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "XuZDeT8zI5c" },
    snippet: {
      title: "Minecraft",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/XuZDeT8zI5c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zK5ZdzRnQE8" },
    snippet: {
      title: "Cat",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zK5ZdzRnQE8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "c_sNBS-9Ras" },
    snippet: {
      title: "Crab Rave",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/c_sNBS-9Ras/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "b5Y0SGLGxLQ" },
    snippet: {
      title: "Zelda",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/b5Y0SGLGxLQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "SlrxBIL3ESM" },
    snippet: {
      title: "Bullet With Butterfly Wings (Remastered 2012)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/SlrxBIL3ESM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "lhg9bYNLvOg" },
    snippet: {
      title: "Thunderstruck",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/lhg9bYNLvOg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "S-LO6dctBms" },
    snippet: {
      title: "Eye of the Tiger",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/S-LO6dctBms/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9vWNauaZAgg" },
    snippet: {
      title: "Back In Black",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9vWNauaZAgg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "-ooKPtvKImw" },
    snippet: {
      title: "1979 (Remastered 2012)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/-ooKPtvKImw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "eW-iEHkU6nU" },
    snippet: {
      title: "Quiet Please!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/eW-iEHkU6nU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Q4GJGmJK8J4" },
    snippet: {
      title: "Nether Zombie Pigman Minecraft Rap",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Q4GJGmJK8J4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "5xa_BctduBk" },
    snippet: {
      title: "Bloody Murdered Bloody Soul Bloody Suspect",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/5xa_BctduBk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "0FCvzsVlXpQ" },
    snippet: {
      title: "MEGALOVANIA",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/0FCvzsVlXpQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "AKAiUtWZ4xY" },
    snippet: {
      title: "Bonetrousle",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/AKAiUtWZ4xY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "NH-GAwLAO30" },
    snippet: {
      title: "Spider Dance",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/NH-GAwLAO30/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "b2UHoGnGyvE" },
    snippet: {
      title: "sans.",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/b2UHoGnGyvE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "jqJo5mwt5DA" },
    snippet: {
      title: "Coconut Mall (From \"Mario Kart Wii\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/jqJo5mwt5DA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "kK81m-A3qpU" },
    snippet: {
      title: "otherside",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/kK81m-A3qpU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vBjscyFC3jo" },
    snippet: {
      title: "Attack of the Killer Queen",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vBjscyFC3jo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ApWpYmO7G28" },
    snippet: {
      title: "Spear of Justice",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ApWpYmO7G28/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Q9kDr4na0ls" },
    snippet: {
      title: "Death By Glamour",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Q9kDr4na0ls/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "DcERQHg3iy8" },
    snippet: {
      title: "Battle Against A True Hero",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/DcERQHg3iy8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "HA3Ks8NLS-Y" },
    snippet: {
      title: "Hopes And Dreams",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/HA3Ks8NLS-Y/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "BTthtlT80Rc" },
    snippet: {
      title: "Pigstep (Stereo Mix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/BTthtlT80Rc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "5qajT8lS2ok" },
    snippet: {
      title: "Finale",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/5qajT8lS2ok/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Z01Tsgwe2dQ" },
    snippet: {
      title: "THE WORLD REVOLVING",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Z01Tsgwe2dQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "qrtt7mgwCTw" },
    snippet: {
      title: "ASGORE",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/qrtt7mgwCTw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "YrN4HXfMZWg" },
    snippet: {
      title: "WITHERSTORM",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/YrN4HXfMZWg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "YNdas5fMA7Y" },
    snippet: {
      title: "An Ode To No One (Remastered 2012)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/YNdas5fMA7Y/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "EAD3dP3Qm6Q" },
    snippet: {
      title: "Love (Remastered 2012)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/EAD3dP3Qm6Q/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "8wP7qdZf8vo" },
    snippet: {
      title: "Muzzle (Remastered 2012)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/8wP7qdZf8vo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "nW9qOnvYhSM" },
    snippet: {
      title: "Welcome to The Internet",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/nW9qOnvYhSM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2rHRztFGOm8" },
    snippet: {
      title: "1985",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2rHRztFGOm8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "BCwVU1JfzWs" },
    snippet: {
      title: "EMOTIONAL DAMAGE MEME SONG (Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/BCwVU1JfzWs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "dp6cLZisGuA" },
    snippet: {
      title: "GigaChad Theme (Phonk House Version)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/dp6cLZisGuA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "axHsiysyaWs" },
    snippet: {
      title: "SPONGEBOB SONG (From \"Spongebob Squarepants\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/axHsiysyaWs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "H5s40sDP-94" },
    snippet: {
      title: "Thrift Shop (feat. Wanz)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/H5s40sDP-94/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vrFBAIVb8fQ" },
    snippet: {
      title: "My Ordinary Life",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vrFBAIVb8fQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PjWNN4fQowQ" },
    snippet: {
      title: "Rap God",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PjWNN4fQowQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zLxXqEZ5OoA" },
    snippet: {
      title: "Can't Hold Us (feat. Ray Dalton)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zLxXqEZ5OoA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "5Z56MZFMp0k" },
    snippet: {
      title: "Discord",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/5Z56MZFMp0k/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "kOn-HdEg6AQ" },
    snippet: {
      title: "Beat It",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/kOn-HdEg6AQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "gTdStPLAdkU" },
    snippet: {
      title: "Toxic",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/gTdStPLAdkU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "K1FlAphL2p8" },
    snippet: {
      title: "Stressed Out",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/K1FlAphL2p8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ikFFVfObwss" },
    snippet: {
      title: "Highway to Hell",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ikFFVfObwss/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "FLLlcBUbJPo" },
    snippet: {
      title: "Poison (Hazbin Hotel Original Soundtrack)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/FLLlcBUbJPo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PWqcKxeJGM8" },
    snippet: {
      title: "The Duck Song 4",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PWqcKxeJGM8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "lXy_POQtsAQ" },
    snippet: {
      title: "Seek",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/lXy_POQtsAQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "aKbe-SUIOzs" },
    snippet: {
      title: "Amish Paradise (Parody of \"Gangsta's Paradise\" by Coolio)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/aKbe-SUIOzs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "_GWKkqNoyEA" },
    snippet: {
      title: "Counting Stars",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/_GWKkqNoyEA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zi3hItzxRwg" },
    snippet: {
      title: "Livin' On A Prayer",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zi3hItzxRwg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PIidgyl8U9s" },
    snippet: {
      title: "Bleed It Out",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PIidgyl8U9s/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ph5cmpX1FyM" },
    snippet: {
      title: "It's Corn",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ph5cmpX1FyM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "dy9ugPD6_AE" },
    snippet: {
      title: "It's Been So Long",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/dy9ugPD6_AE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "U-3kJcBfQ9w" },
    snippet: {
      title: "Rip & Tear",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/U-3kJcBfQ9w/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "hRAeGYHNLag" },
    snippet: {
      title: "Captain Underpants Theme Song",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/hRAeGYHNLag/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PHn5Q7hCjxw" },
    snippet: {
      title: "Immortals",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PHn5Q7hCjxw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "bHmv0EdvgbE" },
    snippet: {
      title: "A-Bit of Pokemon",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/bHmv0EdvgbE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "e_KmE8FCMUQ" },
    snippet: {
      title: "A-Bit of Final Fantasy",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/e_KmE8FCMUQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Xqq8iN4stTg" },
    snippet: {
      title: "A-Bit of Nintendo 2",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Xqq8iN4stTg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "t0dXdzFwMdo" },
    snippet: {
      title: "A-Bit of C2C",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/t0dXdzFwMdo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "UDnzMp_58dI" },
    snippet: {
      title: "I've Got a Bone",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/UDnzMp_58dI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "DvdeE6KzrTc" },
    snippet: {
      title: "Bulls On Parade",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/DvdeE6KzrTc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "FFMyMwjWqXs" },
    snippet: {
      title: "Guerrilla Radio",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/FFMyMwjWqXs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "NRZg4bwtM4Q" },
    snippet: {
      title: "People of the Sun",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/NRZg4bwtM4Q/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "dfk6i41GCNo" },
    snippet: {
      title: "Centuries",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/dfk6i41GCNo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "P43XYXqJJlU" },
    snippet: {
      title: "Dance, Dance",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/P43XYXqJJlU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "H6SL_OpnrCY" },
    snippet: {
      title: "Hell Is Forever",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/H6SL_OpnrCY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "OkgXkkX4dwk" },
    snippet: {
      title: "Poison (Hazbin Hotel Original Soundtrack)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/OkgXkkX4dwk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "tOoG9sE4yaI" },
    snippet: {
      title: "MINECRAFT THEME SONG",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/tOoG9sE4yaI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ah7uwYHt5Uc" },
    snippet: {
      title: "DOGE MEME SONG (Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ah7uwYHt5Uc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ql275ovMVoM" },
    snippet: {
      title: "THE CHICKEN WING SONG (Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ql275ovMVoM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "s2wfv8W4pvY" },
    snippet: {
      title: "KRUSTY KRAB TRAP (From \"Spongebob Squarepants\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/s2wfv8W4pvY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "hpKBphm6CPo" },
    snippet: {
      title: "Irresistible",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/hpKBphm6CPo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "K9fISloOznc" },
    snippet: {
      title: "Wake Me Up",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/K9fISloOznc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PMF-V6NbzrY" },
    snippet: {
      title: "I Got No Time",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PMF-V6NbzrY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ImXFp0B3qLE" },
    snippet: {
      title: "Basics in Behavior (feat. Or3o) (Blue Version)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ImXFp0B3qLE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ds20Bu62P6I" },
    snippet: {
      title: "I Can't Fix You (feat. Crusher-P)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ds20Bu62P6I/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "yDKO6Uv4u4s" },
    snippet: {
      title: "Is It Me (feat. Guy First)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/yDKO6Uv4u4s/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "pSRU3YqCp8E" },
    snippet: {
      title: "Me and the Boys (feat. Matan Egozi)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/pSRU3YqCp8E/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Pdrqu7R_yKQ" },
    snippet: {
      title: "Enderman Rap (feat. Rockit Gaming)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Pdrqu7R_yKQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "C-BYknjAdm0" },
    snippet: {
      title: "Bull Is The Spider",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/C-BYknjAdm0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "6XAz7PbG87w" },
    snippet: {
      title: "Happy Day In Hell",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/6XAz7PbG87w/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "6GvbdOL4GXo" },
    snippet: {
      title: "Stayed Gone",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/6GvbdOL4GXo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "6nQtQqWB03M" },
    snippet: {
      title: "Get Ready for This",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/6nQtQqWB03M/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "JbyaPmv5Gc0" },
    snippet: {
      title: "Sleep Now In the Fire",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/JbyaPmv5Gc0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "p0AoZpFzscM" },
    snippet: {
      title: "MRBEAST MEME SONG (TIKTOK)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/p0AoZpFzscM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "y0D7dtjug2E" },
    snippet: {
      title: "Dancin’",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/y0D7dtjug2E/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "F_dAJ58Egxk" },
    snippet: {
      title: "I Got No Time",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/F_dAJ58Egxk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "BON8T-cUQxg" },
    snippet: {
      title: "SKIBIDI TOILET (8-bit)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/BON8T-cUQxg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "SnixI3XTwF0" },
    snippet: {
      title: "Paganini Drill",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/SnixI3XTwF0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Gk_H2ap7TW8" },
    snippet: {
      title: "Discord (Trap Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Gk_H2ap7TW8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "MC2osTFmOpw" },
    snippet: {
      title: "Maxwell The Cat",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/MC2osTFmOpw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Z9GJ3zB1PN0" },
    snippet: {
      title: "Somebody That I Used To Know (8D Audio)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Z9GJ3zB1PN0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "1-PPFEYdlyE" },
    snippet: {
      title: "Heaven 2 Hell (feat. Elsie Lovelock)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/1-PPFEYdlyE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "yjwJIjNuniQ" },
    snippet: {
      title: "Lobby Music (Original Soundtrack)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/yjwJIjNuniQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "KFA1hM91ffo" },
    snippet: {
      title: "In the End",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/KFA1hM91ffo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "SUDZ0M8kM5M" },
    snippet: {
      title: "Crab Rave (Phonk)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/SUDZ0M8kM5M/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "mdPar8ylcaY" },
    snippet: {
      title: "Krusty Krab - Trap",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/mdPar8ylcaY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Nocms-9_xtM" },
    snippet: {
      title: "Crab Rave Orchestral",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Nocms-9_xtM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "6GF0-mB5--4" },
    snippet: {
      title: "Barracuda",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/6GF0-mB5--4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "P-X-iHTe5PI" },
    snippet: {
      title: "Am I Dreaming",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/P-X-iHTe5PI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "l0_fzBl2bz0" },
    snippet: {
      title: "Swing",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/l0_fzBl2bz0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ZMPh5aFuTp0" },
    snippet: {
      title: "Don't Give Up",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ZMPh5aFuTp0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "n9Dq-Np7JXo" },
    snippet: {
      title: "Rap Battle Suite",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/n9Dq-Np7JXo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "BSPAYaFg7y8" },
    snippet: {
      title: "Forgive Me (Show Version)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/BSPAYaFg7y8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "4ET48HCp0xg" },
    snippet: {
      title: "Forgive Me (Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/4ET48HCp0xg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "f23_Cn-4fRQ" },
    snippet: {
      title: "Revenge",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/f23_Cn-4fRQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ys3z7MT5Qjg" },
    snippet: {
      title: "To the Bone",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ys3z7MT5Qjg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "lr4vi_XAjQQ" },
    snippet: {
      title: "Loonboon",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/lr4vi_XAjQQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "R0mOeL0HrYo" },
    snippet: {
      title: "Fallen Kingdom",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/R0mOeL0HrYo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "hdZr9rGbd1c" },
    snippet: {
      title: "FaceTime with my Mom (Tonight)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/hdZr9rGbd1c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vbMh38KGZMM" },
    snippet: {
      title: "Savior",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vbMh38KGZMM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "mHSnuL-LGNU" },
    snippet: {
      title: "Memory Reboot",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/mHSnuL-LGNU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Em5ILSJmAI4" },
    snippet: {
      title: "Memory Reboot (Sped Up)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Em5ILSJmAI4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "m-uD9OQEa24" },
    snippet: {
      title: "Art Inside",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/m-uD9OQEa24/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "hz4IkcalsjM" },
    snippet: {
      title: "Cereal Killa",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/hz4IkcalsjM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vbMh38KGZMM" },
    snippet: {
      title: "Savior",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vbMh38KGZMM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "S7RlUrZ5dz0" },
    snippet: {
      title: "Kernkraft 400",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/S7RlUrZ5dz0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "8sFDNOW25fE" },
    snippet: {
      title: "Temporary Love (feat. CG5)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/8sFDNOW25fE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "fuiHWCz61DQ" },
    snippet: {
      title: "Stranded",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/fuiHWCz61DQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9kznlAwE-8o" },
    snippet: {
      title: "Mockingbird",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9kznlAwE-8o/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "aJtqNBRjgb0" },
    snippet: {
      title: "WITHERSTORM 2",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/aJtqNBRjgb0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Mngpmum3ldM" },
    snippet: {
      title: "BLOODBATH",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Mngpmum3ldM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "IjBTnpYRcgQ" },
    snippet: {
      title: "Milky Ways",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/IjBTnpYRcgQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zlVPfl-JfuI" },
    snippet: {
      title: "Music for Vloggers",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zlVPfl-JfuI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "qPdmYqCt0MU" },
    snippet: {
      title: "untitled",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/qPdmYqCt0MU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "U4zA0xnBEJU" },
    snippet: {
      title: "Everybody Wants To Rule The World",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/U4zA0xnBEJU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "eS2s0zw9dz0" },
    snippet: {
      title: "Classic Joyride",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/eS2s0zw9dz0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "dlYDlxOzj58" },
    snippet: {
      title: "Among Us (Trap Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/dlYDlxOzj58/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "g9qpQGuXO8c" },
    snippet: {
      title: "Don't Mine at Night - Minecraft Parody",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/g9qpQGuXO8c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Kx7B-XvmFtE" },
    snippet: {
      title: "Believer",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Kx7B-XvmFtE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "K3fC-E16VMs" },
    snippet: {
      title: "I'm a Zombie",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/K3fC-E16VMs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "cygu65ytwTc" },
    snippet: {
      title: "ALL MY FELLAS",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/cygu65ytwTc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "XdaqRKg45Os" },
    snippet: {
      title: "Meme Till You're Dead",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/XdaqRKg45Os/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "cFThccrILVQ" },
    snippet: {
      title: "100 Memes in 1 Song",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/cFThccrILVQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "LZTOfQiudx0" },
    snippet: {
      title: "bee.",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/LZTOfQiudx0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9rMFfzIAHic" },
    snippet: {
      title: "Dance Till You're Dead",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9rMFfzIAHic/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "onsdsA5aBfs" },
    snippet: {
      title: "Dance Til Your Dead",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/onsdsA5aBfs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "m6ebkxVuouc" },
    snippet: {
      title: "Doin Your Mom",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/m6ebkxVuouc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "QEpc7F6sS4M" },
    snippet: {
      title: "Unity",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/QEpc7F6sS4M/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "fovL1AORdec" },
    snippet: {
      title: "The Bottom Line",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/fovL1AORdec/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "cwt-7noTzZ4" },
    snippet: {
      title: "That's Rich",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/cwt-7noTzZ4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "V18l_o0u89g" },
    snippet: {
      title: "King Of New York",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/V18l_o0u89g/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "D458Eaql_aQ" },
    snippet: {
      title: "Wellerman (Sea Shanty)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/D458Eaql_aQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vGaqMI4AVsk" },
    snippet: {
      title: "I'm Still Standing",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vGaqMI4AVsk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vxKQj9Mun-Q" },
    snippet: {
      title: "Life Is Fun (feat. TheOdd1sOut)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vxKQj9Mun-Q/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "UjWZGLi-1jM" },
    snippet: {
      title: "Kryptonite",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/UjWZGLi-1jM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "OOIAkssrmKw" },
    snippet: {
      title: "Burgers & Caviar",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/OOIAkssrmKw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Ijo8-8oYiaA" },
    snippet: {
      title: "Bang!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Ijo8-8oYiaA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "iU5pMzwDTyM" },
    snippet: {
      title: "Chicken Wing Beat (Instrumental)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/iU5pMzwDTyM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "qNURw0uFm8Q" },
    snippet: {
      title: "Chug Jug With You",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/qNURw0uFm8Q/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "R4hDcd9fzRk" },
    snippet: {
      title: "Legends Never Die",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/R4hDcd9fzRk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "E40DGYa2QQ8" },
    snippet: {
      title: "Nyan Cat Theme",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/E40DGYa2QQ8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vxKQj9Mun-Q" },
    snippet: {
      title: "Life Is Fun (feat. TheOdd1sOut)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vxKQj9Mun-Q/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "b2UHoGnGyvE" },
    snippet: {
      title: "sans.",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/b2UHoGnGyvE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "eS2s0zw9dz0" },
    snippet: {
      title: "Classic Joyride",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/eS2s0zw9dz0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "sbdadgD_Px8" },
    snippet: {
      title: "Hell’s Greatest Dad",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/sbdadgD_Px8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "B9e623M06xM" },
    snippet: {
      title: "Blue (Da Ba Dee)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/B9e623M06xM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "3g4J9dsGW4Y" },
    snippet: {
      title: "7 Minutes In Heaven (Atavan Halen)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/3g4J9dsGW4Y/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "a17pgn0qmXA" },
    snippet: {
      title: "No Mercy (feat. BlackGryph0n & LittleJayneyCakes)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/a17pgn0qmXA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "6A9uQyamyaw" },
    snippet: {
      title: "Electronic Music for a Video Game",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/6A9uQyamyaw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "l-uVkrzo8eU" },
    snippet: {
      title: "Downtown (feat. Melle Mel, Grandmaster Caz, Kool Moe Dee & Eric Nally)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/l-uVkrzo8eU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Y10PRnL7C_U" },
    snippet: {
      title: "Angry Birds Theme",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Y10PRnL7C_U/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "64FVMHGZcYI" },
    snippet: {
      title: "TNT",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/64FVMHGZcYI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "7PQsGX1YOuE" },
    snippet: {
      title: "Jump Up, Super Star!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/7PQsGX1YOuE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "QydzTeVCeAA" },
    snippet: {
      title: "Doom Crossing: Eternal Horizons (feat. Natalia Natchan)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/QydzTeVCeAA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "K9fISloOznc" },
    snippet: {
      title: "Wake Me Up",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/K9fISloOznc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PPfi7o2Pa64" },
    snippet: {
      title: "Chug Jug With You (Number One Victory Royale)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PPfi7o2Pa64/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Mq-tfxKPN6s" },
    snippet: {
      title: "How Bad Can I Be?",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Mq-tfxKPN6s/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "tFdNSWEtm1c" },
    snippet: {
      title: "Build Our Machine",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/tFdNSWEtm1c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "qYpEAslrhAI" },
    snippet: {
      title: "Ocarina Of Time - Gerudo valley",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/qYpEAslrhAI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "hQ_Z-10dXSE" },
    snippet: {
      title: "Crazy Train",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/hQ_Z-10dXSE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "U4zA0xnBEJU" },
    snippet: {
      title: "Everybody Wants To Rule The World",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/U4zA0xnBEJU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "IZNHNrAIWps" },
    snippet: {
      title: "Ruckus",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/IZNHNrAIWps/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "qbiXHjFvepY" },
    snippet: {
      title: "uhh",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/qbiXHjFvepY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ZjB-sz62tJ8" },
    snippet: {
      title: "Lose Yourself",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ZjB-sz62tJ8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "tFdNSWEtm1c" },
    snippet: {
      title: "Build Our Machine",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/tFdNSWEtm1c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "h6863vjJ9Ds" },
    snippet: {
      title: "Monster",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/h6863vjJ9Ds/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Z9GJ3zB1PN0" },
    snippet: {
      title: "Somebody That I Used To Know (8D Audio)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Z9GJ3zB1PN0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "P05bTId-92A" },
    snippet: {
      title: "Business",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/P05bTId-92A/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2JwRWieRoeU" },
    snippet: {
      title: "One More Pull",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2JwRWieRoeU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "HTAGgR893ZI" },
    snippet: {
      title: "Bowsette",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/HTAGgR893ZI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "70ocdx2SioY" },
    snippet: {
      title: "Count to Three (feat. The Stupendium & Ellen McLain)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/70ocdx2SioY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Wa2YQxyx16s" },
    snippet: {
      title: "The MCC",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Wa2YQxyx16s/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "hOFkhNijQeY" },
    snippet: {
      title: "Won't Back Down",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/hOFkhNijQeY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "1aI1ukTjkfc" },
    snippet: {
      title: "Beep Beep I'm a Sheep (feat. TomSka & Black Gryph0n)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/1aI1ukTjkfc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2rHRztFGOm8" },
    snippet: {
      title: "1985",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2rHRztFGOm8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "5qajT8lS2ok" },
    snippet: {
      title: "Finale",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/5qajT8lS2ok/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "-IZAMGXV2Bw" },
    snippet: {
      title: "Closing In",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/-IZAMGXV2Bw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "_Cl9M41un_I" },
    snippet: {
      title: "Outro Song",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/_Cl9M41un_I/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "37f02t0FxGs" },
    snippet: {
      title: "Stupid Nintendo Games",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/37f02t0FxGs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "NB_Ax6OGdG4" },
    snippet: {
      title: "Closing In (Instrumental)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/NB_Ax6OGdG4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "J8F5YPrHzxc" },
    snippet: {
      title: "I See a Dreamer",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/J8F5YPrHzxc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "u_FRDqHT5y0" },
    snippet: {
      title: "Undefeatable (feat. Kellin Quinn)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/u_FRDqHT5y0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "MPBgDaTxIgQ" },
    snippet: {
      title: "Igowallah",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/MPBgDaTxIgQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "OaVmXJxlbJc" },
    snippet: {
      title: "DON'T WASTE MY TIME",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/OaVmXJxlbJc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "I2knpny3F50" },
    snippet: {
      title: "run little hero",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/I2knpny3F50/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "t2HrgGzjx5I" },
    snippet: {
      title: "Give a Little",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/t2HrgGzjx5I/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "TSmcumycNxc" },
    snippet: {
      title: "Overwhelmed (Ryan Mack Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/TSmcumycNxc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "sGtEOGv9cVc" },
    snippet: {
      title: "give a little.",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/sGtEOGv9cVc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "oilc9lTK7T8" },
    snippet: {
      title: "A Little Like",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/oilc9lTK7T8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "BsTpFB2jZmo" },
    snippet: {
      title: "Typical Me",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/BsTpFB2jZmo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "1JGczMfwqo0" },
    snippet: {
      title: "Mr. Bones (feat. Kanaya)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/1JGczMfwqo0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "01nIX1yjAug" },
    snippet: {
      title: "Hush (feat. Mizz Fish)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/01nIX1yjAug/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "-Hi3B3Hrvso" },
    snippet: {
      title: "ERROR143",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/-Hi3B3Hrvso/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Ia27hJCXv4k" },
    snippet: {
      title: "Boo (feat. Tia Jade)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Ia27hJCXv4k/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Qm5fOThK7-A" },
    snippet: {
      title: "APHRODITE",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Qm5fOThK7-A/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "TbSdmHLOJQ8" },
    snippet: {
      title: "wednesday",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/TbSdmHLOJQ8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Ufprc08a1zs" },
    snippet: {
      title: "INDIFFERENT",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Ufprc08a1zs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "8LP06S14Q0k" },
    snippet: {
      title: "UNBELIEVABLE",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/8LP06S14Q0k/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "w_EbL-rkNgs" },
    snippet: {
      title: "I Should Have Stayed at Home",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/w_EbL-rkNgs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "-UybJnQ2hIw" },
    snippet: {
      title: "Wish You the Worst",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/-UybJnQ2hIw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "oNVfUEf7_qg" },
    snippet: {
      title: "Only Human",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/oNVfUEf7_qg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "j9ikzQ90arA" },
    snippet: {
      title: "On My Way",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/j9ikzQ90arA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "oecdj2v0-Y4" },
    snippet: {
      title: "BACKSTEP (backstab)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/oecdj2v0-Y4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "V2rE3cS9I7o" },
    snippet: {
      title: "overwhelmed",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/V2rE3cS9I7o/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "NQlP8AObgNw" },
    snippet: {
      title: "Violet",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/NQlP8AObgNw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "mSHkNdB8x-A" },
    snippet: {
      title: "Public Service Announcement",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/mSHkNdB8x-A/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "v3DjoDQe8vo" },
    snippet: {
      title: "Guilty Conscience",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/v3DjoDQe8vo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "cuVbhz8IkDM" },
    snippet: {
      title: "The Monster",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/cuVbhz8IkDM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2T2JvlycWkA" },
    snippet: {
      title: "DISILLUSIONED",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2T2JvlycWkA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Oppmsc7fZS8" },
    snippet: {
      title: "play pretenses",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Oppmsc7fZS8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ph5cmpX1FyM" },
    snippet: {
      title: "It's Corn",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ph5cmpX1FyM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "8VHHNLV4roc" },
    snippet: {
      title: "dopamine highscore",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/8VHHNLV4roc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zVrTQR4UIk8" },
    snippet: {
      title: "Back and Forth",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zVrTQR4UIk8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "JKckyynY9eA" },
    snippet: {
      title: "make it one",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/JKckyynY9eA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "rbvbzMZmuIc" },
    snippet: {
      title: "Heroes and Gardens",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/rbvbzMZmuIc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "E938KHTMCac" },
    snippet: {
      title: "Ievan Polkka (Remastered 2024)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/E938KHTMCac/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "G2PDJTkFiA8" },
    snippet: {
      title: "Miku",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/G2PDJTkFiA8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zloO9BGk0DA" },
    snippet: {
      title: "Fly Octo Fly ~ Ebb & Flow (From \"Splatoon 2: Octo Expansion\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zloO9BGk0DA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ibjWftkJrd4" },
    snippet: {
      title: "メズマライザー (feat. 初音ミク & 重音テト)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ibjWftkJrd4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "a0QJBXSIVBM" },
    snippet: {
      title: "NPC",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/a0QJBXSIVBM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "8Y2SbAlKRIY" },
    snippet: {
      title: "Miku (Japanese Version)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/8Y2SbAlKRIY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "a85IYTGO8lQ" },
    snippet: {
      title: "Water Resistant",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/a85IYTGO8lQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ABsbUXGtJs4" },
    snippet: {
      title: "Dream It. Feel It.",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ABsbUXGtJs4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "-bPjjo3mCEo" },
    snippet: {
      title: "Bubblegum Beats!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/-bPjjo3mCEo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "iAU1LmhtCSw" },
    snippet: {
      title: "39みゅーじっく!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/iAU1LmhtCSw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "oWxpQBzC-aE" },
    snippet: {
      title: "Lonely King",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/oWxpQBzC-aE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "48e3N_OoRD8" },
    snippet: {
      title: "Lyin' 2 Me",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/48e3N_OoRD8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "B9e623M06xM" },
    snippet: {
      title: "Blue (Da Ba Dee)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/B9e623M06xM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "17JZKJlx5uI" },
    snippet: {
      title: "M@GICAL☆CURE! LOVE SHOT! (feat. Hatsune Miku)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/17JZKJlx5uI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "k7UeDRKosJE" },
    snippet: {
      title: "NEON SUNRISE",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/k7UeDRKosJE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "GYqbdR7GSio" },
    snippet: {
      title: "Why Do I",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/GYqbdR7GSio/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "pS5d77DQHOI" },
    snippet: {
      title: "Tokyo Drift (Fast & Furious)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/pS5d77DQHOI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "nKkMVa7jmBA" },
    snippet: {
      title: "Starry Night",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/nKkMVa7jmBA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "LZRt5bIrAZI" },
    snippet: {
      title: "Fuck The Haters",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/LZRt5bIrAZI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "_-IlaUlUmzM" },
    snippet: {
      title: "Calm Nights",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/_-IlaUlUmzM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "h2U3jdMS8LE" },
    snippet: {
      title: "PLAYGROUND",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/h2U3jdMS8LE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "KaVEatM7_Og" },
    snippet: {
      title: "HEAT RISE",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/KaVEatM7_Og/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "fDb-QqFptGg" },
    snippet: {
      title: "empty promise",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/fDb-QqFptGg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vIfDFxPpv5A" },
    snippet: {
      title: "what is wrong with me",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vIfDFxPpv5A/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ijP1D71J0vc" },
    snippet: {
      title: "Poppin'",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ijP1D71J0vc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "UYSd7r-SJqQ" },
    snippet: {
      title: "The Windows Update Song",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/UYSd7r-SJqQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "rsf_gTZG4cI" },
    snippet: {
      title: "Come and Get Your Love",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/rsf_gTZG4cI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "0_Cgvqp3qsQ" },
    snippet: {
      title: "Mother Nature",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/0_Cgvqp3qsQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "XPnDg44OSFs" },
    snippet: {
      title: "Textbook Manipulation",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/XPnDg44OSFs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vSmyEJ3CSaw" },
    snippet: {
      title: "Fall",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vSmyEJ3CSaw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ZBqzrGaiO4A" },
    snippet: {
      title: "Bucket List",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ZBqzrGaiO4A/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "8K9F08miP1c" },
    snippet: {
      title: "Dance Floor",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/8K9F08miP1c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "58i04nUJOK0" },
    snippet: {
      title: "The Pi Song 2.0 (200 Digits of Π)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/58i04nUJOK0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "QydzTeVCeAA" },
    snippet: {
      title: "Doom Crossing: Eternal Horizons (feat. Natalia Natchan)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/QydzTeVCeAA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "gFOJkIk8fcs" },
    snippet: {
      title: "Insane",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/gFOJkIk8fcs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "J8RduBcvtz0" },
    snippet: {
      title: "Zavodila",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/J8RduBcvtz0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "0P19rsu3jXY" },
    snippet: {
      title: "chains",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/0P19rsu3jXY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "xIQpLlYC8xA" },
    snippet: {
      title: "Houdini",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/xIQpLlYC8xA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ech0M5yrDEI" },
    snippet: {
      title: "BIKE",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ech0M5yrDEI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "nOpM5DO8JOg" },
    snippet: {
      title: "Eeeaaaooo",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/nOpM5DO8JOg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "bFh2LY_UHPY" },
    snippet: {
      title: "The Sphere Piano Solo Version",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/bFh2LY_UHPY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "pgP6aWg6Fyo" },
    snippet: {
      title: "Dimension",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/pgP6aWg6Fyo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "abwf-BdPFsQ" },
    snippet: {
      title: "CUTE DEPRESSED",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/abwf-BdPFsQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "jDe1W-qitTo" },
    snippet: {
      title: "sigma",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/jDe1W-qitTo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "MMxUFdT-OLY" },
    snippet: {
      title: "CUTE MEMORIES (Sped up)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/MMxUFdT-OLY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Ra5qZDJefJs" },
    snippet: {
      title: "2 Phút Hơn (KAIZ Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Ra5qZDJefJs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "cDRPwloFkAw" },
    snippet: {
      title: "My No No Square",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/cDRPwloFkAw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "wKfOA9sgfO8" },
    snippet: {
      title: "Alastor's Game",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/wKfOA9sgfO8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Z-g3e18qAtU" },
    snippet: {
      title: "This Comes From Inside",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Z-g3e18qAtU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "pe6Ch0mq7HI" },
    snippet: {
      title: "A Songus Amongus (feat. Black Gryph0n)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/pe6Ch0mq7HI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "oI_WT0um4Y0" },
    snippet: {
      title: "MUFFIN",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/oI_WT0um4Y0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "cQzMHhRCTYw" },
    snippet: {
      title: "Buddy Holly",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/cQzMHhRCTYw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "LQcMOI8dMas" },
    snippet: {
      title: "Say It Ain't So (Original Mix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/LQcMOI8dMas/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ONhfmrKJ5kE" },
    snippet: {
      title: "Undone - The Sweater Song",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ONhfmrKJ5kE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "m47kW8rlOZ4" },
    snippet: {
      title: "Stuck Inside (CG5 Remix) (feat. Kevin Foster & Baasik)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/m47kW8rlOZ4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Zh9p-6JfrSo" },
    snippet: {
      title: "The Search",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Zh9p-6JfrSo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "8fM1xnLTApg" },
    snippet: {
      title: "MOTTO",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/8fM1xnLTApg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "WD5xmD8D-lE" },
    snippet: {
      title: "CAREFUL",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/WD5xmD8D-lE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zpp6ZvJ351Q" },
    snippet: {
      title: "PANDEMONIUM",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zpp6ZvJ351Q/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ZGXw-AiXJ8g" },
    snippet: {
      title: "When I Grow Up",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ZGXw-AiXJ8g/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "KFA1hM91ffo" },
    snippet: {
      title: "In the End",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/KFA1hM91ffo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "XPnDg44OSFs" },
    snippet: {
      title: "Textbook Manipulation",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/XPnDg44OSFs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "hzO05Nb4_Hg" },
    snippet: {
      title: "Disco",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/hzO05Nb4_Hg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "sW6f4FXFzA0" },
    snippet: {
      title: "Cure For Me",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/sW6f4FXFzA0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2qPlX1FMJXI" },
    snippet: {
      title: "Into the Unknown",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2qPlX1FMJXI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "v4hFHWcunr0" },
    snippet: {
      title: "Rise Guys (feat. Dennis DeMille)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/v4hFHWcunr0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "_M-h1fC6EuQ" },
    snippet: {
      title: "Crushing Thirties (feat. Johnny Gioeli)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/_M-h1fC6EuQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zRXl8Ow2bUs" },
    snippet: {
      title: "It Just Works",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zRXl8Ow2bUs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9wRJT671RcI" },
    snippet: {
      title: "You Keep Me Crawling",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9wRJT671RcI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "nOpM5DO8JOg" },
    snippet: {
      title: "Eeeaaaooo",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/nOpM5DO8JOg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9rMFfzIAHic" },
    snippet: {
      title: "Dance Till You're Dead",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9rMFfzIAHic/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "P-m0SHO6aeQ" },
    snippet: {
      title: "Somebody That I Used To Know / Wokeuplikethis!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/P-m0SHO6aeQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "dNzrgLoQEAY" },
    snippet: {
      title: "Give It To Me x Dom Dom Yes Yes",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/dNzrgLoQEAY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "nrcb_q1MejQ" },
    snippet: {
      title: "Cuphead Rap",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/nrcb_q1MejQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "42ajI7Q8DKY" },
    snippet: {
      title: "Countdown Song",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/42ajI7Q8DKY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "KFS9c852M_k" },
    snippet: {
      title: "Somebody's Watching Me",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/KFS9c852M_k/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "8v9V6oNGAvw" },
    snippet: {
      title: "Life is a Highway",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/8v9V6oNGAvw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "-4Ug-Axl7Lg" },
    snippet: {
      title: "Lost",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/-4Ug-Axl7Lg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "41537tXF5-U" },
    snippet: {
      title: "Who's the (Bat) Man",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/41537tXF5-U/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "FDNiE5CKuSw" },
    snippet: {
      title: "Shepherd of Fire",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/FDNiE5CKuSw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "qu0k38VMaV4" },
    snippet: {
      title: "What I've Done",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/qu0k38VMaV4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "3MqC22ORRZo" },
    snippet: {
      title: "Papercut (Live at BBC1)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/3MqC22ORRZo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "M4PYHSsRTW0" },
    snippet: {
      title: "CLOUDS (Edit)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/M4PYHSsRTW0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "sHO2SiCYsSA" },
    snippet: {
      title: "Everything Matters",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/sHO2SiCYsSA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "MMyNw354a4c" },
    snippet: {
      title: "Giving In To The Love",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/MMyNw354a4c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "eD7f3qxLBhg" },
    snippet: {
      title: "Hunting Shadows (Assassin's Creed)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/eD7f3qxLBhg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "6M0nmexvoYw" },
    snippet: {
      title: "The Devil is Human",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/6M0nmexvoYw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "xIQpLlYC8xA" },
    snippet: {
      title: "Houdini",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/xIQpLlYC8xA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "MxEjnYdfLXU" },
    snippet: {
      title: "I Wonder",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/MxEjnYdfLXU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "nr4rACqtW6E" },
    snippet: {
      title: "Azeroth Falling",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/nr4rACqtW6E/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "phLb_SoPBlA" },
    snippet: {
      title: "Not Like Us",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/phLb_SoPBlA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "YqAt8-QiBcI" },
    snippet: {
      title: "family ties",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/YqAt8-QiBcI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "in5Mn6FQQ4Q" },
    snippet: {
      title: "Animal Aboard",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/in5Mn6FQQ4Q/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "tZ2QWtXJKJs" },
    snippet: {
      title: "Dire, Dire Docks (From \"Super Mario 64\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/tZ2QWtXJKJs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9ixQJU7tTik" },
    snippet: {
      title: "Coconut Mall (From \"Mario Kart Wii\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9ixQJU7tTik/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9-84NBM72RU" },
    snippet: {
      title: "Grassland Theme (From \"Super Mario Bros. Wonder\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9-84NBM72RU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "xUkj5WqxhyQ" },
    snippet: {
      title: "Bubblegum K.K. (From \"Animal Crossing: New Leaf\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/xUkj5WqxhyQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "F5m0YqkZneU" },
    snippet: {
      title: "Luigi's Mansion",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/F5m0YqkZneU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "7pyUEMIy-2Y" },
    snippet: {
      title: "Athletic Theme (From \"Super Mario World\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/7pyUEMIy-2Y/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "n95QQKT5gDE" },
    snippet: {
      title: "Ecruteak City / Cianwood City (From \"Pokémon Gold and Silver\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/n95QQKT5gDE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "gq03RhbVRGY" },
    snippet: {
      title: "Gourmet Race (From \"Kirby Super Star\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/gq03RhbVRGY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "7Ag8C7dVh_E" },
    snippet: {
      title: "Sootopolis City (From \"Pokémon Ruby and Sapphire\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/7Ag8C7dVh_E/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vyt0NmNE3CU" },
    snippet: {
      title: "Ghost Gulping (From \"Paper Mario\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vyt0NmNE3CU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "4nH-kfYaLiU" },
    snippet: {
      title: "Mute City (From \"F-Zero\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/4nH-kfYaLiU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "JG7k8SF2Bgs" },
    snippet: {
      title: "Piranha Plant's Lullaby (From \"Super Mario 64\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/JG7k8SF2Bgs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9I894x3k9wc" },
    snippet: {
      title: "4 BIG GUYS",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9I894x3k9wc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "trSB5gBpjWg" },
    snippet: {
      title: "Crazy Rap (Colt 45)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/trSB5gBpjWg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2V5k0jh8WTA" },
    snippet: {
      title: "Intrusive Thoughts",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2V5k0jh8WTA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "VjQDFwo40WU" },
    snippet: {
      title: "Night Drive",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/VjQDFwo40WU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "gn0y79CcudY" },
    snippet: {
      title: "Gee Willikers!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/gn0y79CcudY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ij5-WoXC7Nk" },
    snippet: {
      title: "Subway Sexists V2",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ij5-WoXC7Nk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "GytEjq31HGE" },
    snippet: {
      title: "BITE OF 87",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/GytEjq31HGE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "SK2llAAkRrs" },
    snippet: {
      title: "Daisy Circuit (From \"Mario Kart Wii\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/SK2llAAkRrs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "CAFAI7G1Xok" },
    snippet: {
      title: "Lumiose City (From \"Pokémon X & Y\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/CAFAI7G1Xok/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ctiKD8jtvV8" },
    snippet: {
      title: "Killing In The Name",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ctiKD8jtvV8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "lOKzTE7kSFk" },
    snippet: {
      title: "Bombtrack",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/lOKzTE7kSFk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "KFS9c852M_k" },
    snippet: {
      title: "Somebody's Watching Me",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/KFS9c852M_k/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "aVvyz4BK5Oc" },
    snippet: {
      title: "Bassthoven",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/aVvyz4BK5Oc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Rh3bJKkEhk8" },
    snippet: {
      title: "tv off",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Rh3bJKkEhk8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ayNKqMoslU4" },
    snippet: {
      title: "Tokyo Drift",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ayNKqMoslU4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "SqTSgCdDaaM" },
    snippet: {
      title: "Forgot About Dre",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/SqTSgCdDaaM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "nL2HPPHdPAA" },
    snippet: {
      title: "The Next Episode",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/nL2HPPHdPAA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Opox1V-WCIo" },
    snippet: {
      title: "CLOUDS",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Opox1V-WCIo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "X0XFFMici0c" },
    snippet: {
      title: "JUST LIKE YOU",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/X0XFFMici0c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "1YzAOsNAdG0" },
    snippet: {
      title: "STORY",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/1YzAOsNAdG0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "40N7vFn_0es" },
    snippet: {
      title: "PRIDEFUL",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/40N7vFn_0es/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "q9VWpIXqwwI" },
    snippet: {
      title: "LOST",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/q9VWpIXqwwI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "6xO6mdCWtww" },
    snippet: {
      title: "LAYERS",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/6xO6mdCWtww/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "mrSKilUnX6o" },
    snippet: {
      title: "DRIFTING",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/mrSKilUnX6o/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "QndnNODZMek" },
    snippet: {
      title: "TRUST",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/QndnNODZMek/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Al1PPf3oaak" },
    snippet: {
      title: "PAID MY DUES",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Al1PPf3oaak/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "M4PYHSsRTW0" },
    snippet: {
      title: "CLOUDS (Edit)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/M4PYHSsRTW0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "5ujYkp-axv8" },
    snippet: {
      title: "あなぐらぐらし",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/5ujYkp-axv8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "euD9Mr2M7Mw" },
    snippet: {
      title: "Understand",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/euD9Mr2M7Mw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "gTdStPLAdkU" },
    snippet: {
      title: "Toxic",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/gTdStPLAdkU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "8zQTocXEvQA" },
    snippet: {
      title: "IDGAF",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/8zQTocXEvQA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "S8m6sqTf1gg" },
    snippet: {
      title: "it finished as soon as it started",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/S8m6sqTf1gg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2KuWjZD6PBA" },
    snippet: {
      title: "It's Going Down Now",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2KuWjZD6PBA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "y2jIeVV1bDo" },
    snippet: {
      title: "The Slaughter Continues",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/y2jIeVV1bDo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "jP8aYOYd9lQ" },
    snippet: {
      title: "An Enigmatic Encounter",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/jP8aYOYd9lQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ptFSejMYVWc" },
    snippet: {
      title: "World Bowser (From \"Super Mario 3D World\")",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ptFSejMYVWc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "qYF5vcVge98" },
    snippet: {
      title: "Self Proclaimed Angel",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/qYF5vcVge98/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9KVpI0GxA-M" },
    snippet: {
      title: "Left Behind Generation",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9KVpI0GxA-M/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "liwvqPx2eis" },
    snippet: {
      title: "Orthodoxia",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/liwvqPx2eis/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "mivqtyKzWYc" },
    snippet: {
      title: "Come on!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/mivqtyKzWYc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "pB-B6DUY0OY" },
    snippet: {
      title: "Venom (Music From The Motion Picture)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/pB-B6DUY0OY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "5NZUm6N8xLM" },
    snippet: {
      title: "edamame",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/5NZUm6N8xLM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zVlFkFmk_NM" },
    snippet: {
      title: "Scared of the Dark",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zVlFkFmk_NM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "BX27kva5HlA" },
    snippet: {
      title: "Ransom",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/BX27kva5HlA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "I40yNUFGEH8" },
    snippet: {
      title: "KEEP UP",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/I40yNUFGEH8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PEAdhE2EiaM" },
    snippet: {
      title: "Brothers In Arms",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PEAdhE2EiaM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "LtTlykm-pcU" },
    snippet: {
      title: "Left Behind Generation (Instrumental)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/LtTlykm-pcU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ko9CTlOt2KU" },
    snippet: {
      title: "Wonderland Reverie (Instrumental)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ko9CTlOt2KU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "XrWIPIgI8Mw" },
    snippet: {
      title: "Blind My Heart (Instrumental)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/XrWIPIgI8Mw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "1OgW8PJ2B5U" },
    snippet: {
      title: "Time Paradox",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/1OgW8PJ2B5U/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "yxgNXBFcu60" },
    snippet: {
      title: "frog (speed up)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/yxgNXBFcu60/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "OBiY9ZPfyuU" },
    snippet: {
      title: "frog (slowed)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/OBiY9ZPfyuU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "HkGaFvrdYvU" },
    snippet: {
      title: "Tetriverse",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/HkGaFvrdYvU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "TrVx4XiRrrM" },
    snippet: {
      title: "chess (slowed)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/TrVx4XiRrrM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "xEQ6fDQI2CQ" },
    snippet: {
      title: "chess",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/xEQ6fDQI2CQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "LS1xl-69rI0" },
    snippet: {
      title: "chess (sped up)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/LS1xl-69rI0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "S2DLrhb-078" },
    snippet: {
      title: "bounce (i just wanna dance)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/S2DLrhb-078/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "0bNwFaontsc" },
    snippet: {
      title: "ASTROBOY",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/0bNwFaontsc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "lte7Y25OSmc" },
    snippet: {
      title: "frog",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/lte7Y25OSmc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "3YFPiE1z9XE" },
    snippet: {
      title: "Sapporo",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/3YFPiE1z9XE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "pnOlDHV9ZXE" },
    snippet: {
      title: "Glorious Day (feat. 初音ミク)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/pnOlDHV9ZXE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "3vguEVIWcWg" },
    snippet: {
      title: "anybody can find love (except you.)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/3vguEVIWcWg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "KkoYE39Fh0g" },
    snippet: {
      title: "Join Us for a Bite",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/KkoYE39Fh0g/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "WoU7aaicmB8" },
    snippet: {
      title: "THAT'S A JOKE",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/WoU7aaicmB8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "TRJlTr50zAk" },
    snippet: {
      title: "Johnny Quest Thinks We're Sellouts",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/TRJlTr50zAk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PkFnyWO5ltU" },
    snippet: {
      title: "Henrietta",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PkFnyWO5ltU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "LL8Bbqwkts4" },
    snippet: {
      title: "Let's Dance to Joy Division",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/LL8Bbqwkts4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2gDb_axpfeY" },
    snippet: {
      title: "Chelsea Dagger",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2gDb_axpfeY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "m7lwR-kYWwk" },
    snippet: {
      title: "My Friend John",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/m7lwR-kYWwk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "JL7IgEauHKU" },
    snippet: {
      title: "She's Not Gone Yet but She's Leaving",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/JL7IgEauHKU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Z_63ZZRLylE" },
    snippet: {
      title: "All My Best Friends Are Metalheads",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Z_63ZZRLylE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "QbzqAR2bPqw" },
    snippet: {
      title: "History Of A Boring Town",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/QbzqAR2bPqw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "49kEwe5njVo" },
    snippet: {
      title: "The Science of Selling Yourself Short",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/49kEwe5njVo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "QOeURqjAQzA" },
    snippet: {
      title: "The Rest of My Life",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/QOeURqjAQzA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "5t5-9i5UrPo" },
    snippet: {
      title: "Look What Happened",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/5t5-9i5UrPo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "7kR9XKIhDOY" },
    snippet: {
      title: "Plastic Cup Politics",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/7kR9XKIhDOY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "cLFc5s5Bwdc" },
    snippet: {
      title: "Automatic",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/cLFc5s5Bwdc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "dZg9UL0AKBU" },
    snippet: {
      title: "Broken Words",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/dZg9UL0AKBU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zU6aGFc1dOU" },
    snippet: {
      title: "Walking Pipebomb",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zU6aGFc1dOU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "jvDyM4qckNo" },
    snippet: {
      title: "Not My Problem",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/jvDyM4qckNo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "-mSVo9hhuUI" },
    snippet: {
      title: "Quandale Dingle",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/-mSVo9hhuUI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zoq0tAKpLBI" },
    snippet: {
      title: "Cats",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zoq0tAKpLBI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "4YSVyA_CgKA" },
    snippet: {
      title: "Furrýmon: Gotta Smash ’Em All! (feat. Black Gryph0n & PiNKII)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/4YSVyA_CgKA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PaoUH1zp-6c" },
    snippet: {
      title: "Mesmerizer (Official English Version)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PaoUH1zp-6c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "wZ4gmKvX26c" },
    snippet: {
      title: "NIGHT DANCER",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/wZ4gmKvX26c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "0jDH43ldMVY" },
    snippet: {
      title: "Bling-Bang-Bang-Born (Mashle)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/0jDH43ldMVY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "as3ywjvNv-Q" },
    snippet: {
      title: "check",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/as3ywjvNv-Q/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "AtXtXhZqc4s" },
    snippet: {
      title: "doodle",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/AtXtXhZqc4s/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2RBhN09ZQdc" },
    snippet: {
      title: "Bang Bang",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2RBhN09ZQdc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "F_X3qKVZrWU" },
    snippet: {
      title: "From the Start",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/F_X3qKVZrWU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "h8DeZSB2o-c" },
    snippet: {
      title: "From The Start",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/h8DeZSB2o-c/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "NWCNpCHeMf0" },
    snippet: {
      title: "BACK2BACK",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/NWCNpCHeMf0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "DGQhPR9KSPU" },
    snippet: {
      title: "Beautiful Mind",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/DGQhPR9KSPU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Bhz-wKJxxHI" },
    snippet: {
      title: "Bubbly",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Bhz-wKJxxHI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "-PZsj6tZoAo" },
    snippet: {
      title: "Don't Copy My Flow",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/-PZsj6tZoAo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9iUyi2hjz8I" },
    snippet: {
      title: "Islands (kompa pasión)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9iUyi2hjz8I/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "KM1LU0qbb9U" },
    snippet: {
      title: "kompa pasión",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/KM1LU0qbb9U/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "7zA4QunlGYg" },
    snippet: {
      title: "ラビットホール",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/7zA4QunlGYg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "gwbu6EQnZrE" },
    snippet: {
      title: "NUNCA MUDA? (Super Slowed)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/gwbu6EQnZrE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "43HK-seUbJs" },
    snippet: {
      title: "SPOOKY",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/43HK-seUbJs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "G1CdWr4ZhrI" },
    snippet: {
      title: "Save a Horse (Ride a Cowboy)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/G1CdWr4ZhrI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "etSsiGyLSmw" },
    snippet: {
      title: "BAD PARENTING FUNK",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/etSsiGyLSmw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ZdNd4r_TSIU" },
    snippet: {
      title: "LOVELY BASTARDS",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ZdNd4r_TSIU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "KuzZMW3cauk" },
    snippet: {
      title: "BOUNCE FUNK",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/KuzZMW3cauk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "w9cBKC2vqRo" },
    snippet: {
      title: "NIGHT DANCER",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/w9cBKC2vqRo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9xBeLSXOvSY" },
    snippet: {
      title: "Drunk",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9xBeLSXOvSY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "NxxjLD2pmlk" },
    snippet: {
      title: "Feel Good Inc.",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/NxxjLD2pmlk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "-uQi0vJK9lk" },
    snippet: {
      title: "The Kids Aren't Alright",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/-uQi0vJK9lk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PjoP5wQH9dA" },
    snippet: {
      title: "Funk de Beleza",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PjoP5wQH9dA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "A72oeFgA83M" },
    snippet: {
      title: "Funk of Galáctico",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/A72oeFgA83M/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "r_-MLoiVc6E" },
    snippet: {
      title: "AUTOMOTIVO MANGOS",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/r_-MLoiVc6E/hqdefault.jpg" } }
    }

  },
  {
    id: { videoId: "oz5Li-ba--w" },
    snippet: {
      title: "FUNK DO BOUNCE (Slowed)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/oz5Li-ba--w/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "_JeLNAjjBHw" },
    snippet: {
      title: "Confessions of a Rotten Girl",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/_JeLNAjjBHw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "AFSlEd6Sp9o" },
    snippet: {
      title: "デビルじゃないもん",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/AFSlEd6Sp9o/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ymqsejDbhkw" },
    snippet: {
      title: "天国へ行こう (feat. 初音ミク)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ymqsejDbhkw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "hv9Sk4ZeSAM" },
    snippet: {
      title: "INTERNET YAMERO",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/hv9Sk4ZeSAM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "p-TVGkECh7I" },
    snippet: {
      title: "Rabbit Hole",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/p-TVGkECh7I/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "vmkqKlMqIQk" },
    snippet: {
      title: "She Bad",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/vmkqKlMqIQk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "hiUIlHWuFFM" },
    snippet: {
      title: "Help Save The Youth Of America From Exploding",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/hiUIlHWuFFM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "EZE62LpaqHg" },
    snippet: {
      title: "See You Again",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/EZE62LpaqHg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2-0ryBECiG0" },
    snippet: {
      title: "BONITO ROUBO",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2-0ryBECiG0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "lcJZtCb6FWQ" },
    snippet: {
      title: "Elevator music (Trap Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/lcJZtCb6FWQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "7aH09nWyNUw" },
    snippet: {
      title: "The Vampire",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/7aH09nWyNUw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "J9GxIFKd5p4" },
    snippet: {
      title: "EXXED OUT",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/J9GxIFKd5p4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "bCdHfHTu3nk" },
    snippet: {
      title: "ITTY BITTY TITTY COMMITTEE",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/bCdHfHTu3nk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9iGJXO8rYx4" },
    snippet: {
      title: "Welcome Home",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9iGJXO8rYx4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "uQgOEnNM9FM" },
    snippet: {
      title: "4AM",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/uQgOEnNM9FM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ONZtEDp1Tjw" },
    snippet: {
      title: "Happy Face",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ONZtEDp1Tjw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "5AtkWnBjGBU" },
    snippet: {
      title: "HandClap",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/5AtkWnBjGBU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "fNLBuC4oNWk" },
    snippet: {
      title: "Amnesia (from Garten of Banban)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/fNLBuC4oNWk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2TBTJL46rg8" },
    snippet: {
      title: "OIIA OIIA (Spinning Cat)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2TBTJL46rg8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "nbqMIBYJlvk" },
    snippet: {
      title: "Godzilla",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/nbqMIBYJlvk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "x182kkiage8" },
    snippet: {
      title: "My Fantasy",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/x182kkiage8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "E5LqtCpdsTs" },
    snippet: {
      title: "DON`T STOP - Slowed",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/E5LqtCpdsTs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PwDUlu9Tb-Y" },
    snippet: {
      title: "NOKIA TECHNO",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PwDUlu9Tb-Y/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "fnlJw9H0xAM" },
    snippet: {
      title: "NF - The Search",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/fnlJw9H0xAM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Fe7fIZI-d2o" },
    snippet: {
      title: "MAMACITA",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Fe7fIZI-d2o/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "NuDnNNwg3HI" },
    snippet: {
      title: "TOMBOY TUESDAY!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/NuDnNNwg3HI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PXf-YMG2hts" },
    snippet: {
      title: "HAM SANDWICH x 954MARI - SHAKE SUMN (prod. OmarCameUp) [Official AMV]",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PXf-YMG2hts/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "psCggTB58ZY" },
    snippet: {
      title: "WHEYFU ANTHEM",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/psCggTB58ZY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "hTnaMR8YLhk" },
    snippet: {
      title: "Stronger Than You (feat. Estelle)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/hTnaMR8YLhk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "mfinIbQ9LXU" },
    snippet: {
      title: "Cycle - Derivakat & Netrum [OFFICIAL M/V]",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/mfinIbQ9LXU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "SQVkYgkMzhY" },
    snippet: {
      title: "The Monster",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/SQVkYgkMzhY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "DZo4cIs0MoY" },
    snippet: {
      title: "Ready Player Two (feat. Chi-Chi & Alex Walker Smith)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/DZo4cIs0MoY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "JhulBGMA7G4" },
    snippet: {
      title: "Harder, Better, Faster, Stronger",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/JhulBGMA7G4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "iDBy_isAPBs" },
    snippet: {
      title: "I See A Dreamer",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/iDBy_isAPBs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "rmg6p0TcNqA" },
    snippet: {
      title: "Fallout (SNC Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/rmg6p0TcNqA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "u7KGKcAji78" },
    snippet: {
      title: "The Windows Update Song - LOLNEIN",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/u7KGKcAji78/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "cqww8ZY1c2I" },
    snippet: {
      title: "TAMAKI KOTATSU RAP | \"TRIPPIN?\" | Ham Sandwich x CAMOGOD [Fire Force AMV]",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/cqww8ZY1c2I/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "mQ858Fss95Y" },
    snippet: {
      title: "MONSTER GIRLS RAP | \"ADDICTED 2 MONSTER GIRLS\" | Ham Sandwich x DayumDahlia [My Hero Academia AMV]",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/mQ858Fss95Y/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "egShMrRnXz0" },
    snippet: {
      title: "MONSTER GIRL? RAP | \"I'M NOT A FURRY BUT\" | Ham Sandwich x GameboyJones (prod. Foreigner2x)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/egShMrRnXz0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "M-v5yk5j8t8" },
    snippet: {
      title: "DON'T BLOW IT! (feat. Drip$tick)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/M-v5yk5j8t8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Awghtwnzxh0" },
    snippet: {
      title: "E-Girl Bounce",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Awghtwnzxh0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "BnBNJo1Lqrc" },
    snippet: {
      title: "Assumptions (slowed down Version)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/BnBNJo1Lqrc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "1lLZ-59xH3Y" },
    snippet: {
      title: "Linux Packaging Formats explained: Flatpak vs Snaps vs DEB & RPM vs AppImage vs AUR",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/1lLZ-59xH3Y/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "g44dlGOUMCE" },
    snippet: {
      title: "megalovania, but extended by AI — it's a total banger",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/g44dlGOUMCE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "yZ3TL2yCmoU" },
    snippet: {
      title: "【カサネテク】- 開口一秒淪陷《中日歌詞》",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/yZ3TL2yCmoU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "eQkSArQxYJg" },
    snippet: {
      title: "Logic - Homicide ft. Eminem (Official Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/eQkSArQxYJg/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "_xxElXDUFdk" },
    snippet: {
      title: "CONQUEST RAP | \"MY NAME\" | RUSTAGE ft. Isaa Corva [INVINCIBLE]",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/_xxElXDUFdk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "yV17_VjUjLs" },
    snippet: {
      title: "HAM SANDWICH - BACK BACK BACK (feat. PE$O PETE) [Prod. Oddwin] {Official Fate AMV}",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/yV17_VjUjLs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "T3hTwgDy_Ww" },
    snippet: {
      title: "The Living Tombstone - Drunk",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/T3hTwgDy_Ww/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "JHMM2uBLw-Y" },
    snippet: {
      title: "Marvel Rivals Rap | \"Snow Bunny Mind Control\" | Shiki-TMNS [Prod. Jvsper & Morris]",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/JHMM2uBLw-Y/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "j9jbEIKIKTk" },
    snippet: {
      title: "The Party Troll (song) by D1ofAquavibe",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/j9jbEIKIKTk/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2idTCo8BBng" },
    snippet: {
      title: "A Ronin Mode Tribute To Tokyo Drift Teriyaki Boyz HQ Remastered/AI Digital Remastered 4K 60FPS",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2idTCo8BBng/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "-YAWbuWP4yc" },
    snippet: {
      title: "NF - Notepad",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/-YAWbuWP4yc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "yzNXsn68lGs" },
    snippet: {
      title: "Marino - Im Doing Fine (Official Music Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/yzNXsn68lGs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "jr42N2cGe4Q" },
    snippet: {
      title: "Rare Americans - Brittle Bones Nicky 3 (Official Music Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/jr42N2cGe4Q/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "22Iot0IbkjQ" },
    snippet: {
      title: "AJR - Yes I'm A Mess (Official Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/22Iot0IbkjQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "s_nc1IVoMxc" },
    snippet: {
      title: "Ren - Hi Ren (Official Music Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/s_nc1IVoMxc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2Lb2BiUC898" },
    snippet: {
      title: "Fall Out Boy - Irresistible (Official Music Video) ft. Demi Lovato",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2Lb2BiUC898/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "dm5gC8YQZtI" },
    snippet: {
      title: "God Made A Way",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/dm5gC8YQZtI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "VLuHFQXn1Yw" },
    snippet: {
      title: "Praise The King",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/VLuHFQXn1Yw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ttWQK5VXskA" },
    snippet: {
      title: "D12 - My Band ft. Cameo (Official Music Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ttWQK5VXskA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "2zNSgSzhBfM" },
    snippet: {
      title: "MACKLEMORE & RYAN LEWIS - CAN'T HOLD US FEAT. RAY DALTON (OFFICIAL MUSIC VIDEO)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/2zNSgSzhBfM/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ALZHF5UqnU4" },
    snippet: {
      title: "Marshmello - Alone (Official Music Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ALZHF5UqnU4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "1y6smkh6c-0" },
    snippet: {
      title: "Swedish House Mafia ft. John Martin - Don't You Worry Child (Official Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/1y6smkh6c-0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "9cat8KM_g3g" },
    snippet: {
      title: "HAM SANDWICH - ICARUS (prod. VINCI) [Official Mob Psycho 100 AMV]",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/9cat8KM_g3g/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "dLrdSC9MVb4" },
    snippet: {
      title: "Tally Hall - Turn The Lights Off",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/dLrdSC9MVb4/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "kl4wkIPiTcY" },
    snippet: {
      title: "Rage Against The Machine - Sleep Now in the Fire (Official HD Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/kl4wkIPiTcY/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "CanCZktm0TQ" },
    snippet: {
      title: "Eminem - Tobey feat. Big Sean & BabyTron (Official Music Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/CanCZktm0TQ/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "cIwQ5jS55-Y" },
    snippet: {
      title: "POWER RAP | \"POWER!\" | Ham Sandwich x Drip$tick (prod. Zach Sutton) [Chainsaw Man AMV]",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/cIwQ5jS55-Y/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "WG246am4KZE" },
    snippet: {
      title: "Shiki-TMNS - Love Your Plot",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/WG246am4KZE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "zuJV-DAv_wE" },
    snippet: {
      title: "NF - WHY",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/zuJV-DAv_wE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "ksAJhHr61TA" },
    snippet: {
      title: "BLOONS TOWER DEFENSE RAP CYPHER | TheManBeHisLa | ft. Kwite, Shwabadi, Connor Quest!, & More (BTD6)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/ksAJhHr61TA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "YgM6Q_CFYME" },
    snippet: {
      title: "BUTTERFLY - kroh ⌈AMV⌋",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/YgM6Q_CFYME/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "bE7AmqT0E80" },
    snippet: {
      title: "Hopsin - Kumbaya",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/bE7AmqT0E80/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "UW2QoShtHgE" },
    snippet: {
      title: "Tech N9ne - Like I Ain't - Official Music Video",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/UW2QoShtHgE/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "yopzejRrMu0" },
    snippet: {
      title: "Mario Kart 8 - Cheep Cheep Beach (Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/yopzejRrMu0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "XGGWhOUYObc" },
    snippet: {
      title: "NF - Leave Me Alone",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/XGGWhOUYObc/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "3woEPxaJUAI" },
    snippet: {
      title: "D12 - 40 Oz. (Super Clean Version)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/3woEPxaJUAI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "GmG4X9PGOXs" },
    snippet: {
      title: "Everyday Normal Guy 2",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/GmG4X9PGOXs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "TvyY2Po-2EA" },
    snippet: {
      title: "What’s Going On?!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/TvyY2Po-2EA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "PCZ2Dp6Is9M" },
    snippet: {
      title: "Heads Will Roll",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/PCZ2Dp6Is9M/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "L2OMJH5-oh8" },
    snippet: {
      title: "DANCE TILL YOU'RE DEAD (OFFICIAL TRAP REMIX) - JAYDON LEWIS",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/L2OMJH5-oh8/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "wDuoOapZ9Z0" },
    snippet: {
      title: "Levels (Original Version)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/wDuoOapZ9Z0/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "_ovdm2yX4MA" },
    snippet: {
      title: "Avicii - Levels",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/_ovdm2yX4MA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "xfN3nqxvmOU" },
    snippet: {
      title: "#BrooklynBloodPop!",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/xfN3nqxvmOU/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "IMclXRHCBjw" },
    snippet: {
      title: "#BrooklynBloodPop! (Phonk Remix)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/IMclXRHCBjw/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "mEAaVoRxpCs" },
    snippet: {
      title: "Syko - #BrooklynBloodPop - MUSIC ONLY - (BASS BOOSTED)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/mEAaVoRxpCs/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Ife2Cv4UoNo" },
    snippet: {
      title: "CRY",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Ife2Cv4UoNo/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "_rmzs-vwVsI" },
    snippet: {
      title: "Smash And Grab",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/_rmzs-vwVsI/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "lexLAjh8fPA" },
    snippet: {
      title: "Eminem - Like Toy Soldiers (Official Music Video)",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/lexLAjh8fPA/hqdefault.jpg" } }
    }
  },
  {
    id: { videoId: "Qe9jHEmP8gI" },
    snippet: {
      title: "GRUG FUNK",
      thumbnails: { high: { url: "https://i.ytimg.com/vi/Qe9jHEmP8gI/hqdefault.jpg" } }
    }
  }
];


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
        `;
        // Add event listener to "Add to Playlist" button
        const addButton = videoItem.querySelector('.add-to-playlist');
        addButton.addEventListener('click', (event) => {
            event.stopPropagation();
            addToPlaylist(video, 1);
        });
        videoItem.addEventListener('click', (event) => {
            // Prevent playVideo when clicking the button
            if (event.target !== addButton) {
                playVideo(video.id.videoId);
            }
        });
        resultsContainer.appendChild(videoItem);
    });
}

// Play selected video
function playVideo(videoId) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    player.innerHTML = '';
    player.appendChild(iframe);
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

// Initialize playlist displays
displayPlaylist('playlist1', playlist1);
displayPlaylist('playlist2', playlist2);

// Show random songs on page load
showRandomSongs();

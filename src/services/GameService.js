import HttpService from './HttpService';

export default {
  // add,
  query,
  // remove
};

const gGames = createGames();

function query(filterBy = '') {
  const filteredGames = gGames.filter(game => {
    let {title} = game
    return title.toLowerCase().includes(filterBy.toLowerCase()) 
        || game.publisher.name.toLowerCase().includes(filterBy.toLowerCase()) 
        || game.tags.some(tag => tag.toLowerCase().includes(filterBy.toLowerCase()))
  });
  return filteredGames
  // return HttpService.get('game');
}

// function remove(gameId) {
//   return HttpService.delete(`game/${gameId}`);
// }
// async function add(game) {
//   const addedGame  = await HttpService.post(`game`, game);
//   return  addedGame
// }
function createGames() {
  return [
    {
      "_id": "u101",
      "title": "Pacman",
      "description": "sdadghjj sgdjhg askj",
      "publishedAt": 123879186123,
      "publisher": { "name": "Valve", "_id": "u102" },
      "comments": [{ "user": "minimal-user", "text": "sadasd" }],
      "reviews": [
        {
          "user": { "_id": "u101", "userName": "boby" },
          "text": "text",
          "rating": 9
        }
      ],
      "thumbnail": "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg",
      "mediaUrls": ["https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg"],
      "price": 25,
      "tags": ["funny", "fps"]
    },
    {
      "_id": "u102",
      "title": "Grand Theft Auto V",
      "description": "Grand Theft Auto V (also known as Grand Theft Auto Five, GTA 5 or GTA V) is a video game developed by Rockstar North. It is the fifteenth instalment in the Grand Theft Auto series and the successor of Grand Theft Auto IV. The original edition was released on September 17th, 2013 for the Xbox 360 and PlayStation 3. The Xbox One and PlayStation 4 versions were released on November 18th, 2014, and was later released on April 14th, 2015 for the PC.",
      "publishedAt": "2013-09-17",
      "publisher": { "name": "Rockstar", "_id": "u101" },
      "comments": [{ "user": "minimal-user", "text": "sadasd" }],
      "reviews": [
        {
          "user": { "_id": "u101", "userName": "boby" },
          "text": "text",
          "rating": 9
        }
      ],
      "thumbnail": "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg",
      "mediaUrls": ["https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg", "https://media.rawg.io/media/screenshots/1b4/1b4eefb4cc2a77d4d35bb4a6926f3189.jpg", "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg", "https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg"],
      "price": 25,
      "tags": ["open-world"]
    },
    {
      "_id": "u103",
      "title": "Portal 2",
      "description": "The Perpetual Testing Initiative has been expanded to allow you to design co-op puzzles for you and your friends!",
      "publishedAt": "2011-04-19",
      "publisher": { "name": "Valve", "_id": "u102" },
      "comments": [{ "user": "minimal-user", "text": "sadasd" }],
      "reviews": [
        {
          "user": { "_id": "u101", "userName": "boby" },
          "text": "text",
          "rating": 9
        }
      ],
      "thumbnail": "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
      "mediaUrls": ["https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg", "https://media.rawg.io/media/screenshots/221/221a03c11e5ff9f765d62f60d4b4cbf5.jpg", "https://media.rawg.io/media/screenshots/173/1737ff43c14f40294011a209b1012875.jpg", "https://media.rawg.io/media/screenshots/b11/b11a2ae0664f0e8a1ef2346f99df26e1.jpg", "https://media.rawg.io/media/screenshots/9b1/9b107a790909b31918ebe2f40547cc85.jpg", "https://media.rawg.io/media/screenshots/d05/d058fc7f7fa6128916c311eb14267fed.jpg"],
      "price": 25,
      "tags": ["open-world"]
    },
    {
      "_id": "u104",
      "title": "Grand Theft Auto V",
      "description": "Grand Theft Auto V (also known as Grand Theft Auto Five, GTA 5 or GTA V) is a video game developed by Rockstar North. It is the fifteenth instalment in the Grand Theft Auto series and the successor of Grand Theft Auto IV. The original edition was released on September 17th, 2013 for the Xbox 360 and PlayStation 3. The Xbox One and PlayStation 4 versions were released on November 18th, 2014, and was later released on April 14th, 2015 for the PC.",
      "publishedAt": "2013-09-17",
      "publisher": { "name": "Rockstar", "_id": "u101" },
      "comments": [{ "user": "minimal-user", "text": "sadasd" }],
      "reviews": [
        {
          "user": { "_id": "u101" },
          "text": "text",
          "rating": 9
        }
      ],
      "thumbnail": "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg",
      "mediaUrls": ["https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg", "https://media.rawg.io/media/screenshots/1b4/1b4eefb4cc2a77d4d35bb4a6926f3189.jpg", "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg", "https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg"],
      "price": 15,
      "tags": ["puzzle"]
    }
  ]
}
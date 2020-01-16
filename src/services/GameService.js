import HttpService from "./HttpService";

export default {
  // add,
  query,
  getById
  // remove
};

const gGames = createGames();

function query(filterBy = "") {
  const filteredGames = gGames.filter(game => {
    let { title } = game;
    return (
      title.toLowerCase().includes(filterBy.toLowerCase()) ||
      game.publisher.name.toLowerCase().includes(filterBy.toLowerCase()) ||
      game.tags.some(tag => tag.toLowerCase().includes(filterBy.toLowerCase()))
    );
  });
  return filteredGames;
  // return HttpService.get('game');
}

// function remove(gameId) {
//   return HttpService.delete(`game/${gameId}`);
// }
// async function add(game) {
//   const addedGame  = await HttpService.post(`game`, game);
//   return  addedGame
// }

async function getById(id) {
  const game = gGames.find(game => game._id === id);
  return game;
}
function createGames() {
  return [
    {
      _id: "u101",
      title: "Pacman",
      description: "sdadghjj sgdjhg askj",
      publishedAt: 123879186123,
      publisher: { name: "Valve", _id: "u102" },
      comments: [{ user: "minimal-user", text: "sadasd" }],
      reviews: [
        {
          user: { _id: "u101", userName: "boby" },
          text: "text",
          rating: 9
        }
      ],
      thumbnail:
        "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg",
      mediaUrls: [
        "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg"
      ],
      price: 25,
      tags: ["funny", "fps"]
    },
    {
      _id: "u102",
      title: "Grand Theft Auto V",
      description:
        "Grand Theft Auto V (also known as Grand Theft Auto Five, GTA 5 or GTA V) is a video game developed by Rockstar North. It is the fifteenth instalment in the Grand Theft Auto series and the successor of Grand Theft Auto IV. The original edition was released on September 17th, 2013 for the Xbox 360 and PlayStation 3. The Xbox One and PlayStation 4 versions were released on November 18th, 2014, and was later released on April 14th, 2015 for the PC.",
      publishedAt: "2013-09-17",
      publisher: { name: "Rockstar", _id: "u101" },
      comments: [{ user: "minimal-user", text: "sadasd" }],
      reviews: [
        {
          user: { _id: "u101", userName: "boby" },
          text:
            "the true meaning of open world. the game is so good that i've been playing it for years. great single player story-line, and great multiplayer. i just wish it wasn't banned in iran.",
          rating: 9
        }
      ],
      thumbnail:
        "https://steamcdn-a.akamaihd.net/steam/apps/271590/header.jpg?t=1578598197",
      mediaUrls: [
        "https://res.cloudinary.com/dfdvfunfj/video/upload/v1579108574/eu7d0h6m8uelu0wpictc.mp4",
        "https://media.rawg.io/media/games/b11/b115b2bc6a5957a917bc7601f4abdda2.jpg",
        "https://media.rawg.io/media/screenshots/1b4/1b4eefb4cc2a77d4d35bb4a6926f3189.jpg",
        "https://media.rawg.io/media/screenshots/a7c/a7c43871a54bed6573a6a429451564ef.jpg",
        "https://media.rawg.io/media/screenshots/cf4/cf4367daf6a1e33684bf19adb02d16d6.jpg"
      ],
      price: 25,
      tags: ["open-world"]
    },
    {
      _id: "u103",
      title: "Portal 2",
      description:
        "The Perpetual Testing Initiative has been expanded to allow you to design co-op puzzles for you and your friends!",
      publishedAt: "2011-04-19",
      publisher: { name: "Valve", _id: "u102" },
      comments: [{ user: "minimal-user", text: "sadasd" }],
      reviews: [
        {
          user: { _id: "u101", userName: "boby" },
          text: "text",
          rating: 9
        }
      ],
      thumbnail:
        "https://steamcdn-a.akamaihd.net/steam/apps/620/header.jpg?t=1574284030",
      mediaUrls: [
        "https://res.cloudinary.com/dfdvfunfj/video/upload/v1579164937/hxapvujzeiqqk1zh3g5s.mp4",
        "https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
        "https://media.rawg.io/media/screenshots/221/221a03c11e5ff9f765d62f60d4b4cbf5.jpg",
        "https://media.rawg.io/media/screenshots/173/1737ff43c14f40294011a209b1012875.jpg",
        "https://media.rawg.io/media/screenshots/b11/b11a2ae0664f0e8a1ef2346f99df26e1.jpg",
        "https://media.rawg.io/media/screenshots/9b1/9b107a790909b31918ebe2f40547cc85.jpg",
        "https://media.rawg.io/media/screenshots/d05/d058fc7f7fa6128916c311eb14267fed.jpg"
      ],
      price: 25,
      tags: ["open-world"]
    },
    {
      "_id": "u104",
      "title": "The Witcher 3: Wild Hunt",
      description:
        "As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.",
      publishedAt: "2015-05-18",
      publisher: { name: "CD PROJEKT RED", _id: "u102" },
      comments: [{ user: "bobKiller123", text: "how do i kill the wild hunt" }],
      reviews: [
        {
          user: { _id: "u101" },
          text: "text",
          rating: 5
        }
      ],
      thumbnail:
        "https://steamcdn-a.akamaihd.net/steam/apps/292030/header.jpg?t=1550078557",
      mediaUrls: [
        "https://steamcdn-a.akamaihd.net/steam/apps/256658589/movie480.webm?t=1528288687.mp4",
        "https://media.rawg.io/media/games/088/088b41ca3f9d22163e43be07acf42304.jpg",
        "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg",
        "https://media.rawg.io/media/screenshots/6a0/6a08afca95261a2fe221ea9e01d28762.jpg",
        "https://media.rawg.io/media/screenshots/cdd/cdd31b6b4a687425a87b5ce231ac89d7.jpg",
        "https://media.rawg.io/media/screenshots/862/862397b153221a625922d3bb66337834.jpg",
        "https://media.rawg.io/media/screenshots/f63/f6373ee614046d81503d63f167181803.jpg"
      ],
      price: 30,
      tags: ["Open World","RPG","story rich"]
    },
    {
      "_id": "u105",
      "title": "The Elder Scrolls V: Skyrim",
      description:
        "As war rages on throughout the Northern Realms, you take on the greatest contract of your life — tracking down the Child of Prophecy, a living weapon that can alter the shape of the world.",
      publishedAt: "2015-05-18",
      publisher: { name: "CD PROJEKT RED", _id: "u102" },
      comments: [{ user: "bobKiller123", text: "how do i kill the wild hunt" }],
      reviews: [
        {
          user: { _id: "u101" },
          text: "text",
          rating: 5
        }
      ],
      thumbnail:
        "https://steamcdn-a.akamaihd.net/steam/apps/489830/header.jpg?t=1573759171",
      mediaUrls: [
        "https://steamcdn-a.akamaihd.net/steam/apps/256672927/movie480.webm?t=1476991615.mp4",
        "https://steamcdn-a.akamaihd.net/steam/apps/489830/ss_73c1a0bb7e1720c8a1847186c3ddd837d3ca7a8d.600x338.jpg?t=1573759171",
        "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg",
        "https://media.rawg.io/media/screenshots/6a0/6a08afca95261a2fe221ea9e01d28762.jpg",
        "https://media.rawg.io/media/screenshots/cdd/cdd31b6b4a687425a87b5ce231ac89d7.jpg",
        "https://media.rawg.io/media/screenshots/862/862397b153221a625922d3bb66337834.jpg",
        "https://media.rawg.io/media/screenshots/f63/f6373ee614046d81503d63f167181803.jpg"
      ],
      price: 30,
      tags: ["Open World","RPG","story rich"]
    }
  ];
}

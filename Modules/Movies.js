
const axios = require('axios');
module.exports = getMoviesHandler;
let MovieStore ={};
function getMoviesHandler(req, res) {
  let cityName = req.query.cityName;
  let key = process.env.MOVIE_API_KEY;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${cityName}&page=1`;
  if (MovieStore[cityName]!== undefined) {
    console.log('get from Memory');
    res.send(MovieStore[cityName]);
  } else {
    axios
      .get(url)
      .then((result) => {
        const movieArray = result.data.results.map((item) => {
          return new Movie(item);
        });
        MovieStore[cityName]=movieArray;
        console.log('get from API');
        res.send(movieArray);
      })
      .catch((err) => {
        res.send(`there is an error in getting the data => ${err}`);
      });
  }

}
class Movie {
  constructor(item) {
    this.original = item.original_title;
    this.overview = item.overview;
    this.averageVotes = item.vote_average;
    this.totalVotes = item.total_votes;
    this.imagel = `https://image.tmdb.org/t/p/original${item.poster_path}`;
    this.popularity = item.popularity;
    this.releasedOn = item.release_date;
  }
}

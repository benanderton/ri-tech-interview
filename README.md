# Movie Search Test

This is a test for a movie search application using the OMDb API. The goal is to create a simple React application that allows users to search for movies by title and year, save to state, display the results, and manage a list of movies.

## Requirements

This is a minimalist React application template using TypeScript and Vite. Update it to do the following:

1. Provide a search page that lets the user query the OMDb API (see details furher below for credentials) for movies by Title and Year.
2. If the request is successful, add the results to global state using mechanism of your choosing, if the request fails, display an error message.
3. Display the results in a list, showing the Title, Year, and Description for each movie that is currently in the global state.
4. (Bonus) Add a button to each movie that lets the user remove it from the global state.
5. (Bonus) Add a button to each movie that lets the user add it to a "favorites" list.

## Rules

Please use the following rules when completing this task:

- Don't use any AI tools to complete this task, we encourage AI use but this task is to guage your ability to complete a task without AI assistance.
- We don't expect you to complete the task, but we do expect you to make a good effort.
- You can ask questions
- You can use any libraries you like, but please keep it minimal.
- You can use any state management library you like, but please keep it minimal.
- Don't worry about styling, we just want to see the functionality.

## OMDb API information

OMDb API is a free API to get movie data. It's not particularly fleshed out, but it works for our purposes. You can find the documentation here: [OMDb API Documentation](https://www.omdbapi.com/) however for our purposes, we will only be using the `t` (title) and `y` (year) query parameters to search for movies.

### Example response

There's also no OpenAPI specification for this API, so here's an example response for a movie search:

```json
{
    "Title": "The Matrix",
    "Year": "1999",
    "Rated": "R",
    "Released": "31 Mar 1999",
    "Runtime": "136 min",
    "Genre": "Action, Sci-Fi",
    "Director": "Lana Wachowski, Lilly Wachowski",
    "Writer": "Lilly Wachowski, Lana Wachowski",
    "Actors": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    "Plot": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    "Language": "English",
    "Country": "United States, Australia",
    "Awards": "Won 4 Oscars. 42 wins & 52 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "8.7/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "83%"
        },
        {
            "Source": "Metacritic",
            "Value": "73/100"
        }
    ],
    "Metascore": "73",
    "imdbRating": "8.7",
    "imdbVotes": "2,155,126",
    "imdbID": "tt0133093",
    "Type": "movie",
    "DVD": "N/A",
    "BoxOffice": "$172,076,928",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
}
```

An API key will be provided to you. You can use it in your requests to the API. The API key is required for all requests.

Query example: `https://www.omdbapi.com/?apikey=[API_KEY_HERE]&t=The%20Matrix&y=1999`

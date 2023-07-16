import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/index.module.css";
import { randomTitles } from "@/assets/randomTitles";
import { useEffect, useState } from "react";
import { getMoviebyTitle } from "@/services/movie-service";
import { Movie } from "@/types/Movie";
import router from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Recommend() {
  const [movieData, setMovieData] = useState<Array<Movie>>([]);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      const randomIndex = Math.floor(Math.random() * randomTitles.length);
      const randomTitle = randomTitles[randomIndex];
      setSearchTitle(randomTitle);
      console.log("Title 1", searchTitle);

      try {
        const recommendedMovies = await getMoviebyTitle(randomTitle);
        setMovieData(recommendedMovies.Search);
        console.log(recommendedMovies.Search);
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
      }
    };

    fetchRecommendedMovies();
  }, []);
  return (
    <>
      <Head>
        <title>OMDB Browser - Recommendations</title>
        <meta name="description" content="Get movie recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} ${inter.className}`}>
        <h1 style={{ marginBottom: "10px", color: "white" }}>
          Theme of the day:
          <span style={{ color: "red" }}>{` ${searchTitle}`}</span>
        </h1>

        <div className={styles.movieCards}>
          {movieData.map((movie, index) => (
            <button
              key={index}
              onClick={() => {
                router.push({
                  pathname: "/movieDetails/[movieID]",
                  query: { movieID: movie.imdbID },
                });
              }}
            >
              <div className={styles.movieCard}>
                <div className={styles.movieTitleByQuery} key={index}>
                  {movie.Title}
                </div>
                <img
                  src={movie.Poster}
                  alt="img"
                  className={styles.moviePosterbyQuery}
                />
              </div>
            </button>
          ))}
        </div>
      </main>
    </>
  );
}

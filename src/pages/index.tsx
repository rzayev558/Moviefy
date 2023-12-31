import Head from "next/head";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { getMoviebyTitle } from "@/services/movie-service";
import Loading from "@/components/loadingComp";
import { useRouter } from "next/router";
import { Movie } from "@/types/Movie";
import styles from "../styles/index.module.css";
import { MovieSearchResult } from "@/types/Movie";
import useMediaQueries from "@/hooks/useMediaQuery";
import SearchIcon from "@/components/SearchIcon";
const inter = Inter({ subsets: ["latin"] });

export default function Search() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieData, setMovieData] = useState<Array<Movie>>([]);
  const [loading, setLoading] = useState(false);
  const { sm } = useMediaQueries();

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovieTitle(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const searchedMovie: MovieSearchResult = await getMoviebyTitle(
        movieTitle
      );

      if (searchedMovie.Response === "False") {
        console.log(searchedMovie.Error);
        setLoading(false);
        return;
      }
      setMovieData(searchedMovie.Search!);
      setLoading(false);
      return movieData;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Spectral:wght@200&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search a movie"
          value={movieTitle}
          onChange={handleSubmit}
        />
        <button onClick={handleSearch} className={styles.button}>
          {sm && isClient ? <SearchIcon /> : "Search"}
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <main className={`${styles.main} ${inter.className}`}>
          <div className={styles.movieCards}>
            {movieData.length > 0
              ? movieData.map((movie, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      router.push({
                        pathname: "/[movieID]",
                        query: { movieID: movie.imdbID },
                      });
                    }}
                  >
                    <div className={styles.movieCard}>
                      <div key={index} className={styles.movieTitleByQuery}>
                        {movie.Title}
                      </div>
                      <img
                        src={movie.Poster}
                        alt="img"
                        className={styles.moviePosterbyQuery}
                      />
                    </div>
                  </button>
                ))
              : null}
          </div>
        </main>
      )}
    </>
  );
}

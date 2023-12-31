import Loading from "@/components/loadingComp";
import { getMovieByID } from "@/services/movie-service";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/index.module.css";
import { MovieData } from "@/types/Movie";

export default function MovieDetails() {
  const [movieDatabyID, setMovieDatabyID] = useState<MovieData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const movieID = router.query.movieID?.toString();
    const getSingleMovie = async () => {
      try {
        const movieData = await getMovieByID(movieID!);
        setMovieDatabyID(movieData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data", error);
      }
    };
    if (movieID) getSingleMovie();
  }, [router.query.movieID]);
  return (
    <div className={styles.movieContainer}>
      {loading ? (
        <Loading />
      ) : (
        movieDatabyID && (
          <>
            <h1 className={styles.movieTitle}>{movieDatabyID.Title}</h1>
            <div className={styles.moviePoster}>
              <img src={movieDatabyID.Poster} alt="Poster" />
            </div>

            <h2>Plot: </h2>
            <p className={styles.moviePlot}>{movieDatabyID.Plot}</p>
            <p className={styles.movieDetail}>
              Release Year: {movieDatabyID.Year}
            </p>
            <p className={styles.movieDetail}>
              Run Time: {movieDatabyID.Runtime}
            </p>
            <p className={styles.movieDetail}>Writer: {movieDatabyID.Writer}</p>
            <p className={styles.movieDetail}>
              IMDb Rating: {movieDatabyID.imdbRating}
            </p>
          </>
        )
      )}
    </div>
  );
}

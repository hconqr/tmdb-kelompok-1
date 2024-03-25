import React, { useState, useEffect } from "react";

function TrendingMovie() {
  const [trendingData, setTrendingData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US&API_KEY=${API_KEY}",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTI0NWY0MWU1ZDc1ZDEyM2VjY2IyNDM1ZjY2YzQ0YyIsInN1YiI6IjY1ZmQ0NmMxMjI2YzU2MDE3ZDZlZTNiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.epFMlhG3aQpOxVjyJ35IToRB5BLvjTsMZbRIRCXffR0",
            },
          }
        );
        const data = await response.json(); // Mengubah respons menjadi objek JSON
        console.log("response", data); // Menampilkan data dalam console
        setTrendingData(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchTrendingData();
  }, []);

  // Memastikan trendingData tidak null sebelum melakukan pemanggilan map
  return (
    <div className="container mx-auto px-4 text-justify">
      <h1 className="text-3xl font-bold my-4">Trending Movies....</h1>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {trendingData && trendingData.results ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingData.results.map((item, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                {item.title || item.name}
              </h2>
              <div className="bg-cover min-h-[250px] w-full rounded-t-md flex flex-col items-center pt-5 relative">
                <img
                  className="absolute -z-20 max-h-[250px] object-cover w-full top-0 left-0 filter blur-[3px]"
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt=""
                />
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt={item.title}
                  className="max-w-44 rounded-sm"
                />
              </div>
              <p className="text-gray-700 mt-5">{item.overview}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TrendingMovie;

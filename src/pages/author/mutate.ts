export const Mutationlogin = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/11?api_key=eb3f0730a4e73860f194d5a8cbd0bba8",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjNmMDczMGE0ZTczODYwZjE5NGQ1YThjYmQwYmJhOCIsIm5iZiI6MTcyMjM4MTQ3My43Nzk3LCJzdWIiOiI2NmE5MmQ1YzIxMzY4ZjQ3ODE1YzRlOGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZQJCaRWfJ3e9bTAGohJzIQdbZvme9berWbd7_PqKR1w'",
      },
    }
  );
  // console.log(res.json())
  return res.json();
};

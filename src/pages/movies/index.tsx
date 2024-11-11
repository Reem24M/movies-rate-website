// import React from 'react'

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { FetchMovieDetials } from "./query";
// import { Card } from "react-bootstrap";

export default function Movies() {
  const { id } = useParams<string>()
  const { data, isLoading, isError } = useQuery({ queryKey: ["movie"], queryFn: () => FetchMovieDetials(id as string) })

  if (isLoading) {
    return <p>Loading...</p>
  } else if (isError) {
    return <p>Error fetching movie details</p>
  }
  console.log(data);
  return (
    <div className="grid place-content-center h-[100vh] bg-slate-800 text-white">
      {
        data && <div className="flex justify-center w-[60rem]">

          <div className="w-full ml-10 rounded-xl">
            <img className="rounded-xl hover:scale-105 duration-150 ease-in-out h-full " src={`https://image.tmdb.org/t/p/w300${data.poster_path}`} />
          </div>
          <div className=" flex flex-col justify-around ml-5">
            <h1 className="Font text-yellow-400 hover:scale-105 cursor-pointer duration-150 ease-in">{data.title}</h1>
            <p className="text-3xl text-yellow-600">{data.status}</p>
            <p className="text-xl font-mono"><span className="text-2xl text-yellow-600">Release Date : </span> {data.release_date}</p>
            {/* <p className="text-xl  font-mono"><span className="text-2xl text-yellow-600">Genres : </span> {data.genres.map((genre) => genre.name).join(", ")}</p> */}
            <p className="text-2xl text-yellow-300 font-semibold  "><span className="text-2xl text-yellow-600">Rating : </span> {data.vote_average}</p>
            <p className="text-xl">{data.overview}</p>
          </div>

        </div>
      }
    </div>
  )
}

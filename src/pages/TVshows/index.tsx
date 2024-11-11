// import React from 'react'

import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { FetchTYshowDetails } from "./query"

// import { DisplayType } from "../Home";

export default function TVshows() {
  const { id } = useParams<string>()
  const { data, isLoading, isError } = useQuery({ queryKey: ["show"], queryFn: () => FetchTYshowDetails(id as string) })

  if (isLoading) {
    return <p>Loading...</p>
  } else if (isError) {
    return <p>Error fetching movie details</p>
  }
  console.log(data)
  return (
    <div className="grid place-content-center h-[100vh] bg-slate-800 text-white">
      {
        data && <div className="flex justify-center w-[70rem]">

          <div className="w-full ml-10 rounded-xl">
            <img className="rounded-xl hover:scale-105 duration-150 ease-in-out h-full " src={`https://image.tmdb.org/t/p/w300${data.poster_path}`} />
          </div>
          <div className=" flex flex-col justify-center ml-5">
            <h1 className="Font text-yellow-400 hover:scale-105 cursor-pointer duration-150 ease-in">{data.name}</h1>
            <p className="text-3xl text-yellow-600"><span className="text-2xl text-yellow-600">Number of Seasons : </span>{data.number_of_seasons}</p>
            <p className="text-3xl text-yellow-600"><span className="text-2xl text-yellow-600">Number of Episodes : </span>{data.number_of_episodes}</p>
            {/* <p className="text-xl  font-mono"><span className="text-2xl text-yellow-600">Genres : </span> {data.genres.map((genre) => genre.name).join(", ")}</p> */}
            <p className="text-2xl text-yellow-300 font-semibold  "><span className="text-2xl text-yellow-600">Rating : </span> {data.vote_average}</p>
            <p className="text-xl">{data.overview}</p>
          </div>

        </div>
      }
    </div>
  )
}
import { useState } from "react";
import { Button, ButtonGroup } from "semantic-ui-react";
import { FetchMovies, FetchTYshows } from "./query";
import { useQuery } from "@tanstack/react-query";
import ColumnDisplay from "./displaycol";
// import 'style.css';

// eslint-disable-next-line react-refresh/only-export-components
export enum DisplayType {
  Movies = "Movies",
  TVShows = "TVShows",
}

export default function Home() {
  const [displayType, setdisplaytype] = useState<DisplayType>(
    DisplayType.Movies
  );

  const {
    data: MoviesData,
    isLoading: isloadingMovies,
    isError: iserrorMovies,
  } = useQuery({
    queryKey: ["Movies"],
    queryFn: FetchMovies,
  });

  const {
    data: TVshowsData,
    isLoading: isloadingTvshow,
    isError: iserrorTvshows,
  } = useQuery({
    queryKey: ["TVshows"],
    queryFn: FetchTYshows,
  });

  return (
    <div style={{ height: "auto", textAlign: "center" }} className="bg-slate-800">
      <ButtonGroup>
        <Button
          color={displayType === DisplayType.Movies ? "blue" : undefined}
          onClick={() => setdisplaytype(DisplayType.Movies)}
        >
          Movies
        </Button>
        <Button
          color={displayType === DisplayType.TVShows ? "blue" : undefined}
          onClick={() => setdisplaytype(DisplayType.TVShows)}
        >
          TVShows
        </Button>
      </ButtonGroup>
      {(isloadingMovies || isloadingTvshow) && <div>Loading...</div>}
      {(iserrorTvshows || iserrorMovies) && <div>Error 20304</div>}
      <div>

        {
          displayType === DisplayType.Movies ? (
            MoviesData &&
            <div>
              <h1 className="text-yellow-400 Font mt-5 mb-5">
                Most Popular {DisplayType.Movies}
              </h1>

              <ColumnDisplay key={"key"} data={MoviesData.results} displayType={DisplayType.Movies} head={"Movies"} />
            </div>
          ) : (
            TVshowsData &&
            <div>
              <h1 className="text-yellow-400 Font mt-5 mb-5">
                Most Popular {DisplayType.TVShows}
              </h1>
              <ColumnDisplay key={"key"} data={TVshowsData.results} displayType={DisplayType.TVShows} head={"TVshows"} />
            </div>

          )
        }
      </div>

    </div>
  );
}

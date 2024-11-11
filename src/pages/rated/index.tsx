// import React from 'react'
import { useState } from 'react'
import { Header, Menu, Segment } from 'semantic-ui-react'
import { DisplayType } from '../Home'
import { useQuery } from '@tanstack/react-query'
import { fetchratedMovie, fetchratedTV } from './mutate'
import ColumnDisplay from '../Home/displaycol'
import '../Home/style.css'
export default function Rated() {
  const [activetages, setactivetages] = useState<DisplayType>(DisplayType.Movies)

  const { data: ratedmoives, isLoading: isloadedratedmoives } =
    useQuery({
      queryKey: ["ratedmovie"],
      queryFn: fetchratedMovie
    }
    )
  const { data: ratedtvshows, isLoading: isloadedratedtvshows } =
    useQuery({
      queryKey: ["ratedtvshow"],
      queryFn: fetchratedTV
    }
    )
  if (isloadedratedmoives) return <h1>Loading Moives</h1>
  if (isloadedratedtvshows) return <h1>Loading TVshows</h1>
  return (
    <div className='bg-slate-900 m-0 p-0'>
      {/* <Container className='bg-slate-900'> */}
      <Segment inverted className='tex-center flex justify-center items-center'>

        <Menu inverted pointing secondary>
          <Menu.Item className='text-2xl Font hover:cursor-pointer' as='Movies' active={activetages === DisplayType.Movies} onClick={() => setactivetages(DisplayType.Movies)} >Moives</Menu.Item>
          <Menu.Item className='text-2xl Font hover:cursor-pointer' as='TVShows' active={activetages === DisplayType.TVShows} onClick={() => setactivetages(DisplayType.TVShows)}>TVshows</Menu.Item>
        </Menu>
      </Segment>
      <Segment className='bg-slate-900 m-0 p-0'>
        {activetages === DisplayType.Movies ?
          <div className='bg-slate-900 m-0 p-0'>
            <Header className='Font text-white text-center w-full  text-5xl'>Rated Moives</Header>
            <ColumnDisplay data={ratedmoives.results} displayType={DisplayType.Movies} head={DisplayType.Movies} />
          </div>
          : <div className='bg-slate-900'>
            <Header className='text-center  text-white text-5xl'>Rated TVshows</Header>
            <ColumnDisplay data={ratedtvshows.results} displayType={DisplayType.TVShows} head={DisplayType.TVShows} />
          </div>
        }
      </Segment>
      {/* </Container> */}
    </div>
  )
}

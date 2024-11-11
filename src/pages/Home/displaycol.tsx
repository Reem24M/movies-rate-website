// import React from 'react'
import { Card, Container } from 'react-bootstrap';
import { CardGroup, Form, Grid, GridColumn } from 'semantic-ui-react';
import { DisplayType } from "./index";
import "./style.css";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { rateMovie, rateTVShow } from './mutate';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface DisplayData {
  id: number;
  overview: string;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  release_date: string;
}

interface Props {
  data: DisplayData[];
  displayType: DisplayType;
  head: string;
}
export default function ColumnDisplay(props: Props) {
  const { data, displayType } = props;
  const [rating, setrating] = useState<number>(0)
  const onsuccess = () => {
    toast.success('Rating added successfully', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "black",
        color: "white",
      }
    })
  }
  const onerror = () => {
    toast.error('Failed to add rating', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "red",
        color: "white",
      }
    })

  }
  const { mutate: rateMovieMutation } =
    useMutation({
      mutationKey: ["ratemoive"],
      mutationFn: (id: number) => rateMovie(id, rating),
      onSuccess: onsuccess,
      onError: onerror,
    })

  const { mutate: ratetvshowMutation } = useMutation({ mutationKey: ["rateTVShow"], mutationFn: (id: number) => rateTVShow(id, rating) })

  const rate = displayType === DisplayType.Movies ? rateMovieMutation : ratetvshowMutation

  return (
    <Container>

      <Grid
        columns={3}
        stackable
        centered
        verticalAlign="top"
        padded="vertically"
      >
        {data.map((displayData: DisplayData) => (
          <GridColumn key={displayData.id}>
            <CardGroup>
              <Link
                to={`/${displayType === DisplayType.Movies ? "movies" : "tvshows"
                  }/${displayData.id}`}
              >

                <Card style={{ width: "25rem", height: '41rem', marginTop: '2rem' }} className='bg-black hover:scale-105 cursor-pointer text-gray-400 duration-150 ease-in-out hover:border-yellow-500'>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w300${displayData.poster_path}`}
                    style={{ height: '20rem' }}
                  />
                  <Card.Body>
                    <Card.Title className='Font font-bold mb-1 text-yellow-400 hover:scale-105 hover:text-white duration-150 ease-out'>{displayType === DisplayType.Movies ? displayData.title : displayData.name} </Card.Title>

                    <Card.Title className='mb-3 mt-3 text-gray-200'>{` Release Date : ${displayData.vote_average} | Rating : ${displayData.release_date}`} </Card.Title>

                    <Card.Text>
                      {displayData.overview.slice(0, 350) + "..."}
                    </Card.Text>
                  </Card.Body>

                </Card>
              </Link>
              <Form style={{ marginTop: 10, marginBottom: 10 }}>
                <Form.Field>
                  <Form.Input type="number" min="0" max="10" step="0.5" onChange={(event) => setrating(Number(event.target.value))} action={{
                    color: "violet",
                    labelPostion: "center",
                    icon: "star",
                    content: "rate",
                    onClick: () => {
                      rate(displayData.id)
                    }
                  }} />
                </Form.Field>

              </Form>
           

            </CardGroup>
          </GridColumn>
        ))}
      </Grid>
    </Container>
  );
}

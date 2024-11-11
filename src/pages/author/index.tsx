// import React from 'react'
import { Grid, Form, Button, Segment, Header } from "semantic-ui-react"
import { Mutationlogin } from "./mutate"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
export default function Auth() {
  const { data, mutate } = useMutation({ mutationKey: ["login"], mutationFn: Mutationlogin });

  const navigate = useNavigate()

  const handelchange = async () => {
    await mutate();
    localStorage.setItem("guest_sessiion_id", data?.guest_session_id)
    navigate("/")

  }
  return (
    <div>
      <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
        <Grid.Column style={{ maxWidth: "450" }}>
          <Header color="blue" textAlign="center">
            Welcome login by regestrtion as guest below
            <Form className="w-[400px] bg-gray-600">
              <Segment stacked>
                <Button color="violet" size="small" fluid onClick={handelchange}>
                  LogIn
                </Button>
              </Segment>
            </Form>
          </Header>
        </Grid.Column>
      </Grid>
    </div>
  )
}

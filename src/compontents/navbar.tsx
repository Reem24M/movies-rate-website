import Menu from "semantic-ui-react/dist/commonjs/collections/Menu";
import { Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import '../pages/Home/style.css'

export default function NavBar() {
  return (
    <div className="mb-0">
      <Segment inverted className="mb-0">

        <Menu inverted pointing secondary>
          <Menu.Menu >
            <Menu.Item className='text-2xl Font hover:cursor-pointer text-yellow-300' as={Link} to="/" name="Home" />
          </Menu.Menu>
          <Menu.Menu position="right" >
            <Menu.Item className='text-2xl Font hover:cursor-pointer text-yellow-300 font-semibold' as={Link} to="/rated" name="Rated" />
          </Menu.Menu>
        </Menu>
      </Segment>
    </div>
  )
}

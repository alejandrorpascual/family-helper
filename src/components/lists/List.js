import * as React from 'react'
import {Item} from 'semantic-ui-react'

function List({title, description, createdAt}) {
  const {Extra, Content, Header, Description, Image} = Item
  return (
    <Item>
      <Image
        src='https://react.semantic-ui.com/images/wireframe/image.png'
        size='tiny'
      />
      <Content>
        <Header>{title}</Header>
        <Description>{description}</Description>
        <Extra>{new Date(createdAt).toDateString()}</Extra>
      </Content>
    </Item>
  )
}

export default List

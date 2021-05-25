import * as React from 'react'
import {Item} from 'semantic-ui-react'
import List from './List'

function Lists({lists}) {
  return (
    <Item.Group>
      {lists?.map(item => (
        <List key={item.id} {...item} />
      ))}
    </Item.Group>
  )
}

export default Lists

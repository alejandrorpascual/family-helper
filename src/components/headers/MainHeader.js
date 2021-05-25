import * as React from 'react'
import {Header, Icon} from 'semantic-ui-react'

function MainHeader() {
  const {Content} = Header
  return (
    <div>
      <Header className='mt-1 mb-3' as='h2' textAlign='center' icon>
        <Icon name='users' />
        <Content>Family Helper</Content>
      </Header>
    </div>
  )
}

export default MainHeader

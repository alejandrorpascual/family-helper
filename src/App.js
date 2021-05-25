import * as React from 'react'
import './App.css'
import Amplify, {API, graphqlOperation} from 'aws-amplify'
import awsConfig from './aws-exports'
import {AmplifyAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react'
import {listLists} from './graphql/queries'
import 'semantic-ui-css/semantic.min.css'
import MainHeader from './components/headers/MainHeader'
import Lists from './components/lists/Lists'
import {Button, Container, Form, Icon, Modal} from 'semantic-ui-react'

Amplify.configure(awsConfig)

function App() {
  const [lists, setLists] = React.useState([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  async function fetchList() {
    const {data} = await API.graphql(graphqlOperation(listLists))
    setLists(data.listLists.items)
    console.log(data)
  }

  React.useEffect(() => {
    fetchList()
  }, [])

  return (
    <AmplifyAuthenticator>
      <Container style={{height: '100vh'}}>
        <AmplifySignOut />
        <Button className='floatingButton' onClick={() => setIsModalOpen(true)}>
          <Icon name='plus' className='floatingButton_icon' />
        </Button>

        <div className='App'>
          <MainHeader />
          <Lists lists={lists} />
        </div>
      </Container>
      <Modal open={true} dimmer='blurring'>
        <Modal.Header>Create your list</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input label='List Title' placeholder='Enter title...' />
            <Form.TextArea
              error={true ? false : {content: 'Please add a name to your list'}}
              label='Description'
              placeholder='Enter description...'
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button positive onClick={() => setIsModalOpen(false)}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </AmplifyAuthenticator>
  )
}

export default App

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
import {createList} from './graphql/mutations'

Amplify.configure(awsConfig)

const initialState = {
  title: '',
  description: '',
}

function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'DESCRIPTION_CHANGED': {
      return {...state, description: action.value}
    }
    case 'TITLE_CHANGED': {
      return {...state, title: action.value}
    }
    default:
      console.log('Default action for', action)
      return state
  }
}

function App() {
  const [state, dispatch] = React.useReducer(listReducer, initialState)

  const [lists, setLists] = React.useState([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  React.useEffect(() => {
    async function fetchList() {
      try {
        const {data} = await API.graphql(graphqlOperation(listLists))
        setLists(data.listLists.items)
        console.log(data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchList()
  }, [])

  async function saveList() {
    const {title, description} = state
    try {
      const result = await API.graphql(
        graphqlOperation(createList, {
          input: {title, description},
        }),
      )
      setIsModalOpen(false)
      console.log('Save data with result:', result)
    } catch (e) {
      console.error(e)
    }
  }

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
      <Modal open={isModalOpen} dimmer='blurring'>
        <Modal.Header>Create your list</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              error={true ? false : {content: 'Please add a name to your list'}}
              label='List Title'
              placeholder='Enter title...'
              value={state.title}
              onChange={e =>
                dispatch({type: 'TITLE_CHANGED', value: e.target.value})
              }
            />
            <Form.TextArea
              label='Description'
              placeholder='Enter description...'
              value={state.description}
              onChange={e =>
                dispatch({type: 'DESCRIPTION_CHANGED', value: e.target.value})
              }
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button positive onClick={saveList}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </AmplifyAuthenticator>
  )
}

export default App

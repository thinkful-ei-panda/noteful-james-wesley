import React from 'react'
import Header from './Header'
import Folders from './Folders'
import Notes from './Notes'
import store from './dummy-store'
import {Route, withRouter} from 'react-router-dom'

class App extends React.Component{
  state = {
    ...store,
    currentFolder:null,
    currentNote: null
  }


  //On Folder Click
  handleFolderSelect = (e) => {
    this.setState({
      currentFolder:e.target.id,
      currentNote:null
    })
    this.props.history.push(`/folders/${e.target.id}`)
  }

  //On Note Click
  handleNoteSelect = (e) => {
    this.setState({currentNote:e.currentTarget.id})
    this.props.history.push(`/notes/${e.currentTarget.id}`)
  }

  //On Header Click
  handleClickHeader= () => {
    this.setState({currentNote:null, currentFolder:null})
    this.props.history.push(`/`)
  }

  //On Back Click
  handleBackClick= () =>{
    this.setState({currentNote:null})
    this.props.history.goBack()
  }

  render(){
    return (
      <div className='App'>
        <Header handleClickHeader={this.handleClickHeader}/>
        <main>
          {/* Home Route */}
          <Route exact 
            path='/' 
            render={() => <Folders handleFolderSelect={this.handleFolderSelect} folders={this.state.folders}/>}
          />
          

          {/* Folder Route */}
          <Route
            exact
            path='/folders/:folderId' 
            render={() => <Folders currentFolder={this.state.currentFolder} handleFolderSelect={this.handleFolderSelect} folders={this.state.folders}/>} 
          />

          {/* Note Route */}
          <Route
            exact
            path='/notes/:noteId' 
            render={(routeProps) => <Folders {...routeProps} handleBackClick={this.handleBackClick} notes={this.state.notes} folders={this.state.folders} currentNote={this.state.currentNote} currentFolder={this.state.currentFolder} handleFolderSelect={this.handleFolderSelect} />} 
          />

          <Route
            path='/'
            render={() => <Notes currentFolder={this.state.currentFolder} handleNoteSelect={this.handleNoteSelect} currentNote={this.state.currentNote} notes={this.state.notes}/>}
          />
          
        </main>
      </div>

    )
  }
}

export default withRouter(App)
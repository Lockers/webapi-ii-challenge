import React from 'react';
import axios from 'axios';
import { Posts } from './components/Posts';

class App extends React.Component {
  state = {
    posts: [],
    singleComment: ''
  }

  componentDidMount() {
    this.getPosts()
    this.getComments()
  }

  getPosts = () => {
    axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        const posts = res.data;
        this.setState({ posts })
      })
      .catch(err => {
        console.log(err)
      })
  }
  getComments = (id) => {
    axios
      .get(`http://localhost:8000/api/posts/${id}/comments`)
      .then(res => {
        console.log(res.data)
        const comments = res.data;
        const singleComment = comments[0].text
        console.log(singleComment)
        this.setState({ singleComment: singleComment })
        
      })
      .catch(err => {
        console.log(err)
      })
  }

  createPosts = (event) => {
    event.preventDefault()
    const title = event.target['title'].value
    const contents = event.target['contents'].value

    const newPost = {
      title,
      contents
    }
    axios
      .post('http://localhost:8000/api/posts', newPost)
      .then(res => {
        const newPost = res.data;
        this.setState({ posts: [...this.state.posts, newPost] })
        this.getPosts()
      })
  }

  deleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        this.getPosts()
      })
      .catch(err => {
        console.log(err)
      })
  }
 
  render() {
    return (
      <div className="App">
        <p>There are {this.state.posts.length} Posts</p>
        <form onSubmit={this.createPosts}>
          <input
            type='text'
            name='title'
        />
          <input
            type='text'
            name='contents'
          />
        <button>Add User</button>
        </form>
        {this.state.posts.map(post => { 
          return <Posts post={post} key={post.id} deleteUser={this.deleteUser} getComments={this.getComments} comment={this.state.singleComment} />
        })
        }
    </div>
    );
  }
}

export default App;

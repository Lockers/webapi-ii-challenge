import React from 'react';
import axios from 'axios';
import { Posts } from './components/Posts';

class App extends React.Component {
  state = {
    posts:[]
  }

  componentDidMount() {
   this.getPosts()
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
      })
  }

  deleteUser = (id) => {
    axios
      .delete(`http://localhost:8000/api/posts/${id}`)
      .then(() => {
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
          return <Posts post={post} key={post.id} deleteUser={this.deleteUser} />
        })}
    </div>
    );
  }
}

export default App;

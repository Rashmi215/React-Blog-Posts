import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchSinglePost, deletePost} from '../actions';

class PostShow extends Component{
  componentDidMount(){
    const {id}= this.props.match.params;
    this.props.fetchSinglePost(id);
  }

  onDelete(){
    const {id}= this.props.match.params;
    this.props.deletePost(id,()=>{
      this.props.history.push('/');
    });
  }

  render(){
    const {post}= this.props;
    if(!post){
      return <div>Loading...</div>;
    }

    return(
      <div>
         <Link to= "/">Back to index</Link>
         <button className= "btn btn-danger pull-xs-right" onClick= {this.onDelete.bind(this)}>
            Delete Post
         </button>
         <h4>{post.title}</h4>
         <h6>Category: {post.categories}</h6>
         <p>{post.content}</p>
      </div>
    );
  }
}

function mapStateToProps({posts}, ownProps){
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchSinglePost, deletePost})(PostShow);

import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{

   renderField(field){
     const className= `form-group ${touched && error ? 'has-danger':''}`;
     const {meta: {touched, error}}= field;
     return(
       <div className= {className}>
         <label>{field.label}</label>
         <input
         className="form-control"
         type= "text"
         {...field.input} />
         <div className= "text-help">
            {touched ? error : ''}
         </div>
       </div>
     );
   }

   onSubmit(values){
     this.props.createPost(values, ()=>{
       this.props.history.push('/');
     });
   }

  render(){
    const {handleSubmit}= this.props;
    return(
      <form onSubmit= {handleSubmit(this.onSubmit.bind(this))}>
         <Field
            label= "Title"
            name= "title"
            component= {this.renderField}
         />
         <Field
            label= "Categories"
            name= "categories"
            component= {this.renderField}
         />
         <Field
            label= "Post Content"
            name= "content"
            component= {this.renderField}
         />
         <button type= "submit" className= "btn btn-primary">Save</button>
         <Link className= "btn btn-danger" to= "/">Cancel </Link>
      </form>
    );
  }
}

function validate(values){
  //create an empty error object
  const errors= {};

  //validate input from users
  if(!values.title){
    errors.title= "Enter a title";
  }
  if(!values.categories){
    errors.categories= "Enter some category";
  }
  if(!values.content){
    errors.content= "Enter some content please";
  }

  //if errors object is empty then form is fine to submit
  //if errors has any properties, redux form assumes form to be invalid
  return errors;

}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(
   connect(null, {createPost: createPost})(PostsNew)
);

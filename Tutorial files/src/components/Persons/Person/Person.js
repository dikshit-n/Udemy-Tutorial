import React , { Component , Fragment } from 'react';
import classes from './Person.css';
// import Auxillary from '../../../hoc/Auxillary'
import withClass from '../../../hoc/withClass'

class Person extends Component {
  render() {
    console.log('Person.js] rendering...')
      return( 
        // <div className={classes.Person}>
        // <withClass classes={classes.Person} >
        <div className={classes.Person}>
          <p key="i1" onClick={this.props.click}>
            I'm {this.props.name} and I am {this.props.age} years old!
          </p>
          <p key="i2" >{this.props.children}</p>
          <input key="i3" type="text" onChange={this.props.changed} value={this.props.name} />
        </div>
        // </withClass>
        // </div>
        );
  }
};

export default Person;

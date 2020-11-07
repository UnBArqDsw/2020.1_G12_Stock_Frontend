import React, { Component } from 'react';

class SelectField extends Component {
  render() {
    return (
      <select>
        {this.props.array.map((element) => {
          return <option>{element.name}</option>;
        })}
      </select>
    );
  }
}
export default SelectField;

import React from 'react';

var MyInput = React.createClass({
    getInitialState: function() {
      return {
        value: ""
      };
    },
    
    handleChange: function(evt) {
      this.setState({
        value: evt.target.value
      });
    },
    
    render: function() {
      return <input value={this.state.value} onChange={this.handleChange} />;
    }
  });
  
  ReactDOM.render(
    <MyInput />,
    document.getElementById('container')
  );

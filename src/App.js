import React, { Component } from 'react';
import logo from './logo.svg';
import TouchBackend from 'react-dnd-touch-backend';
import MultiBackend, { TouchTransition } from 'react-dnd-multi-backend';
import './App.css';
import Item from './Item';
import Target from './Target';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
const update = require('immutability-helper');


const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend
    },
    {
      backend: TouchBackend({enableMouseEvents: true}), // Note that you can call your backends with options
      preview: true,
      transition: TouchTransition
    }
  ]
};

class App extends Component {
  state = {
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
      { id: 4, name: 'Item 4' },
    ],
   
  }
  itemArr = []
  deleteItem = id => {
    this.setState(prevState => {
      return {
        items: prevState.items.filter(item => item.id !== id)
      }
    })
  }
  AddItem = item => {
   this.setState({item})
  }
  

  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <div className="app-container">
            <div className="item-container">
              {this.state.items.map((item, index) => (
                <Item key={item.id} item={item} handleDrop={(id) => this.deleteItem(id)} handleDrag={ (item) => {this.AddItem(item)}} />
              ))}
            </div>

            <Target itemArr={this.state.item} />
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(MultiBackend(HTML5toTouch))(App);
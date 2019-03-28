import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Item from './Item';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  }
}

class Target extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
    this.itemArr = []
  }
  componentWillReceiveProps(nextprops) {
    this.itemArr.push(nextprops.itemArr) 
    this.setState({
      items: this.itemArr
    })
  }
  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered ? 'lightgreen' : 'white';
    return connectDropTarget(
      <div className="target" style={{ background: backgroundColor }}>
        Target
        {this.state.items ? this.state.items.map((item, index) => {
         return <Item key={item.id} item={item} />
        })
          :
          null
        }
      </div>
    );
  }
}

export default DropTarget('item', {}, collect)(Target);

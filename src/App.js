import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class List extends React.Component {
  constructor() {
    super()
    this.state = {
      items: [],
      currentValue: ""
    }
  }

  addItem(e) {
    e.preventDefault();
    const {items, currentValue} = this.state
    if (currentValue !== '') {
      this.setState({
        items: [...items, currentValue],
        currentValue: ""
      })
    }
  }

  removeItem(item) {
    const {items, currentValue} = this.state
    const newItems = items.filter((buyItem) => {
      return buyItem !== item
    })
    this.setState({
      items: [...newItems]
    })
  }

  removeAll() {
    this.setState({
      items: []
    })
  }

  handleChange(e, newValue) {
    this.setState({
      currentValue: newValue
    })
  }

  render() {
    return (
      <MuiThemeProvider >
        <div className="todoList">
          <form onSubmit={(e) => {this.addItem(e)}}>
            <TextField hintText="What to do?" onChange={this.handleChange.bind(this)} value={this.state.currentValue}/>
            <RaisedButton type="submit" label="Add" />
            <RaisedButton type="button" onClick={(e) => this.removeAll()} label="Remove All" />
          </form>
          {
            this.state.items.map(item => {
              return (
                <div key={item}>
                  <TodoItem key={item} item={item} status="active" handler={this.removeItem.bind(this)}/>
                </div>
              )
            })
          }
        </div>
      </MuiThemeProvider>
    )
  }
}

const TodoItem = (props) => {
  return (
    <div className="todoList__item">
      <div className="status">{props.status}</div>
      <div className="content">{props.item}</div>
      <RaisedButton type="button" className="remove" onClick={(e) => props.handler(props.item)} label="remove" />
    </div>
  )
}



export default List

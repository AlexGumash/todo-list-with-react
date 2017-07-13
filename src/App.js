import React from 'react';

class List extends React.Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }

  addItem(e) {
    e.preventDefault();
    const newItem = this.newItem.value
    if (newItem !== '') {
      this.setState({
        items: [...this.state.items, newItem]
      })
    }
    this.addForm.reset()
  }

  removeItem(item) {
    const newItems = this.state.items.filter((buyItem) => {
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

  render() {
    return (
      <div className="todoList">
        <form ref={input => this.addForm = input} onSubmit={(e) => {this.addItem(e)}}>
          <input ref={input => this.newItem = input} type="text" placeholder="What to do?" />
          <button type="submit">Add</button>
          <button type="button" onClick={(e) => this.removeAll()}>remove All</button>
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
    )
  }
}

const TodoItem = (props) => {
  return (
    <div className="todoList__item">
      <div className="status">{props.status}</div>
      <div className="content">{props.item}</div>
      <button type="button" className="remove" onClick={(e) => props.handler(props.item)}>remove</button>
    </div>
  )
}

export default List

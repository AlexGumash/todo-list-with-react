import React from "react";
import TextField from "material-ui/TextField";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import injectTapEventPlugin from "react-tap-event-plugin";
import styled from "styled-components";

injectTapEventPlugin();

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      itemsToShow: [],
      currentValue: ""
    };
  }

  addItem(e) {
    e.preventDefault();
    function CurrentItem(currentValue, status, key) {
      this.value = currentValue.trim();
      this.status = status;
      this.key = key;
    }

    const { items, currentValue, itemsToShow } = this.state;
    const currentItem = new CurrentItem(currentValue, "active", currentValue);

    if (currentValue) {
      this.setState({
        items: [...items, currentItem],
        itemsToShow: [...itemsToShow, currentItem],
        currentValue: ""
      });
    }
  }

  removeItem(item) {
    const { items } = this.state;

    const newItems = items.filter(buyItem => {
      return buyItem !== item;
    });
    this.setState({
      items: [...newItems],
      itemsToShow: [...newItems]
    });
  }

  removeAll() {
    this.setState({
      items: [],
      itemsToShow: []
    });
  }

  handleChange(e, newValue) {
    this.setState({
      currentValue: newValue
    });
  }

  makeDone(index) {
    const { items } = this.state;
    const newArr = items;

    newArr[index].status = "done";
    this.setState({
      items: [...newArr],
      itemsToShow: [...newArr]
    });
  }

  sort() {
    const { items } = this.state;

    items.sort(function(a, b) {
      if (a.status > b.status) {
        return 1;
      }
      if (a.status < b.status) {
        return -1;
      }
      return 0;
    });

    this.setState({
      items: [...items],
      itemsToShow: [...items]
    });
  }

  showFiltered(status) {
    const { items } = this.state;
    let newArr = [];

    this.setState({
      itemsToShow: [...items]
    });

    if (status === "active") {
      newArr = items.filter(buyItem => {
        return buyItem.status === "active";
      });
    } else if (status === "done") {
      newArr = items.filter(buyItem => {
        return buyItem.status === "done";
      });
    } else newArr = items;

    this.setState({
      itemsToShow: [...newArr]
    });
  }

  removeFinished() {
    const { items } = this.state;
    const newArr = items.filter(buyItem => {
      return buyItem.status !== "done";
    });
    this.setState({
      items: [...newArr],
      itemsToShow: [...newArr]
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className={this.props.className}>
          <div className="todoList">
            <form
              onSubmit={e => {
                this.addItem(e);
              }}
            >
              <TextField
                hintText="What to do?"
                onChange={this.handleChange.bind(this)}
                value={this.state.currentValue}
              />
              <RaisedButton
                type="submit"
                className="button button--add"
                label="Add"
              />
              <RaisedButton
                type="button"
                className="button button--remove-all"
                onClick={e => this.removeAll()}
                label="Remove All"
              />
              <RaisedButton
                type="button"
                className="button button--sort"
                onClick={e => this.sort()}
                label="Sort"
              />
              <RaisedButton
                type="button"
                className="button button--remove-finished"
                onClick={e => this.removeFinished()}
                label="Remove finished"
              />
            </form>
            {this.state.itemsToShow.map((item, index) => {
              return (
                <div key={item.key}>
                  <TodoItem
                    index={index}
                    key={item.key}
                    item={item}
                    status={item.status}
                    handler={this.removeItem.bind(this)}
                    handleDoneButton={this.makeDone.bind(this)}
                  />
                </div>
              );
            })}
            <div className="status-filter">
              <RaisedButton
                type="button"
                className="button button--status-all"
                onClick={e => this.showFiltered("all")}
                label="all"
              />
              <RaisedButton
                type="button"
                className="button button--status-active"
                onClick={e => this.showFiltered("active")}
                label="active"
              />
              <RaisedButton
                type="button"
                className="button button--status-done"
                onClick={e => this.showFiltered("done")}
                label="done"
              />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const StatusBar = styled.div`font-size: 20px;`;

class TodoItem extends React.Component {
  render() {
    return (
      <div className="todoList__item">
        <StatusBar>
          {this.props.status}
        </StatusBar>
        <div className="content">
          {this.props.item.value}
        </div>
        <RaisedButton
          type="button"
          className="button button--done"
          onClick={e => this.props.handleDoneButton(this.props.index)}
          label="DONE"
        />
        <RaisedButton
          type="button"
          className="button button--remove"
          onClick={e => this.props.handler(this.props.item)}
          label="remove"
        />
      </div>
    );
  }
}

export default List;

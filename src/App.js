import React, { Component } from 'react';
import Header from './components/Header';
import Products from './components/Products';

class App extends Component {
  state = {
    products: []
  }

  componentDidMount() {
    fetch('./data.json')
      .then(res => res.json())
      .then(products => {
        this.setState({ products })
      })
      .catch(err => {
        console.log('Unexpected error. err:', err)
      });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <Products products={this.state.products} />
      </div>
    );
  }
}

export default App;

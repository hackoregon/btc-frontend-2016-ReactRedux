import React, {
  Component
} from 'react'
import {
  getExample
} from '../utils/fetchSuggestions';
import Example from '../components/Visuals/ComposedMain.jsx'
class Dev extends Component {
  state = {
    data: [ ]
  }
  componentDidMount() {
    getExample(931)
      .then(response => {
        const {
          data
        } = response;
        let topPacs = data.filter(d => d.amount > 10000 && d.book_type == 'Political Committee').map(d => ({ name: d.contributor_payee, pacAmt: d.amount}));
        let topInd = data.filter(d => d.amount > 10000 && d.book_type == 'Individual').map(d => ({ name: d.contributor_payee, indAmt: d.amount}));
        let topBus = data.filter(d => d.amount > 10000 && d.book_type == 'Business Entity').map(d => ({ name: d.contributor_payee, bizAmt: d.amount}));
        this.setState({
          data: [...topPacs,...topInd,...topBus]
        });
      })
  }
  render() {
    return ( < Example data = {
        this.state.data
      }
      />);
    }
  }
  export default Dev;

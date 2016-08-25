import React, {
  Component
} from 'react'
import {
  getExample
} from '../utils/fetchSuggestions';
import Example from '../components/Visuals/ComposedMain.jsx'
class Dev extends Component {
  state = {
    data: [
    //   {
    //   contributor_payee: 'Outside',
    //   uv: 590,
    //   pv: 800,
    //   amount: 1400
    // }, {
    //   contributor_payee: 'Within',
    //   uv: 868,
    //   pv: 967,
    //   amount: 1506
    // }, {
    //   contributor_payee: 'In-donations',
    //   uv: 1397,
    //   pv: 1098,
    //   amount: 989
    // }, {
    //   contributor_payee: 'Out-donations',
    //   uv: 1480,
    //   pv: 1200,
    //   amount: 1228
    // }, {
    //   contributor_payee: 'total-in-state',
    //   uv: 1520,
    //   pv: 1108,
    //   amount: 1100
    // }, {
    //   contributor_payee: 'tota-grassroots',
    //   uv: 1400,
    //   pv: 680,
    //   amount: 1700
    // }
  ]
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

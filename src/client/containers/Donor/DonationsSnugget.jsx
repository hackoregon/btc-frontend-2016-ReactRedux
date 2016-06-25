import React, {Component,PropTypes} from 'react';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import DonutChart from '../../components/DonutChart/DonutChart.jsx'
import {Row} from 'react-flexbox-grid';
import _ from 'lodash';
import d3 from 'd3';
// import numeral from 'numeral';
// import d3 from 'd3';
// import {fixNames} from '../../utils';

const colors = [
    '#8dd3c7',
    '#ffffb3',
    '#bebada',
    '#fb8072',
    '#80b1d3',
    '#fdb462',
    '#b3de69',
    '#fccde5',
    '#2196F3',
    '#bc80bd',
    '#ccebc5',
    '#ffed6f',
    '#E91E63'
];

// function loadData(props){
//   const {loadSpending,params,spending} = props;
//   loadSpending(params,spending);
// }

class DonationsSnugget extends Component {

    constructor(props, content) {
        super(props, content);
        this.state = {
            colors: colors
        }
    }

    componentWillMount() {

        const {data} = this.props;
        debugger;
        const {spending, cashContribs} = data;
        if (!_.isEmpty(spending)) {
            const spendValues = d3.values(spending);
            const spendLabels = Object.keys(spending);
            if (!_.isEmpty(cashContribs)) {
                const cashValues = d3.values(cashContribs)
                const toFixLabels = Object.keys(cashContribs)
                const cashLabels = toFixLabels.map((name) => {
                    return (name.split(/\ \(/)[0]);
                });
                this.setState({spendValues, spendLabels, displaySpending:true, cashValues, cashLabels, displayCash: true});
            } else{
                this.setState({spendValues, spendLabels, displaySpending: true});
            }
        }
        // this.setState({year,spending,cashContribs});
    }

    componentWillReceiveProps(nextProps) {
      const {data} = nextProps;
      //     // const {dispatch} = this.props;
      const {spending, cashContribs} = data;
      if (!_.isEmpty(spending)) {
          const spendValues = d3.values(spending);
          const spendLabels = Object.keys(spending);

          if (!_.isEmpty(cashContribs)) {
              const cashValues = d3.values(cashContribs)
              const toFixLabels = Object.keys(cashContribs)
              const cashLabels = toFixLabels.map((name) => {
                  return (name.split(/\ \(/)[0]);
              });
              console.log(cashLabels)
              this.setState({spendValues, spendLabels, displaySpending:true, cashValues, cashLabels, displayCash: true});
          } else{
              this.setState({spendValues, spendLabels, displaySpending: true, displayCash: false});
          }
      }
    }

    shouldComponentUpdate(nextProps) {
      const {year} = nextProps;
      if(year != this.props.year) {
        return true
      }
      return false
    }

    render() {
        const spendingCopy = "Total donations this year and split by months on right"
        // const spendChart = this.state.displaySpending
        //     ?
        // const cashChart = this.state.displayCash
        //     ?
        return (
            <div {...this.props}>
                <StoryCard question={"What are they spending money on?"} description={spendingCopy}>
                    <Row center='xs' around='xs' middle='xs'>
                        <DonutChart title='All donations this year' data={{
                            values: this.state.spendValues,
                            labels: this.state.spendLabels
                        }} xs={12} md={6}/>
                      {this.state.displayCash ? (<DonutChart title='Giving To Other Campaigns' displayValue data={{
                            values: this.state.cashValues,
                            labels: this.state.cashLabels
                        }} xs={12} md={6}/>):null}
                    </Row>
                </StoryCard>
            </div>
        );

    }
}

DonationsSnugget.propTypes = {
  data: PropTypes.object,
  year: PropTypes.string
}
// function mapStateToProps(state, ownProps) {
//     const {year} = ownProps;
//     const {
//         entities: {
//             mungedSpending
//         }
//     } = state;
//     const {spending,cashContribs} = mungedSpending[year];
//     return {spending,cashContribs};
// }
export default DonationsSnugget;
// export default connect(mapStateToProps, {loadSpending})(DonationsSnugget);
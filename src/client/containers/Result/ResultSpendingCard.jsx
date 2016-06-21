import React, {Component} from 'react';
import {connect} from 'react-redux';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import SpendingChart from './SpendingChart.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import DonutChart from '../../components/DonutChart/DonutChart.jsx'
import {Row} from 'react-flexbox-grid';
import numeral from 'numeral';
import d3 from 'd3';
import {fixNames} from '../../utils';

// function loadData(props) {
//     const {filer_id} = props.params;
//     // props.loadSpending(filer_id);
// }

// function loadData(props) {
//     const {filer_id} = props.params;
//     // props.loadSpending(filer_id);
// }

// const SpendingDonut = React.createClass({
//   getDefaultProps(){
//     return{data : [100,10000]}
//   },
//   render () {
//     return(
//       <DonutChart data = {this.props.data} />)
//   }
// })
//
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
class ResultSpendingCard extends Component {

    constructor(props, content) {
        super(props, content);
        this.state = {
            data: [
                [175000],
                [13999],
                [21000],
                [89640],
                [3514],
                [25000],
                [19999]
            ],
            labels: [
                'General Operational Expenses',
                'Postage',
                'Reimbursement for Personal Expenditures',
                'Travel Expenses',
                'Unknown',
                'Management Services',
                'Other Advertising (yard signs, buttons, etc.)'
            ],
            colors: colors
        }
    }

    componentWillMount() {
        // loadData(this.props);
        // const {dispatch} = this.props;
    }

    // componentWillReceiveProps(nextProps) {
    //   if(nextProps.filer_id !== this.props.filer_id){
    //     loadData(nextProps)
    //   }
    // }

    renderCashContribs(){

      const {cashContrib} = this.props;
      if (!_.isEmpty(cashContrib)) {
      const cashLabels = Object.keys(cashContribs)
      const fixedLabels = cashLabels.map((name) => {
        return (name.split(/\ \(/)[0]);
      })

      return (<DonutChart title='Giving To Other Campaigns' displayValue data={{
          values: cashValues,
          labels: fixedLabels
      }} xs={12} md={6}/>);

    } else {
      return null;
    }
    }

    render() {
        const {mungedSpending, cashContribs} = this.props;

        if (!_.isEmpty(mungedSpending)) {
            const values = d3.values(mungedSpending);
            const labels = Object.keys(mungedSpending)
            const cashValues = d3.values(cashContribs)
            const cashLabels = Object.keys(cashContribs)
            const fixedLabels = cashLabels.map((name) => {
              return (name.split(/\ \(/)[0]);
            })

            const spendingCopy = "Broad patterns in expenditures can tell you a lot about a campaign. Are they in a competitive race?  You might expect to see a large portion of their budget spent on advertising. Are they an incumbent in a safe district?   They might not be spending much money on their own campaign, but will gift funds to other candidates or races they support. Some are not campaigning for votes, and their primary interest is to support other campaigns that are aligned with their mission. Follow the money to see if you can tell what kind of campaign you're looking at."

            return (
                <div {...this.props}>
                    <StoryCard question={"What are they spending money on?"} description={spendingCopy}>
                        <Row center='xs' around='xs' middle='xs'>
                            <DonutChart title='Spending For Their Own Campaign' data={{
                                values,
                                labels
                            }} xs={12} md={6}/>
                            <DonutChart title='Gifts To Other Campaigns' displayValue data={{
                                values: cashValues,
                                labels: fixedLabels
                            }} xs={12} md={6}/>
                          {this.renderCashContribs()}
                        </Row>
                    </StoryCard>
                </div>
            );

        } else {
            return (<Loading name='rotating-plane'/>)
        }

    }
}
function mapStateToProps(state) {
    const {
        entities: {
            mungedSpending,
            cashContribs
        }
    } = state;
    return {mungedSpending, cashContribs};
}
export default connect(mapStateToProps)(ResultSpendingCard);
// export default connect(mapStateToProps, {loadSpending})(ResultSpendingCard);
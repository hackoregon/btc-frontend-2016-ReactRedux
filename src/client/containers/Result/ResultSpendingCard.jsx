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
            colors: colors
        }
    }

    // componentWillMount() {
    //     // loadData(this.props);
    //     // const {dispatch} = this.props;
    // }

    componentWillReceiveProps(nextProps) {
      const {mungedSpending, cashContribs} = nextProps;
      if (!_.isEmpty(mungedSpending)) {
          const spendValues = d3.values(mungedSpending);
          const spendLabels = Object.keys(mungedSpending);

          this.setState({spendValues,spendLabels,displaySpending:true});
        }

        if (!_.isEmpty(cashContribs)) {
        const cashValues = d3.values(cashContribs)
        const toFixLabels = Object.keys(cashContribs)
        const cashLabels = toFixLabels.map((name) => {
          return (name.split(/\ \(/)[0]);
        });
        this.setState({cashValues,cashLabels,displayCash:true});
      }

    }

    render() {

            const spendingCopy = "Broad patterns in expenditures can tell you a lot about a campaign. Are they in a competitive race?  You might expect to see a large portion of their budget spent on advertising. Are they an incumbent in a safe district?   They might not be spending much money on their own campaign, but will gift funds to other candidates or races they support. Some are not campaigning for votes, and their primary interest is to support other campaigns that are aligned with their mission. Follow the money to see if you can tell what kind of campaign you're looking at."
            const spendChart = this.state.displaySpending ? (<DonutChart title='Spending For Their Own Campaign' data={{
                values:this.state.spendValues,
                labels:this.state.spendLabels
            }} xs={12} md={6}/>): (<Loading name='rotating-plane'/>);
            const cashChart = this.state.displayCash ? (<DonutChart title='Giving To Other Campaigns' displayValue data={{
                values: this.state.cashValues,
                labels: this.state.cashLabels
            }} xs={12} md={6}/>) : null;
            return (
                <div {...this.props}>
                    <StoryCard question={"What are they spending money on?"} description={spendingCopy}>
                        <Row center='xs' around='xs' middle='xs'>
                          {spendChart}
                          {cashChart}
                        </Row>
                    </StoryCard>
                </div>
            );

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
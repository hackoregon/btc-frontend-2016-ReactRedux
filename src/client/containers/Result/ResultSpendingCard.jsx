import React, {Component,PropTypes} from 'react';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import DonutChart from '../../components/DonutChart/DonutChart.jsx'
import {Row} from 'react-flexbox-grid';
import _ from 'lodash';
import d3 from 'd3';

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
    static propTypes = {
      data: PropTypes.object,
      year: PropTypes.string
    }

    constructor(props, content) {
        super(props, content);
        this.state = {
            colors: colors
        }
    }

    componentWillMount() {
        const {data} = this.props;
        const {spending, cashContribs} = data;
        if (!_.isEmpty(spending)) {
            const spendValues = d3.values(spending);
            const spendLabels = Object.keys(spending);
            if (!_.isEmpty(cashContribs)) {
                const cashValues = d3.values(cashContribs)
                // TODO: create label linksOrLabels
                // const toFixLabels = Object.keys(cashContribs)
                const cashLabels = Object.keys(cashContribs)
                // TODO : label linksOrLabels
                // const cashLabels = toFixLabels.map((name) => {
                //   let mutateName = name;
                //     return ({
                //         linkTo: `/donors/${filterNamesForLinks(name)}`,
                //         name:mutateName.split(/\ \(/)[0]
                //         })
                // });
                // const cashLabels = toFixLabels.map((name) => {
                //   let mutateName = name;
                //     return ({
                //         linkTo: `/donors/${filterNamesForLinks(name)}`,
                //         name:mutateName.split(/\ \(/)[0]
                //         })
                // });
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
      if(!_.isEmpty(data)){
        const {spending, cashContribs} = data;
        if (!_.isEmpty(spending)) {

            const spendValues = d3.values(spending);
            const spendLabels = Object.keys(spending);

            if (!_.isEmpty(cashContribs)) {
                const cashValues = d3.values(cashContribs)
                const toFixLabels = Object.keys(cashContribs)
                const cashLabels = toFixLabels.map((name) => {
                  const splitName = name.split(/\ \(/)[0];
                    return ({
                        name: splitName,
                        linkTo: `/donors/${name}` })
                });

                this.setState({spendValues, spendLabels, displaySpending:true, cashValues, cashLabels, displayCash: true});
            } else{
                this.setState({spendValues, spendLabels, displaySpending: true, displayCash: false});
            }
        }
      }

    }

    shouldComponentUpdate(nextProps) {
      const { year, data } = nextProps;
      if(year != this.props.year && !_.isEmpty(data)) {
        return true;
      }
      return false;
    }

    render() {
        const spendingCopy = "Broad patterns in expenditures can tell you a lot about a campaign. Are they in a competitive race?  You might expect to see a large portion of their budget spent on advertising. Are they an incumbent in a safe district?   They might not be spending much money on their own campaign, but will gift funds to other candidates or races they support. Some are not campaigning for votes, and their primary interest is to support other campaigns that are aligned with their mission. Follow the money to see if you can tell what kind of campaign you're looking at." // eslint-disable-line quotes
        // const spendChart = this.state.displaySpending
        //     ?
        // const cashChart = this.state.displayCash
        //     ?
        return (
            <div>
                <StoryCard question={"What are they spending money on?"} description={spendingCopy}>
                    <Row center='sm' around='sm' middle='sm'>
                        <DonutChart xs={12} sm={6} wrapRow title='Spending For Their Own Campaign' data={{
                            values: this.state.spendValues,
                            labels: this.state.spendLabels
                        }} md={6}/>
                      {this.state.displayCash ? (<DonutChart
                        labelLinks
                        xs={12} sm={6} wrapRow title='Giving To Other Campaigns' displayValue data={{
                            values: this.state.cashValues,
                            labels: this.state.cashLabels
                        }} md={6}/>):null}
                    </Row>
                </StoryCard>
            </div>
        );

    }
}

export default ResultSpendingCard;
import React, {Component, PropTypes} from 'react';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import DonutChart from '../../components/DonutChart/DonutChart.jsx'
import {Row, Col} from 'react-flexbox-grid';
import _ from 'lodash';
import d3 from 'd3';
import DataTable from '../../components/DataVisuals/DataTable.jsx'

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

function getByFilerAmounts(trans) {
    let obj = {};
    trans.forEach((item) => {
        if (item.filer) {
            let filer = item['filer'].split(';');
            if (filer in obj) {
                obj[filer] += item.amount;
            } else {
                obj[filer] = item.amount;
            }
        }
    });
    return obj;
}

function formatForTable(arr) {
    return arr.map((item) => {
        return {name: item.filer, link: item.filerId, value: item.amount}
    })
}
function filterTransactions(transactions, filterFunction) {
    let filtered = _.chain(transactions).filter(filterFunction).reduce((acc, d) => {
        if (acc[d.filer]) {
            acc[d.filer] += d.amount;
        } else {
            acc[d.filer] = d.amount;
        }
        return acc;
    }, {}).map((total, receiver, acc) => {
        return {value: total, name: receiver, link: acc.link}
    }).sortBy('value').takeRight(10).reverse().value();

    for (let i = 0; i < filtered.length; i++) {
      if (transactions[i].filer ==  filtered[i].name) {
        filtered[i]['link'] = transactions[i].filerId
      } else {
        filtered[i]['link'] = filtered[i].name
      }
    }

    return filtered;
}

class DonationsSnugget extends Component {

    constructor(props, content) {
        super(props, content);
        this.state = {
            colors: colors
        }
    }

    componentWillMount() {

        const {data} = this.props;

        if (!_.isEmpty(data)) {
            const byFiler = getByFilerAmounts(data);
            const spendValues = d3.values(byFiler);
            const spendLabels = Object.keys(byFiler);
            // if (!_.isEmpty(cashContribs)) {
            //     const cashValues = d3.values(cashContribs)
            //     const toFixLabels = Object.keys(cashContribs)
            //     const cashLabels = toFixLabels.map((name) => {
            //         return (name.split(/\ \(/)[0]);
            //     });
            //     this.setState({spendValues, spendLabels, displaySpending:true, cashValues, cashLabels, displayCash: true});
            // } else{
            this.setState({spendValues, spendLabels, displaySpending: true});
            // }
        }
        // this.setState({year,spending,cashContribs});
    }

    componentWillReceiveProps(nextProps) {
        const {data} = nextProps;
        //     // const {dispatch} = this.props;

        if (!_.isEmpty(data)) {
            console.log(data);
            const byFiler = getByFilerAmounts(data);
            const spendValues = d3.values(byFiler);
            const spendLabels = Object.keys(byFiler);
            this.setState({spendValues, spendLabels, displaySpending: true});
        }

    }

    shouldComponentUpdate(nextProps) {
        const {data} = nextProps;
        if (this.props.data == data) {
            return false
        }
        return true
    }

    render() {
        const {data} = this.props;
        const spendingCopy = "Total donations by year and filtered by months"
        // const spendChart = this.state.displaySpending
        //     ?
        // const cashChart = this.state.displayCash
        //     ?
        console.log('filtered:', filterTransactions(data))
        return (
            <div {...this.props}>
                <StoryCard question={"Who are they donating to?"} description={spendingCopy}>
                    <Row center='xs' around='xs' middle='xs'>
                        <DonutChart fontSize={12} wrapRow width={319} height={320} inner={85} outer={125} x={160} displayValue title='Donations this year' data={{
                            values: this.state.spendValues,
                            labels: this.state.spendLabels
                        }} xs={12} md={6}/>

                    </Row>
                    <Col xs>
                        <DataTable xs type='Top' title={'Recipients'} data={filterTransactions(data)}/>
                    </Col>
                </StoryCard>
            </div>
        );

    }
}

DonationsSnugget.propTypes = {
    data: PropTypes.array,
    year: PropTypes.string
}

export default DonationsSnugget;

// container
import React, { Component, PropTypes } from 'react';
import {  Row, Col } from 'react-flexbox-grid';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
// import ResultDonorsList from './ResultDonorsList.jsx';
import DataTable from '../../components/DataVisuals/DataTable.jsx'
import _ from 'lodash';
import WhoChart from './WhoChart.jsx';

function getWhoChartData(...types) {
  // Wrap sum values in array because WhoChart is expecting array of arrays
  let arr = _.map(types, (donors) => [_.sumBy(donors, 'amount')]);
  // let newArr = [[...arr[0],...arr[1],...arr[2]],[...arr[3],...arr[4]]]; // modified for new adjustments requested in data visual grouping
  // return newArr;
  return arr;
}
const formatName = (payee) => {
  return /\ \(/.test(payee) ? payee.split(/\ \(/)[0] : payee;
}
const makeTop = (trans,num) => {

  return _.chain(trans)
    .reduce((acc, d) => {
      if (acc[d.contributorPayee]) {
        acc[d.contributorPayee] += d.amount;
      } else {
        acc[d.contributorPayee] = d.amount;
      }
      return acc;
    }, {})
    .map((total, payee) => {
      return {
        value: total,
        name: formatName(payee),
        link: payee
      }
    })
    .sortBy('value')
    .takeRight(num)
    .reverse()
    .value();
}

// const ResultDonorsCard = (props) => {
  class ResultDonorsCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          ind: {},
          biz: {},
          pac: {}
        }
    }

    //
    componentWillReceiveProps(nextProps) {
      const {ind,biz,pac} = nextProps.contributions;
      this.setState({
        ind: ind,
        biz: biz,
        pac: pac
      });
    }


    render() {
      const {biz,ind,grassroots,pac,party} = this.props.contributions;

      // TODO: Empty array is placeholder for party information -- needs to be added
      // Order matters for WhoChart labels
      const whoChartDonorData = getWhoChartData(biz, ind, grassroots, pac, party);

      const indTop = ind.length ? (
        <Col xs style={{minWidth:'320px'}}>
        <DataTable  title={"Top Individual Donors"} data={makeTop(ind,5)}></DataTable>
        </Col>
      ) : null;

      const bizTop = biz.length ? (
        <Col xs style={{minWidth:'320px'}}>
        <DataTable title={"Top Business Donors"} data={makeTop(biz,5)}></DataTable>
        </Col>
      ) : null;

      const pacTop = pac.length ? (
        <Col xs style={{minWidth:'320px'}}>
          <DataTable title={"Top PAC Donors"} data={makeTop(pac,5)}></DataTable>
        </Col>
       ) :
        null;
      // const listItems =  this.renderDonorLists(individualDonors,businessDonors,pacDonors);
      const subtitleCopy = "There are three main types of donors to campaigns in Oregon: businesses, individuals, and other campaigns.  We've split the individuals category into \"individuals\" giving $200 or more, and \"grassroots\" giving under $200.  Sometimes you might see a campaign has a strong bias from one group, or has many types of stakeholders.  It's normal campaigns to give to other campaigns, but you're curious about a large amount of funding you can click through the hyperlink to follow the trail of money from PAC to PAC.";
        return (<StoryCard
                  question={"Who is giving?"}
                  description={subtitleCopy}>
                    <WhoChart data={whoChartDonorData} labels={[
                        'Business', 'Big Donors','Grassroots','PAC','Party'
                    ]} colors={['#bebada', '#fb8072', '#8dd3c7','#b3de69','#80b1d3']}/>

                    <Row between='xs'>
                      {bizTop}
                      {indTop}
                      {pacTop}
                    </Row>

                </StoryCard>
        );
    }
}

ResultDonorsCard.propTypes = {
  contributions:PropTypes.object
}

export default ResultDonorsCard;
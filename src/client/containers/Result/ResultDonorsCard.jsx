// container
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { CarouselItem } from 'react-bootstrap';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import ListsCarousel from '../../components/ResultsPage/ListsCarousel.jsx';
// import ResultDonorsList from './ResultDonorsList.jsx';
import DataTable from '../../components/DataVisuals/DataTable.jsx'
import {loadPACinfo,loadBizInfo, loadIndivs} from '../../actions'
import _ from 'lodash';
import WhoChart from './WhoChart.jsx';

// function loadData(props) {
//   const { filer_id } = props.params;
//   props.loadIndivs(filer_id);
//   props.loadBizInfo(filer_id);
//   props.loadPACinfo(filer_id);
// }

// class ResultDonorsCard extends Component {
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
function filterTransactions(transactions) {

  if(transactions.length){
  return _.chain(transactions)
    .reduce((acc, d) => {
      if (acc[d.contributorPayee]) {
        acc[d.contributorPayee] += d.amount;
      } else {
        acc[d.contributorPayee] = d.amount;
      }
      return acc;
    }, {})
    .map((total, receiver) => {
      return {
        value: total,
        name: receiver
      }
    })
    .sortBy('value')
    .takeRight(5)
    .reverse()
    .value();
  }
}
function filterTop(arr,num){
  if (arr.length < 10) num = 5;
  let top = [];
  for (let i = 0; i < num; i++) {
    top.unshift.apply(top,arr.slice(i,i+1));
  }

  return top.reverse().map((item) => {
    return {
      value: item.total,
      name: item.contributorPayee
    }
  });
  // return b.reverse();
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

    // renderDonorLists(ind,bus,pac){
    //   debugger;
    //   let args = [].slice.call(arguments);
    //   let donorTypes = [];
    //   let fullList = [];
    //   args.forEach((item) => {
    //     if(item.length>0){
    //       donorTypes.push(item);
    //     }
    //   });
    //   for (var i = 0; i < donorTypes.length; i++) {
    //     fullList.push(<ResultDonorsList key={i} donorType={"Top Donors"} donors={donorTypes[i]}></ResultDonorsList>)
    //   }
    //
    //   if(fullList.length > 2){
    //     return (
    //     <ListsCarousel>
    //       <CarouselItem>
    //         {[...fullList[0],...fullList[1]]}
    //       </CarouselItem>
    //       <CarouselItem>
    //         {[...fullList[2]]}
    //       </CarouselItem>
    //     </ListsCarousel>);
    //   }
    //     return (<div>Loading...</div>)
    //
    //
    // }

    render() {
      // const {pacContributions,businessContributions, indivContributions } = this.props;
      const {biz,ind,grassroots,pac,party} = this.props.contributions;


      // const [ smallDonors, largeDonors ] = _.partition(ind, (contr) => contr.grandTotal <= 250);

      // let individualDonors = _.values(ind);
      // let businessDonors = _.values(biz);
      // let pacDonors = _.values(pac);



      // TODO: Empty array is placeholder for party information -- needs to be added
      // Order matters for WhoChart labels
      const whoChartDonorData = getWhoChartData(biz, ind, grassroots, pac, party);

      // const newFundsData = getWhoChartData(businessDonors, largeDonors, smallDonors);
      // const xferFundsData = getWhoChartData(pacDonors, [{bookType:'party',grandTotal:0}]);
      // .orderBy('amount','desc');
      // let indivsTotal = individualDonors.map(d => d.grandTotal).reduce((a,b)=> {return a+b},0)
      // let businessTotal = businessDonors.map(d => d.grandTotal).reduce((a,b)=> {return a+b},0)
      // let pacTotal = pacDonors.map(d => d.grandTotal).reduce((a,b)=> {return a+b},0)
      const indTop = ind.length ? (
        <Col xs={12} md={4}>
        <DataTable style={{flex:'1', height:'20%'}} title={"Top Individual Donors"} data={makeTop(ind,5)}></DataTable>
        </Col>
      ) : null;

      const bizTop = biz.length ? (
        <Col xs={12} md={4}>
        <DataTable style={{flex:'1', height:'20%'}} title={"Top Business Donors"} data={makeTop(biz,5)}></DataTable>
        </Col>
      ) : null;

      const pacTop = pac.length ? (
        <Col xs={12} md={4}>
          <DataTable style={{flex:'1', height:'20%'}} title={"Top PAC Donors"} data={makeTop(pac,5)}></DataTable>
        </Col>
       ) :
        null;
      // const listItems =  this.renderDonorLists(individualDonors,businessDonors,pacDonors);
        return (<StoryCard
                  question={"Who is giving?"}
                  description={"This visualization is calculated by total dollars, not total people."}>
                    <WhoChart data={whoChartDonorData} labels={[
                        'Business', 'Large Donors','Grassroots','PAC','Party'
                    ]} colors={['#bebada', '#fb8072', '#8dd3c7','#b3de69','#80b1d3']}/>
                  <Grid fluid center="xs" >
                    <Row around="xs" center="xs" middle="xs" xs={6}>
                      {bizTop}
                      {indTop}
                      {pacTop}
                    </Row>
                    </Grid>
                </StoryCard>
        );
    }
}

ResultDonorsCard.propTypes = {
  contributions:PropTypes.object
}

// function mapStateToProps(state) {
//   const {entities:{
//     indivContributions, businessContributions, pacContributions
//     }
//   } = state;
//
//   // TODO: These objects are coming in asynchronously (and separately) but we only want to render the chart ...
//   // ... once all the data is there. So higher up we need to do a Promise.all on requests that fetch these resources
//   // This is a band-aid solution
//   if (!indivContributions || !businessContributions || !pacContributions) {
//     return {indivContributions: {}, pacContributions: {}, businessContributions: {}};
//   }
//
//   return {indivContributions,pacContributions, businessContributions};
// }

export default ResultDonorsCard;
// export default connect(mapStateToProps,{
//   loadPACinfo, loadBizInfo, loadIndivs
// })(ResultDonorsCard);

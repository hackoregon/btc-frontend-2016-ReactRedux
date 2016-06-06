// container
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CarouselItem } from 'react-bootstrap';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import ListsCarousel from '../../components/ResultsPage/ListsCarousel.jsx';
import ResultDonorsList from './ResultDonorsList.jsx';
import {loadPACinfo,loadBizInfo, loadIndivs} from '../../actions'
import _ from 'lodash';
import WhoChart from './WhoChart.jsx';

function loadData(props) {
  const { filer_id } = props.params;
  props.loadIndivs(filer_id);
  props.loadBizInfo(filer_id);
  props.loadPACinfo(filer_id);
}

class ResultDonorsCard extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
      loadData(this.props);
    }

    getWhoChartData(...bookTypes) {
      // Wrap sum values in array because WhoChart is expecting array of arrays
      return _.map(bookTypes, (donors) => [_.sumBy(donors, 'grandTotal')]);
    }

    componentWillReceiveProps(nextProps) {

    }

    renderDonorLists(ind,bus,pac){
      debugger;
      let args = [].slice.call(arguments);
      let donorTypes = [];
      let fullList = [];
      args.forEach((item) => {
        if(item.length>0){
          donorTypes.push(item);
        }
      });
      for (var i = 0; i < donorTypes.length; i++) {
        fullList.push(<ResultDonorsList key={i} donorType={"Top Donors"} donors={donorTypes[i]}></ResultDonorsList>)
      }

      if(fullList.length > 2){
        return (
        <ListsCarousel>
          <CarouselItem>
            {[...fullList[0],...fullList[1]]}
          </CarouselItem>
          <CarouselItem>
            {[...fullList[2]]}
          </CarouselItem>
        </ListsCarousel>);
      }
        return (<div>Loading...</div>)


    }

    render() {
      const {pacContributions,businessContributions, indivContributions } = this.props;
      const [ smallDonors, largeDonors ] = _.partition(indivContributions, (contr) => contr.grandTotal <= 250);

      let individualDonors = _.values(indivContributions);
      let businessDonors = _.values(businessContributions);
      let pacDonors = _.values(pacContributions);

      // TODO: Empty array is placeholder for party information -- needs to be added
      // Order matters for WhoChart labels
      const whoChartDonorData = this.getWhoChartData(pacDonors, businessDonors, largeDonors, smallDonors, []);

      // .orderBy('amount','desc');
      // let indivsTotal = individualDonors.map(d => d.grandTotal).reduce((a,b)=> {return a+b},0)
      // let businessTotal = businessDonors.map(d => d.grandTotal).reduce((a,b)=> {return a+b},0)
      // let pacTotal = pacDonors.map(d => d.grandTotal).reduce((a,b)=> {return a+b},0)

      // const listItems =  this.renderDonorLists(individualDonors,businessDonors,pacDonors);

        return (<div {...this.props}>
                <StoryCard
                  question={"Who is giving?"}
                  description={"This visualization is calculated by total dollars, not total people."}>
                  <WhoChart data={whoChartDonorData} />
                    <ListsCarousel>
                      <CarouselItem >
                      <ResultDonorsList donorType={"Top Individual Donors"} donors={individualDonors}></ResultDonorsList>
                      <ResultDonorsList donorType={"Top Business Donors"} donors={businessDonors}></ResultDonorsList>
                      </CarouselItem>
                      <CarouselItem>
                      <ResultDonorsList donorType={"Top PAC Donors"} donors={pacDonors}></ResultDonorsList>
                      </CarouselItem>
                    </ListsCarousel>
                </StoryCard>
                </div>
        );
    }
}

ResultDonorsCard.propTypes = {
  indivContributions: PropTypes.object,
  businessContributions: PropTypes.object,
  pacContributions: PropTypes.object
}

function mapStateToProps(state) {
  const {entities:{
    indivContributions, businessContributions, pacContributions
    }
  } = state;

  // TODO: These objects are coming in asynchronously (and separately) but we only want to render the chart ...
  // ... once all the data is there. So higher up we need to do a Promise.all on requests that fetch these resources
  // This is a band-aid solution
  if (!indivContributions || !businessContributions || !pacContributions) {
    return {indivContributions: {}, pacContributions: {}, businessContributions: {}};
  }

  return {indivContributions,pacContributions, businessContributions};
}

export default connect(mapStateToProps,{
  loadPACinfo, loadBizInfo, loadIndivs
})(ResultDonorsCard);

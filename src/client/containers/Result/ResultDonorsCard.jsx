// container
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Grid, Carousel, CarouselItem } from 'react-bootstrap';
import DataMap from '../../components/Visuals/DataMap.jsx';
import statesData from '../../data/statesData';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import ListsCarousel from '../../components/ResultsPage/ListsCarousel.jsx';
import ResultDonorsList from './ResultDonorsList.jsx';
import {loadPACinfo,loadBizInfo, loadIndivs} from '../../actions'
import _ from 'lodash';


function loadData(props) {
  const { filer_id } = props.params;
  props.loadIndivs(filer_id);
  props.loadBizInfo(filer_id);
  props.loadPACinfo(filer_id);
}

class ResultDonorsCard extends Component {

    constructor(props, content) {
        super(props, content);
    }
  
    componentWillMount() {
      // debugger
      loadData(this.props);
    }
    componentDidMount() {
        let filerId = this.props.params.filer_id != undefined ? this.props.params.filer_id : '931';
        loadData(this.props);
    }

    render() {
      const {pacContributions,businessContributions, indivContributions} = this.props;
      // let donorArray = _.values(contributions);
      let individualDonors = _.values(indivContributions);
      let businessDonors = _.values(businessContributions);
      let pacDonors = _.values(pacContributions);

      let indivsTotal = individualDonors.map(d => d.grandTotal).reduce((a,b)=> {return a+b},0)
      let businessTotal = businessDonors.map(d => d.grandTotal).reduce((a,b)=> {return a+b},0)
      let pacTotal = pacDonors.map(d => d.grandTotal).reduce((a,b)=> {return a+b},0)

      console.log('ind ',indivsTotal, 'bus ',businessTotal, 'pac ',pacTotal);
        return (<div>
                <StoryCard
                  question={"Who is giving?"}
                  description={"This visualization is calculated by total dollars, not total people."}>
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
  contributions: PropTypes.object
}

function mapStateToProps(state) {
  const {entities:{
    donors, indivContributions, businessContributions, pacContributions,transactions
    }
  } = state;
  return {donors,transactions,indivContributions,pacContributions, businessContributions};

}
export default connect(mapStateToProps,{
  loadPACinfo, loadBizInfo, loadIndivs
})(ResultDonorsCard);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Col, Row, Grid, Carousel, CarouselItem } from 'react-bootstrap';
import DataMap from '../../components/Visuals/DataMap.jsx';
import statesData from '../../data/statesData';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import ListsCarousel from '../../components/ResultsPage/ListsCarousel.jsx';
import ResultDonorsList from './ResultDonorsList.jsx';
import {loadTransactions, loadIndivs} from '../../actions'
// import {loadIndivs} from '../../actions'
import _ from 'lodash';
// import { fetchResultData } from '../../actions/index.js';

function loadData(props) {
  const { filer_id } = props.params;
  // debugger
  props.loadTransactions(filer_id);
}
function loadIndividuals(props){
  const { filer_id } = props.params;
  // debugger
  props.loadIndivs(filer_id);
}

class ResultDonorsCard extends Component {

    constructor(props, content) {
        super(props, content);
    }
    componentWillReceiveProps(nextProps) {
      // debugger
        const {dispatch} = this.props;
    }
    componentWillUpdate(nextProps, nextState) {
      // console.log('update:',nextProps,nextState)
        const {dispatch} = this.props;
    }
    componentWillMount() {
      // debugger
      loadData(this.props);
    }
    componentDidMount() {
        let filerId = this.props.params.filer_id != undefined ? this.props.params.filer_id : '931'
        // const {dispatch} = this.props;
        // dispatch(fetchResultData(filerId));
        loadIndividuals(this.props)
        // dispatch(fetchIndivDonors('5'))
    }

    render() {
      const {contributions, indivContributions} = this.props;
      let donorArray = _.values(contributions);
      let individualDonors = _.values(indivContributions);
      let businessDonors = _.chain(donorArray).filter({"bookType":"Business Entity"}).orderBy('amount','desc').value();
      let pacDonors = _.chain(donorArray).filter({"bookType":"Political Committee"}).orderBy('amount','desc').value();

      let indivsTotal = individualDonors.map(d => d.grandTotal).reduce((a,b)=> {return a+b},0)
      let businessTotal = businessDonors.map(d => d.amount).reduce((a,b)=> {return a+b},0)
      let pacTotal = pacDonors.map(d => d.amount).reduce((a,b)=> {return a+b},0)

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
    donors, indivContributions, transactions
    }
  } = state;
  return {donors,transactions,indivContributions};

}
export default connect(mapStateToProps,{
  loadTransactions, loadIndivs
})(ResultDonorsCard);

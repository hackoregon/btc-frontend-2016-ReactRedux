import React, {Component} from 'react';
import {connect} from 'react-redux';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import SpendingChart from './SpendingChart.jsx';
import {loadSpending} from '../../actions/spending';

function loadData(props) {
    const {filer_id} = props.params;
    // props.loadSpending(filer_id);
}

class ResultSpendingCard extends Component {

    constructor(props, content) {
        super(props, content);
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

    render() {
        // const {donations} = this.props;
        return (
            <div {...this.props}>
                <StoryCard question={"What are they spending money on?"} description={"Did you know campaigns self select these categories?"}>

                  <SpendingChart />
                </StoryCard>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const {entities: {
            expenditures
        }} = state;
    return {expenditures};
}
export default connect(mapStateToProps, {loadSpending})(ResultSpendingCard);
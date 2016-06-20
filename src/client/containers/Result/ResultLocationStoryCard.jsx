import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DataMap from '../../components/Visuals/DataMap.jsx';
import statesData from '../../data/statesData';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import Legend from '../../components/Legend/Legend.jsx';
import {loadStateInfo} from '../../actions'
import SizeMe from 'react-sizeme';
import numeral from 'numeral';
// function loadData(props) {
//   const {filer_id} = props.params;
//   props.loadStateInfo(filer_id);
// }
const SizeMeHOC = SizeMe({monitorWidth: true, monitorHeight: true, refreshRate: 16});

// const colors = [
//     '#EEFBFB',
//     '#CDF3F2',
//     '#89C2C0',
//     '#84BEBB',
//     '#71B0AE',
//     '#6CACAA',
//     '#5A9E9B',
//     '#1F8481',
//     '#165F5C'
// ]; // old colors
const colors = ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b']
const domainRange = [
    100,
    1000,
    10000,
    100000,
    1000000,
    10000000
];

function formatMoney(num) {
    // let minNum = num == 100 ? 1 : (num/10)+1;
    return numeral(num).format('$0,0');
}
const ResultLocationStoryCard = (props) => {
    const {stateContributions} = props;
    // class ResultLocationStoryCard extends Component {

    // constructor(props, content) {
    //   super(props, content);
    // }

    // componentWillMount() {
    //   loadData(this.props);
    // }

    // render() {
    // let stateContribs;
    // const {stateContributions} = this.props;
    let stateContribs = stateContributions;
    // let stateArray = _.values(stateContributions)
    let stateArr = [];
    statesData.forEach((item) => {
        if (stateContribs && stateContribs[item.regionName]) {
            item.value = stateContribs[item.regionName].value;
            stateArr.push(item);
        }
    })

    // var stateDataArr = statesData.map((i) => {
    //   if (stateContribs && stateContribs[i.regionName] !== undefined) {
    //     // console.log(stateContribs[i.regionName]);
    //     return {
    //       code: i.code,
    //       regionName: i.regionName,
    //       value: stateContribs[i.regionName].value
    //     }
    //   }
    //
    // });
    // console.log(stateDataArr);

    return (
        <StoryCard style={{
            minHeight: '400px',
            minWidth: '600px'
        }} question={"Where does the money come from?"} description={"Money spent in Oregon is raised all across the country. This graphic demonstrates the magnitude of money spent in Oregon by state of origin."}>
            <div style={{
                display: 'flex',
                flexFlow: 'wrap',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <DataMap customStyle={{
                    order: '2'
                }} palletteRange={colors} domainRange={domainRange} regionData={stateArr}/>
                <Legend centered wrapRow labels={domainRange.map(formatMoney)} colors={colors}/>
            </div>
        </StoryCard>
    );
    // }
}

ResultLocationStoryCard.propTypes = {
    stateContributions: PropTypes.object
}

// function mapStateToProps(state) {
// const {entities: {
//     stateContributions
//   }} = state;
// return {stateContributions};
// }

export default ResultLocationStoryCard;
// export default connect(mapStateToProps, {loadStateInfo})(SizeMeHOC(ResultLocationStoryCard));
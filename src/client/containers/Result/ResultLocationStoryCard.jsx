import React, { PropTypes } from 'react';
import DataMap from '../../components/Visuals/DataMap.jsx';
import statesData from '../../data/statesData';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import Legend from '../../components/Legend/Legend.jsx';
import numeral from 'numeral';

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
    return numeral(num).format('$0,0');
}
const ResultLocationStoryCard = (props) => {
    const {stateContributions} = props;

    let stateContribs = stateContributions;

    let stateArr = [];
    statesData.forEach((item) => {
        if (stateContribs && stateContribs[item.regionName]) {
            item.value = stateContribs[item.regionName].value;
            stateArr.push(item);
        }
    })

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
}

ResultLocationStoryCard.propTypes = {
    stateContributions: PropTypes.object
}


export default ResultLocationStoryCard;

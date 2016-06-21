import React, { Component, PropTypes } from 'react';
import StoryCard from '../../components/StoryCards/StoryCard.jsx';
import WhenChart from './WhenChart.jsx';


class ResultWhen extends Component {

    render() {
      const {sums, year} = this.props;
      const subtitleText = "Raising and spending in campaign cycles usually happens in seasons. This chart may not always be interesting, but when it is--- it's very interesting.  With this timeline it's easy to spot large contributions that may have been strategically avoiding attention around mandatory reporting windows. "
        return (<div {...this.props}>
                <StoryCard
                  question={"When are they raising and spending?"}
                  description={subtitleText}>

                  <WhenChart year={year} data={sums}/>
                </StoryCard>
                </div>
        );
    }
}

export default ResultWhen;

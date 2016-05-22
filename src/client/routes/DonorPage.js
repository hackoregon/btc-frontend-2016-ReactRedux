import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { Grid, Table } from 'react-bootstrap';
import BTCNav from '../components/Navigation/BTCNav.jsx';
import DataBoxGroup from '../components/DataBoxes/DataBoxGroup.jsx';
import BarChart from '../components/BarChart/BarChart.jsx';

import StoryCard from '../components/StoryCards/StoryCard.jsx';
import ListsCarousel from '../components/ResultsPage/ListsCarousel.jsx';
import ResultDonorsList from '../containers/Result/ResultDonorsList.jsx';
import { CarouselItem } from 'react-bootstrap';

class DonorPage extends Component {
  render() {
    const dataSummaryValues = [
      { name: 'Total Cash Donated', value: '22.5K' },
      { name: 'Total Donated In-Kind', value: '22.5K' },
      { name: 'Average Contribution', value: '22.5K' },
      { name: 'Largest Contribution', value: '22.5K' }
    ];
    const barChartData = [[26], [87], [90], [10], [34]];
    const colorData = ['#bebada', '#fb8072', '#8dd3c7', '#b3de69', '#80b1d3'];
    const labelData = [];
    const campaignRecipients = {
      'You sdfkd': {
        contributorPayee: "4L Founders LLC",
        filerId: 931,
        grandTotal: 2500,
        totalCount: 1
      }
    };
    const pacRecipients = {};


    return (
      <div>
        <BTCNav />
        <Grid fluid={ false }
          style={ { marginTop: '100px', fontWeight: '200px' } }
          params={ this.props.params }>

          <h2>Donor name</h2>
          <p>details</p>

          <h2>How much are they giving?</h2>
          <DataBoxGroup boxes={dataSummaryValues} />


          <StoryCard
            question={"Who are they giving to?"}
            description={"This visualization is calculated by total dollars, not total people."}>

          <BarChart
            colorBySeries={true}
            height={300}
            data={barChartData}
            labels={labelData}
            colors={colorData}
            horizontal={false}
            opaque={true}></BarChart>


            <ListsCarousel>
              <CarouselItem >
                <ResultDonorsList donorType={"Top Campaign Recipients"} donors={_.values(campaignRecipients)}></ResultDonorsList>
                <ResultDonorsList donorType={"Top PAC Recipients"} donors={_.values(campaignRecipients)}></ResultDonorsList>
              </CarouselItem>
            </ListsCarousel>
          </StoryCard>



        </Grid>
      </div>
    );

  }
}

export default DonorPage;
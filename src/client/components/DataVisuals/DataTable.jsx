import React from 'react';
import d3 from 'd3';
import DataTableBar from './DataTableBar.jsx';
import DonorRowItem from '../Visuals/DonorRowItem.jsx';
import {Panel} from 'react-bootstrap'
import {Row, Col} from 'react-flexbox-grid';
import numeral from 'numeral';
import _ from 'lodash';
import {filterNamesForLinks} from '../../utils';

const colorBlend = d3.interpolateRgb('#C0CFFF', '#1B3E99');

const DataTable = React.createClass({

    propTypes: {
        data: React.PropTypes.array,
        title: React.PropTypes.string,
        type: React.PropTypes.string
    },
    getDefaultProps() {
        this.props = {
            type: 'Default'
        }
    },
    donorPercent(amount, max, scale) { // scale optional right now
        if (amount > 0) {
            let donorSize = d3.scale.linear().domain([0, max]).range([0, 1]);
            return {
                size: 100 * donorSize(amount) + '%',
                color: colorBlend(donorSize(amount))
            };
        } else
            return {size: '0%', color: '#FFF'};
    },
    render() {
        const dataRows = _.map(this.props.data, (datum, idx) => {
            let linkTo = datum && datum.link && !isNaN(datum.link)
                ? `/recipients/${datum.link}`
                : `/donors/${datum.link}`;

                let amount = numeral(datum.value).format('$0,0.00');
                let direction = datum.direction == 'in' ? ' recieved ' : ' gave ';
                let fromTo = datum.direction == 'in' ? ' from ' : ' to ';

            switch (this.props.type) {
                case 'trans':
                    while (idx < 6) {
                        return (
                                <Row key={idx} xs className={'DataRowItem nameRow'} style={{
                                    flex: '1',
                                    margin: '.5rem'
                                }}>
                                <p className ={'Raleway'}>
                                  <a className={'Raleway text-underline btc-text-onyx'}  href={`/recipients/${datum.filerId}`}> {(datum.filer).split(/\ \(/)[0]} </a>
                                  <span style={{margin:'0 5px'}}> {direction} {amount} {fromTo} </span>
                                  <a className={'Raleway text-underline btc-text-onyx'} href={`/donors/${datum.name}`} > {(datum.name).split(/\ \(/)[0]}</a>.
                                  </p>
                                </Row>
                        );
                    }
                    break;
                default:

                  if(!datum.filerId){
                    linkTo = filterNamesForLinks(linkTo);
                  }

                    return (<DonorRowItem key={idx} donors={this.props.data} link={linkTo} payee={datum.name} formattedAmount={numeral(datum.value).format('$0a')} amount={datum.value}/>);
            }

        });
        return (
            <Panel header={this.props.title} style={{
                flex: '1'
            }}>
                <Col>
                    {dataRows}
                </Col>
            </Panel>
        );
    },
    renderBar(scale, value, max) {
        const height = 18;
        return (<DataTableBar height={height} scale={scale} max={max} value={value} color={colorBlend((scale(value) / 100))}/>);
    }
});

export default DataTable;
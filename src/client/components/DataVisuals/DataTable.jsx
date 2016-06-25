import React from 'react';
import d3 from 'd3';
import DataTableBar from './DataTableBar.jsx';
import DonorRowItem from '../Visuals/DonorRowItem.jsx';
import {Panel} from 'react-bootstrap'
import {Row, Col} from 'react-flexbox-grid';
import numeral from 'numeral';
import Link from 'react-router';
const colorBlend = d3.interpolateRgb('#C0CFFF', '#1B3E99');

function currency(amount) {

    if (amount > 1000000) {
        return '$' + ((amount) / 1000000).toFixed(0) + 'm';
    } else if (amount > 1000) {
        return '$' + ((amount) / 1000).toFixed(0) + 'k';
    } else {
        return '$' + amount.toFixed(0);
    }
}


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
    donorPercent(amount, max, scale) {
        if (amount > 0) {
            let donorSize = d3.scale.linear().domain([0, max]).range([0, 1]);
            return {
                size: 100 * donorSize(amount) + '%',
                color: colorBlend(donorSize(amount))
            };
        } else
            return {size: '0%', color: '#FFF'};
    },
    renderFeedRow(datum){
      let filer = (datum.filer).split(/\ \(/)[0];
      let payee = (datum.name).split(/\ \(/)[0];
      let amount = numeral(datum.value).format('$0,0.00');
      let msg = (<p>Unsure what happend here but {filer}
          filed for recieving {amount}</p>);

      if(datum.direction == 'in'){
          msg = (<p className={'OpenSans'}>
                      <span><Link className={'Raleway text-underline'} to={`/recipients/${datum.filerId}`}>{filer}</Link></span>
                      recieved {amount} from
                        <span><Link className={'Raleway'} to={`/donors/${datum.name}`}>{payee}</Link></span>
                      </p>);
        }
          if(datum.direction == 'out'){
            msg = (  <p className={'OpenSans'}>
                        <span><Link className={'Raleway text-underline'} to={`/recipients/${datum.filerId}`}>{filer}</Link></span>
                        gave {amount} to
                          <span><Link className={'Raleway'} to={`/donors/${datum.name}`}>{payee}</Link></span>
                        </p>);
        }

      return msg;
    },
    render() {
        const dataMax = d3.max(_.map(this.props.data, 'value'));
        const scale = d3.scale.linear().domain([0, dataMax]).range([10, 100]);

        const dataRows = _.map(this.props.data, (datum, idx) => {

            let linkTo = datum.link != null && isNaN(datum.link)
                ? `/donors/${datum.link}`
                : `/recipients/${datum.link}`;
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
                    return (<DonorRowItem key={idx} donors={this.props.data} link={linkTo} payee={datum.name} formattedAmount={currency(datum.value)} amount={datum.value}/>);

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
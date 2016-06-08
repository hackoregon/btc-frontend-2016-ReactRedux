import React from 'react';
import Select from 'react-select';
import './Select.css';

const YEARS = [{ value: '2011', label: '2011' },
    { value: '2012', label: '2012' },
    { value: '2013', label: '2013' },
    { value: '2014', label: '2014' },
    { value: '2015', label: '2015' },
    { value: '2016', label: '2016' }];

const YearField = React.createClass({
	getInitialState () {
		return {
			year: YEARS[0],
			selectValue: YEARS[0]
		};
	},
	updateValue (newValue) {
		console.log('State changed to ' + newValue);
    const {onToggleSelect} = this.props;

		this.setState({
			selectValue: newValue
		});

    if (onToggleSelect){
      onToggleSelect(newValue);
    }
	},
	render () {
    const {years} = this.props;
    let yrs;
    if(years.length>0){
        yrs = years.map((year) => {
          return {
            value: year,
            label: year
        }
      });
    }

		var options = years.length > 0 ? yrs : YEARS;

		return (
				<Select style={{ width:'10rem'}} ref="yearSelect" options={options} clearable={false} autosize={false} simpleValue name="selected-state" value={this.state.selectValue} onChange={this.updateValue} />
		);
	}
});

export default YearField;
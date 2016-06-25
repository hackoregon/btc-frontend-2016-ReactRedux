import React from 'react';
import Select from 'react-select';
import './Select.css';
import './Year.css';

const YEARS = [{ value: '2010', label: '2010' },
    { value: '2011', label: '2011' },
    { value: '2012', label: '2012' },
    { value: '2013', label: '2013' },
    { value: '2014', label: '2014' },
    { value: '2015', label: '2015' },
    { value: '2016', label: '2016' }];

const YearField = React.createClass({
	getInitialState () {
		return {
			year: YEARS[YEARS.length-1],
      years: YEARS,
      selectValue: YEARS[YEARS.length-1]
		};
	},

  componentWillMount() {
    const {years} = this.props;
    if(years != undefined && years.length>0){
        let yrs = years.map((year) => {
          return {
            value: year,
            label: year
          }
        });

        this.setState({
            selectValue: yrs[yrs.length-1],
            years: yrs,
            noUpdate: true
        });
      }
  },

  componentWillReceiveProps (nextProps,nextState) {
    const {years} = nextProps;
    const {noUpdate} = this.state;

    if(years != undefined && years.length>0){
        let yrs = years.map((year) => {
          return {
            value: year,
            label: year
          }
        });
      // if(!noUpdate){
      //
          // this.setState({
          //     selectValue: yrs[yrs.length-1],
          //     years: yrs,
          //     noUpdate: true
          // });
      // }
      this.setState({
        disabled: false,
        years: yrs
      });
    }

  },
  shouldComponentUpdate(nextProps, nextState) {
    const {years} = nextProps;
    if(years != undefined && years.length > 0) {
      return true;
    }
    return false;
  },

	updateValue (newValue) {

    const {onToggleSelect} = this.props;

		this.setState({
      // noUpdate: true,
			selectValue: newValue
		});

    if (onToggleSelect){
      onToggleSelect(newValue);
    }
	},
	render () {
		const options = this.state.years || YEARS;


		return (
				<Select className={'Year'} ref="yearSelect" disabled={this.state.disabled} options={this.state.years} clearable={false} autosize={false} simpleValue name="selected-state" value={this.state.selectValue} onChange={this.updateValue} />
		);
	}
});

export default YearField;
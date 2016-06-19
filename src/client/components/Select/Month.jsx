import React from 'react';
import Select from 'react-select';
import './Select.css';

const MONTHS = [
  {label: 'Jan', value: 'Jan' },
  {label: 'Feb', value: 'Feb' },
  {label: 'Mar', value: 'Mar' },
  {label: 'Apr', value: 'Apr' },
  {label: 'May', value: 'May' },
  {label: 'Jun', value: 'Jun' },
  {label: 'Jul', value: 'Jul' },
  {label: 'Aug', value: 'Aug' },
  {label: 'Sep', value: 'Sep' },
  {label: 'Oct', value: 'Oct' },
  {label: 'Nov', value: 'Nov' },
  {label: 'Dec', value: 'Dec' }
];

const MonthField = React.createClass({
	getInitialState () {
		return {
			month: MONTHS[0],
      months: MONTHS,
			selectValue: MONTHS[0]
		};
	},
  componentWillReceiveProps(nextProps) {
    const {months} = nextProps;
    let mon;
    if(months != undefined && months.length>0){
        mon = months.map((month) => {
          return {
            value: month,
            label: month
        }
      });
    }
    this.setState({
      months: mon
    });
  },
  shouldComponentUpdate(nextProps, nextState) {
    const {months} = nextState;
    if(months != undefined && months.length > 0) {
      return true;
    }
    return false;
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
		var options = this.state.months || MONTHS;

		return (
				<Select ref="monthSelect" options={this.state.months} multi={true} clearable={false} searchable={false} autosize={true} simpleValue name="selected-state" value={this.state.selectValue} onChange={this.updateValue} placeholder={'Select months'}/>
		);
	}
});

export default MonthField;
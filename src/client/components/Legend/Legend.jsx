import React, {PropTypes} from 'react'
// import {filterNamesForLinks} from '../../utils';
import './Legend.css';

// const Labels = ({labels, colors}) => {
//
// }

class Legend extends React.Component {

    constructor(props){
      super(props);
      this.renderLabels = this.renderLabels.bind(this);
    }

    renderLabels(labels, colors) {

      return labels.map((label, idx) => {
          if (typeof label === 'object') {
              const {linkTo, name} = label;
              console.log(typeof linkTo, typeof name);
              return (
                  <div key={idx}>
                      <span className="Legend--color" style={{
                          backgroundColor: colors[idx % colors.length]
                      }}/>
                    <a href={linkTo} className="Legend--label">{name}</a>
                  </div>
              );
          }

          if(typeof label === 'string'){
            return (
                <div key={idx}>
                    <span className="Legend--color" style={{
                        backgroundColor: colors[idx % colors.length]
                    }}/>
                    <span className="Legend--label">{label}</span>
                </div>
            );
          }
      });
    }

    render() {
        const {labels, colors, styles} = this.props;
        const wrapRow = this.props.wrapRow
            ? 'wrapRow'
            : '';
        const inRow = this.props.inRow
            ? 'inRow'
            : '';
        const centered = this.props.centered
            ? 'centered'
            : '';

        return (
            <div className={`Legend ${wrapRow} ${centered} ${inRow}`} style={styles}>
                {this.renderLabels(labels, colors)}
            </div>
        );
    }
}

Legend.propTypes = {
    labelLinks: PropTypes.bool,
    wrapRow: PropTypes.bool,
    inRow: PropTypes.bool,
    centered: PropTypes.bool,
    labels: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    styles: PropTypes.object
}

export default Legend;
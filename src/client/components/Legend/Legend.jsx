import React, {PropTypes} from 'react'
// import {filterNamesForLinks} from '../../utils';
import './Legend.css';

class Legend extends React.Component {
    render() {
        const {labelLinks,labels,colors,styles} = this.props;
        const wrapRow = this.props.wrapRow
            ? 'wrapRow'
            : '';
        const inRow = this.props.inRow
            ? 'inRow'
            : '';
        const centered = this.props.centered
            ? 'centered'
            : '';

        const linksOrLabels = labelLinks ? (labels.map((label,idx)=>{return(
          <div key={idx}>
              <span className="Legend--color" style={{
                  backgroundColor: colors[idx % colors.length]
              }}/>
            <a href="${label.linkTo}"><span className="Legend--label">{label.name}</span></a>
          </div>)})) : (labels.map((label, idx)=>{
              return (
                  <div key={idx}>
                      <span className="Legend--color" style={{
                          backgroundColor: colors[idx % colors.length]
                      }}/>
                      <span className="Legend--label">{label}</span>
                  </div>
                  )}));
        return (
            <div className={`Legend ${wrapRow} ${centered} ${inRow}`} style={styles}>
                {linksOrLabels}
            </div>
        )
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
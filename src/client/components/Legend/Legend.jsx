import React, {PropTypes} from 'react'
import './Legend.css';

const Legend = (props) => {
    const labels = props.labels;
    const colors = props.colors;
    const styles = props.styles;
    const wrapRow = props.wrapRow ? 'wrapRow' : '';
    const centered = props.centered ? 'centered' : '';
    return (
        <div className={`Legend ${wrapRow} ${centered}`} style={styles}>
            {labels.map(function(label, labelIndex) {
                return (
                    <div key={labelIndex}>
                        <span className="Legend--color" style={{
                            backgroundColor: colors[labelIndex % colors.length]
                        }}/>
                        <span className="Legend--label">{label}</span>
                    </div>
                );
            })}
        </div>
    )
}

export default Legend

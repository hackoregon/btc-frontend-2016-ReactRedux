// Component
import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

const styles = {
  base: {
    display: 'inline-block',
    float: 'none',
    textAlign: 'left',
    marginRight: '-4px'
  },
  centered : {
    textAlign: 'center'
  }
}

class ResultHeader extends Component {

    constructor(props, content) {
        super(props, content);
    }

    render() {
        const {candidate} = this.props;
        return (<Row
                     style={ styles.centered }>
                    <Col xs={ 12 }
                         md={ 6 }
                         sm={ 12 }
                         lg={ 6 }
                         style={ styles.base }>
                    <h1 style={styles.centered} >{candidate}</h1>

                    </Col>
                </Row>
            );
    }
}

ResultHeader.propTypes = {
  candidate: PropTypes.string.isRequired,
  race: PropTypes.string
}
export default ResultHeader;

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Button, Input } from 'react-bootstrap';
import { fetchSearchData } from '../../actions/index.js';

class SearchResultsForm extends Component {

    constructor(props, content) {
        super(props, content);
        this.handleFetch = this.handleFetch.bind(this);
    }
    handleFetch(e) {
        e.preventDefault();
        e.stopPropagation();
        const {dispatch} = this.props;
        const {inputText} = this.refs;
        dispatch(fetchSearchData(inputText.getValue()));
    }

    render() {
        const {status, statusText} = this.props;
        let fetchButton = null;
        if (status === 'loading') {
            fetchButton = (<Button bsStyle="default"
                                   onClick={ this.handleFetch } disabled={true}>
                               <span>Searching</span>
                           </Button>
            );
            setTimeout(()=>{
              fetchButton = (<Button bsStyle="default"
                                     onClick={ this.handleFetch }>
                                 <span>Search</span>
                             </Button>)
            })
        } else {
            fetchButton = (<Button bsStyle="default"
                                   onClick={ this.handleFetch }>
                               <span>Search</span>
                           </Button>
            );
        }
        return (<form {...this.props}>
                    <Grid fluid={ true }>
                        <Row>
                            <Col xs={ 10 }
                                 md={ 10 }
                                 sm={ 10 }
                                 lg={ 10 }>
                            <Input ref="inputText"
                                   type="text"
                                   placeholder="Search for Candidates"
                                   hasFeedback={ true }/>
                            </Col>
                            <Col xs={ 2 }
                                 md={ 2 }
                                 sm={ 2 }
                                 lg={ 2 }>
                            { fetchButton }
                            </Col>
                        </Row>
                    </Grid>
                </form>
            );
    }
}
function mapStateToProps(state) {
    const {searchData: {fetching: {status, statusText},searchTerm}} = state;
    return {
        searchTerm,
        status,
        statusText
    };
}

export default connect(mapStateToProps)(SearchResultsForm);

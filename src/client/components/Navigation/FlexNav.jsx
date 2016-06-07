import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import SearchResultsForm from '../../containers/SearchResults/SearchResultsForm.jsx';
import NavRouterLink from './NavRouterLink.jsx';
import YearField from '../Select/Select.jsx';
class FlexNav extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectOpts: false
    }
  }
    makeLinks() {
        let links = this.props.menuItems.map((name, index) => {
            return (
              <NavRouterLink classes={this.props.linkClasses} name={name} params={this.props.params} key={index}/>);
        })
        return links
    }
    render() {
        return (
            <Row xs={12} md={12} lg={12} center='xs' middle='xs' style={{
                backgroundColor: '#4D92C2',
                position: 'fixed',
                top: '70px',
                left: '0px',
                width: '101%',
                zIndex: '1020',
                margin: '0'
            }}>
                <Row style={{padding:'0.5rem 1rem'}} xs={6} md={6} lg={6} >
                  {this.makeLinks()}
                </Row>
                <Row xs={2} md={2} style={{padding:'0.5rem'}}>
                    <YearField style={{ width:'3rem'}} />
                </Row>

                <SearchResultsForm style={{
                    flex: '1',
                    margin: '.5rem',
                    minWidth: '350px'
                }}/>


            </Row>
        );
    }
};

export default FlexNav;
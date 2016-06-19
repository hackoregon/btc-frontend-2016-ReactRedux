import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import SearchResultsForm from '../../containers/SearchResults/SearchResultsForm.jsx';
import NavRouterLink from './NavRouterLink.jsx';
import {Link} from 'react-router';
import YearField from '../Select/Year.jsx';
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
              <NavRouterLink xs={1} classes={this.props.linkClasses} name={name} params={this.props.params} key={index}/>
          );

        })
        return links
    }
    render() {
        return (
            <Row {...this.props} xs={12} md={12} lg={12} center='xs' middle='xs' style={{
                backgroundColor: '#4D92C2',
                position: 'fixed',
                top: '0px',
                left: '0px',
                width: '100%',
                zIndex: '1020',
                margin: '0px'
            }}>
            <Row middle='xs' around='xs' style={{padding:'0.5rem 1rem'}} xs={6} md={6} lg={6} >
                <NavRouterLink customtyles={{
                    link:{
                    fontSize: '2rem'
                    },
                    pad:{
                      padding: '2rem'}
                    }} xs={1} classes={this.props.linkClasses} name={'BTC'} routeTo={'/'} params={this.props.params} />

                  {this.makeLinks()}
                </Row>
                <Row xs={2} md={2} style={{padding:'0.5rem'}}>
                    <YearField ref={'year'} years={this.props.years} style={{ width:'3rem'}} onToggleSelect={this.props.onToggleSelect}/>
                </Row>

                <SearchResultsForm params={this.props.params} style={{
                    flex: '1',
                    margin: '.5rem',
                    minWidth: '350px'
                }}/>


            </Row>
        );
    }
};

export default FlexNav;
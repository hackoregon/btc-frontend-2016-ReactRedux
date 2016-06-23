import React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import SearchResultsForm from '../../containers/SearchResults/SearchResultsForm.jsx';
import NavRouterLink from './NavRouterLink.jsx';
import {Link} from 'react-router';
import YearField from '../Select/Year.jsx';
import Logo from '../Logo/Logo.jsx';

class FlexNav extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectOpts: false,
    }
  }
  componentWillMount() {
    const {pageType} = this.props;
    if(pageType && pageType == 'singleResult'){
      this.setState({selectOpts:true});
    }
  }
    makeLinks() {
        let links = this.props.menuItems.map((name, index) => {
            return (
              <NavRouterLink  xs={4} sm={3} classes={this.props.linkClasses} name={name} params={this.props.params} key={index}/>
          );

        })
        return links
    }
    render() {
        return (
            <Row {...this.props} center='xs' middle='xs' style={{
                backgroundColor: '#2653A5',
                position: 'fixed',
                top: '0px',
                left: '0px',
                width: '100%',
                zIndex: '1020',
                margin: '0px',
                minWidth: '320px'
            }}>

            <Row start='xs' around='xs' style={{padding:'0.5rem 1rem'}} xs={6} md={6} lg={6} >

                  <Logo xs={4} sm={3} />
                  {this.makeLinks()}
                  { this.state.selectOpts ? (
                      <YearField xs = {12} sm = {3} ref={'year'} years={this.props.years} style={{padding:'0.25rem', width:'3rem'}} onToggleSelect={this.props.onToggleSelect}/>
                  ):null }
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
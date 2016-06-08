import React from 'react';
import YearField from '../Select/Select.jsx';
import {Row,Navbar, Nav} from 'react-bootstrap';
import NavRouterLink from './NavRouterLink.jsx';
import SearchResultsForm from '../../containers/SearchResults/SearchResultsForm.jsx';
const styles = {
  base: {
    fontSize: '1em',
    height: 'auto',
    position: 'fixed',
    width: '100%',
    zIndex: '100',
    marginTop: '50px',
    paddingTop: '2px',
    paddingBottom: '2px',
    color: '#000',
    display: 'flex'
  },
  select: {
    width: '50%',
    display: 'inline',
    paddingTop: '5px',
  }
}

class SubNav extends React.Component {
  makeLinks() {
    let links = this.props.menuItems.map((name, index) => {
      return (<NavRouterLink
         classes={this.props.linkClasses} name={name} params={this.props.params} key={index}/>);
    })
    return links
  }

  render () {
    return (<Navbar params={ this.props.params } {...this.props}
     style={styles.base}>
     <Navbar.Collapse>
       <Nav pullLeft={ true } params={ this.props.params }>
         {this.makeLinks()}

       </Nav>

       <Nav style={styles.select}  pullRight={ true } params={ this.props.params }>

           <YearField style={{maxWidth:'3rem'}} />
         <SearchResultsForm style={{minWidth:'400px'}}/>
       </Nav>
     </Navbar.Collapse>

    </Navbar>);
  }
}

export default SubNav;
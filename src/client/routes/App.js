// TODO - finish singular app Component
import React from 'react';
import BTCNav from '../components/BTCNav.jsx';
import Grid from 'react-bootstrap';

const styles = {
  paddingTop: '60px',
};

const App = () => {
  return (
    <div>
      <BTCNav />
      <Grid fluid
        style={ styles }
        params={ this.props.params }
      >
        { this.props.children }
      </Grid>
    </div>
  );
};

export default App;

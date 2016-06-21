import React, {Component, PropTypes} from 'react';
import {Grid, Col, Row} from 'react-flexbox-grid';
import AboutPortraits from '../containers/AboutPortraits.jsx';
import Footer from '../components/Navigation/Footer.jsx';
import TextContainer from '../components/Bootstrap/TextContainer.jsx';
import BTCNav from '../components/Navigation/BTCNav.jsx';

class AboutPage extends Component {

    buildSpecialThanks() {
        const names = [
            'Michael Pelletier',
            'Huston Hedinger',
            'Abby Stevens',
            'John Richter',
            'Jason Brown',
            'Paul Fredrickson',
            'Tim Degner',
            'Katherine Bovee',
            'Melissa Lewis',
            'Lisa Orr',
            'Marcus Estes',
            'John Cohoon',
            'John Streater',
            'Colby Aley',
            'Hobson Lane',
'Daniel Miller',
'Thunder Shiviah',
'Allen Grimm',
'Cole Howard',
'David Garber ',
'Lewis Notestine ',
'Ryan Miller  ',
'Sam Higgins ',
'Marie Nunez-Mendez',
'Riley Rustael',
'Dan Wood ',
'Monty Rhode ',
'Barrett Paul '
        ];

        var returnThis = [];
        for (var i = 0; i < names.length; i++) {
            const name1 = names[i]
                ? names[i++]
                : '';
            const name2 = names[i]
                ? names[i]
                : '';
            returnThis.push(
                <Row key={i} className="show-grid">
                    <Col xs={3} xsOffset={3} className="text-center">{name1}</Col>
                    <Col xs={3} className="text-center">{name2}</Col>
                </Row>
            )
        }

        return (
            <Grid>
                {returnThis}
            </Grid>
        )

    }

    render() {
        return (
          <div {...this.props} style={{display:'flex',minHeight:'100vh',flexDirection:'column'}}>
            <BTCNav ref={'nav'} onToggleSelect={this.handleSelect}/>
            <div style={{flex:'1',paddingTop:'2rem'}}>

                <Grid center='xs' fluid={ true }
                      params={ this.props.params }>

                <div className="container section ng-scope">
                    <TextContainer>
                        <h1>This Project Was Built by 100% Volunteers</h1>
                    </TextContainer>
                    <TextContainer divClasses="text-left lead">
                        Hack Oregon is a community-powered non-profit building civic data projects on different themes to promote engagement, awareness, and quality of life.
                    </TextContainer>
                    <TextContainer divClasses="text-left">
                        All Hack Oregon projects are open source, built entirely by volunteers from our local community. That means that if you live in the Oregon area, or would like to contribute remotely, you can work with us!<br/><br/>

                        Although each of our projects require a slightly different blend of talents and resources, our teams are always interdisciplinary and always have roles available for people at all levels of experience. We place our team members by balancing the skills they want to contribute with the skill they want to learn — and by operating outside of normal bureaucratic, client-based, or venture funded restrictions — we're free to move fast and innovate faster.<br/><br/>

                        It's not always easy, but we think it's pretty worth it.<br/><br/>

                        Find out more at
                        <a href="http://hackoregon.org">hackoregon.org</a><br/><br/>
                    </TextContainer>

                      <Col xs={12} around = 'xs' around='xs'>
                        <h1 xs className="text-center grayfont">The Team</h1>
                        <h4 xs >Cat Nikolovski - Producer</h4>
                        <h4 xs>James Ofsink — Researcher and Facilitator</h4>
                        <h4 xs>Ken Whaler - UX & Visual design</h4>
                        <h4 xs>David Daniel — Full Stack Dev</h4>
                        <h4 xs>Sanjuro Jogdeo — Full Stack Dev</h4>
                      </Col>

                        <h2 className="text-center grayfont">Special Thanks to our past Behind the Curtain Team Members!</h2>

                    <TextContainer divClasses="text-center">















                    </TextContainer>
                    {this.buildSpecialThanks()}

                </div>

              </Grid>
              </div>
                <Footer style={{flex: '1'}}/>
            </div>
        );
    }
}

export default AboutPage;

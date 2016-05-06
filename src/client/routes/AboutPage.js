import React, { Component, PropTypes } from 'react';
import { Grid,Col,Row } from 'react-bootstrap';
import SearchResultsForm from '../containers/SearchResults/SearchResultsForm.jsx';
import AboutPortraits from '../containers/AboutPortraits.jsx';
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
            'Colby Aley'
        ];

        var returnThis = [];
        for (var i=0; i < names.length; i++) {
            const name1 = names[i] ? names[i++] : '';
            const name2 = names[i] ? names[i] : '';
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
            <div>
                <BTCNav />
                <Grid fluid={ true }
                      style={ {    marginTop: '100px',    fontWeight: '200px'} }
                      params={ this.props.params }>
                    <SearchResultsForm params={ this.props.params }></SearchResultsForm>
                </Grid>

                <div className="container section ng-scope">
                    <TextContainer>
                        <h1>This Project Was Built by 100% Volunteers</h1>
                    </TextContainer>
                    <TextContainer divClasses="text-left lead">
                        Hack Oregon is a community-powered non-profit building civic
                         data projects on different themes to promote engagement,
                         awareness, and quality of life.
                    </TextContainer>
                    <TextContainer divClasses="text-left">
                    All Hack Oregon projects are open source, built entirely by
                     volunteers from our local community. That means that if you
                     live in the Oregon area, or would like to contribute remotely,
                     you can work with us!<br/><br/>

                    Although each of our projects require a slightly different blend
                     of talents and resources, our teams are always interdisciplinary
                     and always have roles available for people at all levels of experience.
                     We place our team members by balancing the skills they want to contribute
                     with the skill they want to learn — and by operating outside of normal bureaucratic,
                     client-based, or venture funded restrictions — we're free to move fast and innovate faster.<br/><br/>

                     It's not always easy, but we think it's pretty worth it.<br/><br/>

                    Find out more at <a href="http://hackoregon.org">hackoregon.org</a><br/><br/>
                    </TextContainer>
                    <TextContainer>
                        <h1 className="text-center grayfont">The Team</h1>
                    </TextContainer>

                    <AboutPortraits />

                    <br/><br/>

                    <TextContainer>
                        <h2 className="text-center grayfont">Team Members Not Pictured</h2>
                    </TextContainer>

                    <TextContainer divClasses="text-center">
                        <h4>Ryan Miller — Front End Team</h4>
                        <h4>Sam Higgins — Data Scientist</h4>
                        <h4>Marie Nunez-Mendez — Researcher and Facilitator</h4>
                        <h4>Riley Rustael — Back End Team</h4>
                        <h4>Dan Wood — Front End Team</h4>
                        <h4>Monty Rhode — Front End Team</h4>
                        <h4>Barrett Paul — Product Design</h4>
                    </TextContainer>

                    <br/><br/>

                    <TextContainer>
                        <h2 className="text-center grayfont">Special Thanks to our past Behind the Curtain Team Members!</h2>
                    </TextContainer>
                    {this.buildSpecialThanks()}

                </div>


            </div>
            );
    }
}

export default AboutPage;

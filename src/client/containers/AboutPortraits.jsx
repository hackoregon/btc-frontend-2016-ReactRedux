import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import PhotoGrid from '../components/Bootstrap/PhotoGrid.jsx';
import path from 'path';

class AboutPortraits extends Component {
  


  loadData() {
      
      const dataFile = require('portraitPath/PHOTO_DATA.tab').split('\n');
      const filteredData = dataFile.filter(function(line,index){
        if (line.match('^\#') != null) {
          return false;
        }
        if (line.match('^\s*$') != null) {
          return false;
        }
        if (line.split('\t').length != 3) {
          console.log("Skipping \"" + line + "\" .  Tab separated column count not equal to 3")
          return false;
        }
        
        return true
        
      });
      
      const mappedData = filteredData.map(function(line,index){
        const [file, name, role] = line.split('\t');
        const caption = name + " - " + role;      
        const photo = require('portraitPath/'+file);
        
        return ({
          photo: photo, 
          caption: caption, 
          alt: name,
          imgClasses: "img-responsive img-thumbnail",
          imgDivClasses: "hacker-portrait col-md-3"  
        });
      });
      
      return mappedData;
      
  }

  
  render() {
    
    //debugger
    return (
      <PhotoGrid photos={this.loadData()}  />
    )
  }
}


export default AboutPortraits;

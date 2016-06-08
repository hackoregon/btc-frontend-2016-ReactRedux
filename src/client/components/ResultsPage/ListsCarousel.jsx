import React, {Component} from 'react'
import {Carousel,CarouselItem} from 'react-bootstrap';

class ListsCarousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            direction: null
        }
        this.handleSelect = this.handleSelect.bind(this);
    }
    handleSelect(selectedIndex, evt) {
        this.setState({index: selectedIndex, direction: evt.direction})
    }
    render() {
        return (
            <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect} wrap={false} indicators={false}>
                {this.props.children}
            </Carousel>
        )
    }
}

export default ListsCarousel

//
// <ListsCarousel>
//   <CarouselItem >
//   <ResultDonorsList donorType={"Top Individual Donors"} donors={individualDonors}></ResultDonorsList>
//   <ResultDonorsList donorType={"Top Business Donors"} donors={businessDonors}></ResultDonorsList>
//   </CarouselItem>
//   <CarouselItem>
//   <ResultDonorsList donorType={"Top PAC Donors"} donors={pacDonors}></ResultDonorsList>
//   </CarouselItem>
// </ListsCarousel>
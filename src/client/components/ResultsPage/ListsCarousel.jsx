import React, {PropTypes} from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap';

const ListsCarousel = ({children}) => {
  // let items = children.map((child,index) => {
  //   return (<CarouselItem key={index} >
  //           {child}
  //           </CarouselItem>)
  // });

  return (
    <Carousel wrap={false} indicators={false}>
        {children}
    </Carousel>
  )
}

// ListCarousel.PropTypes = {

// }
export default ListsCarousel

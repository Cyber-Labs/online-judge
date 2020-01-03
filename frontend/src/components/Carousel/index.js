import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import {
  Carousel,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Row,
  Col
} from 'reactstrap';

class CarouselShared extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const { items } = this.props;
    const { activeIndex } = this.state;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const { items } = this.props;
    const { activeIndex } = this.state;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    let imgStyle;
    if (window.innerWidth > 768) {
      imgStyle = {
        float: 'right'
      };
    } else {
      imgStyle = { display: 'block', marginRight: 'auto', marginLeft: 'auto' };
    }
    const { activeIndex } = this.state;
    const { items } = this.props;

    return (
      <div className="heading black">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <CarouselIndicators
            items={items}
            activeIndex={activeIndex}
            onClickHandler={this.goToIndex}
          />
          {Array.prototype.map.call(items, item => (
            <CarouselItem
              className="custom-tag"
              tag="div"
              key={item.src}
              onExiting={this.onExiting}
              onExited={this.onExited}
            >
              <Row className="align-items-center">
                <Col md={{ order: 2, size: 6 }} lg={{ order: 2, size: 5 }}>
                  <img
                    src={item.src}
                    className="right_floated"
                    alt={item.altText}
                    style={imgStyle}
                  />
                </Col>
                <Col
                  md={{ size: 6 }}
                  lg={{ size: 7 }}
                  className="container text-carousel"
                >
                  {item.description}
                </Col>
              </Row>
            </CarouselItem>
          ))}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
            className="indicator"
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
            className="indicator"
          />
        </Carousel>
      </div>
    );
  }
}

CarouselShared.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      src: PropTypes.string,
      altText: PropTypes.string,
      description: PropTypes.string
    })
  ).isRequired
};

export default CarouselShared;

import React, { useRef, useState } from 'react'
import { Badge, Button, Carousel, Image, Stack } from 'react-bootstrap'
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons'
import { slider } from '../../data/sliderData'

const RBCarousel = () => {

  const [currentIndex, setCurrentIndex] = useState(0)

  const sliderRef = useRef()
  const handlePrevious = () => {sliderRef.current?.prev()}
  const handleNext = () => {sliderRef.current?.next()}

  const handleSlide = (eventKey) => setCurrentIndex(eventKey)

  return (
    <div>
      <h1>Exercise of Carousel</h1>
      <br />
      <Carousel
      fade
      interval={2000}
      prevIcon={<ArrowLeftCircle size={30}/>}
      nextIcon={<ArrowRightCircle size={30}/>}
      ref={sliderRef}
      activeIndex={currentIndex}
      onSelect={handleSlide}
      >
        {slider.map((item, index)=>{
          return(
            <Carousel.Item key={index}>
          <Image className='w-100' src={item.image}/>
          <Carousel.Caption>
            <h3>{item.heading}</h3>
            <p>{item.para}</p>
          </Carousel.Caption>
        </Carousel.Item>
          )
        })}
      </Carousel>
      <br />
      <Stack direction='horizontal' className='d-flex flex-column justify-content-center'>
        Current Index: {currentIndex}
        <br />
        <span>
          {slider.map((item, index) => (
            <Badge
              key={index} 
              role='button'
              bg={currentIndex === index ? "primary" : "secondary"}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
              }}
              >
              {" "}
              </Badge>

          ))}
        </span>
        <br />
        <span>
        <Button onClick={handlePrevious}>Previous</Button>{" "}
        <Button onClick={handleNext}>Next</Button>
        </span>
      </Stack>
    </div>
  )
}

export default RBCarousel
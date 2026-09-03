import React from 'react'
import { Button, Card } from 'react-bootstrap'

const RBCards = () => {
  return (
    <div>
      <h1>Exercise of Card</h1>
      <br />
      <div className="d-flex justify-content-evenly">
        <Card style={{ width: '23rem' }}>
            <Card.Title>
                <h6>Bluetooth Headphone</h6>
            </Card.Title>

            <Card.Img variant="none" src="https://www.boat-lifestyle.com/cdn/shop/products/main2_b66dce6b-710d-49cb-9d1c-2bc8c9c0ab15_600x.png?v=1645698328" />
                <Card.Body>
                    
                    <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic molestias voluptas molestiae nulla facere sunt harum at, voluptatum minus in, blanditiis optio veniam assumenda, magnam nam ex asperiores. Nesciunt, maiores.
                    <br />
                    <span className='fw-bold'>$1,399</span> <span className="text-muted text-decoration-line-through"> MRP: $3999</span>
                    </Card.Text>

                </Card.Body>
                    <Card.Footer>
                        <div className="d-flex flex-wrap justify-content-between">
                            <Button  size="sm" variant="outline-primary">Add to cart</Button>
                            <Button  size="sm" variant="primary">Buy Now</Button>
                        </div>
                    </Card.Footer>
            </Card>

            
        <Card style={{ width: '23rem' }}>
            <Card.Title>
                <h6>Bluetooth Headphone</h6>
            </Card.Title>

            <Card.Img variant="none" src="https://m.media-amazon.com/images/I/61RahTQtAqL.jpg" />
                <Card.Body>
                    
                    <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic molestias voluptas molestiae nulla facere sunt harum at, voluptatum minus in, blanditiis optio veniam assumenda, magnam nam ex asperiores. Nesciunt, maiores.
                    <br />
                    <span className='fw-bold'>$1,399</span> <span className="text-muted text-decoration-line-through"> MRP: $3999</span>
                    </Card.Text>

                </Card.Body>
                    <Card.Footer>
                        <div className="d-flex flex-wrap justify-content-between">
                            <Button  size="sm" variant="outline-primary">Add to cart</Button>
                            <Button  size="sm" variant="primary">Buy Now</Button>
                        </div>
                    </Card.Footer>
            </Card>


        <Card style={{ width: '23rem' }}>
            <Card.Title>
                <h6>Bluetooth Headphone</h6>
            </Card.Title>

            <Card.Img variant="none" src="https://www.boat-lifestyle.com/cdn/shop/files/Artboard3_df810506-99d6-4d3c-9364-251d6e32fff3.png?v=1752729865" />
                <Card.Body>
                    
                    <Card.Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic molestias voluptas molestiae nulla facere sunt harum at, voluptatum minus in, blanditiis optio veniam assumenda, magnam nam ex asperiores. Nesciunt, maiores.
                    <br />
                    <span className='fw-bold'>$1,399</span> <span className="text-muted text-decoration-line-through"> MRP: $3999</span>
                    </Card.Text>

                </Card.Body>
                    <Card.Footer>
                        <div className="d-flex flex-wrap justify-content-between">
                            <Button  size="sm" variant="outline-primary">Add to cart</Button>
                            <Button  size="sm" variant="primary">Buy Now</Button>
                        </div>
                    </Card.Footer>
            </Card>
        </div>

    </div>
  )
}

export default RBCards
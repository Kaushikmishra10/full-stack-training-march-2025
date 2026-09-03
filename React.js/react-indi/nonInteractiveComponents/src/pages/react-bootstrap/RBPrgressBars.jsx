import React, { useState } from 'react'
import { Button, Card, ProgressBar } from 'react-bootstrap'

const RBPrgressBars = () => {
    const [progress, setProgress] = useState(5);

    const increase = () =>{
        setProgress((prev) => (prev + 5 > 100 ? 100 : prev + 5));
    }

    const decrease = () =>{
        setProgress((prev) => (prev - 5 < 0 ? 0 : prev - 5));
    }



  return (
    <div>
        <h1>Exercise of Progress Bar</h1>
        <br />
        current progress = {progress} 
        <br />
        <ProgressBar now={progress} label={`${progress}%`} striped variant="success" className='mb-2'/>
        <ProgressBar now={progress} label={`${progress}%`} striped variant="danger" className='mb-2' style={{ height: "10px" }}/>
        <br />
        <Button onClick={increase}>Progress +5%</Button>{" "}
        <Button onClick={decrease}>Progress -5%</Button>
        <hr />

        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Bootstarp Dashboar Application</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Web Development</Card.Subtitle>
                <Card.Text>
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
                <br />
                <br />
                <Button variant='info' size='sm'>Inprogress</Button>
                <br />
                <br />

                <ProgressBar now={progress} label={`${progress}%`} striped variant="info" className='mb-2' style={{ height: "10px" }}/>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <div className="d-flex justify-content-between">
                    <div className="due ">
                        <span className='text-muted'>Due Date</span><br />
                        <span>1 Jan, 2022</span>
                    </div>

                    <div style={{ width: "1px", backgroundColor: "#ddd",}}></div>

                    <div className="budget">
                        <span className='text-muted'>Budget</span><br />
                        <span>$123,000</span>

                    </div>
                </div>
            </Card.Footer>
        </Card>
    </div>
  )
}

export default RBPrgressBars
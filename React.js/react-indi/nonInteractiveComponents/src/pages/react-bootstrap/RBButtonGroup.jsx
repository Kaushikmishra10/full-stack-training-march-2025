import React, { useState } from 'react'
import { Button, ButtonGroup, } from 'react-bootstrap'
import { Justify, JustifyLeft, JustifyRight } from 'react-bootstrap-icons';

const RBButtonGroup = () => {
        const [align, setAlign] = useState("text-start");

  return (
    <div>
        <ButtonGroup aria-label="Text Alignment" className='mb-3'>
            <Button variant="primary" onClick={() => setAlign("text-start")}><JustifyLeft/> Left</Button>
            <Button variant="primary" onClick={() => setAlign("text-center")}><Justify/> Middle</Button>
            <Button variant="primary" onClick={() => setAlign("text-end")}><JustifyRight/> Right</Button>
        </ButtonGroup>
    <br />
        <div className={`border p-3 ${align}`}>
            Text align
        </div>

    </div> 
  )
}

export default RBButtonGroup
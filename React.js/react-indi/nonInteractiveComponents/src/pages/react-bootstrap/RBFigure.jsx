import React from 'react'
import { Figure } from 'react-bootstrap'

const RBFigure = () => {
  return (
    <div>
      <h1>Exercise of Figure</h1>
      <br />
      <Figure >
      <Figure.Image
        alt="171x180"
        src="https://miro.medium.com/1*kxBdslclglg4zgCw0NMIIA.png"
      />
      <Figure.Caption>
        Nulla vitae elit libero, a pharetra augue mollis interdum.
      </Figure.Caption>
    </Figure>
    </div>
  )
}

export default RBFigure
import React from 'react'
import { Button, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap'

const RBOverlays = () => {
  return (
    <div>
      <h1>Exercise of Overlays</h1>
      <br />
      <div className='d-flex gap-2'>
        {['top', 'right', 'bottom', 'left'].map((placement) => (
          <OverlayTrigger
            trigger="click"
            key={placement}
            placement={placement}
            overlay={
              <Popover id={`popover-positioned-${placement}`}>
                <Popover.Header as="h3">{`Popover ${placement}`}</Popover.Header>
                <Popover.Body>
                  <strong>Holy guacamole!</strong> Check this info.
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="outline-secondary">Popover on {placement}</Button>
          </OverlayTrigger>
        ))}
      </div>
      <hr />
      <div className='d-flex gap-2'>
        {['top', 'right', 'bottom', 'left'].map((placement) => (
          <OverlayTrigger
            key={placement}
            placement={placement}
            overlay={
              <Tooltip id={`tooltip-${placement}`}>
                Tooltip on <strong>{placement}</strong>.
              </Tooltip>
            }
          >
            <Button variant="secondary">Tooltip on {placement}</Button>
          </OverlayTrigger>
        ))}
      </div>
    </div>
  )
}

export default RBOverlays
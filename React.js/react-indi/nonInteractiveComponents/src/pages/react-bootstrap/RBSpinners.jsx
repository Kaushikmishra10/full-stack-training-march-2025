import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'

const RBSpinners = () => {
    const [loading, setLoading] = useState(false)
    const handleSubmit = () => {
        setLoading(true)
    }
    const handleCancle = () => {
        setLoading(false)
    }
  return (
    <div>
        <h1>Exercise of Spinner</h1>
        <br />
        <Button onClick={handleSubmit} disabled={loading}>
            {loading && <Spinner animation='border' size='sm' className='me-2' />}
            Submit
        </Button>{" "}
        <Button onClick={handleCancle} disabled={!loading}>
            
            Cancel
        </Button>

    </div>
  )
}

export default RBSpinners
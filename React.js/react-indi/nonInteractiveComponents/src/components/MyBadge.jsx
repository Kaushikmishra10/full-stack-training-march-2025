
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons'

const MyBadge = (props) => {
    const {href, children} = props
  return (
    <div className='badge bg-primary me-2'>
      <ArrowLeft/>
      {children}
      <ArrowRight/>
    </div>
  )
}

export default MyBadge
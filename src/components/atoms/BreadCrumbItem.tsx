import { Link } from 'react-router-dom'
import { BreadCrumbItem } from '../../types'

interface Props {
  items: BreadCrumbItem[]
}

const BreadcrumbItem = ({ items }: Props) => {
  return (
    <div className='flex items-center gap-3 mb-4'>
      <ul>
        {items?.map((item, index) => (
          <li key={index} className='inline-block'>
            <Link
              to={item.link}
              className={`text-xs font-normal ${
                index !== items?.length - 1
                  ? 'text-content-secondary'
                  : 'text-content-primary font-semibold'
              }`}
            >
              {item.name}
            </Link>
            {index !== items?.length - 1 ? (
              <span className='text-xs font-normal mx-1 text-content-primary'>
                /
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BreadcrumbItem

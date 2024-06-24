import Toggle from '@/components/elements/common/Toggle'

type ModuleHeaderProps = {
  handleModal: (type?: string) => void
  title: string
  isAdd?: boolean
  isButton?: boolean
  status?: boolean
}

const ModuleHeader = ({
  handleModal,
  title,
  isAdd = true,
  isButton = true,
  status,
}: ModuleHeaderProps) => {
  return (
    <div className='flex items-center justify-between gao-2 mb-5'>
      <div className='flex items-center gap-2'>
        <h2 className='text-xl font-semibold'>{title}</h2>
        {isButton && (
          <button
            type='button'
            onClick={() => {
              handleModal('toggle')
            }}
            className='flex items-center justify-center gap-2 cursor-pointer'
          >
            <Toggle isOn={!!status} />
          </button>
        )}
      </div>
      {isAdd && (
        <button
          type='button'
          onClick={() => handleModal('add')}
          className='button_sm_primary'
        >
          Add New
        </button>
      )}
    </div>
  )
}

export default ModuleHeader

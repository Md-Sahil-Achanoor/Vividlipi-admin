import { useAppDispatch, useAppSelector } from '@/app/store'
import PlaceholderImage from '@/assets/svg/placeholder'
import PlaceholderImageLink from '@/assets/svg/placeholder.svg'
import NoTableData from '@/components/atoms/NoTableData'
import TooltipButton from '@/components/atoms/TooltipButton'
import ManageModule from '@/components/elements/modal/ManageModule'
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable'
import ManagePhotos from '@/components/module/photos/ManagePhotos'
import Table from '@/components/ui/Table'
import { PhotosTableHead } from '@/constants/tableHeader'
import { coreAction } from '@/feature/core/coreSlice'
import { useDeletePhotoMutation, useGetPhotosQuery } from '@/feature/photos/photosQuery'
import { photoAction } from '@/feature/photos/photosSlice'
import PageLayout from '@/layout/PageLayout'
import { BreadCrumbItem, RolePermission } from '@/types'
import { PhotoResponse } from '@/types/photo'
import { truncate } from '@/utils/file'
import { cn } from '@/utils/twmerge'
import { checkPermission } from '@/utils/validateSchema'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const breadcrumbItem: BreadCrumbItem[] = [
    {
        name: 'Photos List',
        link: '#',
    },
]

const Photos = () => {
    // const navigate = useNavigate();  
    const { type } = useAppSelector((state) => state.core)
    const { roleDetails } = useAppSelector((state) => state.auth)
    const { selectedPhoto } = useAppSelector((state) => state.photos)
    const dispatch = useAppDispatch()

    // const { data, isLoading, refetch } = useGetAuthorsQuery({
    //     query: {},
    // })

    const { data, isLoading, refetch } = useGetPhotosQuery()

    console.log('Photos', data)

    const [deletePhoto, { isLoading: isDeletePhoto }] =
        useDeletePhotoMutation()


    useEffect(() => {
        refetch()
        return () => {
            dispatch(photoAction.resetPhoto())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refetch, dispatch])

    // const handleModal = (type: string) => {
    //   // console.log(`\n\n handleModal ~ type:`, type);
    //   if (type === "cancelled") {
    //     dispatch(coreAction.toggleModal({ type: "", open: false }));
    //     dispatch(operatorAction.setSelectedOperator(null));
    //   }
    // };

    const handleDeletePhoto = async () => {
        await deletePhoto({ id: selectedPhoto?.id })
        dispatch(coreAction.toggleModal({ open: false, type: '' }))

    }

    // const status = selectedPhoto?.isActive === 1 ? "Deactivate" : "Activate";

    const handleModal = (type?: string, data?: PhotoResponse) => {
        if (type === 'cancelled') {
            dispatch(coreAction.toggleModal({ open: false, type: '' }))
            dispatch(photoAction.setSelectedPhoto(null))
        } else if (type === 'edit') {
            dispatch(
                coreAction.toggleModal({
                    type: 'manage-author',
                    open: true,
                }),
            )
            dispatch(photoAction.setSelectedPhoto(data as PhotoResponse))
        } else if (type === 'delete') {
            dispatch(
                coreAction.toggleModal({
                    type: 'delete-author',
                    open: true,
                }),
            )
            dispatch(photoAction.setSelectedPhoto(data as PhotoResponse))
        } else {
            dispatch(coreAction.toggleModal({ open: true, type: 'manage-author' }))
            dispatch(photoAction.setSelectedPhoto(null))
        }
    }

    const hasAddPermission = checkPermission({
        rolePermissions: roleDetails as RolePermission,
        type: 'add',
        access: 'Photos',
    })

    const hasEditPermission = checkPermission({
        rolePermissions: roleDetails as RolePermission,
        type: 'edit',
        access: 'Photos',
    })

    const hasDeletePermission = checkPermission({
        rolePermissions: roleDetails as RolePermission,
        type: 'delete',
        access: 'Photos',
    })

    return (
        <>
            {hasDeletePermission && (
                <ManageModule
                    classes={
                        type === 'delete-author'
                            ? {
                                top: 'visible',
                                body: `-translate-y-[0%] max-w-[400px] p-3 min-w-[400px] border-red-500`,
                            }
                            : {
                                top: 'invisible',
                                body: '-translate-y-[300%] max-w-[400px] p-3 min-w-[400px]',
                            }
                    }
                    handleModal={handleModal}
                    wrapperClass='h-full'
                    isModalHeader
                    outSideClick
                    headText='Delete the Album?'
                    heading={selectedPhoto?.Name || ''}
                    details='Are you certain you want to delete?'
                    type='delete'
                    buttonText={isDeletePhoto ? 'Deleting...' : 'Delete'}
                    buttonProps={{
                        onClick: handleDeletePhoto,
                        disabled: isDeletePhoto,
                    }}
                />
            )}
            {hasAddPermission && <ManagePhotos />}
            <PageLayout
                title='Photos List'
                breadcrumbItem={breadcrumbItem}
                buttonText={hasAddPermission ? 'Add Photos' : ''}
                buttonProps={{
                    onClick: () => handleModal(),
                }}
            >
                <Table headList={PhotosTableHead}>
                    {isLoading ? (
                        <SkeletonTable total={6} tableCount={6} />
                    ) : data?.data &&
                        typeof data?.data === 'object' &&
                        data?.data?.length > 0 ? (
                        data?.data?.map((item, index) => (
                            <tr className='table_tr' key={item?.id}>
                                <td className='table_td'>{index + 1}</td>
                                <td className='table_td'>
                                    {item?.Title?.length > 20 ? (
                                        <TooltipButton
                                            className='w-max'
                                            parentClassName='p-0'
                                            isInnerRelative
                                            text={item?.Title}
                                        >
                                            {truncate(item?.Title, 20)}
                                        </TooltipButton>
                                    ) : (
                                        item?.Title
                                    )}
                                </td>
                                <td className='table_td'>
                                    {item?.AlbumId?.length > 20 ? (
                                        <TooltipButton
                                            className='w-max'
                                            parentClassName='p-0'
                                            isInnerRelative
                                            text={item?.AlbumId}
                                        >
                                            {truncate(item?.AlbumId, 20)}
                                        </TooltipButton>
                                    ) : (
                                        item?.AlbumId
                                    )}
                                </td>

                                <td className='table_td'>
                                    <div className='w-10 h-14 relative'>
                                        <LazyLoadImage
                                            src={(item?.Pic as string) || PlaceholderImageLink}
                                            alt={item?.Title}
                                            placeholder={<PlaceholderImage />}
                                            effect='blur'
                                            width={'100%'}
                                            height={'100%'}
                                            className='w-full h-full object-cover'
                                        />
                                    </div>
                                </td>
                                <td className='table_td'>
                                    <div className='flex items-center gap-3'>
                                        {hasEditPermission && (
                                            <button
                                                onClick={() => handleModal('edit', item)}
                                                className={cn(
                                                    'font-medium hover:underline',
                                                    'text-blue-600 dark:text-blue-500',
                                                )}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        {hasDeletePermission && (
                                            <button
                                                onClick={() => handleModal('delete', item)}
                                                className={cn(
                                                    'font-medium hover:underline',
                                                    'text-red-600 dark:text-red-500',
                                                )}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <NoTableData colSpan={7} parentClass='h-40'>
                            <span className='font-medium'>No data found!</span>
                        </NoTableData>
                    )}
                </Table>
            </PageLayout>
        </>
    )
}

export default Photos

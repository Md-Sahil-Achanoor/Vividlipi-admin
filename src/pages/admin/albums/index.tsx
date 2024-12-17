import { useAppDispatch, useAppSelector } from '@/app/store';
import PlaceholderImage from '@/assets/svg/placeholder';
import PlaceholderImageLink from '@/assets/svg/placeholder.svg';
import NoTableData from '@/components/atoms/NoTableData';
import TooltipButton from '@/components/atoms/TooltipButton';
import ManageModule from '@/components/elements/modal/ManageModule';
import SkeletonTable from '@/components/elements/skeleton/SkeletonTable';
import ManageAlbums from '@/components/module/albums/ManageAlbums';
import Table from '@/components/ui/Table';
import { AlbumsTableHead } from '@/constants/tableHeader';
import { useDeleteAlbumMutation, useGetAlbumsQuery } from '@/feature/albums/albumsQuery';
import { authorAction } from '@/feature/author/authorSlice';
import { coreAction } from '@/feature/core/coreSlice';
import PageLayout from '@/layout/PageLayout';
import { AuthorResponse, BreadCrumbItem, RolePermission } from '@/types';
import { truncate } from '@/utils/file';
import { cn } from '@/utils/twmerge';
import { checkPermission } from '@/utils/validateSchema';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const breadcrumbItem: BreadCrumbItem[] = [
    {
        name: 'Albums List',
        link: '#',
    },
];

const Albums = () => {
    const { type } = useAppSelector((state) => state.core);
    const { roleDetails } = useAppSelector((state) => state.auth);
    const { selectedAuthor } = useAppSelector((state) => state.author);
    const dispatch = useAppDispatch();

    const { data, isLoading, refetch } = useGetAlbumsQuery();

    const [deleteAlbum, { isLoading: isDeleteAuthor }] = useDeleteAlbumMutation();

    useEffect(() => {
        refetch();
        return () => {
            dispatch(authorAction.resetAuthor());
        };
    }, [refetch, dispatch]);

    const handleDeleteAuthor = async () => {
        if (selectedAuthor?.id) {
            await deleteAlbum({ id: selectedAuthor?.id });
        } else {
            toast.error('Invalid Album ID. Please select a valid author.');
        }
    };

    const handleModal = (type?: string, data?: AuthorResponse) => {
        if (type === 'cancelled') {
            dispatch(coreAction.toggleModal({ open: false, type: '' }));
            dispatch(authorAction.setSelectedAuthor(null));
        } else if (type === 'edit') {
            dispatch(
                coreAction.toggleModal({
                    type: 'manage-author',
                    open: true,
                }),
            );
            dispatch(authorAction.setSelectedAuthor(data as AuthorResponse));
        } else if (type === 'delete') {
            dispatch(
                coreAction.toggleModal({
                    type: 'delete-author',
                    open: true,
                }),
            );
            dispatch(authorAction.setSelectedAuthor(data as AuthorResponse));
        } else {
            dispatch(
                coreAction.toggleModal({
                    open: true,
                    type: 'manage-author',
                }),
            );
            dispatch(authorAction.resetAuthor());
        }
    };

    const hasAddPermission = checkPermission({
        rolePermissions: roleDetails as RolePermission,
        type: 'add',
        access: 'Photo_Albums',
    });

    const hasEditPermission = checkPermission({
        rolePermissions: roleDetails as RolePermission,
        type: 'edit',
        access: 'Photo_Albums',
    });

    const hasDeletePermission = checkPermission({
        rolePermissions: roleDetails as RolePermission,
        type: 'delete',
        access: 'Photo_Albums',
    });

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
                    wrapperClass="h-full"
                    isModalHeader
                    outSideClick
                    headText="Delete the Album?"
                    heading={selectedAuthor?.Name || ''}
                    details="Are you certain you want to delete?"
                    type="delete"
                    buttonText={isDeleteAuthor ? 'Deleting...' : 'Delete'}
                    buttonProps={{
                        onClick: handleDeleteAuthor,
                        disabled: isDeleteAuthor,
                    }}
                />
            )}
            {hasAddPermission && <ManageAlbums />}
            <PageLayout
                title="Albums List"
                breadcrumbItem={breadcrumbItem}
                buttonText={hasAddPermission ? 'Add Albums' : ''}
                buttonProps={{
                    onClick: () => handleModal(),
                }}
            >
                <Table headList={AlbumsTableHead}>
                    {isLoading ? (
                        <SkeletonTable total={6} tableCount={6} />
                    ) : data?.data && typeof data?.data === 'object' && data?.data?.length > 0 ? (
                        data?.data?.map((item, index) => (
                            <tr className="table_tr" key={item?.id}>
                                <td className="table_td">{index + 1}</td>
                                <td className="table_td">
                                    {item?.Title?.length > 20 ? (
                                        <TooltipButton
                                            className="w-max"
                                            parentClassName="p-0"
                                            isInnerRelative
                                            text={item?.Title}
                                        >
                                            {truncate(item?.Title, 20)}
                                        </TooltipButton>
                                    ) : (
                                        item?.Title
                                    )}
                                </td>
                                <td className="table_td">
                                    <div className="w-10 h-14 relative">
                                        <LazyLoadImage
                                            src={(item?.CoverPic as string) || PlaceholderImageLink}
                                            alt={item?.Title}
                                            placeholder={<PlaceholderImage />}
                                            effect="blur"
                                            width={'100%'}
                                            height={'100%'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="table_td">
                                    <div className="flex items-center gap-3">
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
                        <NoTableData colSpan={7} parentClass="h-40">
                            <span className="font-medium">No data found!</span>
                        </NoTableData>
                    )}
                </Table>
            </PageLayout>
        </>
    );
};

export default Albums;

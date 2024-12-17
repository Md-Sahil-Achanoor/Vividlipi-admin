import { useAppDispatch, useAppSelector } from '@/app/store';
import CustomInput from '@/components/form/CustomInput';
import FileUpload from '@/components/form/FileUpload';
import Modal from '@/components/ui/Modal';
import { useGetAlbumsQuery } from '@/feature/albums/albumsQuery';
import { coreAction } from '@/feature/core/coreSlice';
import { useManagePhotoMutation } from '@/feature/photos/photosQuery';
import { IManagePhoto, photoSchema } from '@/models/photo';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { BsArrowRightShort } from 'react-icons/bs';

const ManagePhotos = () => {
    const { type, open } = useAppSelector((state) => state.core);
    const { selectedPhoto } = useAppSelector((state) => state.photos);

    const { data: photosData, isLoading: albumsLoading } = useGetAlbumsQuery();
    const [managePhoto, { isLoading }] = useManagePhotoMutation();
    const dispatch = useAppDispatch();

    const initialValues: IManagePhoto = {
        Name: selectedPhoto?.Title || '',
        Pic: selectedPhoto?.Pic || '',
        AlbumId: selectedPhoto?.AlbumId || '',
    };

    const handleModal = (type: string) => {
        if (type === 'cancelled') {
            dispatch(coreAction.toggleModal({ open: false, type: '' }));
        }
    };

    const onSubmit = async (
        values: typeof initialValues,
        { setSubmitting, resetForm }: FormikHelpers<IManagePhoto>
    ) => {
        try {
            const photoValues = {
                Title: values.Name,
                Pic: values.Pic,
                AlbumId: values.AlbumId,
            };

            await managePhoto({
                data: photoValues,
                id: selectedPhoto?.id,
            }).unwrap();

            dispatch(coreAction.toggleModal({ open: false, type: '' }));
            resetForm();
        } catch (error) {
            console.error('Failed to save photo:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            classes={
                type === 'manage-author' && open
                    ? {
                        top: 'visible',
                        body: '-translate-y-[0%] max-w-[500px] p-3 min-w-[500px]',
                    }
                    : {
                        top: 'invisible',
                        body: '-translate-y-[300%] max-w-[500px] p-3 min-w-[500px]',
                    }
            }
            handleModal={handleModal}
            wrapperClass="h-full"
            headText={selectedPhoto?.id ? 'Update Photo' : 'Create Photo'}
            isModalHeader
            outSideClick
        >
            <div className="w-full h-full">
                <Formik
                    initialValues={initialValues}
                    validationSchema={photoSchema}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form noValidate>
                            <div className="mt-2">
                                <Field
                                    name="Name"
                                    label="Photo Title"
                                    type="text"
                                    component={CustomInput}
                                    placeholder="Type here..."
                                    isRequired
                                />

                                <Field
                                    name="Pic"
                                    label="Photo"
                                    component={FileUpload}
                                    maxFileSize={10}
                                    supportedString="jpg, jpeg, png"
                                    isRequired
                                />

                                <div className="mt-4">
                                    <label htmlFor="Album" className="form-label">
                                        Select Album
                                    </label>
                                    <Field
                                        as="select"
                                        name="AlbumId"
                                        className="form-select block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                                        isRequired
                                    >
                                        {albumsLoading ? (
                                            <option value="" disabled>
                                                Loading albums...
                                            </option>
                                        ) : (
                                            <>
                                                <option value="" disabled>
                                                    Select an album
                                                </option>
                                                {photosData?.data?.map((album) => (
                                                    <option key={album.id} value={album.id}>
                                                        {album.Title}
                                                    </option>
                                                ))}
                                            </>
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="button_primary mt-4"
                                disabled={isSubmitting || isLoading}
                            >
                                {isLoading || isSubmitting ? (
                                    <>
                                        <span className="w-5 h-5 border-2 animate-spin rounded-full border-transparent border-t-white mr-2" />
                                        <span className="font-medium">Processing</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="font-medium">
                                            {selectedPhoto?.id ? 'Update' : 'Create'}
                                        </span>
                                        <span className="text-2xl ml-1">
                                            <BsArrowRightShort />
                                        </span>
                                    </>
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    );
};

export default ManagePhotos;

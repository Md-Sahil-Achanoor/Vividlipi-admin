import { useAppDispatch, useAppSelector } from '@/app/store';
import CustomInput from '@/components/form/CustomInput';
import FileUpload from '@/components/form/FileUpload';
import Modal from '@/components/ui/Modal';
import { useManageAlbumMutation } from '@/feature/albums/albumsQuery';
import { coreAction } from '@/feature/core/coreSlice';
import { albumSchema, IManageAlbum } from '@/models/album';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { BsArrowRightShort } from 'react-icons/bs';



const ManageAlbums = () => {
    const { type, open } = useAppSelector((state) => state.core);
    const { singleAuthor, selectedAuthor } = useAppSelector((state) => state.author);

    const [manageAlbum, { isLoading }] = useManageAlbumMutation();

    const dispatch = useAppDispatch();

    const handleModal = (type: string) => {
        if (type === 'cancelled') {
            dispatch(coreAction.toggleModal({ open: false, type: '' }));
        }
    };

    const initialValues: IManageAlbum = {
        Title: selectedAuthor?.Title || '',
        coverPic: selectedAuthor?.CoverPic || '',
    };

    const onSubmit = async (
        values: IManageAlbum,
        { setSubmitting, resetForm }: FormikHelpers<IManageAlbum>,
    ) => {
        const formattedValues = {
            Title: values.Title,
            coverPic: values.coverPic,
        };
        try {
            await manageAlbum({
                id: selectedAuthor?.id,
                data: formattedValues,
            });
            dispatch(coreAction.toggleModal({ open: false, type: '' }));
            resetForm();
        } catch (error) {
            console.error('Error submitting album:', error);
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
            headText={selectedAuthor?.id ? 'Update Album' : 'Create Album'}
            isModalHeader
            outSideClick
        >
            <div className="w-full h-full">
                <Formik
                    initialValues={initialValues}
                    validationSchema={albumSchema}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting }) => (
                        <Form noValidate>
                            <div className="mt-2">
                                <Field
                                    name="Title"
                                    label="Album Title"
                                    type="text"
                                    component={CustomInput}
                                    placeholder="Type the album title here..."
                                    isRequired
                                />

                                <Field
                                    name="coverPic"
                                    label="Cover Picture"
                                    component={FileUpload}
                                    maxFileSize={10}
                                    supportedString="jpg, jpeg, png"
                                    isRequired
                                />
                            </div>
                            <button
                                type="submit"
                                className="button_primary"
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
                                            {selectedAuthor?.id ? 'Update' : 'Create'}
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

export default ManageAlbums;

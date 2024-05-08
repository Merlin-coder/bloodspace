import React from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { uploadExcelFile } from 'redux/actions/upload/uploadActions';

const UploadFile = ({ loading, file }) => {
    const dispatch = useDispatch();
    const initialState = {
        open: false,
        files: []
    };
    const [state, setState] = React.useState(initialState);

    React.useEffect(() => {
        if (file?.status === true) {
            setState({
                ...state,
                open: false
            });
        }
    }, [file]);
    const handleOpen = () => {
        setState({
            ...state,
            open: true
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false
        });
    };

    const handleSave = (files) => {
        setState({
            ...state,
            files: files
        });

        let formData = new FormData();
        formData.append('file', files[0]);

        dispatch(uploadExcelFile(formData));
        loading
            ? setState({
                  ...state,
                  open: false
              })
            : setState({
                  ...state,
                  open: true
              });
    };

    return (
        <form>
            <Button variant="contained" color="primary" size="small" onClick={handleOpen}>
                Select File
            </Button>
            <DropzoneDialog
                open={state.open}
                onSave={handleSave}
                acceptedFiles={['.xlsx']}
                showPreviews={true}
                maxFileSize={5000000}
                onClose={handleClose}
                cancelButtonText={'cancel'}
                submitButtonText={loading ? <CircularProgress /> : 'submit'}
                showFileNamesInPreview={true}
                dialogTitle={'Select File'}
                filesLimit={1}
            />
        </form>
    );
};

export default UploadFile;

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';

export default function Popup(props) {
    return (
        <Dialog
            open={props.open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContentText className=' ml-6'>
                {props.contentItem}
            </DialogContentText>
            <DialogActions>
                <Button className=" hover:bg-green-700  bg-green-600 mt-5 p-2 text-white mr-2 mb-3 text-sm" onClick={props.cancelEvent}>{props.cancel}</Button>
                <Button className=" hover:bg-green-700  bg-green-600 mt-5 p-2 text-white mr-5 mb-3 text-sm" onClick={props.logoutEvent}>
                    {props.logout}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
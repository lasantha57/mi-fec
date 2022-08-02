import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface ToastProps {
    open: boolean;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ open, onClose }) => {
    return (
        <Snackbar
         open={open} 
         onClose={onClose}
         autoHideDuration={5000}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
         >
            <Alert severity="success">
                Successfully Deleted!
            </Alert>
        </Snackbar>
    );
}

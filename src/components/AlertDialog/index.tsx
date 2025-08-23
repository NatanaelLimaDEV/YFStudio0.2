import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

interface AlertDialogProps {
    text: string;
    open: boolean;
    onClose: () => void;
}

export default function AlertDialog({ text, open, onClose }: AlertDialogProps) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    backgroundColor: "#4C5760",
                    borderRadius: "8px",
                    padding: "16px",
                    border: "2px solid #fff",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
                },
                "& .MuiTypography-root": {
                    color: "#fff",
                },
                "& .MuiButton-root": {
                    color: "#fec3ea",
                    borderColor: "#fff",
                    '&:hover': {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "#fff",
                    },
                    fontWeight: "bold",
                },
            }}
        >
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
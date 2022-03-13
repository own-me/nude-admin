import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, Typography } from "@mui/material";
import React, { memo, useCallback, useEffect, useState } from "react";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    buttonLabel: string;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal = memo(({ isOpen, title, buttonLabel, onClose, onConfirm }: ConfirmModalProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const [isConfirmed, setConfirmed] = useState<boolean>(false);

    const handleClose = useCallback(() => {
        onClose();
        setIsModalOpen(false);
    }, [onClose]);

    const handleConfirm = useCallback(() => {
        onConfirm();
        setIsModalOpen(false);
    }, [onConfirm]);

    useEffect(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    return (
        <Modal
            open={isModalOpen}
            onClose={handleClose}
        >
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                color: "text.primary",
                boxShadow: 24,
                p: 4
            }}>
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isConfirmed}
                                onClick={() => setConfirmed(!isConfirmed)}
                            />
                        }
                        label={"I confirm."}
                    />
                    <Box mt={3}>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleConfirm}
                            disabled={!isConfirmed}
                        >
                            {buttonLabel}
                        </Button>
                    </Box>
                </FormGroup>
            </Box>
        </Modal>
    );
});

export default ConfirmModal;
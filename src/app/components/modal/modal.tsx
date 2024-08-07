import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type BasicModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};


export default function BasicModal(props: BasicModalProps) {
    const { isOpen, onClose, children } = props;

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onClose}
            >
                <Box sx={style}>
                    <>{children}</>
                </Box>
            </Modal>
        </div>
    );
}
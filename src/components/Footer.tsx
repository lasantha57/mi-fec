import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';

export const Footer: React.FC = () => {
    return (
        <Container disableGutters maxWidth={false}>
            <Box sx={
                {
                    padding: '15px 20px',
                    backgroundColor: '#eeeeee',
                }
            }>
                <Typography>VManager Demo v0.01</Typography>
            </Box>
        </Container>
    );
};
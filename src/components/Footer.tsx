import { Box, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';

const StyledFooter = styled(Box)(() => ({
    '&': {
        padding: '15px 20px',
        backgroundColor: '#eeeeee',
        width: '100%',
        position: 'absolute',
        bottom: '0'
    }
}));

export const Footer: React.FC = () => {
    return (
        <Container disableGutters maxWidth={false}>
            <StyledFooter>
                <Typography>VManager Demo v0.01</Typography>
            </StyledFooter>
        </Container>
    );
};
import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import styled from '@emotion/styled'

const StyledFooter = styled(Box)`
    padding: 15px 20px;
    background: var(--bg-gray);
    width: 100%;
    position: absolute;
    bottom: 0;
`

export const Footer: React.FC = () => {
    return (
        <Container disableGutters maxWidth={false} component="footer">
            <StyledFooter>
                <Typography>VManager Demo v0.01</Typography>
            </StyledFooter>
        </Container>
    );
};
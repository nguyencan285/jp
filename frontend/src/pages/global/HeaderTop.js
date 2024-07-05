import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { useProSidebar } from 'react-pro-sidebar';
import { DarkMode, LightMode } from "@mui/icons-material";
import { toggleActionTheme } from '../../redux/actions/themeAction';
import { useTheme } from '@emotion/react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const HeaderTop = () => {
    const { collapseSidebar } = useProSidebar();
    const { palette } = useTheme();
    const dispatch = useDispatch();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ boxShadow: 0, bgcolor: "primary.main" }}>
                <Toolbar>
                    <IconButton onClick={() => collapseSidebar()}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Admin Dashboard
                    </Typography>

                    {/* toggle dark theme */}
                    <IconButton sx={{ mr: 4 }} onClick={() => dispatch(toggleActionTheme())}>
                        {palette.mode === "dark" ? (
                            <DarkMode sx={{ color: "#ffffff", fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: "#ffffff", fontSize: "25px" }} />
                        )}
                    </IconButton>

                    <Button
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                            Home
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderTop;

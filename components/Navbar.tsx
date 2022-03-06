import * as React from "react";
import { memo, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface NavItem {
    label: string;
    path: string;
    children?: string[];
}

const navItems: NavItem[] = [
    {
        label: "Home",
        path: "/",
        children: [
            "/login",
        ]
    },
    {
        label: "NFTs",
        path: "/nfts",
        children: [
            "/nft"
        ]
    },
    {
        label: "Users",
        path: "/users",
        children: [
            "/user"
        ]
    },
    {
        label: "Posts",
        path: "/posts",
        children: [
            "/post"
        ]
    },
    {
        label: "Reports",
        path: "/reports",
        children: [
            "/report"
        ]
    }
];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = memo(() => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const activeNavTab = useMemo(() => {
        const path = `/${location.pathname.split("/")[1]}`;
        const item = navItems.find(navItem => {
            if (navItem.path === path || navItem.children.includes(path)) {
                return navItem;
            }
        });
        return item?.path;
    }, [location.pathname]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleNavClick = (page: string) => {
        setAnchorElNav(null);
        navigate(page);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
                    >
                        Own Me Inc. | Admin
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleNavClick}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {navItems.map((navItem, index) => (
                                <MenuItem key={index} onClick={() => handleNavClick(navItem.path)}>
                                    <Typography textAlign="center">{navItem.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                    >
                        Own Me Inc. | Admin
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Tabs value={activeNavTab}>
                            {navItems.map((navItem, index) => (
                                <Tab
                                    key={index}
                                    label={navItem.label}
                                    value={navItem.path}
                                    onClick={() => handleNavClick(navItem.path)}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                />
                            ))}
                        </Tabs>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
});

export default Navbar;
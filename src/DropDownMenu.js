import React from 'react';
import MoreOptions from './MoreOptions';
import Menu from '@material-ui/core/Menu';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

const DropDownMenu = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const theme = createMuiTheme({
        overrides: {
            // Style sheet name ⚛️
            MuiMenu: {
                // Name of the rule
                paper: {
                    // Some CSS
                    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    background: 'linear-gradient(45deg, blueviolet 25%, #080c3c  90%)',
                    borderRadius: 5,
                    border: 0,
                    // color: '#f64c72',
                    color: 'white',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    height: 'auto'
                },
                list: {
                    width: 'auto',
                }
            },
            MuiMenuItem: {
                root: {
                    fontFamily: 'Roboto',
                    '&:hover': {
                        // backgroundColor: 'rgba(255, 150, 135, 0.8)'
                        backgroundColor: 'rgba(255,102,255,0.5)'
                    },
                    fontWeight: 400
                }
            }
        }
    });

    const options = ['Refresh', 'Choose categories'];

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option) => {
        setAnchorEl(null);
        switch (option) {
            case 'Refresh': props.refreshHandler(); break;
            case 'Choose categories': props.chooseHandler(); break;
            default:
        }
    };

    const menuItems = options.map(option => <MenuItem key={option} onClick={() => handleClose(option)}>{option}</MenuItem>)

    return (
        <div>
            <MoreOptions clicklistner={handleClick} />
            <ThemeProvider theme={theme}>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {menuItems}
                </Menu>
            </ThemeProvider>
        </div>
    );
}

export default DropDownMenu;
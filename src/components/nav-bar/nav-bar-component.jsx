import { Toolbar, Typography, Button, AppBar, InputBase, Menu, MenuItem } from "@material-ui/core";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { setWidget, WidgetDataType, Widget } from "@sitecore-discover/react";
import * as React from 'react';
import RfkHeroMessage from "../../rfk-widget-components/html-blocks/hero-message-component";
import ScLogo from '../../assets/sc-logo_white.png';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
    appBar: {
      backgroundColor: '#5548D9'
    },
    logo: {
      height: '5vmin',
      width: '5vmin',
      'pointer-events': 'none'
    },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
        display: 'none',
        paddingLeft: '1rem',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
}));

const rfkHeroMsgConfig = {
  type: WidgetDataType.HTML_BLOCK,
  component: RfkHeroMessage
}
setWidget('crm-html-block-widget', rfkHeroMsgConfig);

const NavBar = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const onMouseDown = () => {
    console.log('does this get triggered when i click off of search bar?')
  }
  return (
      <React.Fragment>
        <AppBar classes={{root: classes.appBar}}>
          <Toolbar>
            <img src={ScLogo} className={classes.logo}/>
          <Typography variant="h6" className={classes.title}>
            Discover SDK Demo
          </Typography>
          <MenuItem onClick={() => navigate('/')}>

          <Typography textAlign="center">Home</Typography>
</MenuItem>

<MenuItem onClick={() => navigate('/products/female')}>
  <Typography textAlign="center">Female Products</Typography>
  </MenuItem>
          
                <MenuItem onClick={() => navigate('/products/male')}>
          <Typography textAlign="center">Male Products</Typography>
                </MenuItem>

                <MenuItem onClick={() => navigate('/products/unisex')}>
          <Typography textAlign="center">Unisex Products</Typography>
                </MenuItem>
          <div className={classes.search}>
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={props.handleOnChange}
              onClick={props.handleOnClick}
              onMouseLeave={onMouseDown}
            />
          </div>
          </Toolbar>
          <Widget rfkId="crm-html-block-widget" />
        </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default NavBar;

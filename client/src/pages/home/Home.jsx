import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./Home.scss";
import AppButton from "../../components/misc/AppButton";
import { UserContext } from "./../../store/UserContext";
import { UserActionTypes } from "./../../store/actionTypes";
import { createUserHistory } from "../../api/history";
import brandMb from "../../assets/brand.jpg";
import { Grid, Toolbar, Hidden, Drawer, AppBar } from "@material-ui/core";
import homeBg from "../../assets/home-bg-dt.png";
import HomeMain from "../../layout/home/HomeMain";
import HomeAside from "../../layout/home//HomeAside";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  }
}));

function Home(props) {
  const { container } = props;
  const classes = useStyles();
  const { userState, userDispatch } = useContext(UserContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAppButtonClick = () => {
    userDispatch({ type: UserActionTypes.LOGOUT_USER });
  };

  const drawer = (
    <aside className="home__aside">
      <img className="home__brand aside" src={brandMb} alt="react Music" />
      <div className="home__user-info">
        <p className="user-info-text light">Bem vindo(a),</p>
        <p className="user-info-text bold">
          {userState.user.name.replace(/^\w/, c => c.toUpperCase())}
        </p>
      </div>

      <span className="btn-wrapper">
        <AppButton btnLabel="Sair" btnHandleClick={handleAppButtonClick} />
      </span>
    </aside>
  );

  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentSession"));

    //Check for a logged user
    if (currentUser) {
      userDispatch({
        type: UserActionTypes.SET_CURRENT_USER,
        payload: currentUser
      });
    } else {
      //Redirect not logged user
      history.push("/reactmusic/login");
    }
    //make sure the userHistory is set
    createUserHistory(currentUser.id);
  }, []);

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" className={classes.appBar} color={"secondary"}>
        <Hidden smUp>
          <Toolbar>
            <img
              onClick={handleDrawerToggle}
              className="home__brand"
              src={brandMb}
              alt="react Music"
            />
          </Toolbar>
        </Hidden>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main
        style={{ backgroundImage: `url(${homeBg})` }}
        className="home__desktop-main"
      >
        <Hidden smUp>
          <div className={classes.toolbar} />
        </Hidden>
        <Hidden xsDown>
          <Grid container>
            <Grid item sm={8}>
              <div className="home__desktop-section">
                <HomeMain />
              </div>
            </Grid>
            <Grid item sm={4}>
              <div className="home__desktop-section">
                <HomeAside />
              </div>
            </Grid>
          </Grid>
        </Hidden>
      </main>
    </div>
  );
}

export default Home;

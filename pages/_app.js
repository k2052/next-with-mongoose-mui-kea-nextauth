import { DndProvider } from "react-dnd";
import { Provider as SessionProvider } from "next-auth/client";
import { HTML5Backend } from "react-dnd-html5-backend";
import React, { Fragment, useEffect } from "react";
import { resetContext } from "kea";
import { Provider } from "react-redux";
import App from "next/app";
import withRedux, { createWrapper } from "next-redux-wrapper";
import Head from "next/head";
import Link from "next/link";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import localStoragePlugin from "kea-localstorage";
import { loadersPlugin } from "kea-loaders";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import theme from "../src/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const reduxDevTools =
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;
const SERVER_RENDER_TIMEOUT = 1000;
const makeStore = (initialState, options) => {
  const context = resetContext({
    defaults: initialState,
    createStore: {},
    plugins: [localStoragePlugin],
  });
  return context.store;
};

const wrapper = createWrapper(makeStore, { debug: true });
const store = makeStore();

const MyApp = ({ Component, pageProps }) => {
  const { session } = pageProps;
  const classes = useStyles();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Pet Care App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pets
          </Typography>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/new">
            <Button color="inherit">Add a Pet</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <SessionProvider session={session}>
        <DndProvider backend={HTML5Backend}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </DndProvider>
      </SessionProvider>
    </Fragment>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  if (ctx.isServer && Component.logic) {
    await Promise.race([
      new Promise((resolve) => Component.logic({ resolve }).mount()),
      new Promise((resolve) => setTimeout(resolve, SERVER_RENDER_TIMEOUT)),
    ]);
  }

  return { pageProps };
};

export default wrapper.withRedux(MyApp);

import { lazy, Fragment, Suspense } from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthGuard from "../components/AuthGuard";
import ErrorPage from "../pages/error-page/ErrorPage";
import Spinner from "../components/spinner/Spinner";

const routes = [
  {
    path: "/auth",
    component: lazy(() => import("../pages/auth/Auth")),
  },
  {
    path: "/",
    layout: MainLayout,
    guard: AuthGuard,
    routes: [
      {
        path: "/public",
        component: lazy(() => import("../pages/publicFiles")),
      },
      {
        path: "/",
        exact: true,
        component: lazy(() => import("../pages/disk/Disk")),
      },
    ],
  },
  {
    component: ErrorPage,
  },
];

const checkRedirect = (nextState, replace) => {};

const renderRoutes = (routes) => {
  return routes.map((route, i) => {
    const Guard = route.guard || Fragment;
    const Layout = route.layout || Fragment;
    const Component = route.component;

    return (
      <Route
        key={i}
        path={route.path}
        exact={route.exact || false}
        onEnter={checkRedirect}
        render={(props) => (
          <Guard>
            <Layout>
              {route.routes ? (
                renderRoutes(route.routes)
              ) : (
                <Component {...props} />
              )}
            </Layout>
          </Guard>
        )}
      />
    );
  });
};

export const Routes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Router>
        <Switch>
          {renderRoutes(routes)}
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </Suspense>
  );
};

import React from "react";
import { Route, Switch } from "react-router-dom";
import asyncComponent from "./components/AsyncComponent";
import AppliedRoute from "./components/AppliedRoute";

const AsyncHome = asyncComponent(() => import("./containers/Home"));
const AsyncNotFound = asyncComponent(() => import("./containers/NotFound"));
const AsyncTeslaDemo = asyncComponent(() => import("./containers/teslaDemo/TeslaDemo"));
const AsyncWeatherDemo = asyncComponent(() => import("./containers/weatherDemo/WeatherDemo"));

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute
            path="/"
            exact
            component={AsyncHome}
            props={childProps}
        />
        <AppliedRoute
            path="/tesla-demo"
            exact
            component={AsyncTeslaDemo}
            props={childProps}
        />
        <AppliedRoute
            path="/weather-demo"
            exact
            component={AsyncWeatherDemo}
            props={childProps}
        />
        {/* <UnauthenticatedRoute
            path="/login"
            exact
            component={AsyncLogin}
            props={childProps}
        />
        <UnauthenticatedRoute
            path="/signup"
            exact
            component={AsyncSignup}
            props={childProps}
        />
        <AuthenticatedRoute
            path="/notes/new"
            exact
            component={AsyncNewNote}
            props={childProps}
        />
        <AuthenticatedRoute
            path="/notes/:id"
            exact
            component={AsyncNotes}
            props={childProps}
        /> */}
        {/* Finally, catch all unmatched routes */}
        <Route component={AsyncNotFound} />
    </Switch>
    ;
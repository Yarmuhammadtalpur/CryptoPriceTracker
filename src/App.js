import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  HomePage,
  Exchanges,
  CryptoCurrencies,
  CryptoDetails,
  News,
} from "./components/index";

import "./styles/App.css";
export default function App() {
  return (
    <div className="app">
      {/* Navbar to change pages */}
      <div className="navbar">
        <Navbar />
      </div>

      {/* list of pages with their route and path to change dynamicaly when link is clicked in 4
            navbar all pages are different components */}

      <div className="main">
        <Layout>
          <div className="routes">
            {/* to switch path when link in navbar is clicked switch will activate and will change component on route
                    path and render it, It can be a whole page or simple a component or page. */}

            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <CryptoCurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>

        {/* Footer for all pages it is same, no different path */}

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Crypto Place <br />
            All Rights Reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

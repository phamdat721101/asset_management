import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Chapters from "./Chapters";
import Assets from "./Assets";
import AssetDisplay from "./AssetDisplay";

import AssetFormPage from "./Admin/AssetFormPage";
import ChapterFormPage from "./Admin/ChapterFormPage";
import register from "./register";
import ContactForm from "./ContactForm";
import History from "./History";

class Routes extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login}></Route>

            <Route exact path="/login" component={Login}></Route>

            <Route
              exact
              path="/api/chapters/get_all"
              component={Chapters}
            ></Route>

            <Route
              exact
              path="/api/history/get_all"
              component={History}
            ></Route>

            <Route
              exact
              path="/api/assets/:chapterName"
              component={Assets}
            ></Route>

            <Route
              exact
              path="/api/assetDisplay/:chapterName/:assetId"
              component={AssetDisplay}
            ></Route>
            <Route
              exact
              path="/api/update/:chapterName/:assetId"
              component={AssetFormPage}
            ></Route>

            <Route
              exact
              path="/api/addChapter/:chapterName"
              component={ChapterFormPage}
            ></Route>
            <Route
              exact
              path="/api/editChapter/:chapterName"
              component={ChapterFormPage}
            ></Route>
            <Route exact path="/api/contact" component={ContactForm}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;

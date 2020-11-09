import React from "react";
import {  Route, Link  } from "react-router-dom";
import Reactpage from './Video/ReactPage'
import Vue from './Video/Vue'
import Flutter from './Video/Flutter'


function Video(){
    return (
        <div>
            <div className="topNav">
                <ul>
                    <li><Link to="/video/reactpage">React教程</Link></li>
                    <li><Link to="/video/vue">Vue教程</Link></li>
                    <li><Link to="/video/flutter">Flutter教程</Link></li>
                </ul>
            </div>
            <div className="videoContent">
                <div><h3>视频教程</h3></div>
                <Route path="/video/reactpage"  exact component={Reactpage} />
                <Route path="/video/vue"  exact component={Vue} />
                <Route path="/video/flutter" exact  component={Flutter} />
            </div>
        </div>
    )
}
export default Video;
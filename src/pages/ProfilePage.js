import React, { Component } from "react";
import Library from "./Library";
import PublisherDashboard from "../cmps/PublisherDashboard";

export default class ProfilePage extends Component {
  state = { pageMode: "Gamer" };
  render() {
      const fillterBy=
      <div>
    <input type='text'></input>
      </div>
     const {pageMode}=this.state
    if (pageMode==="Gamer") {
        return<>
        {fillterBy}
         <Library/>
         </>
    }else{
     return   <>
     {fillterBy}
         <PublisherDashboard/>
        </>
    }
  }
}

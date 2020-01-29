import React from "react";
import { connect } from "react-redux";

function IsUserLoggedIn(props) {
    if (props.loggedInUser) {
        if (props.loggedInUser.userName){
        return (
            <div>
              {props.children}
            </div>
        )
        }
    }
    return null
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userStore.loggedInUser
    };
};

const mapDispatchToProps = {
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IsUserLoggedIn);

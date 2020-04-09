import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { BellOutlined } from "@ant-design/icons";

import { Menu, Dropdown, Badge } from "antd";

import { logoutUser, fetchUserVideos, updateViewedFeedback } from "../../redux/actions/userActions";

function NotificationNav(props) {
	//getting feedback data for each video
	let feedback = props.videos.map((item) => {
		return item.feedback;
	});

	let userFeedback = gatherFeedback(feedback); 

	// loop through Array or array for feedback and then obtain one single array
	function gatherFeedback(arr) {
		let newArray = [];
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].length > 0) {
				for (let k = 0; k < arr[i].length; k++) {
					if (arr[i][k].viewed === false) {
						newArray.push(arr[i][k]);
					}
				}
			}
		}
		return newArray;
    }
    //populate feedback data into the menu item

	const menu = (
		<Menu>
			{userFeedback.length > 0 ? userFeedback.map((item) => (
				<Menu.Item>
					<Link to={`/videos/${item.video_id}`}>
						{item.first_name} {item.last_name} left a feedback on video {item.video_title}
					</Link>
				</Menu.Item>
			)) : (
				<Menu.Item>
					
						No new comments
					
				</Menu.Item>
			)}
		</Menu>
	);
  
        return (
        
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" style={{ color: "grey" }} onClick={(e) => e.preventDefault()}>
                   <Badge count={userFeedback.length}>
                       <BellOutlined style={{ fontSize: "30px" }} /> 
                   </Badge> 
                </a>
            </Dropdown>
        )
    
	
}

const mapStateToProps = (state) => {
	return {
		videos: state.User.videos,
		userId: state.User.userId,
	};
};

const mapActionsToProps = {
	fetchUserVideos,
	updateViewedFeedback,
};

export default connect(mapStateToProps, mapActionsToProps)(NotificationNav);

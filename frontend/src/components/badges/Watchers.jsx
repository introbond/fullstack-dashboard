import React from "react";
import { EyeOutlined } from '@ant-design/icons';
import { Avatar, Badge, Tooltip } from 'antd';
import { isMobile } from "../../utils/constants.js";


const Watchers = ({ activeUsersCount }) => {
    const style = {
        position: 'fixed',
        padding: '3px 3px',
        backgroundColor: 'var(--color-secondary)',
        border: 'none',
        borderRadius: '50%',
        top: "15px",
        right: "20px",
    }

    if (isMobile) {
        style.right = "80px"
        style.top = "9px"
    }

    return (
        <div style={style}>
            <Tooltip title={`Watching: ${activeUsersCount}`}>
                <Badge size="small" count={activeUsersCount} style={{ backgroundColor: "green" }}>
                    <Avatar shape="circle" icon={<EyeOutlined />} />
                </Badge>
            </Tooltip>
        </div>
    )
}

export default Watchers;
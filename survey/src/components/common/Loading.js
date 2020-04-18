import React from 'react';

const Loading = () => {
    return (
        <div style={{
            textAlign:"center",
            padding: "20%"}}>
            <i className="fa fa-circle-o-notch fa-3x fa-spin"></i> 
            {/* <strong> درحال بارگزاری. . .</strong> */}
        </div>
    );
};

export default Loading;
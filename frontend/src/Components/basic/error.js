import React from 'react';

const Loading = () => {
  return(
      <div>
          <div style={{display:"flex",color:"red",justifyContent:"center",alignItems:"center",margin:"10%"}}>
                <h1 className='display-6'>Server Unavailable, Please try later</h1>
            </div>
      </div>
  );
};

export default Loading;

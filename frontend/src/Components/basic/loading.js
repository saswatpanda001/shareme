import React from 'react';

const Loading = () => {
  return(
      <div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"10%"}}>
                
                <div class="spinner-grow text-primary" role="status" style={{marginLeft:"2%"}}>
                    <span class="sr-only"></span>
                </div>
                
                <div class="spinner-grow text-danger" role="status" style={{marginLeft:"2%"}}>
                    <span class="sr-only"></span>
                </div>
                <div style={{marginLeft:"2%"}}><h1>Loading Posts.......</h1></div>
                <div class="spinner-grow text-dark" role="status" style={{marginLeft:"2%"}}>
                    <span class="sr-only"></span>
                </div>
                <div class="spinner-grow text-secondary" role="status" style={{marginLeft:"2%"}}>
                    <span class="sr-only"></span>
                </div>
            </div>
      </div>

  );
};

export default Loading;

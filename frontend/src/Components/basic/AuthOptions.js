import React from 'react';

const AuthOptions = () => {
  return(
    <div class="dropdown">
    <i className="large black ellipsis vertical icon"  id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"/>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="/#">Login</a></li>
    <li><a class="dropdown-item" href="/#">Logout</a></li>
    </ul>
    </div>
  );
};

export default AuthOptions;

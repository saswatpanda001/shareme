


export const DecodeToken = (token) => {


   
    try{
    if(token){
    
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }}
    catch{
        window.location.replace("http://localhost:3000/login")
    }
}

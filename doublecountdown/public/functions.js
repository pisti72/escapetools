function test(){
    fetch('/getmyip').then(function(response){
        return response.json()        
    }).then(function(j){
        f('message').innerHTML = j.ip;
    }).catch(function(error){
        f('message').innerHTML = 'Server not available';
    })
    
}
function start(n){
    f('server').style.display = 'none';
    f('client').style.display = 'block';
}
function f(n){
    return document.getElementById(n);
}
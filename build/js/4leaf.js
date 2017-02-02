
function loadMain(url, e){
    e.preventDefault();
    $('#main-content').load(url);
    //return false;
}

$(function(){
    $('#main-content').load('/main.html', function(){
        
    });
});
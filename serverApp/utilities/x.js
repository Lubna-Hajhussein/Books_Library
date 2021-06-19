let x = 8
document.getElementById("confBtn").addEventListener("click",(e)=>{
    x=9;
    console.log(x);
    location.assign("https://google.com")
})
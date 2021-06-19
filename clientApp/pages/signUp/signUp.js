const form = document.querySelector(".box");

form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    try{
        const username = form.elements.username.value;
        const email = form.elements.email.value;
        const password =  form.elements.password.value;

        const res = await fetch("http://localhost:3000/signUp", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password})
        });
        // console.log(await res.json())

        localStorage.setItem("email", JSON.stringify(email));
    }
    catch(err){
        console.log({err});
    }
});
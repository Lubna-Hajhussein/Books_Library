const form = document.querySelector(".box");

form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    try{
        const confirmationCode = form.elements.confirmationCode.value;
        const email = JSON.parse(localStorage.getItem("email"));

        const result = await fetch("http://localhost:3000/confirmEmail", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({confirmationCode, email})
        });
        console.log(await result.json());
        window.location.assign("logIn")
    }
    catch(err){
        console.log(err);
    }
});
const form = document.querySelector(".box");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
		const email = form.elements.email.value;
		const password = form.elements.password.value;

		const result = await fetch("http://localhost:3000/logIn", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const data = await result.json();
         if(data.err){
			 return;
		 }
		if (data.role) {
			const { role } = data;
			role === "admin"
				? location.assign("http://localhost:3000/adminHome")
				: location.assign("http://localhost:3000/userHome");
		}
	} catch (err) {
		console.log(err);
	}
});

const createUserCard = (user) => {
        const cardContainer = document.createElement("div");
        cardContainer.setAttribute("class","infocardContainer");
        cardContainer.setAttribute("id", user.id);
        const profileImgCon = document.createElement("div");
        profileImgCon.setAttribute("class", "main");
        const profileImg = document.createElement("img");
        profileImg.src = "https://upload.wikimedia.org/wikipedia/commons/e/ea/Dog_coat_variation.png"; 
        profileImgCon.appendChild(profileImg);
        cardContainer.appendChild(profileImgCon);
        const cardContent = document.createElement("div");
        cardContent.setAttribute("class", "textbois");
        const userName = document.createElement("h2");
        userName.textContent = user.name;
        const userEmail = document.createElement("h4");
        userEmail.textContent = user.email;
        // btn container
        const btnContainer = document.createElement("div");
        btnContainer.setAttribute("calss","btnDiv");
        // delete btn
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("class","bn5")
        deleteBtn.textContent = "DELETE"
        // moreInfo btn
        const moreInfoBtn = document.createElement("button");
        moreInfoBtn.setAttribute("class","bn5")
        moreInfoBtn.textContent = "INfo"

        cardContent.appendChild(userName);
        cardContent.appendChild(userEmail);
        cardContainer.appendChild(cardContent);
        btnContainer.appendChild(deleteBtn);
        btnContainer.appendChild(moreInfoBtn);
        cardContent.appendChild(btnContainer);
        
        return {cardContainer, deleteBtn, moreInfoBtn};
}
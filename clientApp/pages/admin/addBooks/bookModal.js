const createModalDom = () => {
    // create a modal
    const modalContainer = document.createElement("div");
    modalContainer.setAttribute("class", "modal-container");
    const modalContent = document.createElement("div");
    modalContent.setAttribute("class", "modalContent");
    modalContainer.appendChild(modalContent);
    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("class", "close");
    closeBtn.textContent = "x";
    const modalImg = document.createElement("img");
    const selectContainer = document.createElement("select");
    selectContainer.setAttribute("class", "select");
    selectContainer.innerHTML = `
    <select name="slct" id="slct">
        <option value="history" selected>History</option>
        <option value="literature">Literature</option>
        <option value="psychology">Psychology</option>
        <option value="religion">Religion</option>
        <option value="sociology">Sociology</option>
      </select>
      <br/>
    `;
    const acceptBtn = document.createElement("button");
    acceptBtn.setAttribute("class", "bn5");
    acceptBtn.textContent = "Add";
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(selectContainer);
    modalContent.appendChild(modalImg);
    modalContent.appendChild(acceptBtn);

    document.body.appendChild(modalContainer);
    return {closeBtn, acceptBtn, selectContainer, modalImg, modalContainer};

};
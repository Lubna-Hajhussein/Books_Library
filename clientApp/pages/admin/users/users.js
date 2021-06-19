function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

const fetchUsers = async () => {
	const result = await fetch("http://localhost:3000/normalUsersData");
	const { users } = await result.json();
	return users;
};

fetchUsers().then((users) => {
	const cardsContainer = document.querySelector(".cardsContainer");
	users.forEach((user) => {
		const { cardContainer, deleteBtn, moreInfoBtn } = createUserCard(user);
		cardsContainer.appendChild(cardContainer);
		deleteBtn.addEventListener("click", async (e) => {
			try {
				const res = await fetch(`http://localhost:3000/deleteUser/${user.id}`, {
					method: "DELETE",
				});
				const { deleted } = await res.json();
				if (deleted) {
					const cardsNodes = cardsContainer.childNodes;
					const nodesArr = [...cardsNodes];
					const targetedNode = nodesArr.find(
						(childNode) => childNode.id === user.id
					);
					cardsContainer.removeChild(targetedNode);
				}
			} catch (err) {
				console.log({ err });
			}
		});
	});
});

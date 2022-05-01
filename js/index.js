'use strict';

class TopContainer {
	static count = 0;
	constructor() {
		this.bottomContainer = new BottomContainer();
		this.objExample = {};
	}

	createToDoList() {
		const toDoListTitle = document.querySelector('input[type="text"]').value;
		document.querySelector('.divBottomContainer').innerHTML += `
      <ul class="ulContainer">
				<i class="xi-pen xi-flip-horizontal xi-x iPenIcon"></i><li class="liTitle">${toDoListTitle}</li>
        <li class="liCheckBoxContainer"><input class="inputCheckBox" type="checkbox"/></li>
        <input type="hidden" name="toDoListTitle" value="${TopContainer.count}"/>
        <button class="buttonMinus">-</button><li class="liStar">⭐</li><button class="buttonPlus">+</button>
        <li class="liDelete"><i class="xi-close-min"></i></li>
      </ul>
      `;
		this.objExample = { id: TopContainer.count, title: toDoListTitle, check: false, rating: 1 };
		document.querySelector('input[type="text"]').focus();
		document.querySelector('input[type="text"]').value = '';
		this.bottomContainer.getToDoList(this.objExample);
		this.bottomContainer.checkResetToDoList();
		this.bottomContainer.ResetToDoList();
		this.bottomContainer.checkToDoList();
		this.bottomContainer.deleteToDoList();
		this.bottomContainer.clickMinusPlusStar();
		TopContainer.count++;
	}

	clickCreateToDoList() {
		const toDoListTitle = document.querySelector('input[type="text"]');
		document.querySelector('.buttonClick').addEventListener('click', () => {
			if (toDoListTitle.value != '') {
				this.createToDoList();
			} else if (toDoListTitle.value == '') {
				toDoListTitle.focus();
			}
		});
	}
	enterCreateToDoList() {
		const toDoListTitle = document.querySelector('input[type="text"]');
		toDoListTitle.addEventListener('keypress', (event) => {
			if (toDoListTitle.value != '' && event.keyCode == 13) {
				this.createToDoList();
			}
		});
	}
}

class BottomContainer {
	constructor() {
		this.arrToDoList = [];
		this.objToDoList = {};
	}

	getToDoList(getObj) {
		this.objToDoList = getObj;
		this.arrToDoList.push(this.objToDoList);
		console.log(this.arrToDoList);
	}

	checkToDoList() {
		document.querySelectorAll('input[type="checkbox"]').forEach((value) => {
			value.addEventListener('click', ({ currentTarget }) => {
				this.arrToDoList = this.arrToDoList.map((value) => {
					if (value['id'] == currentTarget.parentElement.parentElement.querySelector('input[type="hidden"]').value) {
						if (currentTarget.checked) {
							value['check'] = true;
						} else {
							value['check'] = false;
						}
					}
					return value;
				});
				console.log(this.arrToDoList);
			});
		});
	}

	checkResetToDoList() {
		document.querySelectorAll('input[type="checkbox"]').forEach(() => {
			this.arrToDoList = this.arrToDoList.map((value) => {
				value['check'] = false;
				return value;
			});
			console.log(this.arrToDoList);
		});
	}

	deleteToDoList() {
		document.querySelectorAll('.liDelete').forEach((value) => {
			value.addEventListener('click', ({ currentTarget }) => {
				this.arrToDoList = this.arrToDoList.filter((value) => {
					console.log(value);
					console.log(currentTarget.parentElement.querySelector('input[type="hidden"]').value);
					return value['id'] != currentTarget.parentElement.querySelector('input[type="hidden"]').value;
				});
				currentTarget.parentElement.remove();
				console.log(this.arrToDoList);
			});
		});
	}

	ResetToDoList() {
		document.querySelector('.buttonResetContainer').addEventListener('click', () => {
			const divBottomContainer = document.querySelector('.divBottomContainer');
			while (divBottomContainer.hasChildNodes()) {
				divBottomContainer.removeChild(divBottomContainer.firstChild);
				this.arrToDoList.shift();
			}
			document.querySelector('input[type="text"]').focus();
			document.querySelector('input[type="text"]').value = '';
			console.log(this.arrToDoList);
			TopContainer.count = 0;
		});
	}

	clickMinusPlusStar() {
		document.querySelectorAll('.buttonMinus').forEach((value) => {
			value.addEventListener('click', ({ currentTarget }) => {
				this.arrToDoList = this.arrToDoList.map((value) => {
					value['id'] == currentTarget.parentElement.querySelector('input[type="hidden"]').value && value['rating'] > 1 && --value['rating'];
					console.log(this.arrToDoList);
					return value;
				});
				const liStar = currentTarget.parentElement.querySelector('.liStar');
				let liStarSplit = liStar.textContent.split('');
				if (liStar.textContent.length != 1) {
					liStarSplit.pop();
				}
				liStar.innerHTML = liStarSplit.join('');
			});
		});

		document.querySelectorAll('.buttonPlus').forEach((value) => {
			value.addEventListener('click', ({ currentTarget }) => {
				this.arrToDoList = this.arrToDoList.map((value) => {
					value['id'] == currentTarget.parentElement.querySelector('input[type="hidden"]').value && value['rating'] < 5 && ++value['rating'];
					console.log(this.arrToDoList);
					return value;
				});
				const liStar = currentTarget.parentElement.querySelector('.liStar');
				if (liStar.textContent.length != 5) {
					liStar.innerHTML += '⭐';
				}
			});
		});
	}
}

class ToDoList {
	constructor() {
		this.topContainer = new TopContainer();
	}

	main() {
		this.topContainer.clickCreateToDoList();
		this.topContainer.enterCreateToDoList();
	}
}

const toDoList = new ToDoList();
toDoList.main();

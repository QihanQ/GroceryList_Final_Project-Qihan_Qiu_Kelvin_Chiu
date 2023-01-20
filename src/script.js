class GroceryList {
  constructor() {
    this.changePos = document.getElementById("changePos");
    this.newItem = document.getElementById("newItem");
    this.itemArray = [];
    this.amountArray = [];
    this.deletedItem = document.getElementById("deleteItem");
    this.changeQuantity = document.getElementById("changeQuant");
  }

  addItem() {
    this.itemArray.push(this.newItem.value);
    this.amountArray.push(1);
    if (new Set(this.itemArray).size !== this.itemArray.length) {
      this.itemArray.pop();
      this.amountArray.pop();
    }
    this.display();
  }

  deleteItem() {
    if (
      this.deletedItem.value > 0 &&
      this.deletedItem.value < this.itemArray.length + 1
    ) {
      this.itemArray.splice(this.deletedItem.value - 1, 1);
      this.amountArray.splice(this.deletedItem.value - 1, 1);
    }
    this.display();
  }

  moveUp() {
    if (
      this.changePos.value > 1 &&
      this.changePos.value <= this.itemArray.length
    ) {
      let temp;
      temp = this.itemArray[this.changePos.value - 1];
      this.itemArray[this.changePos.value - 1] = this.itemArray[
        this.changePos.value - 2
      ];
      this.itemArray[this.changePos.value - 2] = temp;
      temp = this.amountArray[this.changePos.value - 1];
      this.amountArray[this.changePos.value - 1] = this.amountArray[
        this.changePos.value - 2
      ];
      this.changePos.value--;
    }
    this.display();
  }

  moveDown() {
    if (
      this.changePos.value > 0 &&
      this.changePos.value < this.itemArray.length
    ) {
      let temp;
      temp = this.itemArray[this.changePos.value - 1];
      this.itemArray[this.changePos.value - 1] = this.itemArray[
        this.changePos.value
      ];
      this.itemArray[this.changePos.value] = temp;
      temp = this.amountArray[this.changePos.value - 1];
      this.amountArray[this.changePos.value - 1] = this.amountArray[
        this.changePos.value
      ];
      this.amountArray[this.changePos.value] = temp;
      this.changePos.value++;
    }
    this.display();
  }

  increaseQuantity() {
    if (
      this.changeQuantity.value > 0 &&
      this.changeQuantity.value < this.itemArray.length + 1
    ) {
      this.amountArray[this.changeQuantity.value - 1] += 1;
      //let temp = this.amountArray[this.changeQuantity.value - 1];
      //this.quantArray[this.changeQuantity.value - 1] = ` (${temp})`;
    }
    this.display();
  }

  decreaseQuantity() {
    if (
      this.changeQuantity.value > 0 &&
      this.changeQuantity.value < this.itemArray.length + 1
    ) {
      this.amountArray[this.changeQuantity.value - 1] -= 1;
      if (this.amountArray[this.changeQuantity.value - 1] < 2) {
        this.amountArray[this.changeQuantity.value - 1] = 1;
      }
    }
    this.display();
  }

  display() {
    let tempArr = [];
    for (let n = 0; n < this.itemArray.length; n++) {
      let amount = this.amountArray[n];
      amount > 1
        ? tempArr.push(this.itemArray[n] + ` (${amount})`)
        : tempArr.push(this.itemArray[n]);
    }
    document.getElementById("items").innerHTML =
      "<li>" + tempArr.join("</li><li>") + "</li>";
  }
}

let initialize = () => {
  document
    .querySelector("#video-panel-start")
    .addEventListener("click", (_e) => {
      document.querySelector(".start-screen").style.display = "none";
      document.querySelector("#video-panel").style.display = "flex";
    });
  document.querySelector("#video-panel-end").addEventListener("click", (_f) => {
    document.querySelector("#video-panel").style.display = "none";
    document.querySelector(".list-screen").style.display = "block";
  });
  let groceryList = new GroceryList();
  document.getElementById("Move-Up").addEventListener("click", (_g) => {
    groceryList.moveUp();
  });
  document.getElementById("Move-Down").addEventListener("click", (_h) => {
    groceryList.moveDown();
  });
  document.getElementById("Add-Item").addEventListener("click", (_i) => {
    groceryList.addItem();
  });
  document.getElementById("Delete-Item").addEventListener("click", (_j) => {
    groceryList.deleteItem();
  });
  document.getElementById("Add-One").addEventListener("click", (_k) => {
    groceryList.increaseQuantity();
  });
  document.getElementById("Remove-One").addEventListener("click", (_l) => {
    groceryList.decreaseQuantity();
  });
  groceryList.display();
};

window.onload = initialize();

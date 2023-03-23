let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animationWrapper");

const time_line = new TimelineMax();

//parameter1 is the object to constrol
//parameter2 is duration
//parameter3 is the original statement of the object to control
//parameter4 is the final statement of the animation
//parameter5 is used to control the delay of the animation

time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slider,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

//part1
//讓整個網站的 enter 都禁用
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

//防止 form 內部的 button 交出表單
let allButtons = document.querySelectorAll("button");
allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
  });
});

//選擇 Select 內的 Option 之後，要改變相對應的顏色
let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });
});

//改變credit後，Gpa也要更新
let credits = document.querySelectorAll(".classCredit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B+" ||
    target.value == "B" ||
    target.value == "B-"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C+" ||
    target.value == "C" ||
    target.value == "C-"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D+" ||
    target.value == "D" ||
    target.value == "D-"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "white";
  } else if (target.value == "F") {
    target.style.backgroundColor = "gray";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "#e9e9ed";
    target.style.color = "#000000";
  }
  // console.log(target.value);
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

function setGPA() {
  let formLength = document.querySelectorAll("form").length;
  let credits = document.querySelectorAll(".classCredit");
  let selects = document.querySelectorAll("select");
  let sum = 0; //GPA計算用分子
  let creditsSum = 0; //分母

  //isNan可以用來確保有東西才會進入計算
  for (let i = 0; i < credits.length; i++) {
    console.log("credit" + credits[i].valueAsNumber);
    if (!isNaN(credits[i].valueAsNumber)) {
      creditsSum += credits[i].valueAsNumber;
    }
  }
  //isNan可以用來確保有東西才會進入計算
  for (let i = 0; i < selects.length; i++) {
    console.log("值" + convertor(selects[i].value));
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }
  let result;
  if (creditsSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    result = (sum / creditsSum).toFixed(2);
  }

  document.querySelector("#resultGpa").innerHTML = result;
}

let addButton = document.querySelector(".plusButton");
addButton.addEventListener("click", () => {
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  newDiv.classList.add("grader");

  //製作五個小元素
  let newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("placeholder", "class category");
  newInput.setAttribute("list", "opt");
  newInput.classList.add("classType");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.classList.add("classNumber");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.classList.add("classCredit");
  newInput3.addEventListener("change", () => {
    setGPA();
  });

  let newSelect = document.createElement("select");
  newSelect.setAttribute("name", "select");
  newSelect.classList.add("select");

  let opt1 = document.createElement("option");
  opt1.setAttribute("value", "");
  let textNode1 = document.createTextNode("");
  opt1.appendChild(textNode1);
  let opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  let opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  let opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  let opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  let opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  let opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  let opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  let opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  let opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  let opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  let opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  let opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  let newButton = document.createElement("button");
  newButton.classList.add("trashButton");
  let newITag = document.createElement("i");
  newITag.classList.add("fas");
  newITag.classList.add("fa-trash");
  newButton.appendChild(newITag);

  newButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        console.log(e.target);
        e.target.remove();
        setGPA();
      }
    );
  });

  newDiv.appendChild(newInput);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);
  newSelect.addEventListener("change", (e) => {
    changeColor(e.target);
    setGPA();
  });

  newForm.appendChild(newDiv);

  document.querySelector(".allInputs").appendChild(newForm);
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

let allTrash = document.querySelectorAll(".trashButton");
allTrash.forEach((trash) => {
  trash.addEventListener("click", (e) => {
    e.target.parentElement.parentElement.style =
      "transition: all 0.5s ease;transform: scale(0)";
  });
});
allTrash.forEach((trash) => {
  let form = trash.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
  });
});

//排序演算法
let button1 = document.querySelector(".sortDescending");
let button2 = document.querySelector(".sortAscending");
button1.addEventListener("click", () => {
  handleSorting("descending"); //由大到小排列
});

button2.addEventListener("click", () => {
  handleSorting("ascending"); //由小到大排列
});

function handleSorting(direction) {
  let graders = document.querySelectorAll("div.grader");
  let objectArray = [];
  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value;
    let class_number = graders[i].children[1].value;
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;
    // console.log(class_name, class_number, class_credit, class_grade);
    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      objectArray.push(class_object);
    }
  }
  for (let i = 0; i < objectArray.length; i++) {
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }

  objectArray = mergeSort(objectArray);
  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }
  console.log(objectArray);
  //根據 object array 的內容來更新網頁
  let allInputs = document.querySelector(".allInputs");
  allInputs.innerHTML = "";

  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
        <input type="text" placeholder="class category" class="classType" list="opt" value=${objectArray[i].class_name}
        /><!------><input type="text" placeholder="class number" class="classNumber" value=${objectArray[i].class_number}
        /><!------><input type="number" placeholder="credits" min="0" max="6" value=${objectArray[i].class_credit} class="classCredit">
        <select name="select" class="select">
            <option value=""></option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="D-">D-</option>
            <option value="F">F</option>
        </select
        ><!----><button class="trashButton">
            <i class="fas fa-trash"></i>
        </button>
    </div>
</form>`;
  }
  //因為select無法用string做更改
  //select可直接js更改
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  //加入事件監聽器
  //select
  let allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    changeColor(select);
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  //credit事件監聽
  let allCredirts = document.querySelectorAll(".classCredit");
  allCredirts.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  //garbage
  let allTrash = document.querySelectorAll(".trashButton");
  allTrash.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          console.log(e.target);
          e.target.remove();
          setGPA();
        }
      );
    });
  });

  // console.log(objectArray);
  function merge(a1, a2) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < a1.length && j < a2.length) {
      if (a1[i].class_grade_number > a2[j].class_grade_number) {
        result.push(a2[j]);
        j++;
      } else {
        result.push(a1[i]);
        i++;
      }
    }
    while (i < a1.length) {
      result.push(a1[i]);
      i++;
    }
    while (j < a2.length) {
      result.push(a2[j]);
      j++;
    }
    return result;
  }

  function mergeSort(arr) {
    if (arr.length == 0) {
      return;
    }
    if (arr.length == 1) {
      return arr;
    } else {
      let middle = Math.floor(arr.length / 2);
      let left = arr.slice(0, middle);
      let right = arr.slice(middle, arr.length);
      return merge(mergeSort(left), mergeSort(right));
    }
  }
}

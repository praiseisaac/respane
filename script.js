var screenSizes = [
    "2560x1440",
    "1920x1200",
    "1920x1080",
    "1680x1080",
    "1600x900",
    "1536x864",
    "1440x900",
    "1366x768",
    "1280x800",
    "1024x768",
    "1024x600",
    "960x540",
    "800x1280",
    "800x480",
    "768x1024",
    "720x1280",
    "600x1024",
    "600x960",
    "540x960",
    "480x800",
    "414x736",
    "400x640",
    "384x640",
    "375x667",
    "360x640",
    "360x720",
    "320x568",
    "320x533",
    "320x480"
]

window.onload = () => {
    document.getElementById("screen-sizes").innerHTML = `
        ${screenSizes.map((elem) => {
        return `<option value=${elem}>${elem}</option>`
    }
    )}
        ${screenSizes.map((elem) => {
        let res = elem.split("x")
        return `<option value="${res[1]}x${res[0]}">${res[1]}x${res[0]}</option>`
    }
    )}
    `
}


class History {

    constructor(previous, current, next) {
        this.current = current;
        this.previous = previous;
        this.next = next;
    }
}

var paneCount = window.localStorage.getItem("paneCount") || 0
var head = new History(null, "http://localhost:5501", null);

// creates a new pane
function createPane(e) {
    let newPane = createElement("div", "pane-item", "pane-" + paneCount);

    let controls = createElement("div", "pane-controller-holder");
    let controlsRight = createElement("div");
    let controlsLeft = createElement("div");

    // let backButton = createElement("img", "pane-controls-icon", "pane-" + paneCount + "-copy");
    // backButton.src = "./arrow_back_black_24dp.svg";
    // backButton.height = "30";
    // controlsLeft.appendChild(backButton);

    // let forwardButton = createElement("img", "pane-controls-icon", "pane-" + paneCount + "-copy");
    // forwardButton.src = "./arrow_forward_black_24dp.svg";
    // forwardButton.height = "30";

    // controlsLeft.appendChild(forwardButton);

    // let copyButton = createElement("img", "pane-controls-icon", "pane-" + paneCount + "-copy");
    // copyButton.src = "./content_copy_black_24dp.svg";
    // copyButton.height = "30";
    // controlsRight.appendChild(copyButton);

    var title = document.createElement("div");

    controlsLeft.appendChild(title);


    let closeButton = createElement("img", "pane-controls-icon", "pane-" + paneCount + "-close");
    closeButton.src = "./clear_black_24dp.svg";
    closeButton.height = "30";
    closeButton.onclick = (e) => {
        document.getElementById("pane-container-children").removeChild(newPane);
    }
    controlsRight.appendChild(closeButton);

    controls.appendChild(controlsLeft);
    controls.appendChild(controlsRight);

    var screenSize = document.getElementById("screen-sizes").value;
    title.innerText = screenSize;
    newPane.style.height = screenSize.split("x")[0] + "px"
    newPane.style.width = screenSize.split("x")[1] + "px"



    newPane.appendChild(controls);

    let iframe = createElement("iframe", "pane-iframe");
    iframe.src = document.getElementById("search-box")?.value || "http://localhost:5501"
    // backButton.onclick = goBack
    // forwardButton.onclick = goForward

    newPane.appendChild(iframe)
    document.getElementById("pane-container-children").appendChild(newPane)
    paneCount++;
}

// moves the pane
function movePane(e) {

}

// deletes the pane
function deletePane(e) {

}

// sets the size for the panes
function setPaneSize(e) {

}

// sets the home url for the panes
function setUrl(e) {


    let source = document.getElementById("search-box").value;

    let newHead = new History(head, source, null);
    head.next = newHead;
    head = newHead;
    let elements = document.getElementsByClassName("pane-iframe")
    for (let elem of elements) {
        elem.src = source;
    }
    console.log(head);
}

function createElement(type, className = null, id = null) {
    var elem = document.createElement(type);
    if (className) {
        elem.className = className;
    }
    if (id) {
        elem.id = id;
    }
    return elem;

}

function showPopup(classname) {
    var elem = document.getElementsByClassName(classname)[0]
    elem.className = elem.className.replace("hidden", "visible")
}

function hidePopup(classname) {
    var elem = document.getElementsByClassName(classname)[0]
    elem.className = elem.className.replace("visible", "hidden")
}

function stopPropagation(e) {
    e.stopPropagation();
}

function goBack(e) {
    let newHead = head.previous;
    newHead.next = head;
    head = newHead
    document.getElementById("search-box").value = head.current;
    setUrl();
    console.log(head);
}

function goForward(e) {
    let newHead = head.next;
    newHead.previous = head;
    head = newHead
    document.getElementById("search-box").value = head.current;
    setUrl();
    console.log(head);
}

function setScale(e) {

}

function scale(value) {
    document.getElementById("pane-container-children").style.transform = `scale(${parseInt(value) / 100})`;
}
import { getMousePosition } from "./utils/utils.js";
import { getElementCoords } from "./utils/utils.js";

const icons = document.getElementsByClassName("icon")
const cursor = document.getElementById("cursor")

let selectedItem;
let isHovering = false;
let cursorSize;


let elementPos = {
    left: 0,
    top: 0,
    width: 0,
    height: 0
}
let mousePos = {
    x: 0,
    y: 0
}

const handleMouse = e => {
    cursorSize = isHovering ? 85 : 20


    const dst = {
        x: e.clientX - (elementPos.left + elementPos.width / 2),
        y: e.clientY - (elementPos.top + elementPos.height / 2)
    }

    if (isHovering) {

        gsap.to(cursor, {
            left: (elementPos.left + elementPos.width / 2 - cursorSize / 2) + dst.x * 0.1,
            top: (elementPos.top + elementPos.height / 2 - cursorSize / 2) + dst.y * 0.1,
            width: cursorSize,
            height: cursorSize,
            ease: "power2.out",
        })


        //Undefined check is probably removable but sometimes i've encountered strange bugs on reload than won't get the item on first hover. (could be a library bug)
        if (selectedItem !== 'undefined') {
            gsap.to(selectedItem, {
                x: dst.x * 0.1,
                y: dst.y * 0.1
            })
        }
    }

    else {
        gsap.to(cursor, {
            left: mousePos.x - cursorSize / 2,
            top: mousePos.y - cursorSize / 2,
            width: cursorSize,
            height: cursorSize
        })
    }
    mousePos = getMousePosition(e)
    cursor.style.setProperty('--cursorSize', cursorSize + "px")


}

window.addEventListener("mousemove", handleMouse)


const handleMouseOver = e => {
    isHovering = true
    e.currentTarget.classList.add("hover")

    elementPos = getElementCoords(e);
    selectedItem = e.currentTarget;
}

const handleMouseLeave = e => {
    isHovering = false
    e.currentTarget.classList.remove("hover")
    gsap.to(e.currentTarget, {
        x: 0,
        y: 0
    })
}

Array.from(icons).forEach((icon) => {
    icon.addEventListener("mouseover", handleMouseOver)
    icon.addEventListener("mouseleave", handleMouseLeave)
})
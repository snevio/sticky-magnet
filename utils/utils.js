const getMousePosition = e => {

    return {
        x: e.clientX,
        y: e.clientY
    }
}

const getElementCoords = e => {


    return {
        left: e.currentTarget.getBoundingClientRect().left,
        top: e.currentTarget.getBoundingClientRect().top,
        width: e.currentTarget.getBoundingClientRect().width,
        height: e.currentTarget.getBoundingClientRect().height
    }
}

export { getMousePosition, getElementCoords }
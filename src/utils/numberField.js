const keyDown = (e) => {
    if (
        !(
            (e.keyCode > 95 && e.keyCode < 106) ||
            (e.keyCode > 47 && e.keyCode < 58) ||
            e.keyCode == 8
        )
    ) {
        return false;
    }
};

export default keyDown;

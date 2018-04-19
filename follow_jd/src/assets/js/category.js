function myMoveScroll() {
    var childBox = this.$refs.childbox[0];
    var lis = childBox.children;
    var parentBox = this.$refs.category_left[0];
    var height = parentBox.offsetHeight;
    var topHeight = this.$refs.top_bar[0];

    var parentHeight = height - topHeight;
    var childHeight = childBox.offsetHeight;
    var startY = 0;
    var endY = 0;
    var moveY = 0;
    var currentY = 0;
    // 上下滑动距离限制
    var upDownOffset = 150;
    var startTime = 0;
    var endTime = 0;

    function addTransition() {
        childBox.style.transition = "all .3s ease 0s";
        childBox.style.webkitTransition = "all .3s ease 0s";
    }
    function removeTransition() {
        childBox.style.transition = "none";
        childBox.style.webkitTransition = "none";
    }
    function setTransform(t) {
        childBox.style.transform = 'translateY(' + t + 'px)';
        childBox.style.webkitTransform = 'translateY(' + t + 'px)';
    }

    childBox.addEventListener('touchstart', (e) => {
        startTime = new Date().getTime();
        var event = e || window.event;
        startY = event.touches[0].clientY;
    }, false);

    childBox.addEventListener('touchmove', (e) => {
        var event = e || window.event;
        event.preventDefault();
        endY = event.touches[0].clientY;
        moveY = endY - startY;
        // 上下滑动的范围
        if ((currentY - moveY) < upDownOffset && (currentY - moveY) > (parentHeight - childHeight - upDownOffset)) {
            removeTransition();
            setTransform(currentY - moveY);
        }
    }, false);

    childBox.addEventListener('touchend', (e) => {
        endTime = new Date().getTime();
        var event = e || window.event;
        // 满足上面吸附条件
        if ((currentY - moveY) >= 0) {
            addTransition();
            removeTransition();
            setTransform(0);
            currentY = 0;
            // 满足下面吸附条件
        } else if ((currentY - moveY) <= (parentHeight - childHeight)) {
            addTransition();
            removeTransition();
            setTransform(parentHeight - childHeight);
            currentY = parentHeight - childHeight;
        } else {
            currentY = currentY - moveY;
        }
        // 就认为是点击
        if (endTime - startTime < 150 && moveY == 0) {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = "";
                lis[i].index = i;
            }
            var li = e.target.parentNode;
            li.className = "now";
            // 移动的距离
            var translateY = li.index * 50;
            if (translateY < childHeight - parentHeight) {
                addTransition();
                setTransform(-translateY);
                currentY = -translateY;
            } else {
                addTransition();
                setTransform(parentHeight - childHeight);
                currentY = parentHeight - childHeight;
            }
        }
    }, false);
}

module.exports = {
    myMoveScroll
}
function bindEvent() {
    var sea = this.$refs.my_search;
    var banner = this.$refs.my_banner;
    var height = banner.offsetHeight;
    window.onscroll = () => {
        var top = document.body.scroll;
        if (top > height) {
            sea.style.background = "rgba(201, 21, 35, 0.85)";
        } else {
            var op = top / height * 0.85;
            sea.style.background = "rgba(201, 21, 35, " + op + ")";
        }
    }
}

function scrollPic() {
    var imgBox = this.$refs.banner_box[0];
    var width = this.$refs.my_banner.offsetWidth;
    var pointBox = this.$refs.point_box[0];
    var ols = pointBox.children;
    var indexx = 1;
    var timer =null;
    var moveX = 0;
    var endX = 0;
    var startX = 0;
    var square = 0;

    function addTransition() {
        imgBox.style.transition = "all .3s ease 0s";
        imgBox.style.webkitTransition = "all .3s ease 0s";
    }

    function removeTransition() {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    }

    function setTransform(t) {
        imgBox.style.transform = 'translateX(' + t + 'px)';
        imgBox.style.webkitTransform = 'translateX(' + t + 'px)';
    }

    // 开始动画部分
    pointBox.children[0].className = "now";
    for (var i = 0; i < ols.length; i++) {
        ols[i].index = i;
        ols[i].onmouseover = () => {
            for (var j = 0; j < ols.length; j++) {
                ols[j].className = "";
            }
            this.className = "now";
            setTransform(-indexx * width);
            square = indexx; // 当前的索引号为主
        }
    }
    timer = setInterval(() => {
        indexx++;
        addTransition();
        setTransform(-indexx * width);
        square++;
        if (square > ols.length - 1) {
            square = 0;
        }
        for (var i = 0; i < ols.length; i++) {
            ols[i].className = "";
        }
        ols[square].className = "now";
    },3000);

    imgBox.addEventListener('transitionEnd', () => {
        if (indexx >= 9) {
            indexx = 1;
        } else if (indexx <= 0) {
            indexx = 8;
        }
        removeTransition();
        setTransform(-indexx * width);
    }, false);
    imgBox.addEventListener('webkitTransitionEnd', () => {
        if (indexx >= 9) {
            indexx = 1;
        } else if (indexx <= 0) {
            indexx = 8;
        }
        removeTransition();
        setTransform(-indexx * width);
    }, false);

    // 触摸事件开始
    imgBox.addEventListener('touchstart', (e) => {
        var event = e || window.event;
        // 记录开始滑动的位置
        startX = event.touches[0].clientX;
    }, false);

    // 触摸滑动事件
    imgBox.addEventListener('touchmove', (e) => {
        var event = e || window.event;
        event.preventDefault();
        // 清除定时器
        clearInterval(timer);
        // 记录结束位置
        endX = event.touches[0].clientX;
        // 记录移动的位置
        moveX = startX - endX;
        removeTransition();
        setTransform(-indexx * width - moveX);
    }, false);

    // 触摸事件结束
    imgBox.addEventListener('touchend', () => {
        // 如果移动的位置大于三分之一，且是移动过的
        if (Math.abs(moveX) > (1 / 3 * width) && endX != 0) {
            // 向左
            if (moveX > 0) {
                indexx++;
            } else {
                indexx--;
            }
            // 改变位置
            setTransform(-indexx * width);
        }
        // 回到原来的位置
        addTransition();
        setTransform(-indexx * width);
        // 初始化
        startX = endX = 0;

        clearInterval(timer);
        timer = setInterval(() => {
            indexx++;
            square++;
            if (square > ols.length - 1) {
                square = 0;
            }
            for (var i = 0; i < ols.length; i++) {
                ols[i].className = "";
            }
            ols[square].className = "now";
            addTransition();
            setTransform(-indexx * width);
        },3000);
    }, false);
}

module.exports = {
    bindEvent,
    scrollPic
}
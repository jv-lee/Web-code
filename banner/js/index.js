window.onload = function() {

    initBanner();

};


//初始化banner图
var initBanner = function() {
    var backgroundArray = ['./img/bg1.jpg', './img/bg2.jpg', './img/bg3.jpg'];
    var menuArray = ['手机、配件', '电脑', '家用电器', '家具'];
    var index = 0; //当前banner图坐标 

    var prev = document.getElementById('prev');
    var next = document.getElementById('next');

    //创建banner图
    var banner = document.getElementById('banner');
    var bannerDots = document.getElementById('dots');
    for (var i = 0; i < backgroundArray.length; i++) {
        var div = document.createElement('div');
        div.className = 'banner-slide';
        div.style.backgroundImage = "url(" + backgroundArray[i] + ")";
        div.style.zIndex = backgroundArray.length - i;
        if (i == 0) {
            div.style.opacity = 1;
        } else {
            div.style.opacity = 0;
        }
        banner.appendChild(div);
        var span = document.createElement('span');
        span.setAttribute('index', i);
        bannerDots.appendChild(span);
        div.addEventListener('click', function() {
            alert(index);
        });
    }

    //设置banner动画滚动
    var banners = document.getElementsByClassName('banner-slide');
    var dots = bannerDots.getElementsByTagName('span');
    eventDots(dots, index);
    var len = banners.length - 1;
    var bannerIntervalId = setInterval(function() {
        if (index < len) {
            banners[index].className = 'banner-slide banner-start';
            banners[index + 1].className = 'banner-slide banner-end';
            eventDots(dots, index + 1);
            index++;
        } else {
            banners[index].className = 'banner-slide banner-start';
            index = 0;
            banners[index].className = 'banner-slide banner-end';
            eventDots(dots, index);
        }
    }, 5000);

    //设置导航小圆标 点击导航事件
    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener('click', function(event) {
            clearInterval(bannerIntervalId);
            eventBanner(banners, index, event.target.getAttribute('index'));
            index = event.target.getAttribute('index');
            eventDots(dots, index);
        });
    }

    //设置左右button
    prev.addEventListener('click', function() {
        clearInterval(bannerIntervalId);
        if (index == 0) {
            eventBanner(banners, index, banners.length - 1);
            index = banners.length - 1;
        } else {
            eventBanner(banners, index, --index);
        }
        eventDots(dots, index);
    });
    next.addEventListener('click', function() {
        clearInterval(bannerIntervalId);
        if (index < len) {
            eventBanner(banners, index, ++index);
        } else {
            eventBanner(banners, index, 0);
            index = 0;
        }
        eventDots(dots, index);
    });

};

var eventBanner = function(banners, index, position) {
    if (index == position) {
        return;
    }
    banners[index].className = 'banner-slide banner-start';
    banners[position].className = 'banner-slide banner-end';
};

//设置dots
var eventDots = function(dots, position) {
    for (var i = 0; i < dots.length; i++) {
        if (i == position) {
            dots[i].className = 'active';
        } else {
            dots[i].className = '';
        }
    }
}
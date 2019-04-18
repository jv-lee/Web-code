window.onload = function(){

	var main = document.getElementById('main'),
        tabs = document.getElementById('tab-container').getElementsByTagName('span'),
        banners = document.getElementById('banner-container').getElementsByTagName('div'),
        length = banners.length,
        timer = null,
        index = 0;

    function changeBanner() {
        for (var i = 0; i < length; i++) {
            banners[i].style.display = "none";
            tabs[i].className = "";
        }
        banners[index].style.display = "block";
        tabs[index].className = "activ";
    }

    function startAutoPlay() {
        timer = setInterval(function() {
            index++;
            if (index >= length) index = 0;
            changeBanner();
        }, 3000);
    }

    function clertAutoPlay() {
        if (timer) {
            clearInterval(timer);
        }
    }

    startAutoPlay();

    main.addEventListener('mouseover', function() {
        clertAutoPlay();
    });
    main.addEventListener('mouseout', function() {
        startAutoPlay();
    });

    for (var i = 0; i < length; i++) {
        tabs[i].setAttribute('data-index', i);
        tabs[i].addEventListener('click', function() {
            index = this.getAttribute('data-index');
            changeBanner();
        });
    }

};
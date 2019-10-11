(function($){
	'use strict'

// 调用封装的下拉菜单组件
    var json = [
{
    "url":"###",
    "name":"已买到的宝贝"
},
{
    "url":"###",
    "name":"我的足迹"
},
{
    "url":"###",
    "name":"我的优惠券"
}
];
    $('.dropdown').on('dropdown-start dropdown-resume dropdown-pause dropdown-stop', function(e) {
        console.log(e.type);
        var $this = $(this);

        if (e.type == 'dropdown-start') {
            
            // if(!$this.data('loaded')){
            //     var $layer = $this.find('.dropdown-layer'),
            //     html = '';

            //     setTimeout(function(){
            //         for (var i = 0; i < json.length; i++) {
            //             html += '<li><a href="'+json[i].url +'" target="_blank" class="menu-item">'+json[i].name+'</a></li>'
            //         }
            //         $layer.html(html);
            //         $this.data('loaded',true);
            //     },1000);
            // }
        }
    });

    $('.dropdown').dropdown({
        event: 'hover',
        css3: true,
        js: true,
        delay: 200,
        animation: 'slideUpDown',
        active: 'menu'
    });


}(jQuery))


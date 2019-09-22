// $('.dropdown').hover(function() {
//     var $dropdown = $(this);

//     //改变toggle标题颜色 及边框
//     $dropdown.find('.dropdown-toggle').css({
//         'background-color': '#fff',
//         'border-color': '#cdd0d4'
//     });

//     //改变toogle 箭头方向(替换图片)
//     $dropdown.find('.dropdown-arrow').css({
//         'background-image': 'url(img/dropdown-arrow-active.png)'
//     });

//     $dropdown.find('.dropdown-layer').show();

// }, function() {
//     var $dropdown = $(this);

//     //改变toggle标题颜色 及边框
//     $dropdown.find('.dropdown-toggle').css({
//         'background-color': '',
//         'border-color': '#f3f5f7'
//     });

//     //改变toogle 箭头方向(替换图片)
//     $dropdown.find('.dropdown-arrow').css({
//         'background-image': 'url(img/dropdown-arrow.png)'
//     });

//     $dropdown.find('.dropdown-layer').hide();

// });

// $('.dropdown').hover(function() {
//     $(this).addClass('dropdown-active');
// }, function() {
//     $(this).removeClass('dropdown-active');
// });

// 调用封装的下拉菜单组件
$('.dropdown').dropdown();

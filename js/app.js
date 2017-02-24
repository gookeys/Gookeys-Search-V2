$(document).ready(function(){
    $('.menu-btn').click(function(){
        $('.menu-right').show();
    })
    $('.menu-cls').click(function(){
        $('.menu-right').hide();
    })
    $.getJSON("http://jsonip.com/?callback=?", function (data) {
        console.log(data);
        $('#ipAdrs').html(data.ip);
    });
})
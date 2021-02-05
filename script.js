var cart = {}; //הסל שלי

$('document').ready(function () {
    loadGoods();
    checkCart();
    showMiniCart();
});

function loadGoods() {
    //מתדקן את המוצרים לדף
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        var out = '';
        //out נותן שורה ריקה
        for (var key in data) {
            out += '<div class="single-goods">';
            out += '<h2>' + data[key]['name'] + '</h2>';
            out += '<p> מחיר: ' + data[key]['cost'] + '</p>';
            out += '<img src="' + data[key].image + '">';
            out += '<button class="add-to-cart" data-art="' + key + '">לקנות</button>';
            out += '</div>';
        }
        $('#goods').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });
}
function addToCart() {
    //Add product to Cart
    var articul = $(this).attr('data-art');
    if (cart[articul] != undefined) {
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    // console.log(cart);
    showMiniCart();

}

function checkCart() {
    //בדיקה של סל ב in loaclStorage
    //console.log(loaclStorage.getItem('ddddd'));    //ddddd אומר שאין  את המפתח in localStorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}
function showMiniCart() {
    //להראות מה יש בסל
    var out = '';
    for (var w in cart) {
        //out += w + ' --- ' + cart[w] + '<br />' + '<br />'
    }
    out += '<a href="cart.html"> <span> סל קניות</a>';
    $('#mini-cart').html(out);
}

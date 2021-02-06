var cart = {};

$.getJSON('goods.json', function (data) {
    var goods = data;//כל הפריטים במערכים
    // console.log(goods);
    checkCart();
    //console.log(cart);
    showCart();
    function showCart() {
        var out = '';
        if ($.isEmptyObject(cart)) {
            //סל קניות ריק
            var out = '<p id="cart">הסל קניות ריק. <br/>תוסיפו פריטים לסל קניות</p>';
            $('#my-cart').html(out);
        }
        else {

            for (var key in cart) {
                out += '<div class="shop">'
                out += '<button class="delete" data-art="' + key + '">x</button>';
                out += '<img class="pic" src="' + goods[key].image + '">';
                out += goods[key].name;
                out += '<button class="minus" data-art="' + key + '">-</button>';
                out += cart[key];
                out += '<button class="plus" data-art="' + key + '">+</button>';
                out += cart[key] * goods[key].cost;
                // out += '<br/><br/>';
                out += '</div>'
            }
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);

        }
    }

    function plusGoods() {
        var articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLs();//לשמור את הסל בלוקל סטורג
        showCart();
    }

    function minusGoods() {
        var articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;
        }

        else {
            delete cart[articul];
        };
        saveCartToLs();//לשמור את הסל בלוקל סטורג
        showCart();
    };

    function deleteGoods() {
        var articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLs();//לשמור את הסל בלוקל סטורג
        showCart();
    };

});
function checkCart() {
    //בדיקה של סל ב in loaclStorage
    //console.log(loaclStorage.getItem('ddddd'));    //ddddd אומר שאין  את המפתח in localStorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    };
};

function saveCartToLs() {
    //localStorage.getItem('cart', JSON.stringify(cart));
    localStorage.setItem('cart', JSON.stringify(cart))
};
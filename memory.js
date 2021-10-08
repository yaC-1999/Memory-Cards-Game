// timer
var second = 0;
var minute = 0;
var time;
var cartList = [];
var firstCart;
var secondCart;
var bargashte = false;
var timer = document.querySelector(".timer");
var moves = document.querySelector(".moves");
var successful = document.querySelector(".success");
var cont = 1;
var success = 1;
// startTimer();
function startTimer() {
    time = setInterval(function () {
        timer.innerHTML = "Timer : " + minute + "m " + second + "s";
        second++;
        if (second == 60) {
            second = 0;
            minute++;
        }

    }, 1000);
}

//--------------------------------------------------------------------------------------------------
//random
$(function random() {
    var parent = $(".full");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
});
//--------------------------------------------------------------------------------------------------
//match carts
$(".cart").click(function clickCart() {
    moves.innerHTML = "Move(s): " + cont++;

    this.classList.toggle('show');
    if (!bargashte) {
        bargashte = true;
        firstCart = this;
        $(firstCart).off("click");
        cartList.push($(this).attr('data-check'));
        return;
    } else {
        secondCart = this;
        $(secondCart).off("click");
        cartList.push($(this).attr('data-check'));
        bargashte = false;
        if (cartList[0] === cartList[1]) {
            successful.innerHTML = "Successful : " + success++;
            firstCart.classList.toggle('dorost');
            secondCart.classList.toggle('dorost');
            $(firstCart).off("click");
            $(secondCart).off("click");
            cartList = [];
            if (success === 10) {
                console.log('win');
                $("#win-text").text('You wins!');
                $("#win").addClass("temp");
            } else {
                console.log('hi');
            }
            return;
        }
        firstCart.classList.toggle('eshtebah');
        secondCart.classList.toggle('eshtebah');

        setTimeout(() => {
            $(firstCart).on("click", clickCart);
            $(secondCart).on("click", clickCart);
            firstCart.classList.remove('show', 'eshtebah');
            secondCart.classList.remove('show', 'eshtebah');
        }, 700);
        cartList = [];

    }
});
//--------------------------------------------------------------------------------------
// login



$(".login").click(function () {
var username = $(".username").val();
var password = $(".password").val();
var option = {
    url: 'https://demo.ali-chv.com/api/login',
    method: 'POST',
    headers: {
        "Accept": "application/json",
        "Authorization": "application/json"
    },
    data: {
        "email": username,
        "password": password
    }
}
axios.request(option).then(function (res) {
   if (res.data.data.token) {
       $("#myModal").hide();
       $("#myModal").modal('hide');
       startTimer();
   }else{
       $(".textError").text('email or password not right');
   }
})
.catch(function (error) {
    $(".textError").text('please login later');
})
//     success : function (res) {
//         console.log($.trim(res.token));
//     },
//     error: function (textStatus, errorThrown) {
//         console.log("false");
//     }
});


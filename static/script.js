$(document).ready(function () {
    rateInfo()
    readOrder()
    $('#orders_table').empty();
});

function rateInfo() {
    $.ajax({
        type: 'GET',
        url: 'https://api.manana.kr/exchange/rate.json',
        data: {},
        success: function (response) {
            for (let i = 0; i < response.length; i++) {
                if (response[i]['name'] == "USDKRW=X") {
                    $('#rate').text(response[i]['rate']);
                    return;
                }
            }
        }
    })
}


function order() {
    let name = $('#name_input').val();
    let count = $('#count').val();
    let addr = $('#addr_input').val();
    let tel = $('#tel_input').val();

    if (name == '') {
        alert('이름을 적어 주세요!');
        $('#name_input').focus();
        return;
    } else if (count == 'index') {
        alert('수량을 골라 주세요!');
        $('#count').focus();
        return;
    } else if (addr == '') {
        alert('주소를 적어 주세요!');
        $('#addr_input').focus();
        return
    } else if (tel == '') {
        alert('연락처를 적어주세요!');
        $('#tel_input').focus();
        return;
    } else if (!checkPhone(tel)) {
        alert('전화번호를 형식에 맞게 적어주세요!');
        $('#tel_input').val("")
        $('#tel_input').focus();
        return
    }
    console.log(name, count, addr, tel);

    $.ajax({
        type: 'POST',
        url: '/order',
        data: {name_give: name, count_give: count, addr_give: addr, tel_give: tel},
        success: function (response) {
            if (response['result'] == 'success') {
                alert(response['msg'])
                window.location.reload()
            }
        }
    })

}

function readOrder() {
    $.ajax({
        type: 'GET',
        url: '/order',
        data: {},
        success: function (response) {
            if (response['result'] == 'success') {
                let orders = response['orders']
                for (let i = 0; i < orders.length; i++) {
                    makeTable(orders[i]['name'], orders[i]['count'], orders[i]['addr'], orders[i]['tel'])
                }
            }
        }
    })
}

function makeTable(name, count, addr, tel) {
    let tempHTML = `<tr>
                      <td>${name}</td>
                      <td>${count}</td>
                      <td>${addr}</td>
                      <td>${tel}</td>
                    </tr>`
    $('#orders_table').append(tempHTML)
}

function empty_input() {
    $('#name_input').val("")
    $('#count').val("index")
    $('#addr_input').val("")
    $('#tel_input').val("")
}

function checkPhone(tel) {
    let regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    return regExp.test(tel)

}
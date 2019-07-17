$(document).ready(function () {
  $("#hello_text").html("はじめてのjavascript")

  let count = 0
  setInterval(function() {
    count++
    $("#hello_text").html("はじめてのjavascript(" + count + ")")

    let cells = []
    let td_array = $("td").get()
    let index = 0
    const ROW = 20, COL = 10

    // 20行×10列の2次元配列へ変換する (numpyでいうところのreshapeを自力で実装)
    for (let row = 0; row < ROW; row++) {
      cells[row] = []
      for (let col = 0; col < COL; col++) {
        cells[row][col] = td_array[index]
        index++
      }
    }

    // 底についていないか確認
    for (let col = 0; col < COL; col++) {
      // 一番下の行を全削除
      $(cells[ROW - 1][col]).removeClass()
    }

    // 1行ずつ落下処理
    for (let row = ROW - 2; row >= 0; row--) {
      for (let col = 0; col < COL; col++) {
        if ($(cells[row][col]).attr('class')) {
          $(cells[row + 1][col]).addClass($(cells[row][col]).attr('class'))
          $(cells[row][col]).removeClass()
        }
      }
    }

  }, 1000)
})
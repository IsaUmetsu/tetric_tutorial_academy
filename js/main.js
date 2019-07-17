$(document).ready(function () {
  $("#hello_text").html("はじめてのjavascript")

  const ROW = 20, COL = 10

  let count = 0
  let cells = []

  let blocks = {
    i: { class: "i", pattern: [[1, 1, 1, 1]] },
    o: { class: "o", pattern: [[1, 1], [1, 1]] },
    t: { class: "t", pattern: [[0, 1, 0], [1, 1, 1]] },
    s: { class: "s", pattern: [[0, 1, 1], [1, 1, 0]] },
    z: { class: "z", pattern: [[1, 1, 0], [0, 1, 1]] },
    j: { class: "j", pattern: [[1, 0, 0], [1, 1, 1]] },
    l: { class: "j", pattern: [[0, 0, 1], [1, 1, 1]] },
  }

  loadTable()
  setInterval(function() {
    count++
    $("#hello_text").html("はじめてのjavascript(" + count + ")")

    // 落下中のブロック確認
    if (hasFallingBlock()) {
      fallBlocks() // 落下継続
    } else {
      deleteRow()     // 行がそろっていれば消す
      generateBlock() // ランダムでブロック生成
    }
  }, 1000)

  /**
   * 1×200 の配列を 20×10に変換
   */
  function loadTable() {
    let td_array = $("td").get()
    let index = 0
    
    // 20行×10列の2次元配列へ変換する (numpyでいうところのreshapeを自力で実装)
    for (let row = 0; row < ROW; row++) {
      cells[row] = []
      for (let col = 0; col < COL; col++) {
        cells[row][col] = td_array[index]
        index++
      }
    }
  }

  /**
   * ブロック落下
   */
  function fallBlocks() {
    // 底についていないか確認
    for (let col = 0; col < COL; col++) {
      // 一番下にブロックがある場合、これ以上落とさない
      if ($(cells[ROW - 1][col]).attr("class")) {
        isFalling = false
        return
      }
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
  }

  let isFalling = true
  /**
   * 落下中のブロック有無判定
   */
  function hasFallingBlock() {
    return isFalling
  }

  /**
   * ランダムにブロック生成
   */
  function generateBlock() {
    // ブロックパターンから1つ選出
    let nextBlock = decideNextBlock()

    let nextBlockPattern = nextBlock.pattern
    
    // ブロック配置（左から4番目のセルへ）
    for (let row = 0; row < nextBlockPattern.length; row++) {
      for (let col = 0; col < nextBlockPattern[row].length; col++) {
        if(nextBlockPattern[row][col]) {
          $(cells[row][col + 3]).addClass(nextBlock.class)
        }
      }
    }
    // 落下中ブロックフラグをtrue
    isFalling = true
  }

  /**
   * ランダムブロック選出
   */
  function decideNextBlock() {
    let keys = Object.keys(blocks)
    let nextBlockKey = keys[Math.floor(Math.random() * keys.length)]
    return blocks[nextBlockKey]
  }

  /**
   * ブロックを右に移動
   */
  function moveRight() {
    // 
  }

  /**
   * ブロックを左に移動
   */
  function moveLeft() {
    // 
  }

  /**
   * 行削除実行
   */
  function deleteRow() {
    // 
  }
})

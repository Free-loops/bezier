(function (w) {
  /* 
    @bezierCtrlNodesArr 控制点坐标数组 [[], []] || [{x: x}, {y: y}]
    @num 生成的贝塞尔点的个数
    @bezierArr 贝塞尔曲线上所有的坐标点
    @t 系数 值为0-1
  */
  w.Bezier = function (bezierCtrlNodesArr, num) {
    this.bezierCtrlNodesArr = bezierCtrlNodesArr ? bezierCtrlNodesArr : []
    this.bezierArr = []
    this.num = num || 1000
    this.create()
  }
  Bezier.prototype.create = function () {
    for (let i = 0; i < this.num; i++) {
      this.bezierArr.push(this.bezier(i/this.num))
    }
  }
  Bezier.prototype.bezier = function (t) { //贝塞尔公式调用
    var x = 0,
    y = 0,
    bezierCtrlNodesArr = this.bezierCtrlNodesArr,
    n = bezierCtrlNodesArr.length - 1,
    self = this

    bezierCtrlNodesArr.forEach(function(item, index) {
      let px, py
      if (item instanceof Array) {
        px = item[0]
        py = item[1]
      } else {
        px = item.x
        py = item.y
      }
      if(!index) {
        x += px * Math.pow(( 1 - t ), n - index) * Math.pow(t, index)
        y += py * Math.pow(( 1 - t ), n - index) * Math.pow(t, index)
      } else {
        x += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * px * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
        y += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * py * Math.pow(( 1 - t ), n - index) * Math.pow(t, index) 
      }
    })
    return [x, y]
  }
  Bezier.prototype.factorial = function(num) { //递归阶乘
    if (num <= 1) {
      return 1;
    } else {
      return num * this.factorial(num - 1);
    }
  }
})(window)
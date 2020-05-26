const domOperate = {
  init: function () {
    /* 判断是否移动端 */
    this.setStylePath()
    /* 年龄 */
    document.getElementById('age').innerText = this.methods.getMyAge()
  },
  setStylePath: function () {
    if (this.methods.isMobile()) {
      var links = document.getElementsByTagName('link')
      var newElem = document.createElement('link')
      newElem.rel = 'stylesheet'
      newElem.href = '../styles/mobile.css' + '?t=' + new Date().getTime()
      paCss = Array.from(links).find(elem => {
        var href = elem.href || ''
        return href.search('main.css') > -1
      })
      this.methods.insertAfter(newElem, paCss)
    }
  },
  methods: {
    /* 年龄 */
    getMyAge: function () {
      var myDate = new Date();
      var age = myDate.getFullYear() - 1993;
      return age
    },
    /* 是否移动端 */
    isMobile: function () {
      var flag = false
      var userAgentInfo = navigator.userAgent
      var mobileType = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod'
      ]
      for (var i = 0; i < mobileType.length; i++) {
        if (userAgentInfo.match(mobileType[i])) {
          flag = true
          break
        }
      }
      return flag
    },
    /* 元素后插入新元素 */
    insertAfter: function (newElem, targetElem) {
      var parent = targetElem.parentNode;
      if (parent.lastChild === targetElem) {
        parent.appendChild(newElem);
      } else {
        parent.insertBefore(newElem, targetElem.nextSibling);
      }
    },
    /* 显示URL */
    showURL: function () {
      var list = document.getElementsByClassName('myproject')
      Array.from(list).map(item => {
        var href = item.href
        item.innerText += `: ${href}`
        return item
      })
    }
  }
}
domOperate.init();
// domOperate.methods.showURL();

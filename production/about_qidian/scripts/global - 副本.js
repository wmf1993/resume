// onload handler to bind multiple directives
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

// Adapt to browser width
// change_1: 统一共同部分的CSS，浏览器宽度应用相应的CSS(-big/-small)
function browserChange() {
  var width = window.innerWidth;
  var links = document.getElementsByTagName('link');
  if (width < 1200) {
    for (var i=0; i<links.length; i++) {
      var cssHref = links[i].href;
      if (/(.*)(main-big.css)/ig.test(cssHref) == true) {
        links[i].href = cssHref.replace(/(.*)(main-big.css)/ig, '$1'+'main-small.css');
      }
    }
  } else {
    for (var i=0; i<links.length; i++) {
      var cssHref = links[i].href;
      if (/(.*)(main-small.css)/ig.test(cssHref) == true) {
        links[i].href = cssHref.replace(/(.*)(main-small.css)/ig, '$1'+'main-big.css');
      }
    }
  }
}
window.onresize = browserChange;

// advertisement
// close element & change element's color
function closeClick() {
  var eles = document.getElementsByClassName('close');
  for (var i=0;i<eles.length;i++) {
    eles[i].onclick = function(){
      var ads = document.getElementsByClassName('ad');
      for (var i=0; i<ads.length; i++) {
        ads[i].style.display = 'none';
      }
    }
    eles[i].onmouseover = function(){
      var that = this;
      var childs = that.childNodes;
      for (var i=0; i<childs.length; i++) {
        if (childs[i].nodeType == 1) {
          childs[i].style.color = '#e7081a';
        }
      }        
    }
    eles[i].onmouseout = function(){
      var that = this;
      var childs = that.childNodes;
      for (var i=0; i<childs.length; i++) {
        if (childs[i].nodeType == 1) {
          childs[i].style.color = '';
        }
      }        
    }
  }
}
addLoadEvent(closeClick);

// button of 'search', add an action to change color if mouse over it
function changeColor () {
  var searchEle = document.getElementById('search-button');
  searchEle.onmouseover = function() {
    searchEle.style.backgroundColor = '#ed4259';
  }
  searchEle.onmouseout = function() {
    searchEle.style.backgroundColor = '';
  }
}
addLoadEvent(changeColor);

//  onmouse Event change color, game
function changeGameColor() {
  var eles = document.getElementsByClassName('game-hover');
  for (var i=0; i<eles.length; i++) {
    eles[i].onmouseover = function() {
      var that = this;
      var icons = that.childNodes;
      for (var j=0; j<icons.length; j++) {
        if (icons[j].nodeType == 1) {
          that.style.color = '#ffeea8';
          icons[j].style.color = '#ffeea8';
          that.nextElementSibling.style.display='block';
          that.nextElementSibling.style.backgroundColor='#aaff88';
          that.nextElementSibling.style.color='#6060ff';
        }
      }
      that.nextElementSibling.onmouseover = function() {
          this.style.display='block';
      }
    }
    eles[i].onmouseout = function() {
      var that = this;
      var icons = that.childNodes;
      for (var j=0; j<icons.length; j++) {
        if (icons[j].nodeType == 1) {
          that.style.color = '';
          icons[j].style.color = '';
          that.nextElementSibling.style.display='none';
        }
      }
      that.nextElementSibling.onmouseout = function() {
        this.style.display='none';
      }
    }
  }
}
addLoadEvent(changeGameColor);

/*  === carousel === */
function moveElement(elemID, move_x, interval) { /*元素ID以及X移动距离 */
  var elem = document.getElementById(elemID);
  elem.style.transitionProperty = 'transform';
  elem.style.transitionDuration = '300ms';
  elem.style.transitionTimingFunction = 'linear';
  var moveX = 'translateX(' + move_x + '%)';
  elem.style.transform = moveX;
  var repeat = "moveElement('" + elemID +"'," + interval + ")"
  //elem.movement = setTimeout(repeat, interval);
}
function click() {
  var clickChilds = document.getElementsByClassName('click')[0].childNodes;
  for (var i=0; i<clickChilds.length; i++) {
    if (clickChilds[i].nodeType == 1) {
      clickChilds[i].onclick = function() {
        var elemID = this.href.replace(/.*#(.*)/g,'$1')
        moveElement(elemID, 0, 300);
        if (elemID == 'item5') {
          nextElemID = 'item1';
          moveElement(nextElemID, -100, 300);
        }
        if (elemID == 'item1') {
          fontElemID = 'item5';
          moveElement(fontElemID,  100, 300);
        }
        var nextElemID = this.nextElementSibling.href.replace(/.*#(.*)/g,'$1');
        moveElement(nextElemID, -100, 300);
        var fontElemID = this.previousElementSibling.href.replace(/.*#(.*)/g,'$1');
        moveElement(fontElemID, 100, 300);
      }
    }
  }
}
addLoadEvent(click);
//carousel('item1', '-100%', 300ms)
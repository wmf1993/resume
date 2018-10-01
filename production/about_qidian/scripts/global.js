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
function moveElement(elemID, derection, move_x) { /*元素ID以及X移动方向及距离 */
  var elem = document.getElementById(elemID);
  elem.style.display = 'list-item';
  elem.style.transitionProperty = 'transform';
  elem.style.transitionDuration = '300ms';
  elem.style.transitionTimingFunction = 'linear';
  var moveX = 'translateX(' + derection*move_x + '%)';
  elem.style.transform = moveX;
}

function clickImg() {
  var clickChilds = document.getElementsByClassName('click')[0].childNodes;
  var childsArray=new Array();
  var that;
  /* -- 对于两边的button，循环调用函数,直至左边或右边兄弟img都挪开 --*/
  function movePrevious(elem){
    if (!elem.previousElementSibling) return;
    previousElemID = elem.previousElementSibling.href.replace(/.*#(.*)/g,'$1');
    moveElement(previousElemID, 1, 100);
    movePrevious(elem.previousElementSibling);
  }
  function moveNext(elem) {
    if (!elem.nextElementSibling) return;
      nextElemID = elem.nextElementSibling.href.replace(/.*#(.*)/g,'$1');
      moveElement(nextElemID, -1, 100);
      moveNext(elem.nextElementSibling);
  }
  /* -- get the elements name of 'a' and convert to Array -- */
  for (var i=0; i<clickChilds.length; i++) {
    if (!clickChilds[i].nodeType == 1) continue;
    if (!clickChilds[i].href) continue;
    childsArray.push(clickChilds[i]);
  }
  
  /* -- automove -- */
  for (var i=0; i<childsArray.length; i++) {
    childsArray[i].onclick = function(e) {
      that = this;
      var attribute = 'cycle-button';
      for (var j=0; j<childsArray.length; j++) {
        childsArray[j].setAttribute('class', attribute);
      }
      attribute += ' active';
      that.setAttribute('class', attribute);
      
      var elemID = that.href.replace(/.*#(.*)/g,'$1');
      var previousElemID;
      var nextElemID;
      moveElement(elemID, -1, 0);
      
      for (var j=0; j<childsArray.length; j++) {
        if (childsArray[j].clickTimer) clearTimeout(childsArray[j].clickTimer);
      }
      if (!that.nextElementSibling) {
        previousElemID = that.previousElementSibling.href.replace(/.*#(.*)/g,'$1');
        moveElement(previousElemID, -1, 100);
        nextElemID = childsArray[0].href.replace(/.*#(.*)/g,'$1');
        moveElement(nextElemID, 1, 100);
        movePrevious(that);
      }
      if (!that.previousElementSibling) {
        nextElemID = that.nextElementSibling.href.replace(/.*#(.*)/g,'$1');
        moveElement(nextElemID, -1, 100);
        previousElemID = childsArray[childsArray.length-1].href.replace(/.*#(.*)/g, '$1');
        moveElement(previousElemID, -1, 100);
        moveNext(that);
      }
      if (that.nextElementSibling && that.previousElementSibling) {
        movePrevious(that);
        moveNext(that);
      }
      if (!e.clientX == 0) {
        return false;
      } else {
        that.clickTimer = setTimeout(function(){
          if(!that.nextElementSibling) {
            childsArray[0].click();
          } else {
            that.nextElementSibling.click();
          }
        }, 3000);
      return false; 
      }
    }
  }
  
  childsArray[0].click();
  
  /* -- addEventListener judge whether click or mouse over or out --*/
  for (var i=0; i<childsArray.length; i++) {
    childsArray[i].onmouseenter = function(){
      for (var j=0; j<childsArray.length; j++) {
        if (childsArray[j].clickTimer) clearTimeout(childsArray[j].clickTimer);
        if (childsArray[j].resetTimer) clearTimeout(childsArray[j].resetTimer);
      }
    }
    childsArray[i].onmouseleave = function(){
      clearTimeout(that.clickTimer);
      that.clickTimer = setTimeout(function(){  //clickTimer for mouseout
        if(!that.nextElementSibling) {
          childsArray[0].click();
        } else {
          that.nextElementSibling.click();
        }
      }, 3000);
    }
  }
}
addLoadEvent(clickImg);
//carousel('item1', '-100%', 300ms)
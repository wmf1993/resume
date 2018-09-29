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
function moveElement(elemID, move_x) { /*元素ID以及X移动距离 */
  var elem = document.getElementById(elemID);
  
  elem.style.transitionProperty = 'transform';
  elem.style.transitionDuration = '300ms';
  elem.style.transitionTimingFunction = 'linear';
  var moveX = 'translateX(' + move_x + '%)';
  elem.style.transform = moveX;
}

function clickImg() {
  var clickChilds = document.getElementsByClassName('click')[0].childNodes;
  var childsArray=new Array();
  /* -- 对于两边的button，循环调用函数,直至左边或右边兄弟img都挪开 --*/
  function movePrevious(elem){
    if (!elem.previousElementSibling) return;
    fontElemID = elem.previousElementSibling.href.replace(/.*#(.*)/g,'$1');
    moveElement(fontElemID, -100);
    movePrevious(elem.previousElementSibling);
  }
  function moveNext(elem) {
    if (!elem.nextElementSibling) return;
      nextElemID = elem.nextElementSibling.href.replace(/.*#(.*)/g,'$1');
      moveElement(nextElemID, 100);
      moveNext(elem.nextElementSibling);
  }
  
  for (var i=0; i<clickChilds.length; i++) {
    if (clickChilds[i].nodeType == 1) {
      childsArray.push(clickChilds[i]); // childsArray ???
      /* -- question: can't set time ==*/
 //     console.log(clickChilds[i].clicked);
  //    if (clickChilds[i].style.stranform != 'translateX(0%)') clearTimeout(clickChilds[i].clicked);
      clickChilds[i].onclick = function() {
        that = this;
        that.setAttribute('class', 'active');
        var elemID = that.href.replace(/.*#(.*)/g,'$1');
        var fontElemID;
        var nextElemID;
        moveElement(elemID, 0);
        clearTimeout(that.clickTimer);  //clear ths clickTimer;
        
        if (!that.nextElementSibling) {
          fontElemID = that.previousElementSibling.href.replace(/.*#(.*)/g,'$1');
          moveElement(fontElemID, -100);
          movePrevious(that);
        }
        if (!that.previousElementSibling) {
          nextElemID = that.nextElementSibling.href.replace(/.*#(.*)/g,'$1');
          moveElement(nextElemID, 100);
          moveNext(that);
        }
        if (that.nextElementSibling && that.previousElementSibling) {
          fontElemID = that.previousElementSibling.href.replace(/.*#(.*)/g,'$1');
          nextElemID = that.nextElementSibling.href.replace(/.*#(.*)/g,'$1');
          moveElement(fontElemID, -100);
          moveElement(nextElemID, 100);
        }
        that.clickTimer = setTimeout(function(){  //clickTimer
          if(!that.nextElementSibling) {
            clickChilds[1].click();
          } else {
            that.nextElementSibling.click();
          }
          }, 500);
       return false; 
      }
    }
  }
  /* -- addEventListener judge whether click or mouse over or out --*/
  var clickChild;
  for (var i=0; i<childsArray.length; i++) {
    childsArray[i].addEventListener('click',function(){ // click
      clickChild = this;
      if (this.clickTimer) {
        if (this.previousElementSibling) {
          clearTimeout(this.previousElementSibling.clickTimer);
        } else {
          clearTimeout(childsArray[childsArray.length-1].clickTimer);
        }
      }
    }, true);
    childsArray[i].addEventListener('mouseover', function(){ // mouseover
      for (var j=0; j<childsArray.length; j++) {
        if (!childsArray[j].clickTimer && !childsArray[j].resetTimer) continue;
        if (childsArray[j].clickTimer) clearTimeout(childsArray[j].clickTimer);
        if (childsArray[j].resetTimer) clearTimeout(childsArray[j].resetTimer);
      }
      console.log('over');
    }, false);
    childsArray[i].addEventListener('mouseout', function(){ // mouseout
      clickChild.resetTimer = setTimeout(function(){  //clickTimer for mouseout
          if(!clickChild.nextElementSibling) {
            clickChilds[1].click();
          } else {
            clickChild.nextElementSibling.click();
          }
          }, 500);;
    }, true);
  }
  clickChilds[1].click();
}
addLoadEvent(clickImg);
//carousel('item1', '-100%', 300ms)
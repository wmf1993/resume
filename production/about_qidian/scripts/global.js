// Adapt to browser width
function browserChange() {
  var width = window.innerWidth;
  var links = document.getElementsByTagName('link');
  if (width < 1200) {
    for (var i=0; i<links.length; i++) {
      var cssHref = links[i].href;
      if (/(.*)(main.css)/ig.test(cssHref) == true) {
        links[i].href = cssHref.replace(/(.*)(main.css)/ig, '$1'+'main-small.css');
      }
    }
  } else {
    for (var i=0; i<links.length; i++) {
      var cssHref = links[i].href;
      if (/(.*)(main-small.css)/ig.test(cssHref) == true) {
        links[i].href = cssHref.replace(/(.*)(main-small.css)/ig, '$1'+'main.css');
      }
    }
  }
}
window.onresize = browserChange;

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
          childs[i].style.color = '#000';
        }
      }        
    }
  }
}
window.onload = closeClick();

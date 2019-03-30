(function () {
  var isMobile = false;  // PC  
  function mobile() {
    try {
      document.createEvent('TouchEvent');
      return true;  // mobile
    }
    catch (e) {
      return false;
    }
  }
  isMobile = mobile();
  
  var links = document.getElementsByTagName('link');
  if (isMobile == true) {
    for (var i=0; i<links.length; i++) {
      var linkHref = links[i].href;
      if ((/(.*)(main.css)/ig).test(linkHref) == false) continue;
      links[i].href = linkHref.replace(/(.*)(main.css)/ig, '$1'+'mobile.css');
      var meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width';
      console.log(meta);
      links[i].parentNode.appendChild(meta);
    }
  } else {
    return;
  }
})();
(function (){
  var myDate = new Date();
  var age = myDate.getFullYear() - 1993;
  var ageText = document.getElementById('age');
  console.log(age);
  ageText.innerHTML = age;
})();
    
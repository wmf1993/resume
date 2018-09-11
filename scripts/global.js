function selectText(starIndex, stopIndex) {
  var select = this;
  var range = document.createRange();
  //range.setStart(select, 0);
  //range.setEnd(select, 0);
  range.selectNode(select);
  console.log(range);
  console.log(range.startContainer.firstChild.nodeType);
  
  var selObj = document.getSelection();
  console.log(selObj);
  console.log(selObj.baseNode);
 // selObj.modify('extend','forward','sentence'); 
  //selObj.addRange(range);
}

var email = document.getElementsByClassName('email')[0];
email.ondblclick = selectText;

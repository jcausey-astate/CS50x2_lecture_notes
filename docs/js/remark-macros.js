
remark.macros['img'] = function (altText, width) {
  var url = this;
  return '<img alt="' + altText + '" src="' + url + '" style="width: ' + width + '" />';
};

remark.macros['scale'] = remark.macros['img'];
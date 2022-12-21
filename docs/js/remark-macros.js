
remark.macros['img'] = function (altText, width) {
  var url = this;
  return '<img alt="' + altText + '" src="' + url + '" style="width: ' + width + '" />';
};
remark.macros['scale'] = remark.macros['img'];
remark.macros['width'] = remark.macros['img'];

remark.macros['height'] = function (altText, height) {
  var url = this;
  return '<img alt="' + altText + '" src="' + url + '" style="height: ' + height + '" />';
};

remark.macros['width-height'] = function (altText, width, height) {
  var url = this;
  return '<img alt="' + altText + '" src="' + url + '" style="width: ' + width + '" style="height: ' + height + '" />';
};

remark.macros['max-dim'] = function (altText, amount) {
  var url = this;
  return '<img alt="' + altText + '" src="' + url + '" style="max-width: ' + amount + '" style="height: ' + amount + '" />';
};

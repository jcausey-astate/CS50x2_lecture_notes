
remark.macros['img'] = function (altText, width) {
  var url = this;
  return '<img alt="' + altText + '" src="' + url + '" style="width: ' + width + '" />';
};

remark.macros['scale'] = remark.macros['img'];

// remark.macros['width'] = function (altText, width) {
//   var url = this;
//   return '<img alt="' + altText + '" src="' + url + '" style="width: ' + width + '" />';
// };
// remark.macros['height'] = function (altText, height) {
//   var url = this;
//   return '<img alt="' + altText + '" src="' + url + '" style="height: ' + height + '" />';
// };
// remark.macros['top'] = function (altText, top) {
//   var url = this;
//   return '<img alt="' + altText + '" src="' + url + '" style="top: ' + top + '" />';
// };

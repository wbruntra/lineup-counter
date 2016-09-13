$(document).ready(function() {

var div = $('<div id="float-count">\
<h3>Counter</h3>\
<p>5: <span id="f5" class="number-display"></span></p>\
<p>4: <span id="f4" class="number-display"></span></p>\
<p>3: <span id="f3" class="number-display"></span></p>\
<p>2: <span id="f2" class="number-display"></span></p>\
<p>1: <span id="f1" class="number-display"></span></p>\
</div>');

$('body').append(div);

function makeCount() {
  var counts = {};
  var nums = ['1','2','3','4','5'];
  for (var i=0;i<nums.length;i++) {
    counts[nums[i]] = 0;
  }

  $('img').each(function(index) {
    var url = $(this).attr('src');
    var png = url.split('/')[5];
    if (typeof(png) != 'undefined') {
      var filename = png.split('.')[0].trim();
      var len = filename.length;
      for (var i=0; i<nums.length;i++) {
        if (filename[len-1] == nums[i]) {
          if ($(this).hasClass('ng-hide')) {
            counts[nums[i]]++;
          }
        }
      }
    }
  });

  for (var i=0;i<nums.length;i++) {
    var num = nums[i];
    var $span = $('#f'+num);
    var used = counts[num]
    var info = "";
    $span.removeClass('low high perfect');
    for (var j=0; j<used; j++) {
      info = info + '&bull;'
    }
    $span.html(info);
    if (used < 3) {
      $span.addClass('low');
    }
    else if (used > 3) {
      $span.addClass('high');
    }
    else {
      $span.addClass('perfect');
    }
  }
}

$(document).on('click','img.confidence-circles',function() {
  t = setTimeout(makeCount, 175);
});

$('#float-count').click(function() {
  $('#float-count').toggleClass('docked');
});

makeCount();

$(document).on('click','a',function() {
  var url = $(this).attr('href');
  var exp = /\/user\/round\/details\/(\d+)\/(\d+)/
  if (($('#float-count').is(":visible") && url == "#") || exp.test(url)) {
    $('#float-count').show();
    t = setTimeout(makeCount, 1200);
  }
  else {
    $('#float-count').hide();
  }
});

var currentpage = window.location.pathname;
var exp = /^\/user\/round\/details\/(\d+)\/(\d+)/
if (!exp.test(currentpage)) {
  $('#float-count').hide();
}
});

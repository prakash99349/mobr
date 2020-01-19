(function($){
'use strict';
if(typeof wpcf7==='undefined'||wpcf7===null){
return;
}
wpcf7=$.extend({
cached: 0,
inputs: []
}, wpcf7);
$(function(){
wpcf7.supportHtml5=(function(){
var features={};
var input=document.createElement('input');
features.placeholder='placeholder' in input;
var inputTypes=[ 'email', 'url', 'tel', 'number', 'range', 'date' ];
$.each(inputTypes, function(index, value){
input.setAttribute('type', value);
features[ value ]=input.type!=='text';
});
return features;
})();
$('div.wpcf7 > form').each(function(){
var $form=$(this);
wpcf7.initForm($form);
if(wpcf7.cached){
wpcf7.refill($form);
}});
});
wpcf7.getId=function(form){
return parseInt($('input[name="_wpcf7"]', form).val(), 10);
};
wpcf7.initForm=function(form){
var $form=$(form);
$form.submit(function(event){
if(! wpcf7.supportHtml5.placeholder){
$('[placeholder].placeheld', $form).each(function(i, n){
$(n).val('').removeClass('placeheld');
});
}
if(typeof window.FormData==='function'){
wpcf7.submit($form);
event.preventDefault();
}});
$('.wpcf7-submit', $form).after('<span class="ajax-loader"></span>');
wpcf7.toggleSubmit($form);
$form.on('click', '.wpcf7-acceptance', function(){
wpcf7.toggleSubmit($form);
});
$('.wpcf7-exclusive-checkbox', $form).on('click', 'input:checkbox', function(){
var name=$(this).attr('name');
$form.find('input:checkbox[name="' + name + '"]').not(this).prop('checked', false);
});
$('.wpcf7-list-item.has-free-text', $form).each(function(){
var $freetext=$(':input.wpcf7-free-text', this);
var $wrap=$(this).closest('.wpcf7-form-control');
if($(':checkbox, :radio', this).is(':checked')){
$freetext.prop('disabled', false);
}else{
$freetext.prop('disabled', true);
}
$wrap.on('change', ':checkbox, :radio', function(){
var $cb=$('.has-free-text', $wrap).find(':checkbox, :radio');
if($cb.is(':checked')){
$freetext.prop('disabled', false).focus();
}else{
$freetext.prop('disabled', true);
}});
});
if(! wpcf7.supportHtml5.placeholder){
$('[placeholder]', $form).each(function(){
$(this).val($(this).attr('placeholder'));
$(this).addClass('placeheld');
$(this).focus(function(){
if($(this).hasClass('placeheld')){
$(this).val('').removeClass('placeheld');
}});
$(this).blur(function(){
if(''===$(this).val()){
$(this).val($(this).attr('placeholder'));
$(this).addClass('placeheld');
}});
});
}
if(wpcf7.jqueryUi&&! wpcf7.supportHtml5.date){
$form.find('input.wpcf7-date[type="date"]').each(function(){
$(this).datepicker({
dateFormat: 'yy-mm-dd',
minDate: new Date($(this).attr('min')),
maxDate: new Date($(this).attr('max'))
});
});
}
if(wpcf7.jqueryUi&&! wpcf7.supportHtml5.number){
$form.find('input.wpcf7-number[type="number"]').each(function(){
$(this).spinner({
min: $(this).attr('min'),
max: $(this).attr('max'),
step: $(this).attr('step')
});
});
}
$('.wpcf7-character-count', $form).each(function(){
var $count=$(this);
var name=$count.attr('data-target-name');
var down=$count.hasClass('down');
var starting=parseInt($count.attr('data-starting-value'), 10);
var maximum=parseInt($count.attr('data-maximum-value'), 10);
var minimum=parseInt($count.attr('data-minimum-value'), 10);
var updateCount=function(target){
var $target=$(target);
var length=$target.val().length;
var count=down ? starting - length:length;
$count.attr('data-current-value', count);
$count.text(count);
if(maximum&&maximum < length){
$count.addClass('too-long');
}else{
$count.removeClass('too-long');
}
if(minimum&&length < minimum){
$count.addClass('too-short');
}else{
$count.removeClass('too-short');
}};
$(':input[name="' + name + '"]', $form).each(function(){
updateCount(this);
$(this).keyup(function(){
updateCount(this);
});
});
});
$form.on('change', '.wpcf7-validates-as-url', function(){
var val=$.trim($(this).val());
if(val
&& ! val.match(/^[a-z][a-z0-9.+-]*:/i)
&& -1!==val.indexOf('.')){
val=val.replace(/^\/+/, '');
val='http://' + val;
}
$(this).val(val);
});
};
wpcf7.submit=function(form){
if(typeof window.FormData!=='function'){
return;
}
var $form=$(form);
$('.ajax-loader', $form).addClass('is-active');
wpcf7.clearResponse($form);
var formData=new FormData($form.get(0));
var detail={
id: $form.closest('div.wpcf7').attr('id'),
status: 'init',
inputs: [],
formData: formData
};
$.each($form.serializeArray(), function(i, field){
if('_wpcf7'==field.name){
detail.contactFormId=field.value;
}else if('_wpcf7_version'==field.name){
detail.pluginVersion=field.value;
}else if('_wpcf7_locale'==field.name){
detail.contactFormLocale=field.value;
}else if('_wpcf7_unit_tag'==field.name){
detail.unitTag=field.value;
}else if('_wpcf7_container_post'==field.name){
detail.containerPostId=field.value;
}else if(field.name.match(/^_wpcf7_\w+_free_text_/)){
var owner=field.name.replace(/^_wpcf7_\w+_free_text_/, '');
detail.inputs.push({
name: owner + '-free-text',
value: field.value
});
}else if(field.name.match(/^_/)){
}else{
detail.inputs.push(field);
}});
wpcf7.triggerEvent($form.closest('div.wpcf7'), 'beforesubmit', detail);
var ajaxSuccess=function(data, status, xhr, $form){
detail.id=$(data.into).attr('id');
detail.status=data.status;
detail.apiResponse=data;
var $message=$('.wpcf7-response-output', $form);
switch(data.status){
case 'validation_failed':
$.each(data.invalidFields, function(i, n){
$(n.into, $form).each(function(){
wpcf7.notValidTip(this, n.message);
$('.wpcf7-form-control', this).addClass('wpcf7-not-valid');
$('[aria-invalid]', this).attr('aria-invalid', 'true');
});
});
$message.addClass('wpcf7-validation-errors');
$form.addClass('invalid');
wpcf7.triggerEvent(data.into, 'invalid', detail);
break;
case 'acceptance_missing':
$message.addClass('wpcf7-acceptance-missing');
$form.addClass('unaccepted');
wpcf7.triggerEvent(data.into, 'unaccepted', detail);
break;
case 'spam':
$message.addClass('wpcf7-spam-blocked');
$form.addClass('spam');
wpcf7.triggerEvent(data.into, 'spam', detail);
break;
case 'aborted':
$message.addClass('wpcf7-aborted');
$form.addClass('aborted');
wpcf7.triggerEvent(data.into, 'aborted', detail);
break;
case 'mail_sent':
$message.addClass('wpcf7-mail-sent-ok');
$form.addClass('sent');
wpcf7.triggerEvent(data.into, 'mailsent', detail);
break;
case 'mail_failed':
$message.addClass('wpcf7-mail-sent-ng');
$form.addClass('failed');
wpcf7.triggerEvent(data.into, 'mailfailed', detail);
break;
default:
var customStatusClass='custom-'
+ data.status.replace(/[^0-9a-z]+/i, '-');
$message.addClass('wpcf7-' + customStatusClass);
$form.addClass(customStatusClass);
}
wpcf7.refill($form, data);
wpcf7.triggerEvent(data.into, 'submit', detail);
if('mail_sent'==data.status){
$form.each(function(){
this.reset();
});
wpcf7.toggleSubmit($form);
}
if(! wpcf7.supportHtml5.placeholder){
$form.find('[placeholder].placeheld').each(function(i, n){
$(n).val($(n).attr('placeholder'));
});
}
$message.html('').append(data.message).slideDown('fast');
$message.attr('role', 'alert');
$('.screen-reader-response', $form.closest('.wpcf7')).each(function(){
var $response=$(this);
$response.html('').attr('role', '').append(data.message);
if(data.invalidFields){
var $invalids=$('<ul></ul>');
$.each(data.invalidFields, function(i, n){
if(n.idref){
var $li=$('<li></li>').append($('<a></a>').attr('href', '#' + n.idref).append(n.message));
}else{
var $li=$('<li></li>').append(n.message);
}
$invalids.append($li);
});
$response.append($invalids);
}
$response.attr('role', 'alert').focus();
});
};
$.ajax({
type: 'POST',
url: wpcf7.apiSettings.getRoute('/contact-forms/' + wpcf7.getId($form) + '/feedback'),
data: formData,
dataType: 'json',
processData: false,
contentType: false
}).done(function(data, status, xhr){
ajaxSuccess(data, status, xhr, $form);
$('.ajax-loader', $form).removeClass('is-active');
}).fail(function(xhr, status, error){
var $e=$('<div class="ajax-error"></div>').text(error.message);
$form.after($e);
});
};
wpcf7.triggerEvent=function(target, name, detail){
var $target=$(target);
var event=new CustomEvent('wpcf7' + name, {
bubbles: true,
detail: detail
});
$target.get(0).dispatchEvent(event);
$target.trigger('wpcf7:' + name, detail);
$target.trigger(name + '.wpcf7', detail);
};
wpcf7.toggleSubmit=function(form, state){
var $form=$(form);
var $submit=$('input:submit', $form);
if(typeof state!=='undefined'){
$submit.prop('disabled', ! state);
return;
}
if($form.hasClass('wpcf7-acceptance-as-validation')){
return;
}
$submit.prop('disabled', false);
$('.wpcf7-acceptance', $form).each(function(){
var $span=$(this);
var $input=$('input:checkbox', $span);
if(! $span.hasClass('optional')){
if($span.hasClass('invert')&&$input.is(':checked')
|| ! $span.hasClass('invert')&&! $input.is(':checked')){
$submit.prop('disabled', true);
return false;
}}});
};
wpcf7.notValidTip=function(target, message){
var $target=$(target);
$('.wpcf7-not-valid-tip', $target).remove();
$('<span role="alert" class="wpcf7-not-valid-tip"></span>')
.text(message).appendTo($target);
if($target.is('.use-floating-validation-tip *')){
var fadeOut=function(target){
$(target).not(':hidden').animate({
opacity: 0
}, 'fast', function(){
$(this).css({ 'z-index': -100 });
});
};
$target.on('mouseover', '.wpcf7-not-valid-tip', function(){
fadeOut(this);
});
$target.on('focus', ':input', function(){
fadeOut($('.wpcf7-not-valid-tip', $target));
});
}};
wpcf7.refill=function(form, data){
var $form=$(form);
var refillCaptcha=function($form, items){
$.each(items, function(i, n){
$form.find(':input[name="' + i + '"]').val('');
$form.find('img.wpcf7-captcha-' + i).attr('src', n);
var match=/([0-9]+)\.(png|gif|jpeg)$/.exec(n);
$form.find('input:hidden[name="_wpcf7_captcha_challenge_' + i + '"]').attr('value', match[ 1 ]);
});
};
var refillQuiz=function($form, items){
$.each(items, function(i, n){
$form.find(':input[name="' + i + '"]').val('');
$form.find(':input[name="' + i + '"]').siblings('span.wpcf7-quiz-label').text(n[ 0 ]);
$form.find('input:hidden[name="_wpcf7_quiz_answer_' + i + '"]').attr('value', n[ 1 ]);
});
};
if(typeof data==='undefined'){
$.ajax({
type: 'GET',
url: wpcf7.apiSettings.getRoute('/contact-forms/' + wpcf7.getId($form) + '/refill'),
beforeSend: function(xhr){
var nonce=$form.find(':input[name="_wpnonce"]').val();
if(nonce){
xhr.setRequestHeader('X-WP-Nonce', nonce);
}},
dataType: 'json'
}).done(function(data, status, xhr){
if(data.captcha){
refillCaptcha($form, data.captcha);
}
if(data.quiz){
refillQuiz($form, data.quiz);
}});
}else{
if(data.captcha){
refillCaptcha($form, data.captcha);
}
if(data.quiz){
refillQuiz($form, data.quiz);
}}};
wpcf7.clearResponse=function(form){
var $form=$(form);
$form.removeClass('invalid spam sent failed');
$form.siblings('.screen-reader-response').html('').attr('role', '');
$('.wpcf7-not-valid-tip', $form).remove();
$('[aria-invalid]', $form).attr('aria-invalid', 'false');
$('.wpcf7-form-control', $form).removeClass('wpcf7-not-valid');
$('.wpcf7-response-output', $form)
.hide().empty().removeAttr('role')
.removeClass('wpcf7-mail-sent-ok wpcf7-mail-sent-ng wpcf7-validation-errors wpcf7-spam-blocked');
};
wpcf7.apiSettings.getRoute=function(path){
var url=wpcf7.apiSettings.root;
url=url.replace(wpcf7.apiSettings.namespace,
wpcf7.apiSettings.namespace + path);
return url;
};})(jQuery);
(function (){
if(typeof window.CustomEvent==="function") return false;
function CustomEvent(event, params){
params=params||{ bubbles: false, cancelable: false, detail: undefined };
var evt=document.createEvent('CustomEvent');
evt.initCustomEvent(event,
params.bubbles, params.cancelable, params.detail);
return evt;
}
CustomEvent.prototype=window.Event.prototype;
window.CustomEvent=CustomEvent;
})();
!function(a){a.fn.hoverIntent=function(b,c,d){var e={interval:100,sensitivity:6,timeout:0};e="object"==typeof b?a.extend(e,b):a.isFunction(c)?a.extend(e,{over:b,out:c,selector:d}):a.extend(e,{over:b,out:b,selector:c});var f,g,h,i,j=function(a){f=a.pageX,g=a.pageY},k=function(b,c){return c.hoverIntent_t=clearTimeout(c.hoverIntent_t),Math.sqrt((h-f)*(h-f)+(i-g)*(i-g))<e.sensitivity?(a(c).off("mousemove.hoverIntent",j),c.hoverIntent_s=!0,e.over.apply(c,[b])):(h=f,i=g,c.hoverIntent_t=setTimeout(function(){k(b,c)},e.interval),void 0)},l=function(a,b){return b.hoverIntent_t=clearTimeout(b.hoverIntent_t),b.hoverIntent_s=!1,e.out.apply(b,[a])},m=function(b){var c=a.extend({},b),d=this;d.hoverIntent_t&&(d.hoverIntent_t=clearTimeout(d.hoverIntent_t)),"mouseenter"===b.type?(h=c.pageX,i=c.pageY,a(d).on("mousemove.hoverIntent",j),d.hoverIntent_s||(d.hoverIntent_t=setTimeout(function(){k(c,d)},e.interval))):(a(d).off("mousemove.hoverIntent",j),d.hoverIntent_s&&(d.hoverIntent_t=setTimeout(function(){l(c,d)},e.timeout)))};return this.on({"mouseenter.hoverIntent":m,"mouseleave.hoverIntent":m},e.selector)}}(jQuery);
(function($){
"use strict";
$.maxmegamenu=function(menu, options){
var plugin=this;
var $menu=$(menu);
var defaults={
event: $menu.attr("data-event"),
effect: $menu.attr("data-effect"),
effect_speed: parseInt($menu.attr("data-effect-speed")),
effect_mobile: $menu.attr("data-effect-mobile"),
effect_speed_mobile: parseInt($menu.attr("data-effect-speed-mobile")),
panel_width: $menu.attr("data-panel-width"),
panel_inner_width: $menu.attr("data-panel-inner-width"),
second_click: $menu.attr("data-second-click"),
vertical_behaviour: $menu.attr("data-vertical-behaviour"),
document_click: $menu.attr("data-document-click"),
breakpoint: $menu.attr("data-breakpoint"),
unbind_events: $menu.attr("data-unbind")
};
plugin.settings={};
var items_with_submenus=$("li.mega-menu-megamenu.mega-menu-item-has-children," +
"li.mega-menu-flyout.mega-menu-item-has-children," +
"li.mega-menu-tabbed > ul.mega-sub-menu > li.mega-menu-item-has-children," +
"li.mega-menu-flyout li.mega-menu-item-has-children", menu);
plugin.hidePanel=function(anchor, immediate){
anchor.parent().triggerHandler("before_close_panel");
if((!immediate&&plugin.settings.effect=='slide')||(plugin.isMobileView()&&plugin.settings.effect_mobile=='slide')){
var speed=plugin.isMobileView() ? plugin.settings.effect_speed_mobile:plugin.settings.effect_speed;
anchor.siblings(".mega-sub-menu").animate({'height':'hide', 'paddingTop':'hide', 'paddingBottom':'hide', 'minHeight':'hide'}, speed, function(){
anchor.siblings(".mega-sub-menu").css("display", "");
anchor.parent().removeClass("mega-toggle-on").triggerHandler("close_panel");
});
return;
}
if(immediate){
anchor.siblings(".mega-sub-menu").css("display", "none").delay(plugin.settings.effect_speed).queue(function(){
$(this).css("display", "").dequeue();
});
}
anchor.siblings(".mega-sub-menu").find('.widget_media_video video').each(function(){
this.player.pause();
});
anchor.parent().removeClass("mega-toggle-on").triggerHandler("close_panel");
plugin.addAnimatingClass(anchor.parent());
};
plugin.addAnimatingClass=function(element){
if(plugin.settings.effect==="disabled"){
return;
}
$(".mega-animating").removeClass("mega-animating");
var timeout=plugin.settings.effect_speed + parseInt(megamenu.timeout, 10);
element.addClass("mega-animating");
setTimeout(function(){
element.removeClass("mega-animating");
}, timeout);
};
plugin.hideAllPanels=function(){
$(".mega-toggle-on > a.mega-menu-link", $menu).each(function(){
plugin.hidePanel($(this), false);
});
};
plugin.hideSiblingPanels=function(anchor, immediate){
anchor.parent().parent().find(".mega-toggle-on").children("a.mega-menu-link").each(function(){
plugin.hidePanel($(this), immediate);
});
};
plugin.isDesktopView=function(){
return Math.max(window.outerWidth, $(window).width()) > plugin.settings.breakpoint;
};
plugin.isMobileView=function(){
return !plugin.isDesktopView();
};
plugin.showPanel=function(anchor){
anchor.parent().triggerHandler("before_open_panel");
$(".mega-animating").removeClass("mega-animating");
if(plugin.isMobileView()&&anchor.parent().hasClass("mega-hide-sub-menu-on-mobile")){
return;
}
if(plugin.isDesktopView()&&($menu.hasClass("mega-menu-horizontal")||$menu.hasClass("mega-menu-vertical"))){
plugin.hideSiblingPanels(anchor, true);
}
if((plugin.isMobileView()&&$menu.hasClass("mega-keyboard-navigation"))||plugin.settings.vertical_behaviour==="accordion"){
plugin.hideSiblingPanels(anchor, false);
}
plugin.calculateDynamicSubmenuWidths(anchor);
if(plugin.settings.effect=="slide"||plugin.isMobileView()&&plugin.settings.effect_mobile=='slide'){
var speed=plugin.isMobileView() ? plugin.settings.effect_speed_mobile:plugin.settings.effect_speed;
anchor.siblings(".mega-sub-menu").css("display", "none").animate({'height':'show', 'paddingTop':'show', 'paddingBottom':'show', 'minHeight':'show'}, speed, function(){
$(this).css("display", "");
});
}
anchor.parent().addClass("mega-toggle-on").triggerHandler("open_panel");
};
plugin.calculateDynamicSubmenuWidths=function(anchor){
if(anchor.parent().hasClass("mega-menu-megamenu")&&anchor.parent().parent().hasClass('mega-menu')&&plugin.settings.panel_width&&$(plugin.settings.panel_width).length > 0){
if(plugin.isDesktopView()){
var submenu_offset=$menu.offset();
var target_offset=$(plugin.settings.panel_width).offset();
anchor.siblings(".mega-sub-menu").css({
width: $(plugin.settings.panel_width).outerWidth(),
left: (target_offset.left - submenu_offset.left) + "px"
});
}else{
anchor.siblings(".mega-sub-menu").css({
width: "",
left: ""
});
}}
if(anchor.parent().hasClass("mega-menu-megamenu")&&anchor.parent().parent().hasClass('mega-menu')&&plugin.settings.panel_inner_width&&$(plugin.settings.panel_inner_width).length > 0){
var target_width=0;
if($(plugin.settings.panel_inner_width).length){
target_width=parseInt($(plugin.settings.panel_inner_width).width(), 10);
}else{
target_width=parseInt(plugin.settings.panel_inner_width, 10);
}
var submenu_width=parseInt(anchor.siblings(".mega-sub-menu").innerWidth(), 10);
if(plugin.isDesktopView()&&target_width > 0&&target_width < submenu_width){
anchor.siblings(".mega-sub-menu").css({
"paddingLeft": (submenu_width - target_width) / 2 + "px",
"paddingRight": (submenu_width - target_width) / 2 + "px"
});
}else{
anchor.siblings(".mega-sub-menu").css({
"paddingLeft": "",
"paddingRight": ""
});
}}}
var bindClickEvents=function(){
var dragging=false;
$(document).on({
"touchmove": function(e){ dragging=true; },
"touchstart": function(e){ dragging=false; }});
$(document).on("click touchend", function(e){
if(!dragging&&plugin.settings.document_click==="collapse"&&! $(e.target).closest(".max-mega-menu li").length&&! $(e.target).closest(".mega-menu-toggle").length){
plugin.hideAllPanels();
}
dragging=false;
});
$("> a.mega-menu-link", items_with_submenus).on("click.megamenu touchend.megamenu", function(e){
if(e.type==='touchend'){
plugin.unbindHoverEvents();
plugin.unbindHoverIntentEvents();
}
if(plugin.isDesktopView()&&$(this).parent().hasClass("mega-toggle-on")&&$(this).parent().parent().parent().hasClass("mega-menu-tabbed")){
if(plugin.settings.second_click==="go"){
return;
}else{
e.preventDefault();
return;
}}
if(dragging){
return;
}
if(plugin.isMobileView()&&$(this).parent().hasClass("mega-hide-sub-menu-on-mobile")){
return;
}
if((plugin.settings.second_click==="go"||$(this).parent().hasClass("mega-click-click-go"))&&$(this).attr('href')!==undefined){
if(!$(this).parent().hasClass("mega-toggle-on")){
e.preventDefault();
plugin.showPanel($(this));
}}else{
e.preventDefault();
if($(this).parent().hasClass("mega-toggle-on")){
plugin.hidePanel($(this), false);
}else{
plugin.showPanel($(this));
}}});
};
var bindHoverEvents=function(){
items_with_submenus.on({
"mouseenter.megamenu":function(){
plugin.unbindClickEvents();
if(! $(this).hasClass("mega-toggle-on")){
plugin.showPanel($(this).children("a.mega-menu-link"));
}},
"mouseleave.megamenu":function(){
if($(this).hasClass("mega-toggle-on")&&! $(this).hasClass("mega-disable-collapse")&&! $(this).parent().parent().hasClass("mega-menu-tabbed")){
plugin.hidePanel($(this).children("a.mega-menu-link"), false);
}}});
};
var bindHoverIntentEvents=function(){
items_with_submenus.hoverIntent({
over: function (){
plugin.unbindClickEvents();
if(! $(this).hasClass("mega-toggle-on")){
plugin.showPanel($(this).children("a.mega-menu-link"));
}},
out: function (){
if($(this).hasClass("mega-toggle-on")&&! $(this).hasClass("mega-disable-collapse")&&! $(this).parent().parent().hasClass("mega-menu-tabbed")){
plugin.hidePanel($(this).children("a.mega-menu-link"), false);
}},
timeout: megamenu.timeout,
interval: megamenu.interval
});
};
var bindKeyboardEvents=function(){
var tab_key=9;
var escape_key=27;
$("body").on("keyup", function(e){
var keyCode=e.keyCode||e.which;
if(keyCode===escape_key){
$menu.parent().removeClass("mega-keyboard-navigation");
plugin.hideAllPanels();
}
if($menu.parent().hasClass("mega-keyboard-navigation")&&!($(e.target).closest(".max-mega-menu li").length||$(e.target).closest(".mega-menu-toggle").length)){
$menu.parent().removeClass("mega-keyboard-navigation");
plugin.hideAllPanels();
if(plugin.isMobileView()){
$menu.siblings('.mega-menu-toggle').removeClass('mega-menu-open');
}}});
$menu.parent().on("keyup", function(e){
var keyCode=e.keyCode||e.which;
var active_link=$(e.target);
if(keyCode===tab_key){
$menu.parent().addClass("mega-keyboard-navigation");
if(active_link.parent().is(items_with_submenus)){
plugin.showPanel(active_link);
}else{
plugin.hideSiblingPanels(active_link);
}
if(active_link.hasClass("mega-menu-toggle")){
active_link.addClass("mega-menu-open");
}}});
};
plugin.unbindAllEvents=function(){
$("ul.mega-sub-menu, li.mega-menu-item, a.mega-menu-link", menu).off().unbind();
};
plugin.unbindClickEvents=function(){
$("> a.mega-menu-link", items_with_submenus).off("click.megamenu touchend.megamenu");
};
plugin.unbindHoverEvents=function(){
items_with_submenus.unbind("mouseenter.megamenu mouseleave.megamenu");
};
plugin.unbindHoverIntentEvents=function(){
items_with_submenus.unbind("mouseenter mouseleave").removeProp('hoverIntent_t').removeProp('hoverIntent_s');
};
plugin.unbindMegaMenuEvents=function(){
if(plugin.settings.event==="hover_intent"){
plugin.unbindHoverIntentEvents();
}
if(plugin.settings.event==="hover"){
plugin.unbindHoverEvents();
}
plugin.unbindClickEvents();
}
plugin.bindMegaMenuEvents=function(){
if(plugin.isDesktopView()&&plugin.settings.event==="hover_intent"){
bindHoverIntentEvents();
}
if(plugin.isDesktopView()&&plugin.settings.event==="hover"){
bindHoverEvents();
}
bindClickEvents();
bindKeyboardEvents();
};
plugin.monitorView=function(){
if(plugin.isDesktopView()){
$menu.data("view", "desktop");
}else{
$menu.data("view", "mobile");
plugin.switchToMobile();
}
plugin.checkWidth();
$(window).resize(function(){
plugin.checkWidth();
});
};
plugin.checkWidth=function(){
if(plugin.isMobileView()&&$menu.data("view")==="desktop"){
$menu.data("view", "mobile");
plugin.switchToMobile();
}
if(plugin.isDesktopView()&&$menu.data("view")==="mobile"){
$menu.data("view", "desktop");
plugin.switchToDesktop();
}
plugin.calculateDynamicSubmenuWidths($("li.mega-menu-megamenu.mega-toggle-on > a.mega-menu-link", $menu));
};
plugin.reverseRightAlignedItems=function(){
if(! $('body').hasClass('rtl')){
$menu.append($menu.children("li.mega-item-align-right").get().reverse());
}};
plugin.addClearClassesToMobileItems=function(){
$(".mega-menu-row", $menu).each(function(){
$("> .mega-sub-menu > .mega-menu-column:not(.mega-hide-on-mobile)", $(this)).filter(":even").addClass('mega-menu-clear');
});
}
plugin.switchToMobile=function(){
plugin.unbindMegaMenuEvents();
plugin.bindMegaMenuEvents();
plugin.reverseRightAlignedItems();
plugin.addClearClassesToMobileItems();
plugin.hideAllPanels();
};
plugin.switchToDesktop=function(){
plugin.unbindMegaMenuEvents();
plugin.bindMegaMenuEvents();
plugin.reverseRightAlignedItems();
plugin.hideAllPanels();
};
plugin.init=function(){
$menu.triggerHandler("before_mega_menu_init");
plugin.settings=$.extend({}, defaults, options);
$menu.removeClass("mega-no-js");
$menu.siblings(".mega-menu-toggle").on("click", function(e){
if($(e.target).is(".mega-menu-toggle-block, .mega-toggle-blocks-left, .mega-toggle-blocks-center, .mega-toggle-blocks-right, .mega-toggle-label, .mega-toggle-label span")){
if(plugin.settings.effect_mobile=='slide'){
if($(this).hasClass("mega-menu-open")){
$menu.animate({'height':'hide'}, plugin.settings.effect_speed_mobile, function(){
$(this).css("display", "");
});
}else{
$menu.animate({'height':'show'}, plugin.settings.effect_speed_mobile);
}}
$(this).toggleClass("mega-menu-open");
}});
$("span.mega-indicator", $menu).on('click', function(e){
e.preventDefault();
e.stopPropagation();
plugin.hidePanel($(this).parent(), false);
});
if(plugin.settings.unbind_events=='true'){
plugin.unbindAllEvents();
}
plugin.bindMegaMenuEvents();
plugin.monitorView();
$menu.triggerHandler("after_mega_menu_init");
};
plugin.init();
};
$.fn.maxmegamenu=function(options){
return this.each(function(){
if(undefined===$(this).data("maxmegamenu")){
var plugin=new $.maxmegamenu(this, options);
$(this).data("maxmegamenu", plugin);
}});
};
$(function(){
$('.max-mega-menu').maxmegamenu();
});
})(jQuery);
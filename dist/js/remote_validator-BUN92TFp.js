var y=function(a){var e=this,u=jQuery("body"),v='input[type!="hidden"],textarea,select',p='input[type="submit"], input[type="image"], button';e.form=a,e.clicked_button=null,e.form.on("click",p,function(s){var i=jQuery(s.target),r=i.closest("button");r.length>0&&(i=r),!(i.is("button")&&i[0].type!=="submit")&&(e.clicked_button=i)}),e.form.on("ajax:beforeSend",function(s,i){i.validation_id="v"+new Date().getTime()+Math.random(),e.form.attr("data-validation-id",i.validation_id),e.clicked_button&&e.clicked_button.trigger("loadingstart")}),e.form.on("ajax:complete",function(s,i){var r,t={validation_id:i.validation_id};switch(i.status){case 303:try{r=jQuery.parseJSON(i.responseText)}catch{e.form.trigger("validation:fail",[e,t]);break}t.response=r,e.form.trigger("validation:ok",[e,t]);break;case 200:t.response=i,e.form.trigger("validation:ok",[e,t]);break;case 422:try{r=jQuery.parseJSON(i.responseText)}catch{e.form.trigger("validation:fail",[e,t]);break}t.response=r;let f=[];jQuery.each(r.errors,function(o,n){jQuery.each(n,function(d,l){if(o.indexOf(".")>-1){let c=o.split(".");o=c.shift()+"["+c.join("][")+"]"}let g={message:l,fieldName:o};f.push(g)})}),jQuery.each(f,function(o,n){let d=null,l=null;d=e.form.find('[name="'+n.fieldName+'"],[name="'+n.fieldName+'[]"]').filter(':not([type="hidden"])').first(),t.error=n,d&&d.length>0?l=d:l=e.form,l.trigger("validation:error",[e,t])});break;default:e.form.trigger("validation:fail",[e,t]);break}e.form.trigger("validation:end",[e,t])}),e.form.on("validation:ok",function(s,i,r){!r||!r.response||("url"in r.response?(s.preventDefault(),document.location.href=r.response.url):"getResponseHeader"in r.response&&(s.preventDefault(),u.trigger("contentreplace",[r.response,"> header"]),u.trigger("contentreplace",[r.response,"> aside"]),u.trigger("contentreplace",[r.response,"> main"])))}),e.form.on("validation:error",function(s,i,r){var t=null,f=r.error,o=jQuery(s.target),n=o.is("form")?o:o.closest("form");if(o.is(v)){var d=o.parents(".field:not(.localization)").first();if(d.length!==1)return;var l=d.is(".i18n")?o.closest(".localization"):d,g=l.find(".error-box");g.length<1&&(g=jQuery('<div class="error-box"><div class="error"></div></div>'),g.appendTo(l.find(".value").first())),t=g.find(".error"),t.attr("data-validation-id",r.validation_id),t.text(f.message),d.addClass("has-error"),d.is(".i18n")&&l.addClass("has-error")}else if(o.is("form")){var c=n.find(".form-error-box");if(c.length<1){var m=n.find(".body").first();m.length<1&&(m=n),c=jQuery('<div class="form-error-box"></div>'),c.prependTo(m)}c.find(".error").each(function(){t||jQuery(this).text()===f.message&&(t=jQuery(this))});var h=!t;t||(t=jQuery('<div class="error"></div>')),t.attr("data-validation-id",r.validation_id),t.text(f.message),h&&t.appendTo(c),n.addClass("has-error"),c.parent().scrollTop(c.offset().top-c.parent().offset().top+c.parent().scrollTop())}n.find(".button.loading").trigger("loadingend")}),e.form.on("validation:end",function(s,i,r){var t=a.attr("data-validation-id");if(r.validation_id===t){r.except_validation_id=t,a.trigger("validation:clearerrors",[i,r]);var f=a.find(".field.has-error").filter(":visible").find(v).not(".localization:not(.has-error) *").first();f.trigger("focusprepare"),f.focus()}}),e.form.on("validation:clearerrors",function(s,i,r){var t=r&&"except_validation_id"in r?r.except_validation_id:null;if(a.find(".field.has-error").each(function(){var n,d=jQuery(this);n=d.find(".error-box"),n.each(function(){var l=jQuery(this),g=l.find(".error");(!t||g.attr("data-validation-id")!==t)&&(d.is(".i18n")&&l.closest(".localization").removeClass("has-error"),l.remove())}),n=d.find(".error-box"),n.length<1&&d.removeClass("has-error")}),a.hasClass("has-error")){var f=a.find(".form-error-box"),o=!1;f.find(".error").each(function(){var n=jQuery(this);!t||n.attr("data-validation-id")!==t?n.remove():o=!0}),o||(f.remove(),a.removeClass("has-error"))}}),jQuery(document).on("validation:ok validation:error validation:fail","form",function(s,i){if(!(i!==e||!e.form[0]))switch(s.type){case"validation:ok":e.submit_form();break;case"validation:error":e.clicked_button=null;break;case"validation:fail":e.submit_form();break}})};y.prototype.submit_form=function(){var a=this;if(a.clicked_button){var e=a.clicked_button.first(),u=e.attr("name");if(u){var v=a.form.find('input[type="hidden"][name="'+u+'"]');v.length<1&&(v=jQuery("<input />").attr("type","hidden").attr("name",e.attr("name")),v.appendTo(a.form)),v.val(e.val())}}a.form[0].submit()};jQuery(function(){jQuery(document).on("validation:init","form",function(a){if(!a.isDefaultPrevented()){var e=jQuery(a.target);e.data("validator")||(e.data("validator",new y(e)),e.attr("data-remote-validation-initialized",!0),jQuery(".main .primary .button[name=save], .main .primary .button[name=save_and_return], .edit-resources .primary .button[name=save]").click(u=>{u.preventDefault(),e.data("validator").clicked_button=jQuery(u.target),e.trigger("beforevalidation");let v=new FormData(this);$.ajax({type:"POST",url:e.attr("action"),data:v,cache:!1,contentType:!1,processData:!1,beforeSend:p=>{e.trigger("ajax:beforeSend",[p])},complete:p=>{e.trigger("ajax:complete",[p])}})}))}}),jQuery("body").on("contentloaded",function(a){var e=jQuery(a.target),u=e.is("form[data-remote-validation]")?e:e.find("form[data-remote-validation]");u.trigger("validation:init")})});
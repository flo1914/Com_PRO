(function ($) {
  var ieSelectionPosition = new Object();
  ieSelectionPosition.start = 0;
  ieSelectionPosition.end = 0;
  Drupal.behaviors.rue89Comments = {
    attach: function(context) {
      $('#commentaires .comment-form.add_comment', context).once('rue89-comments', function() {
        $comment_form = $(this);
        // Open a modal window for link type.
        $('.add a', $comment_form).click(function() {
          if ($(this).attr('rel') == 'remove') {
            rue89CommentsRemoveMedia($(this));
          }
          else {
            rue89CommentsOpenModalWindow($(this).attr('class'), $(this).parents('form'));
          }
          return false;
        });
        // Cancel button was clicked at the modal window, clear all values.
        $('div#modal_content').once('modal-content', function() {
          $('a.cancel', $(this)).click(function() {
            $('form input[type=text], input[type=file], form textarea', $(this)).val('');
            return false;
          });
          $('a.close', $(this)).click(function() {
            $.colorbox.close();
            return false;
          });
        });

        // If current browser is IE then remember caret position in the comment_body field for future insertion of links.
        if (document.selection) {
          $('textarea[name="comment_body[und][0][value]"]', $(this)).bind('mouseup keyup', function() {
            ieSelectionPosition = getSelection(this);
          });
        }

        $('.preview.form-submit', $(this)).each(function() {
          // Prior to ajax request to server we need to check whether its some content in the field.
          Drupal.ajax[$(this).attr('id')].beforeSend = function(xmlhttprequest, options) {
            //Default ajax stuff required here due to override of beforeSend() function
            options.extraData = options.extraData || {};
            options.extraData.ajax_iframe_upload = '1';
            var v = $.fieldValue(this.element);
            if (v !== null) {
              options.extraData = options.extraData || {};
              options.extraData[this.element.name] = v;
            }
            var $commentBody = $('textarea[name="comment_body[und][0][value]"]', this.form);
            if ($commentBody.val() == '') {
              $commentBody.addClass('error');
              Drupal.ajax[$('.preview.form-submit', this.form).attr('id')].ajaxing = false;
              xmlhttprequest.abort();
            }
            else {
              $('div.add', this.form).addClass('loading');
              $(this.element).addClass('progress-disabled').attr('disabled', true);
            }
          };
          // remember form id for future preview insert in proper place.
          Drupal.ajax[$(this).attr('id')].beforeSubmit = function(form_values, element, options) {
            options['data']['sender_form_id'] = $(element).attr('id');
          };
        });
        // Check comment_body field before submitting it to server. If its empty, then stop submitting.
        $('.add_buttons .publish.form-submit').click(function() {
          var $commentBody = $('textarea[name="comment_body[und][0][value]"]', $(this).parents('form'));
          if ($commentBody.val() == '') {
            $commentBody.addClass('error');
            return false;
          }
        });
        // Remove error border when there is some content in the field.
        $('textarea[name="comment_body[und][0][value]"]').keyup(function() {
          if ($(this).val() != "") {
            $(this).removeClass('error');
          }
        });

      });
    }
  };

  Drupal.behaviors.rue89CommentsRemovePreview = {
    attach: function(context) {
      $(".preview .add_buttons", context).once('comments-remove-preview', function() {
        $('.cancel', this).click(function() {
          $(this).parents(".commentaire").find("div.preview").removeClass("loaded").parent().slideToggle(
                  function() {
                    $(this).remove();
                  }).next().slideToggle();
          return false;
        });
        $('.publish', $(this)).click(function() {
          $(this).parents(".commentaire").next().submit();
          return false;
        });
      });
    }
  };

  Drupal.behaviors.rue89CommentLinks = {
    attach: function(context) {
      $('#commentaires .commentaire .foot', context).once('comment-links', function() {
        // If a reply link is clicked, we clone the comment form and place it under the reply link.
        $('.comment-reply a', $(this)).click(function() {
          var $commentReplyForm = $('#comment-reply-form');
          if ($commentReplyForm.length == 0) {
            $commentReplyForm = $('form.add_comment:not(.comment-form-edit)').clone();
            $commentReplyForm.attr('id', 'comment-reply-form');
            $commentReplyForm.removeClass('rue89-comments-processed');
            $('.add_buttons input.preview', $commentReplyForm).attr('id', 'edit-preview-reply').removeClass('ajax-processed');
            // Initialize ajax variable for preview button in the cloned form.
            Drupal.settings.ajax['edit-preview-reply'] = {
              callback: 'rue89_comments_ajax_preview',
              event: 'click',
              keypress: true,
              progress: {
                type: 'none',
                message: ''
              },
              submit: {
                _triggering_element_name: 'op',
                _triggering_element_value: $('#edit-preview-reply', $commentReplyForm).val()
              },
              url: '/system/ajax'
            };
            $('a:first', $commentReplyForm).remove();
            $('div.user', $commentReplyForm).remove();
            $commentReplyForm.hide();
          }
          $('textarea[name="comment_body[und][0][value]"]', $commentReplyForm).removeClass('error');
          var $reply_preview = $commentReplyForm.prev('.comment-wrapper');
          if ($reply_preview.length > 0) {
            $reply_preview.slideToggle('fast', function() {
              $(this).remove();
            });
          }
          $replyLink = $(this);
          $commentReplyForm.slideUp('fast', function() {
            // replace form action attribute, as long as we reply to comment.
            $(this).attr('action', $replyLink.attr('href'));
            var parts = $replyLink.attr('href').split('/');
            // initialize pid hidden field.
            $('input[name="pid"]', $(this)).val(parts.pop());
            $(this).appendTo($replyLink.parents('div.foot')).slideDown();
          });
          Drupal.attachBehaviors();
          return false;
        });
        $('#commentaires a.use-ajax').each(function(){
          Drupal.ajax[$(this).attr('id')].progress['type'] = 'none';
        });
        $('.comment-edit a', $(this)).each(function() {
          Drupal.ajax[$(this).attr('id')].beforeSend = function(xmlhttprequest, options) {
            $(this.element).parent().append($('<img src="/sites/all/modules/custom/rue89_comments/images/loading4.gif" width="10" style="margin-left: 5px;"/>'));
          };
        });
        $("a.share", $(this)).click(function(){
          $(this).prev("ul").animate({width:"toggle"}, 100);
          return false;
        });
      });
    }
  };

  Drupal.behaviors.rue89CommentsFilterFormLinks = {
    attach: function(context) {
      $("#rue89-comments-thread-filter-form", context).once('comments-filter-form', function() {
        $form = $(this);
        $.each(Drupal.settings.views.ajaxViews, function(){
          if (this.view_name ==  $('input[name=view_name]', $form).val()) {
            $('input[name=view_args]', $form).val(this.view_args);
            $('input[name=pager_element]', $form).val(this.pager_element);
          }
        });
        if ($('input[name=sort_order]').val() == 'ASC') {
          switchSortLinks($('a[rel="ASC"]', $(this)), 'DESC');
        }
        else {
          switchSortLinks($('a[rel="DESC"]', $(this)), 'ASC');
        }
        $('a', this).each(function() {
          Drupal.ajax[$(this).attr('id')]['form'] = $form;
          Drupal.ajax[$(this).attr('id')].beforeSubmit = function(form_values, element, options) {
            form_values.push({name: 'sort_order', value: $(this.element).attr('rel')});
            $('input[name=sort_order]', this.form).val($(this.element).attr('rel'));
          };
          $(this).click(function() {
            if ($(this).attr('rel') == 'ASC') {
              switchSortLinks($(this), 'DESC');
            }
            else {
              switchSortLinks($(this),'ASC');
            }
          });
        });
      });
    }
  };

  Drupal.behaviors.rue89CommentsFilterFormGrouping = {
    attach: function($context) {
      $('#cb_deplier').click(function(){
        var filter_settings = $.cookie("rue89_comments_filter_cb_deplier", $(this).attr('checked'));
      });
    }
  };

  Drupal.behaviors.commentNotify = {};

  Drupal.ajax.prototype.commands.commentPreviewLoaded = function(ajax, response, status) {
    var $form = $(ajax['form']);
    $form.slideToggle().prev().hide().slideToggle(function () {
      $('.preview', $(this)).addClass("loaded");
      $('div.add', $form).removeClass('loading');
    });
  };

  Drupal.ajax.prototype.commands.insertReplyForm = function(ajax, response, status) {
    $(ajax.element).parents('div.foot').append(response.data);
    Drupal.attachBehaviors();
  };

  Drupal.ajax.prototype.commands.insertEditCommentForm = function(ajax, response, status) {
    $(ajax.element).parents('.comment-wrapper').slideToggle(function () {
      $(this).after(response.data).next().hide().slideToggle();
      $(this).remove();
      Drupal.attachBehaviors();
    });
  };

  Drupal.ajax.prototype.commands.changeCommentStatusPublish = function(ajax, response, status) {
//    $(ajax.element).parents('ul.moderation').find('li.publish').removeClass('on').addClass('off').find('a').attr('title', Drupal.t('Unpublish this comment'));
//    $(ajax.element).parents('li.commentaire:first').removeClass('unpublished');
    $li = $(ajax.element).parents('li.commentaire.unpublished');
    $li.find('li.publish').removeClass('on').addClass('off').find('a').attr('title', Drupal.t('Unpublish this comment'));
    $li.removeClass('unpublished').find('li.unpublished').removeClass('unpublished');
    Drupal.attachBehaviors();
  };

  Drupal.ajax.prototype.commands.changeCommentStatusUnpublish = function(ajax, response, status) {
//    $(ajax.element).parents('ul.moderation').find('li.publish').removeClass('off').addClass('on').find('a').attr('title', Drupal.t('Publish this comment'));
//    $(ajax.element).parents('li.commentaire:first').addClass('unpublished');
    $li = $(ajax.element).parents('li.commentaire:first');
    $li.find('li.publish').removeClass('off').addClass('on').find('a').attr('title', Drupal.t('Publish this comment'));
    $li.addClass('unpublished').find('li.unpublished').addClass('unpublished');
    Drupal.attachBehaviors();
  };

  Drupal.ajax.prototype.commands.changeCommentStatusUnpublishChildren = function(ajax, response, status) {
    children_id = response.data;
    $('#'+children_id).find('li.publish').removeClass('off').addClass('on').find('a').attr('title', Drupal.t('Publish this comment'));
    Drupal.attachBehaviors();
  };

  Drupal.ajax.prototype.commands.changeCommentStatusPublishParent = function(ajax, response, status) {
    children_id = response.data;
    $('#'+children_id).find('li.publish').removeClass('on').addClass('off').find('a').attr('title', Drupal.t('Unpublish this comment'));
    Drupal.attachBehaviors();
  };

  Drupal.ajax.prototype.commands.changeCommentSelect = function(ajax, response, status) {
    $(ajax.element).parents('ul.moderation').find('li.select').removeClass('on').addClass('off').find('a').attr('title', Drupal.t('Deselect this comment'));
    Drupal.attachBehaviors();
  };

  Drupal.ajax.prototype.commands.changeCommentUnselect = function(ajax, response, status) {
    $(ajax.element).parents('ul.moderation').find('li.select').removeClass('off').addClass('on').find('a').attr('title', Drupal.t('Select this comment'));
    Drupal.attachBehaviors();
  };

  Drupal.ajax.prototype.commands.changeCommentUnselectChildren = function(ajax, response, status) {
    children_id = response.data;
    $('#'+children_id).find('li.select').removeClass('off').addClass('on').find('a').attr('title', Drupal.t('Sélectionner ce commentaire'));
    Drupal.attachBehaviors();
  };

  Drupal.ajax.prototype.commands.changeCommentSelectParent = function(ajax, response, status) {
    children_id = response.data;
    $('#'+children_id).find('li.select').removeClass('on').addClass('off').find('a').attr('title', Drupal.t('Select this comment'));
    Drupal.attachBehaviors();
  };


  Drupal.ajax.prototype.commands.changeCommentStatusVerify = function(ajax, response, status) {
    $(ajax.element).parents('ul.moderation').find('li.status').removeClass('pending').addClass('ok').find('span.rounded3').html(response.data);
    Drupal.attachBehaviors();
  };

  Drupal.ajax.prototype.commands.changeCommentStatusUnverify = function(ajax, response, status) {
    $(ajax.element).parents('ul.moderation').find('li.status').removeClass('ok').addClass('pending').find('span.rounded3').html(response.data);
    Drupal.attachBehaviors();
  };
  

  Drupal.ajax.prototype.commands.changeCommentStatusWithdrawAll = function(ajax, response, status) {
    $(ajax.element).parents('ul.moderation').find('li.withdraw_all').removeClass('on').addClass('off').find('span.rounded3').html(response.data);
  };  
    

  Drupal.ajax.prototype.commands.changeCommentStatusVerifyMultiple = function(ajax, response, status) {
    var $posts = $('#postes');
    $.each(response.data, function(index, value) {
      $('#' + value + ' li.status', $posts).removeClass('pending').addClass('ok').find('span.rounded3').html(Drupal.t('Verified'));
    });
    Drupal.attachBehaviors();
  };

  Drupal.ajax.prototype.commands.commentsThreadReplace = function(ajax, response, status) {
    $('#postes .liste_commentaires, #postes .pagination, #postes .moderation_button').remove();
    $filter_form = $(response.selector);
    if ($filter_form.length > 0) {
      $(response.selector).after(response.data);
    }
    else {
      $('#postes').append(response.data);
    }

    /* Add Nice title */
  	$("#commentaires .head > div").hoverIntent({
  		over: function(){
  			$(this).children(".nicetitle").show().animate({
  				opacity: 1,
  				top: '-=15'
  			}, 300
  			);
  		},
  		timeout: 200,
  		out: function(){
  			$(this).children(".nicetitle").animate({
  				opacity: 0,
  				top: '+=15'
  			}, 300, function(){$(this).hide()});
  		}
  	});    
  }

  function rue89CommentsOpenModalWindow($type, context) {
    var $modalWindowForm = $('div#modal_content form');
    var $modalWindowTitle = $('div#modal_content h1.title89');
    $type = $type.split(' ').shift();
    $('input[type=submit]', $modalWindowForm).unbind('click');
    switch ($type) {
      case 'video':
        var $control = $('.modal-content-video', context);
        $('div#modal_content #buttons').show();
        $modalWindowForm.prepend($control);
        $modalWindowTitle.html(Drupal.t('Insert <span>a</span> <strong>video</strong>'));
        $('input[type=submit]', $modalWindowForm).bind('click', {form : context, modal: $modalWindowForm}, rue89CommentsProcessVideo);
        break;
      case 'image':
        var $control = $('.modal-content-image', context);
        $('div#modal_content #buttons').show();
        $modalWindowForm.prepend($control);
        $modalWindowTitle.html(Drupal.t('Insert<span>an</span> <strong>image</strong>'));
        $('input[type=submit]', $modalWindowForm).bind('click', {form : context, modal: $modalWindowForm}, rue89CommentsProcessImage);
        break;
      case 'lien':
        var $control = $('.modal-content-link', context);
        $('div#modal_content #buttons').show();
        $('div.modal-content-link input.add-link-title').val($('textarea[name="comment_body[und][0][value]"]', context).getSelectedText());
        $('div.modal-content-link input.add-link').val('');
        $modalWindowForm.prepend($control);
        $modalWindowTitle.html(Drupal.t('Insert <span>a</span> <strong>link</strong>'));
        // Submit of the link from pop-up window
        $('input[type=submit]', $modalWindowForm).bind('click', {form : context, modal: $modalWindowForm}, rue89CommentsProcessLink);
        break;
      case 'aide':
        var $control = $('.modal-content-help', context);
        $('div#modal_content #buttons').hide();
        $modalWindowForm.prepend($control);
        $modalWindowTitle.html(Drupal.t('<strong>Help</strong>'));
        break;
    }
    $.colorbox({
      transition: "none",
      inline: true,
      href: "div#modal_content",
      onClosed: function() {
        $('.rue89comments-controls', context).append($control);
      }
    });
  }

  function rue89CommentsProcessLink(event) {
    event.preventDefault();
    var $addLink = $('div#modal_content input.add-link');
    var $addLinkTitle = $('div#modal_content input.add-link-title');
    if ($addLink.length > 0 && $addLinkTitle.length > 0) {
      if ($addLink.val() != '') {
        if ($addLinkTitle.val() != '') {
          var $commentBody = $('textarea[name="comment_body[und][0][value]"]', event.data.form);
          $link_href = $addLink.val();
          $link_href = $link_href.replace(/\s/g, '');
          if (Drupal.settings && Drupal.settings.rue89Comments && Drupal.settings.rue89Comments.url_protocols) {
            pattern = new RegExp(Drupal.settings.rue89Comments.url_protocols);
            $match = pattern.test($link_href, 'i')
          }
          else {
            $match = $link_href.match(/^http:\/\/:.+/i)
          }
          if (!$match) {
            $link_href = 'http://' + $link_href;
          }
          $commentBody.insertAtCaret('[' + $link_href + '|' + $addLinkTitle.val() + ']', ieSelectionPosition);
        }
        else {
          var $commentBody = $('textarea[name="comment_body[und][0][value]"]', even.data.form);
          $commentBody.insertAtCaret($addLink.val());
        }
      }
    }
    $.colorbox.close();
  }

  function rue89CommentsProcessVideo(event) {
    event.preventDefault();
    if ($('textarea[name="field_comment_video[und][0][url]"]', event.data.modal).val().replace(/\s/g, '') != '') {
      $('a.video', event.data.from).html(Drupal.t('Delete the added video')).attr('rel', 'remove');
      $('a.image', event.data.from).html(Drupal.t('Insert an image')).removeAttr('rel');
      $('input[name="files[field_comment_image_und_0]"]', event.data.form).val('');
      $('input[name="field_comment_image[und][0][fid]"]', event.data.form).val('');
    }
    $.colorbox.close();
  }

  function rue89CommentsProcessImage(event) {
    event.preventDefault();
    if ($('.modal-content-image input', event.data.modal).val() != '') {
      $('a.image', event.data.from).html(Drupal.t('Delete the added image')).attr('rel', 'remove');
      $('a.video', event.data.from).html(Drupal.t('Insert a video')).removeAttr('rel');
      $('textarea[name="field_comment_video[und][0][url]"]', event.data.form).val('');
    }
    $.colorbox.close();
  }

  function rue89CommentsRemoveMedia($link) {
    $link.removeAttr('rel');
    if ($link.hasClass('video')) {
      $link.html(Drupal.t('Insert a video'));
      $('textarea[name="field_comment_video[und][0][url]"]', $link.parents('form')).val('');
    }
    else if($link.hasClass('image')) {
      $link.html(Drupal.t('Insert an image'));
      $('input[name="files[field_comment_image_und_0]"]', $link.parents('form')).val('');
      $('input[name="field_comment_image[und][0][fid]"]', $link.parents('form')).val('');
    }
  }

  jQuery.fn.extend({
    insertAtCaret: function(myValue, ieSelPosition) {
      return this.each(function(i) {
        if (document.selection) {
          this.focus();
          sel = document.selection.createRange();
          sel.moveStart("character", ieSelPosition.start);
          sel.moveEnd("character", ieSelPosition.length);
          sel.select();
          sel.text = myValue;
          this.focus();
        }
        else if (this.selectionStart || this.selectionStart == '0') {
          var startPos = this.selectionStart;
          var endPos = this.selectionEnd;
          var scrollTop = this.scrollTop;
          this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos, this.value.length);
          this.focus();
          this.selectionStart = startPos + myValue.length;
          this.selectionEnd = startPos + myValue.length;
          this.scrollTop = scrollTop;
        }
        else {
          this.value += myValue;
          this.focus();
        }
      })
    }
  });

  jQuery.fn.extend({
    getSelectedText: function() {
      var eleme = this[0];
      if (document.selection) {
        sel = document.selection.createRange();
        return sel.text;
      }
      else if (eleme.selectionStart || eleme.selectionStart == '0') {
        var startPos = eleme.selectionStart;
        var endPos = eleme.selectionEnd;
        var scrollTop = eleme.scrollTop;
        return eleme.value.substring(startPos, endPos);
      }
    }
  });

  function getSelection(e) {
    e.focus();
    var r = document.selection.createRange();
    if (r == null) {
      return { start: 0, end: e.value.length, length: 0 }
    }

    var re = e.createTextRange();
    var rc = re.duplicate();
    re.moveToBookmark(r.getBookmark());
    rc.setEndPoint('EndToStart', re);

    return { start: rc.text.length, end: rc.text.length + r.text.length, length: r.text.length, text: r.text };
  }

  function switchSortLinks(element, type) {
    $(element).hide();
    var li = $(element).parent();
    li.append('<span>' + $(element).html() + '</span>');
    $(element).parents('ul').find('a[rel="' + type + '"]').show().parent().find('span').remove();
  }

})(jQuery)
;
$(document).ready(function(){  

  if ($("#postes").length == 1) {
    $("#postes").addClass('throbbing');
    var nid = $('#nid').attr('class');

    //Permalink page
    var hash = location.hash;

    //Get page number
    if (typeof commentPermalinkPage === 'undefined') {
      var filter = '';
    } else {
      var filter = '?page=' + commentPermalinkPage;
    }    

    $.ajax({
      url: '/comment/thread/' + nid + filter,
      dataType: 'html',
      cache: false,    
      success: function(data) {
        $('#postes').append(data);
        Drupal.attachBehaviors();
        Drupal.attachBehaviors("#postes");
        $('#postes').removeClass('throbbing');

        //Permalink page
        if (location.hash) {
          //Set a little timeout cause buggy sometimes
          setTimeout(function() {
            gotoHASH();
          }, 100);
        }
      }
    });    
  }  
});

function gotoHASH() {
    if (location.hash) {
        if ( $.browser.webkit == false ) {
            window.location.hash = location.hash;
        } else {
            window.location.href = location.hash;
        }
    }
};
// JavaScript Document

$(document).ready(function(){

	// Upload photo
	$("#edit-photo-image").wrap('<div class="wrapper_photo_file_fake" />').wrap('<div class="photo_file_fake" />');
	$("#edit-photo-image").css({"opacity": 0}).after('<span class="upload rounded5">Charger une photo</span>');
	$(".photo_file_fake").after('<div class="photo_file_legend"></div>');
	
	$("#edit-photo-image").live("change", function(){
		$(".wrapper_photo_file_fake .photo_file_legend").html($(this).val());
	});

});
;
(function ($) {
  // Documentation on Drupal JavaScript behaviors can be found here: http://drupal.org/node/114774#javascript-behaviors
  Drupal.behaviors.plus1_like_list = {
    attach: function(context) {
      $('#main a.like').once('like', function(){
        $(this).click(function(){
          $like_list = $(this).parent().next("ul.like_liste");
          if ($like_list.length > 0) {
            $(this).parent().next("ul.like_liste").slideToggle("fast");
          }
          else {
            $vote = $(this).parent().find('.vote');
            $score = $(this);
            if ($score.html() > 0) {
              $score.hide();
              $vote.addClass('loading');
              $.getJSON($score.attr('rel'), function(json){
                if (json && json.like_list != '') {
                  $score.parent().after(json.like_list).next().slideToggle("fast");
                }
                $score.show();
                $vote.removeClass('loading');
              });
            }
          }
          return false;
        });
      });
    }
  };
})(jQuery);

(function($) {

/**
 * Drupal FieldGroup object.
 */
Drupal.FieldGroup = Drupal.FieldGroup || {};
Drupal.FieldGroup.Effects = Drupal.FieldGroup.Effects || {};
Drupal.FieldGroup.groupWithfocus = null;

Drupal.FieldGroup.setGroupWithfocus = function(element) {
  element.css({display: 'block'});
  Drupal.FieldGroup.groupWithfocus = element;
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processFieldset = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.fieldset').each(function(i){
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $('legend span.fieldset-legend', $(this)).eq(0).append('&nbsp;').append($('.form-required').eq(0).clone());
        }
        if ($('.error', $(this)).length) {
          $('legend span.fieldset-legend', $(this)).eq(0).addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processAccordion = {
  execute: function (context, settings, type) {
    var accordions = $('div.field-group-accordion-wrapper', context).accordion({
      autoHeight: false,
      active: 0,
      collapsible: true
    });
    if (type == 'form') {
      // Add required fields mark to any element containing required fields
      $('div.accordion-item').each(function(i){
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $('h3.ui-accordion-header').eq(i).append('&nbsp;').append($('.form-required').eq(0).clone());
        }
        if ($('.error', $(this)).length) {
          $('h3.ui-accordion-header').eq(i).addClass('error');
          var activeOne = $(this).parent().accordion("activate" , i);
          $('.ui-accordion-content-active', activeOne).css({height: 'auto', width: 'auto', display: 'block'});
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processHtabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any element containing required fields
      $('fieldset.horizontal-tabs-pane').each(function(i){
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('horizontalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after('&nbsp;');
        }
        if ($('.error', $(this)).length) {
          $(this).data('horizontalTab').link.parent().addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
          $(this).data('horizontalTab').focus();
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processTabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.vertical-tabs-pane').each(function(i){
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('verticalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after('&nbsp;');
        }
        if ($('.error', $(this)).length) {
          $(this).data('verticalTab').link.parent().addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
          $(this).data('verticalTab').focus();
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 * 
 * TODO clean this up meaning check if this is really 
 *      necessary.
 */
Drupal.FieldGroup.Effects.processDiv = {
  execute: function (context, settings, type) {

    $('div.collapsible', context).each(function() {
      var $wrapper = $(this);

      // Turn the legend into a clickable link, but retain span.field-group-format-toggler
      // for CSS positioning.
      var $toggler = $('span.field-group-format-toggler:first', $wrapper);
      var $link = $('<a class="field-group-format-title" href="#"></a>');
      $link.prepend($toggler.contents()).appendTo($toggler);
      
      // .wrapInner() does not retain bound events.
      $link.click(function () {
        var wrapper = $wrapper.get(0);
        // Don't animate multiple times.
        if (!wrapper.animating) {
          wrapper.animating = true;
          var speed = $wrapper.hasClass('speed-fast') ? 300 : 1000;
          if ($wrapper.hasClass('effect-none') && $wrapper.hasClass('speed-none')) {
            $('> .field-group-format-wrapper', wrapper).toggle();
          }
          else if ($wrapper.hasClass('effect-blind')) {
            $('> .field-group-format-wrapper', wrapper).toggle('blind', {}, speed);
          }
          else {
            $('> .field-group-format-wrapper', wrapper).toggle(speed);
          }
          wrapper.animating = false;
        }
        return false;
      });
      
    });
  }
};

/**
 * Behaviors.
 */
Drupal.behaviors.fieldGroup = {
  attach: function (context, settings) {
    if (settings.field_group == undefined) {
      return;
    }
    $('body', context).once('fieldgroup-effects', function () {
      // Execute all of them.
      $.each(Drupal.FieldGroup.Effects, function (func) {
        // We check for a wrapper function in Drupal.field_group as 
        // alternative for dynamic string function calls.
        var type = func.toLowerCase().replace("process", "");
        if (settings.field_group[type] != undefined && $.isFunction(this.execute)) {
          this.execute(context, settings, settings.field_group[type]);
        }
      });
    });
  }
};

})(jQuery);;
/**
 * @file base.js
 *
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = {
  attach: function (context) {
    if ($.viewsUi && $.viewsUi.tabs) {
      $('#views-tabset').once('views-processed').viewsTabs({
        selectedClass: 'active'
      });
    }

    $('a.views-remove-link').once('views-processed').click(function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
   });
  /**
    * Here is to handle display deletion 
    * (checking in the hidden checkbox and hiding out the row) 
    */
  $('a.display-remove-link')
    .addClass('display-processed')
    .click(function() {
      var id = $(this).attr('id').replace('display-remove-link-', '');
      $('#display-row-' + id).hide();
      $('#display-removed-' + id).attr('checked', true);
      return false;
  });
  }
};

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
/**
 * @file ajaxView.js
 *
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function ($) {

/**
 * Attaches the AJAX behavior to Views exposed filter forms and key View links.
 */
Drupal.behaviors.ViewsAjaxView = {};
Drupal.behaviors.ViewsAjaxView.attach = function() {
  if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
    // Retrieve the path to use for views' ajax.
    var ajax_path = Drupal.settings.views.ajax_path;

    // If there are multiple views this might've ended up showing up multiple times.
    if (ajax_path.constructor.toString().indexOf("Array") != -1) {
      ajax_path = ajax_path[0];
    }

    $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
      var view = '.view-dom-id-' + settings.view_dom_id;
      var element_settings = {
        url: ajax_path,
        submit: settings,
        setClick: true,
        event: 'click',
        selector: view,
        progress: { type: 'throbber' }
      };

      // Process exposed filter forms.
      $('form#views-exposed-form-' + settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'))
      .filter(':not(.views-processed)')
      .each(function () {
        var button = $('input[type=submit], input[type=image]', this);
        button = button[0];

        var ajax = new Drupal.ajax($(button).attr('id'), button, element_settings);
      })
      .addClass('views-processed')

      $(view).filter(':not(.views-processed)')
        // Don't attach to nested views. Doing so would attach multiple behaviors
        // to a given element.
        .filter(function() {
          // If there is at least one parent with a view class, this view
          // is nested (e.g., an attachment). Bail.
          return !$(this).parents('.view').size();
        })
        .each(function() {
          // Set a reference that will work in subsequent calls.
          var target = this;
          $(this)
            .addClass('views-processed')
            // Process pager, tablesort, and attachment summary links.
            .find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
            .each(function () {
              var viewData = {};
              // Construct an object using the settings defaults and then overriding
              // with data specific to the link.
              $.extend(
                viewData,
                settings,
                Drupal.Views.parseQueryString($(this).attr('href')),
                // Extract argument data from the URL.
                Drupal.Views.parseViewArgs($(this).attr('href'), settings.view_base_path)
              );

              // For anchor tags, these will go to the target of the anchor rather
              // than the usual location.
              $.extend(viewData, Drupal.Views.parseViewArgs($(this).attr('href'), settings.view_base_path));

              element_settings.submit = viewData;
              var ajax = new Drupal.ajax(false, this, element_settings);
            }); // .each function () {
      }); // $view.filter().each
    }); // .each Drupal.settings.views.ajaxViews
  } // if
};
})(jQuery);
;
(function ($) {
  /**
   * Custom processing of comments thread pager.
   */
  Drupal.behaviors.Rue89ViewsAjaxUtils = {
    attach :  function(context) {
      if (Drupal.settings && Drupal.settings.rue89Views && Drupal.settings.rue89Views.ajaxViews) {
        // Iterate over custom views added to page
        $.each(Drupal.settings.rue89Views.ajaxViews, function(index, ajaxViewElement) {
          // Iterate over wrappers which need to be processed
          $.each(ajaxViewElement.ajaxCustomSettings.wrappers, function(wrapperElement, wrapperSettings) {
            // For each wrapper add ajax handlers
            $(wrapperElement).once('rue89views-ajax', function(){
              // Find elements which need to be provided with ajax handlers
              if (wrapperSettings.elements) {
                elements = wrapperSettings.elements;
              }
              else {
                elements = 'a';
              }
              $(elements, $(this)).each(function() {
                var settings = ajaxViewElement.settings;
                var element_settings = {
                  url: Drupal.settings.rue89Views.ajax_path,
                  submit: settings,
                  setClick: true,
                  event: 'click',
                  progress: {},
                  beforeSend: function (xmlhttprequest, options) {
                    // If element has add_class setting then add class contained in this property
                    // to the element. It can be used for adding loading class.
                    if (wrapperSettings.add_class) {
                      $(this.element).addClass(wrapperSettings.add_class);
                    }
                    // If some more complicated logic needs to be performed, then call custom function
                    // Function should be declared in the following way:
                    /*
                      FunctionName = function(element){
                      }
                     */
                    if (wrapperSettings.beforeSend) {
                      window[wrapperSettings.beforeSend](this.element);
                    }
                  }
                };

                var viewData = {};
                // Construct an object using the settings defaults and then overriding
                // with data specific to the link.
                $.extend(
                  viewData,
                  settings,
                  Drupal.Views.parseQueryString($(this).attr('href')),
                  // Extract argument data from the URL.
                  Drupal.Views.parseViewArgs($(this).attr('href'), settings.view_base_path)
                );

                // For anchor tags, these will go to the target of the anchor rather
                // than the usual location.
                $.extend(viewData, Drupal.Views.parseViewArgs($(this).attr('href'), settings.view_base_path));

                element_settings.submit = viewData;
                var ajax = new Drupal.ajax(false, this, element_settings);
              });
            });
          });
        });
      } // if
    }
  };
  Drupal.ajax.prototype.commands.rue89ViewsAttachBehaviors = function(ajax, response, status) {
    Drupal.attachBehaviors();
  }

  Drupal.ajax.prototype.commands.rue89ViewsAjaxUtilsGoTo = function(ajax, response, status) {
    window.location.hash = '#';
    window.location.hash = response.data.anchor
  }
})(jQuery);

(function ($) {
	/* Proposer popup */	
	/*$(".tpl_zapnet .zapnet-proposer-button a").colorbox({
		transition: "none",
		href: function(){
			return $(this).attr('href') + " div#modal_content";
		}
	});*/
})(jQuery)

;
(function ($) {

$(document).ready(function() {

  // Accepts a string; returns the string with regex metacharacters escaped. The returned string
  // can safely be used at any point within a regex to match the provided literal string. Escaped
  // characters are [ ] { } ( ) * + ? - . , \ ^ $ # and whitespace. The character | is excluded
  // in this function as it's used to separate the domains names.
  RegExp.escapeDomains = function(text) {
    return (text) ? text.replace(/[-[\]{}()*+?.,\\^$#\s]/g, "\\$&") : '';
  }

  // Attach onclick event to document only and catch clicks on all elements.
  $(document.body).click(function(event) {
    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      var ga = Drupal.settings.googleanalytics;
      // Expression to check for absolute internal links.
      var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
      // Expression to check for special links like gotwo.module /go/* links.
      var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
      // Expression to check for download links.
      var isDownload = new RegExp("\\.(" + ga.trackDownloadExtensions + ")$", "i");
      // Expression to check for the sites cross domains.
      var isCrossDomain = new RegExp("^(https?|ftp|news|nntp|telnet|irc|ssh|sftp|webcal):\/\/.*(" + RegExp.escapeDomains(ga.trackCrossDomains) + ")", "i");

      // Is the clicked URL internal?
      if (isInternal.test(this.href)) {
        // Is download tracking activated and the file extension configured for download tracking?
        if (ga.trackDownload && isDownload.test(this.href)) {
          // Download link clicked.
          var extension = isDownload.exec(this.href);
          _gaq.push(["_trackEvent", "Downloads", extension[1].toUpperCase(), this.href.replace(isInternal, '')]);
        }
        else if (isInternalSpecial.test(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          _gaq.push(["_trackPageview", this.href.replace(isInternal, '')]);
        }
      }
      else {
        if (ga.trackMailto && $(this).is("a[href^=mailto:],area[href^=mailto:]")) {
          // Mailto link clicked.
          _gaq.push(["_trackEvent", "Mails", "Click", this.href.substring(7)]);
        }
        else if (ga.trackOutbound && this.href) {
          if (ga.trackDomainMode == 2 && isCrossDomain.test(this.href)) {
            // Top-level cross domain clicked. document.location is handled by _link internally.
            _gaq.push(["_link", this.href]);
          }
          else if (ga.trackOutboundAsPageview) {
            // Track all external links as page views after URL cleanup.
            // Currently required, if click should be tracked as goal.
            _gaq.push(["_trackPageview", '/outbound/' + this.href.replace(/^(https?|ftp|news|nntp|telnet|irc|ssh|sftp|webcal):\/\//i, '').split('/').join('--')]);
          }
          else {
            // External link clicked.
            _gaq.push(["_trackEvent", "Outbound links", "Click", this.href]);
          }
        }
      }
    });
  });
});

})(jQuery);
;

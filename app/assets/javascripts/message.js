$(function(){
  function buildHTML(message){
    if (message.image.url) {
      var html =`<div class="contents__message">
                   <div class="contents__message__user">
                     <div class="contents__message__user__name">
                       ${message.user_name}
                     </div>
                     <div class="contents__message__user__date">
                       ${message.date}
                     </div>
                   </div>
                   <div class="contents__message__text">
                     <p class="contents__message__text__content">
                       ${message.content}
                     </p>
                       <img src="${message.image.url}" width="200" height"180">
                 </div>`
    } else {
      var html =`<div class="contents__message">
                   <div class="contents__message__user">
                     <div class="contents__message__user__name">
                       ${message.user_name}
                     </div>
                     <div class="contents__message__user__date">
                       ${message.date}
                     </div>
                   </div>
                   <div class="contents__message__text">
                     <p class="contents__message__text__content">
                       ${message.content}
                     </p>
                   </div>
                 </div>`  
    }
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.contents').append(html);
      $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);

    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
});
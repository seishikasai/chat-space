$(function(){

  function buildHTML(message){
    if (message.image) {
      var img = `<img src="${message.image}" width = 200 height = 150 >`
      } else {
      var img = ``
      }
      var html =`<div class="contents__message" data-message_id="${message.id}">
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
                       ${img}
                 </div>`
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
      $('form')[0].reset();
      $('.contents').animate({ scrollTop: $('.contents')[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      
    })
    .always(function(){
      $('.submit-btn').prop('disabled', false);
    })
  })

    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.contents__message:last').data('message_id');
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.contents').append(insertHTML);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
    };
  }
  setInterval(reloadMessages, 7000);
});
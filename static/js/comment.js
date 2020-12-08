$(function() {
	(function() {
		var oComment = $(".mm-comment");
		var oReply;
		var flag;
		
		//点赞
		oComment.on("click", ".m-discussPraise", function() {
			var _this = $(this);
			var oIcon = _this.find(".icon-praise");
			var oTotal = _this.find("span:last");
			var total = Number(oTotal.text());

			if(oIcon.hasClass("active")) {
				oIcon.removeClass("active");
				total--;
			} else {
				oIcon.addClass("active");
				total++;
			}
			oTotal.text(total);
		});
		//提交评论
		oComment.on("submit", ".m-form", function() {
			var oForm = $(this);
			var oCommentForm = oForm.closest(".m-commentForm");
			var oTextarea = oForm.find("textarea");
			var oTextarea_val = $.trim(oTextarea.val());
			var htmlStr = '<li class="m-discuss" data-id="636">'+
						'<div class="m-discussThumbnail"><img src="images/head_male_man_32px.png" alt=""></div>'+
						'<div class="m-discussHead"><span class="m-discussNickname">游客</span><span class="m-discussAddress">未知</span></div>'+
						'<div class="m-discussContent">' + oTextarea_val + '</div>' +
						'<div class="m-discussFoot">'+
						'<div class="m-discussTime">刚刚</div>'+
						'<div class="m-discussPraise"><span class="icon icon-praise"></span><span>0</span></div>'+
						'<div class="m-replyBtn">回复</div>'+
						'</div>'+
						'</li>'
						
			if(!oTextarea_val) {
				return false;
			}
			
			if(flag == true){
				console.log(flag);
				$('#m_conmentList').append(htmlStr);
				alert('评论成功')
				oCommentForm.hide();
			}else if(flag == false){
				console.log(flag);
				var _html='<ul class="m-reply">'+
					'<li class="m-reply-item">'+
					'<div class="m-reply-title">游客</div>'+
					'<div class="m-reply-content">'+
					'<div class="m-reply-text">' + oTextarea_val +'</div>'+
					'</div>'+
					'<div class="m-reply-foot">'+
					'<div class="m-reply-time">刚刚</div>'+
					'</div>'+
					'</li>'+
					'</ul>';
					
				var _oHtml='<li class="m-reply-item">'+
					'<div class="m-reply-title">游客</div>'+
					'<div class="m-reply-content">'+
					'<div class="m-reply-text">' + oTextarea_val +'</div>'+
					'</div>'+
					'<div class="m-reply-foot">'+
					'<div class="m-reply-time">刚刚</div>'+
					'</div>'+
					'</li>'
				
				var oItem = oReply.closest('li');
				if(oItem.find(".m-reply").length){
					oItem.find(".m-reply").append(_oHtml);
				}else{
					oItem.find(".m-discussFoot").after(_html);
				}
				alert('评论成功');
				oCommentForm.hide();

			}
			//提交评论或回复
			
			return false;
		});
		//点击发表评论
		oComment.on("click", ".m-s-btn", function() {
			var oCommentForm = oComment.find(".m-commentForm");
			oCommentForm.find(".f-reply").val("");
			flag = true;
			oCommentForm.show();
		});
		//点击对应评论的回复
		oComment.on("click", ".m-replyBtn", function() {
			var _this = $(this);
			oReply = _this;
			var oCommentForm = oComment.find(".m-commentForm");   //回复评论的框
			var oInputReply = oCommentForm.find(".f-reply");    //回复框内容
			var oItem = _this.closest(".m-discuss");
			oInputReply.val(oItem.attr("data-id"));
			flag = false;
			oCommentForm.show();
		});
		//弹出框点击取消按钮
		oComment.on("click", ".f-cancelBtn", function() {
			var oCommentForm = oComment.find(".m-commentForm");
			oCommentForm.hide();
		});
	})();

});
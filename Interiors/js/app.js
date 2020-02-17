"use strict";
 $(document).ready(function(e){
     //SCROLL TOP
     $("#scrollTop").click(function (e) {
         e.preventDefault();
         $('html, body').animate({
             scrollTop: 0
         }, 1000);
     });

     // Modal
     $(".open-modal").click(function () {
         $(".modal_overlay").show();
         $("#modal_form").show(300);
     });

	 if ($('#calculate_block').length){
		 $('#calculate_block').find('input[name="name_design"]').val($('#name_design').text());
	 }
     var example_slider, team_slider, accordion_box, lg_box, lg_video, body;
     body = $('body');
     accordion_box = $('.accordion_box');
     example_slider = $('.example_slider');
     team_slider = $('.team_slider');
     lg_box = $('.lg_box');
     lg_video = $('.lg_video');

	
	setTimeout(function() { 
		var roistatNum = $('.roistat-promo').text();
		$('form').append('<input type="hidden" name="roistat" value="'+ roistatNum +'">'); 
		}, 300);
	
     $(document).on('click', '.btn_go_to', function(e){
         var $this, data_href, obj, negative_height;
         negative_height = $('#stick_block').outerHeight();
         $this = $(this);
         data_href = $this.attr('href') ? $this.attr('href') : $this.attr('data-href');
         obj = $(data_href).eq(0);
         if($this.hasClass('non_negative')) {negative_height = 0;}

         if(obj.length){
             e.preventDefault();
             e.stopPropagation();

             $('html, body').dequeue().stop().animate({scrollTop: parseFloat(obj.offset().top) - negative_height}, 1000);
         } else {
             return 0;
         }
     });

     $(document).on('click', '.color_unit', function(){
         var $this, filter_box, floor_color, wall_color, src;
         $this = $(this);
         filter_box = $this.closest('.filter_box');
         floor_color = '1-' + filter_box.find('input[name=floor_color]:checked').val();
         wall_color = '2-' + filter_box.find('input[name=wall_color]:checked').val();
         src = "img/designer/" + floor_color +  wall_color + '.jpg';
         filter_box.closest('.designer').find('.designer_cover img').attr('src', src);
     });

     /*tabs*/
     $(document).on('click', '.btn_tab', function(e){
         e.stopPropagation();
         e.preventDefault();
         var $this, tab_box, tab_content, btn_tab, data_tab, obj;
         $this = $(this);
         data_tab = $this.attr('data-tab');
         tab_box = $this.closest('.tab_box');
         obj = tab_box.find('.' + data_tab);
         tab_content = tab_box.find('.content_tab');
         btn_tab = tab_box.find('.btn_tab');
         if($this.hasClass('tab_active')){
             return 0;
         } else {
             btn_tab.add(tab_content).removeClass('tab_active');
             $this.add(obj).addClass('tab_active');
         }
     });

     $(window).on('load scroll resize', function(){
         sticking('#stick_block', '.nav_anchor', 1);
     });

     /*menu*/
     $(document).on('click', '.btn_menu', function(){
         body.addClass('menu_active');
     });
     $(document).on('click', '.btn_menu_close', function(){
         body.removeClass('menu_active');
     });
     $(document).on('click', '.menu_active', function(event){
         var e_target;
         e_target = $(event.target);
         if(e_target.closest('.btn_menu').length || e_target.closest('.btn_menu_close').length || e_target.closest('.nav').length){
             return 0;
         } else {
             body.removeClass('menu_active');
         }
     });
     $(document).on('click', '.menu a', function(){
         body.removeClass('menu_active');
     });

     $(document).on('click', '.calculate_item', function(){
         var i, select;
         i = $(this).index();
         select = $('#style_design_select');
         if(select.length) {
             select.find('option').eq(i).prop('selected', true);
         }
     });


     modals_init();

     if($('input[type=tel]').length){
         $('input[type=tel]').mask("(999) 999-99-99");
     }

     var input_num;
     input_num = $(".input_num");
     if(input_num.length){
         input_num.mask('00000');
         input_num.on('input',function(){
             var $this, value;
             $this = $(this);
             value = $this.val();
             if(value.length > 1 && value[0]==='0'){
                 value = value.slice(1);
                 $this.val(value);
             }
             if(value.length === 0){
                 $this.val('0');
             }

         });
         input_num.on('change',function(){
             var $this, value, min, max;
             $this = $(this);
             min = $this.attr('data-min');
             max = $this.attr('data-max');
             if ( has_attr (min)){
                 min = parseInt(min, 10)
             } else {
                 min = undefined;
             }
             if ( has_attr (max)){
                 max = parseInt(max, 10)
             } else {
                 max = undefined;
             }
             if (min !== undefined && $this.val() < min) {
                 $this.val(min);
             }
             if (max !== undefined && $this.val() > max) {
                 $this.val(max);
             }
         });
     }



     $(document).on('focus', '.invalid', function(){
         $(this).removeClass('invalid');
     });

   function modals_init() {
         var modal_win_top, modal_overlay, modal_thank, modal_form;
         modal_overlay = $('#modal_overlay');
         modal_thank = $('#modal_thank');
         modal_form = $('#modal_form');
		 
		$('.btn_user').on('click', function(){
			yaCounter48398150.reachGoal('CHOOSE_STYLE');
		});
		
		$(document).on('click', '.btn_get_modal_form', function(e){
			e.stopPropagation();
			e.preventDefault();

			center_modal(modal_form);
		
		});


         $(document).on('click', '.modal_close', function () {
             var obj = $(this).closest('.modal_wrapper');
             modal_to_close(obj);
         });

         $(document).on('click', '#modal_overlay', function (e) {
             $('html, body').removeAttr('style');
             $('.modal_wrapper').add('#modal_overlay').fadeOut(200);
         });

         $(document).on('click', '.modal_wrapper', function (e) {
             var e_target, $this;
             e_target = $(e.target);
             $this = $(this);
             if (e_target.closest('.modal_block').length === 0) {
                 modal_to_close($this);
             }
         });

  

         function modal_to_close(obj) {
             $('html, body').removeAttr('style');
             obj.scrollTop(0);
             obj.add(modal_overlay).fadeOut(200);
         }

         function center_modal(selector) {
             var obj, body, width_scroll;
             modal_win_top = $(window).scrollTop();
             body = $('body');
             obj = $(selector);
             width_scroll = 0;
             if (obj.length == 0) {
                 console.log('объект не найден');
                 return 0;
             }
             if (is_scroll()) {
                 width_scroll = calc_scroll_width();
             } else {
                 width_scroll = 0;
             }
             $('html').css({'padding-right': width_scroll + 'px'});
             $('body').css({'overflow': 'hidden'});
             obj.css({'top': modal_win_top + 'px'}).add(modal_overlay).fadeIn(200);
         }

         function is_scroll() {
             if ($(document).height() > $(window).height()) {
                 return true;
             } else {
                 return false
             }
         }
         function calc_scroll_width() {
             var hide_block, width_scroll, css_text;
             hide_block = document.createElement('div');
             css_text = "width:100%!important; height:100px; position:fixed; left:100%; top:100%; overflow:scroll;";
             hide_block.id = "hide_block";
             hide_block.setAttribute('style', css_text);
             document.body.appendChild(hide_block);
             width_scroll = parseFloat((hide_block.offsetWidth) - (hide_block.clientWidth), 10);
             hide_block.parentElement.removeChild(hide_block);
             return width_scroll;
         }
     }






 });
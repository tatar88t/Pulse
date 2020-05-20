$(document).ready(function(){
    $('.slider__slides').slick({

        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="slick-prev"><img src="./icons/left_arrow.png" alt=""></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="./icons/right_arrow.png" alt=""></button>',
        responsive: [
            {
                breakpoint: 1095,
                settings: {
                  arrows: false,
                  dots: true
                }
              },    
        ]
      });

        
  ///Modal    
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn();
  });
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #order').fadeOut()
  });

  $('.button_catalog-item-btn').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    })
  })

  //////////////////////
      window.addEventListener('resize', function(){
        if (window.matchMedia("(max-width: 650px)").matches) {
          sliderMobile()
        } 
      });
      
      if (window.matchMedia("(max-width: 650px)").matches) {
        sliderMobile()
      };
      
      /////////////////////
      function tabs() {
        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
          $(this)
            .addClass('catalog__tab_active')
            .siblings().removeClass('catalog__tab_active')
            .closest('div.container')
            .find('div.catalog__content')
            .removeClass('catalog__content_active')
            .eq($(this).index()).addClass('catalog__content_active');

            if (window.matchMedia("(max-width: 650px)").matches) {
              sliderMobile()
            }

        });
      };
      tabs();

      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__main').eq(i).toggleClass('catalog-item__main_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
        })
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back')

  
      function sliderMobile() {
        let slides = document.querySelectorAll('.catalog__content_active .catalog-item'),
            tabs = document.querySelectorAll('.catalog__tab'),
            slideIndex = 1;
        function showSlides(n){
          tabs.forEach(tab => {
              if (n < 1) {slideIndex = slides.length};
              if (n > slides.length) {slideIndex = 1};
          
              if (tab.classList.contains('catalog__tab_active')) {
                slides.forEach(item => {
                  item.style.display = 'none';
                  item.classList.remove('flipInRight');
                });
                slides[slideIndex - 1].style.display = 'block';
                slides[slideIndex - 1].classList.add('flipInRight');
              }  
          });
        }
        function plusSlide(n) {
          showSlides(slideIndex += n)
        }
        showSlides(slideIndex)
        
        
        function swipeLeft(slides) {
          $(slides).each(function(i) {
            $(this).on('swipeleft', { passive: false }, function(e){
              // e.preventDefault();
              plusSlide(1);
            })
            $(this).on('swiperight', { passive: false }, function(e){
              // e.preventDefault();
              plusSlide(-1);
            })
          })
        };


        swipeLeft(slides); 
      };

  // Validation

  function validateForms (form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Введите Имя",
        phone: "Введите номер телефона",
        email: {
          required: "Введите адрес электронной почты",
          email: "Некорректный адрес почты"
        }
      },  
    });
  }
  validateForms('#consultation form');
  validateForms('#consultation-form');
  validateForms('#order form');

//Mask for phonenumber
  $('input[name=phone]').mask("+7 (999) 999-99-99")

//Data sending
  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();

      $('form').trigger('reset');
    });
    return false;
  });

  //Smooth scroll
    $(window).scroll(function(){
      if ($(this).scrollTop()>400){
          $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href='#up']").click(function(){
      let link = $(this).attr("href");
      $("html, body").animate({scrollTop: $(link).offset().top+"px"});
      return false;
    })
    

  });
  
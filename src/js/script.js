$(document).ready(function(){
    $('.slider__slides').slick({

        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="slick-prev"> <img src="../icons/left_arrow.png" alt=""> </button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right_arrow.png" alt=""></button>',
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
                  item.style.display = 'none'
                });
                slides[slideIndex - 1].style.display = 'block';
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
      }


      
      










  });
  
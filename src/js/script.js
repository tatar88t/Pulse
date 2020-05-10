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



      $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

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
        console.log(tabs)
        console.log(slides)

        function showSlides(){
          tabs.forEach(tab => {
            console.log(tab)

          
              if (tab.classList.contains('catalog__tab_active')) {
                slides.forEach(item => {
                  item.style.display = 'none'
                });
                slides[slideIndex - 1].style.display = 'block';
              }
            
            
          })
        }
        showSlides()
      }
      // sliderMobile()
      










  });
  
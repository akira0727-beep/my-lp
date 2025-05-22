$(function(){

  // アコーディオン
  // ---------------------------------------------
  $('.js_acoBtn').click(function () {
    $(this).next().slideToggle();
    $(this).toggleClass('is_active');
    $(this).children(".js_acoIcn").toggleClass('is_active');
  })

  // カルーセル
  // -----------------------------------------
  const slide01 = new Swiper('.js_slide01', {
    loop: true,  //ループ
    loopAdditionalSlides: 2, // loop:trueのときは1以上にする
    slidesPerView: 1.5, // 一度に表示する枚数
    centeredSlides: true, // アクティブなスライドを中央にする
    // autoHeight: true, // 高さ自動調整
    autoplay: {
      delay: 3000,
    },
    navigation: {
      nextEl: '.swiper-button-next01',
      prevEl: '.swiper-button-prev01',
    },
    pagination: {
      el: '.swiper-pagination01',
      type: 'bullets',
      clickable: true,
    },
  });

});


// 追従ボタン
// ---------------------------------------------
const floatAreaClass = "js_floatArea";
const startPosClass = "js_floatStart";
const endPosClass = "js_floatEnd";
const showClass = "is_show";
// 追従ボタンの設定が定義されていないときに表示するエラーメッセージの生成
const generateErrorMsg = (domClass) => `追従ボタンの設定が定義されていません。\n「${domClass}」クラスの付いたDOMを配置してください。`;

window.addEventListener("load", () => {
  try {
    const floatArea = document.querySelector(`.${floatAreaClass}`);
    const startPositions = document.querySelectorAll(`.${startPosClass}`);
    const endPositions = document.querySelectorAll(`.${endPosClass}`);

    if (floatArea == null) {
      throw new Error(generateErrorMsg(floatAreaClass));
    }
    if (startPositions.length == 0) {
      throw new Error(generateErrorMsg(startPosClass));
    }
    if (endPositions.length == 0) {
      throw new Error(generateErrorMsg(endPosClass));
    }

    if (startPositions.length !== endPositions.length) {
      throw new Error("追従ボタンの始点と終点の数が一致しません。");
    }

    // スクロール位置がどれかの始点と終点の間にあるかを判定
    const scrollFunc = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      const isWithinAnyRange = Array.from(startPositions).some((startPosition, i) => {
        const startPos = startPosition.getBoundingClientRect().top + scrollPos;
        const endPos = endPositions[i].getBoundingClientRect().top + scrollPos;

        return startPos < scrollPos && scrollPos < endPos;
      });

      if (isWithinAnyRange) {
        floatArea.classList.add(showClass);
      } else {
        floatArea.classList.remove(showClass);
      }
    };

    window.addEventListener("resize", scrollFunc);
    window.addEventListener("scroll", scrollFunc);
  } catch (e) {
    console.log(e.message);
  }
});
// end 追従ボタン
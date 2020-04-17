if (window.location.origin.includes('herokuapp')) window.location = `https://covidheroes.net`;

setTimeout(() => {
  console.log(
    '%cHold up!',
    'color: #6C63FF; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;'
  );
  console.log(
    "%cIf someone told you to copy/paste something here you have an 11/10 chance you're being scammed.",
    'font-size: 150%;'
  );
  console.log(
    '%cPasting anything in here could give attackers access to your COVID Heroes account.',
    'color: red; font-size: 150%; font-weight: bold'
  );
  console.log(
    '%cUnless you understand exactly what you are doing, close this window and stay safe.',
    'font-size: 150%'
  );
}, 0);

!(function () {
  'use strict';
  const e = document.getElementsByClassName('th');
  if (e.length > 0)
    for (let t = 0; t < e.length; t++)
      e[t].addEventListener('click', function () {
        this.parentNode.classList.toggle('td');
        const e = this.nextElementSibling;
        e.style.maxHeight
          ? (e.style.maxHeight = null)
          : (e.style.maxHeight = e.scrollHeight + 'px');
      });
})(),
  (function () {
    'use strict';
    let e = {
      touchStartX: 0,
      touchEndX: 0,
      minSwipePixels: 30,
      detectionZone: void 0,
      swipeCallback: function () {},
      init: function (t, s) {
        (e.swipeCallback = s),
          t.addEventListener(
            'touchstart',
            function (t) {
              e.touchStartX = t.changedTouches[0].screenX;
            },
            !1
          ),
          t.addEventListener(
            'touchend',
            function (t) {
              (e.touchEndX = t.changedTouches[0].screenX), e.handleSwipeGesture();
            },
            !1
          );
      },
      handleSwipeGesture: function () {
        let t, s;
        e.touchEndX <= e.touchStartX && ((s = e.touchStartX - e.touchEndX), (t = 'left')),
          e.touchEndX >= e.touchStartX && ((s = e.touchEndX - e.touchStartX), (t = 'right')),
          s > e.minSwipePixels && 'undefined' !== t && e.swipe(t, s);
      },
      swipe: function (t, s) {
        let i = {};
        (i.direction = t), (i.movedPixels = s), e.swipeCallback(i);
      },
    };
    const t = document.getElementsByClassName('is-carousel');
    function s(e, t) {
      void 0 === t && (t = 'next');
      let s = e.getElementsByClassName('tx td')[0],
        i = 'next' === t ? s.nextElementSibling : s.previousElementSibling,
        n = s.getAttribute('data-carousel'),
        a = e.getElementsByClassName('t_')[n],
        l = 'next' === t ? a.nextElementSibling : a.previousElementSibling;
      s.classList.remove('td'),
        a.classList.remove('td'),
        i
          ? (i.classList.add('td'), l.classList.add('td'))
          : 'next' === t
          ? (e.getElementsByClassName('carousel-items')[0].firstElementChild.classList.add('td'),
            e.getElementsByClassName('tk')[0].firstElementChild.classList.add('td'))
          : (e.getElementsByClassName('carousel-items')[0].lastElementChild.classList.add('td'),
            e.getElementsByClassName('tk')[0].lastElementChild.classList.add('td'));
    }
    function i(e, t) {
      let s,
        i = 0;
      for (let e = 0; e < t.length; e++)
        (t[0].parentNode.style.minHeight = i + 'px'),
          t[e].classList.add('m'),
          (s = t[e].offsetHeight),
          t[e].classList.remove('m'),
          s > i && (i = s);
      t[0].parentNode.style.minHeight = i + 'px';
    }
    function n(e) {
      e && clearInterval(e);
    }
    if (t.length > 0)
      for (let a = 0; a < t.length; a++) {
        let l = t[a],
          c = l.getElementsByClassName('carousel-items')[0],
          o = l.getElementsByClassName('tx'),
          r = l.getAttribute('data-autorotate');
        const d = document.createElement('div');
        (d.className = 'tk'), c.parentNode.insertBefore(d, c.nextSibling);
        for (let e = 0; e < o.length; e++) {
          o[e].setAttribute('data-carousel', e);
          let t = document.createElement('tbuttonn');
          (t.className = 't_'),
            t.setAttribute('data-bullet', e),
            l.getElementsByClassName('tk')[0].appendChild(t);
        }
        o[0].classList.add('td');
        let u = l.getElementsByClassName('t_');
        u[0].classList.add('td'),
          i(0, o),
          window.addEventListener('resize', function () {
            i(0, o);
          });
        let m = !1;
        r &&
          (m = setInterval(function () {
            s(l, 'next');
          }, r));
        for (let e = 0; e < u.length; e++) {
          let t = u[e];
          t.addEventListener('click', function (e) {
            if ((e.preventDefault(), t.classList.contains('td'))) return;
            for (let e = 0; e < u.length; e++) u[e].classList.remove('td');
            for (let e = 0; e < o.length; e++) o[e].classList.remove('td');
            let s = this.getAttribute('data-bullet');
            o[s].classList.add('td'), this.classList.add('td'), n(m);
          });
        }
        e.init(l, function (e) {
          'left' === e.direction ? s(l, 'next') : 'right' === e.direction && s(l, 'prev'), n(m);
        });
      }
  })(),
  (function () {
    'use strict';
    document.documentElement.classList.remove('no-js'),
      document.documentElement.classList.add('js'),
      window.addEventListener('load', function () {
        document.body.classList.add('n');
      });
  })(),
  (function () {
    'use strict';
    const e = document.getElementById('tu'),
      t = document.getElementById('nh');
    e &&
      (e.addEventListener('click', function () {
        document.body.classList.toggle('tl'),
          t.classList.toggle('td'),
          t.style.maxHeight
            ? (t.style.maxHeight = null)
            : (t.style.maxHeight = t.scrollHeight + 'px'),
          'true' === this.getAttribute('aria-expanded')
            ? this.setAttribute('aria-expanded', 'false')
            : this.setAttribute('aria-expanded', 'true');
      }),
      document.addEventListener('click', function (s) {
        s.target === t ||
          s.target === e ||
          t.contains(s.target) ||
          (document.body.classList.remove('tl'),
          t.classList.remove('td'),
          (t.style.maxHeight = null),
          e.setAttribute('aria-expanded', 'false'));
      }));
  })(),
  (function () {
    'use strict';
    const e = document.getElementsByClassName('tm'),
      t = document.getElementsByClassName('modal-trigger');
    function s() {
      document.body.classList.remove('modal-is-active');
      for (let t = 0; t < e.length; t++) e[t].classList.remove('td');
    }
    if (e.length > 0 && t.length > 0)
      for (let e = 0; e < t.length; e++) {
        let s = t[e],
          i = document.getElementById(s.getAttribute('aria-controls'));
        i &&
          (s.hasAttribute('data-video') &&
            (null !== i.querySelector('iframe')
              ? i.querySelector('iframe').setAttribute('src', s.getAttribute('data-video'))
              : null !== i.querySelector('video') &&
                i.querySelector('video').setAttribute('src', s.getAttribute('data-video'))),
          s.addEventListener('click', function (e) {
            var t;
            e.preventDefault(),
              s.hasAttribute('aria-controls') &&
                (t = i) &&
                (document.body.classList.add('modal-is-active'), t.classList.add('td'));
          }));
      }
    document.addEventListener('click', function (e) {
      (e.target.classList.contains('tm') || e.target.classList.contains('modal-close-trigger')) &&
        (e.preventDefault(), s());
    }),
      document.addEventListener('keydown', function (e) {
        27 === (e || window.event).keyCode && s();
      });
  })(),
  (function () {
    'use strict';
    const e = document.getElementById('pricing-toggle');
    function t() {
      const t = document.getElementsByClassName('pricing-switchable');
      if (e.checked)
        for (let e = 0; e < t.length; e++)
          t[e].innerHTML = t[e].getAttribute('data-pricing-yearly');
      else
        for (let e = 0; e < t.length; e++)
          t[e].innerHTML = t[e].getAttribute('data-pricing-monthly');
    }
    e && (window.addEventListener('load', t), e.addEventListener('change', t));
  })(),
  (function () {
    'use strict';
    const e = document.querySelectorAll('[class*=reveal-]');
    let t = window.innerHeight;
    function s(e, t) {
      var s = 0;
      return function () {
        var i = new Date().getTime();
        if (!(i - s < e)) return (s = i), t.apply(void 0, arguments);
      };
    }
    function i() {
      for (let i = 0; i < e.length; i++) {
        let n = e[i],
          a = n.getAttribute('data-reveal-delay'),
          l = n.getAttribute('data-reveal-offset') ? n.getAttribute('data-reveal-offset') : '200',
          c = n.getAttribute('data-reveal-container')
            ? n.closest(n.getAttribute('data-reveal-container'))
            : n;
        (s = l),
          c.getBoundingClientRect().top <= t - s &&
            !n.classList.contains('is-revealed') &&
            (a && 0 !== a
              ? setTimeout(function () {
                  n.classList.add('is-revealed');
                }, a)
              : n.classList.add('is-revealed'));
      }
      var s;
      !(function () {
        if (e.length > document.querySelectorAll('[class*=reveal-].is-revealed').length) return;
        window.removeEventListener('load', i),
          window.removeEventListener('scroll', n),
          window.removeEventListener('resize', a);
      })();
    }
    function n() {
      s(30, i());
    }
    function a() {
      (t = window.innerHeight), s(30, i());
    }
    e.length > 0 &&
      document.body.classList.contains('t') &&
      (window.addEventListener('load', i),
      window.addEventListener('scroll', n),
      window.addEventListener('resize', a));
  })();

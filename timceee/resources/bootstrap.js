import 'services/helpers';
import 'services/updater';
import 'services/connection';
import 'assets/js/jquery-ui-1.10.2.custom.min';
// import 'masonry-layout/dist/masonry.pkgd.min';

// $(document).ready(() => {
//   $('.masonry-grid').masonry({
//     itemSelector: '.masonry-grid-item',
//     columnWidth: '.masonry-grid-item',
//     percentPosition: true,
//   });
// });

if (process.env.NODE_ENV === 'production') {
  document.addEventListener('contextmenu', (e) => e.preventDefault(), false);
}

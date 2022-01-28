/* global swal notifyMessages */

function show_loader() {
  $(".loader-pg-center").show();
}

function hide_loader() {
  $(".loader-pg-center").hide();
}

function notifyMessages(type, title, message, delay = 3500) {
  notify({
    type, // alert | success | error | warning | info
    title,
    message,
    position: {
      x: 'right', // right | left | center
      y: 'top' // top | bottom | center
    },
    z_index: 999999,
    icon: '<i class="fa fa-paper-plane" aria-hidden="true"></i>',
    size: 'normal', // normal | full | small
    overlay: false, // true | false
    closeBtn: true, // true | false
    overflowHide: true, // true | false
    spacing: 20, // number px
    theme: 'default', // default | dark-theme
    autoHide: true, // true | false
    delay, // number ms
    onShow: null, // function
    onClick: null, // function
    onHide: null, // function
    template: '<div class="notify"><div class="notify-text"></div></div>'
  });
}
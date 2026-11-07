/* ============================================================
   Terminal 彩蛋：sudo join-team
   机密档案面板 — 交互骨架 + 打字机占位内容
   ============================================================ */
(function () {
  var LINES = [
    { text: '> [SYSTEM] Sudo access granted.', tone: 'sys' },
    { text: '> [INFO] Loading classified archives...', tone: 'info' },
    { text: '> [WAITING FOR INPUT] ...', tone: 'wait' }
  ];

  var overlay = null;
  var panel = null;
  var stream = null;
  var exitBtn = null;
  var typingTimer = null;
  var entranceTimer = null;
  var hideTimer = null;
  var isOpen = false;
  var lineIndex = 0;
  var charIndex = 0;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'jt-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML = [
      '<section class="jt-panel" role="dialog" aria-modal="true" aria-label="Join Team secure channel">',
      '  <button class="jt-exit" type="button">[ X ] EXIT SESSION</button>',
      '  <header class="jt-head">',
      '    <span class="jt-tag">CLASSIFIED // CLEARANCE 05</span>',
      '    <h2 class="jt-title">JOIN_TEAM</h2>',
      '    <p class="jt-sub">// secure handshake channel · archive locked</p>',
      '  </header>',
      '  <div class="jt-divider"></div>',
      '  <div class="jt-body">',
      '    <div class="jt-stream"></div>',
      '    <div class="jt-slot"></div>',
      '  </div>',
      '  <footer class="jt-foot">',
      '    <span class="jt-hint">[ PRESS ESC TO RETURN ]</span>',
      '    <span class="jt-uid">SESSION 0x7F3A</span>',
      '  </footer>',
      '</section>'
    ].join('');

    document.body.appendChild(overlay);

    panel = overlay.querySelector('.jt-panel');
    stream = overlay.querySelector('.jt-stream');
    exitBtn = overlay.querySelector('.jt-exit');
    exitBtn.addEventListener('click', closeSession);

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !isOpen) return;
      event.preventDefault();
      event.stopPropagation();
      closeSession();
    }, true);
  }

  function resetStream() {
    clearTimeout(typingTimer);
    lineIndex = 0;
    charIndex = 0;
    if (stream) stream.innerHTML = '';
  }

  function typeLine() {
    if (!isOpen || lineIndex >= LINES.length) return;

    var oldCarets = stream.querySelectorAll('.jt-caret');
    for (var c = 0; c < oldCarets.length; c += 1) {
      oldCarets[c].parentNode.removeChild(oldCarets[c]);
    }

    var item = LINES[lineIndex];
    var line = document.createElement('div');
    line.className = 'jt-line jt-line--' + item.tone;

    var textNode = document.createElement('span');
    line.appendChild(textNode);

    var caret = document.createElement('span');
    caret.className = 'jt-caret';
    line.appendChild(caret);

    stream.appendChild(line);
    charIndex = 0;

    (function step() {
      if (!isOpen) return;
      if (charIndex >= item.text.length) {
        if (lineIndex >= LINES.length - 1) return;
        lineIndex += 1;
        typingTimer = setTimeout(typeLine, 260);
        return;
      }
      textNode.textContent += item.text.charAt(charIndex);
      charIndex += 1;
      typingTimer = setTimeout(step, 18 + Math.random() * 24);
    })();
  }

  function openSession() {
    if (!overlay) build();

    isOpen = true;
    clearTimeout(hideTimer);
    resetStream();

    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');

    var input = document.getElementById('cmd-input');
    if (input) {
      input.value = '';
      input.blur();
    }

    clearTimeout(entranceTimer);
    entranceTimer = setTimeout(typeLine, 420);
  }

  function closeSession() {
    if (!isOpen) return;

    isOpen = false;
    clearTimeout(typingTimer);
    clearTimeout(entranceTimer);

    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');

    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      resetStream();
      if (panel) panel.scrollTop = 0;
    }, 480);

    var input = document.getElementById('cmd-input');
    if (input) {
      input.value = '';
      setTimeout(function () {
        input.focus();
      }, 480);
    }
  }

  window.__openJoinTeam = openSession;
  window.__closeJoinTeam = closeSession;
})();

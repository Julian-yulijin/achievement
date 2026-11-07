/* ============================================================
   System FX — 全屏级系统事件交互
   点击文件树中的技能文件，触发不改变路由的全屏特效
   ============================================================ */

(function () {
  var body = document.body;
  var BODY_CLASSES = ['fx-active', 'fx-frontend', 'fx-backend', 'fx-devtools', 'fx-agent', 'fx-deploy', 'fx-tree-flicker'];

  var layer = document.createElement('div');
  layer.className = 'sys-fx';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = [
    '<canvas class="fx-canvas"></canvas>',
    '<div class="fx-scanlines"></div>',
    '<div class="fx-scanbar"></div>',
    '<div class="fx-vignette"></div>',
    '<div class="fx-hud"><span class="fx-hud-tag">SYSTEM FX // ONLINE</span><span class="fx-hud-clock">00:00:00</span></div>',
    '<div class="fx-center"></div>',
    '<div class="fx-stage"></div>'
  ].join('');
  body.appendChild(layer);

  var canvas = layer.querySelector('.fx-canvas');
  var ctx = canvas.getContext('2d');
  var center = layer.querySelector('.fx-center');
  var stage = layer.querySelector('.fx-stage');
  var hudClock = layer.querySelector('.fx-hud-clock');

  var W = 0;
  var H = 0;
  var active = null;
  var frameId = null;
  var hideTimer = null;
  var clockTimer = null;
  var timers = [];
  var floodTimer = null;
  var floodLines = [];

  var rainCanvas = null;
  var rainCtx = null;
  var rainFrame = null;
  var rainColumns = [];
  var rainDrops = [];

  function later(fn, delay) {
    timers.push(setTimeout(fn, delay));
  }

  function clearTimers() {
    timers.forEach(function (id) {
      clearTimeout(id);
    });
    timers = [];
  }

  function sizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function startLoop(draw) {
    function frame(time) {
      if (!active) return;
      draw(time);
      frameId = requestAnimationFrame(frame);
    }
    frameId = requestAnimationFrame(frame);
  }

  function clearStage() {
    stage.innerHTML = '';
    center.className = 'fx-center';
    center.textContent = '';
  }

  function showCenter(text, extraClass, delay) {
    center.textContent = text;
    center.className = 'fx-center' + (extraClass ? ' ' + extraClass : '');
    later(function () {
      center.classList.add('show');
    }, delay || 0);
  }

  function startClock() {
    function tick() {
      var d = new Date();
      hudClock.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (n) {
        return String(n).padStart(2, '0');
      }).join(':');
    }
    tick();
    clockTimer = setInterval(tick, 1000);
  }

  function clearFxCanvas() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  function openLayer(modeClass, background) {
    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
    clearStage();
    clearFxCanvas();
    layer.style.display = 'block';
    layer.style.background = background || '';
    layer.className = 'sys-fx ' + modeClass;
    void layer.offsetWidth;
    layer.classList.add('active');
    startClock();
  }

  function removeFloodLines() {
    floodLines.forEach(function (line) {
      if (line.parentNode) line.parentNode.removeChild(line);
    });
    floodLines = [];
  }

  function stopRain() {
    if (rainFrame) {
      cancelAnimationFrame(rainFrame);
      rainFrame = null;
    }
    if (rainCanvas && rainCanvas.parentNode) {
      rainCanvas.parentNode.removeChild(rainCanvas);
    }
    rainCanvas = null;
    rainCtx = null;
  }

  function resetState() {
    BODY_CLASSES.forEach(function (cls) {
      body.classList.remove(cls);
    });
    removeFloodLines();
    stopRain();
    if (clockTimer) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
    center.className = 'fx-center';
    center.textContent = '';
    stage.innerHTML = '';
  }

  function stopFx() {
    if (!active) return;

    active = null;
    clearTimers();
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
    if (hideTimer) {
      clearTimeout(hideTimer);
    }
    resetState();
    clearFxCanvas();

    layer.classList.remove('active');
    hideTimer = setTimeout(function () {
      layer.style.display = 'none';
    }, 420);
  }

  /* ---------- 01 / CPU 性能面板 ---------- */
  var blips = [];
  for (var i = 0; i < 14; i += 1) {
    blips.push({ a: Math.random() * Math.PI * 2, r: 0.2 + Math.random() * 0.75, s: 1 + Math.random() * 2 });
  }

  function drawFrontend(time, started) {
    var t = (time - started) / 1000;

    ctx.fillStyle = 'rgba(3, 6, 11, 0.22)';
    ctx.fillRect(0, 0, W, H);

    var cx = Math.min(W * 0.26, 460);
    var cy = H * 0.52;
    var R = Math.min(W * 0.2, H * 0.33, 290);

    ctx.save();
    ctx.translate(cx, cy);

    for (var ring = 1; ring <= 4; ring += 1) {
      ctx.beginPath();
      ctx.arc(0, 0, (R * ring) / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.14)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    for (var spoke = 0; spoke < 8; spoke += 1) {
      var sa = (Math.PI * 2 * spoke) / 8;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(sa) * R, Math.sin(sa) * R);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)';
      ctx.stroke();
    }

    var angle = t * 1.9;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, angle - 0.5, angle);
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 240, 255, 0.1)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * R, Math.sin(angle) * R);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.85)';
    ctx.lineWidth = 1.5;
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.shadowBlur = 0;

    blips.forEach(function (blip, idx) {
      var pulse = 0.45 + 0.55 * Math.abs(Math.sin(t * blip.s + idx));
      var bx = Math.cos(blip.a) * R * blip.r;
      var by = Math.sin(blip.a) * R * blip.r;
      ctx.beginPath();
      ctx.arc(bx, by, 2 + pulse * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, ' + (0.25 + pulse * 0.5) + ')';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fill();

    ctx.restore();

    var colors = ['#00f0ff', '#ff2a6d', '#fcee0a'];
    var rows = [0.27, 0.51, 0.75];
    var x0 = W * 0.5;
    var x1 = W * 0.94;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    for (var gx = x0; gx <= x1; gx += 46) {
      ctx.beginPath();
      ctx.moveTo(gx, H * 0.16);
      ctx.lineTo(gx, H * 0.87);
      ctx.stroke();
    }

    rows.forEach(function (row, idx) {
      var baseY = H * row;
      var amp = H * 0.072;
      var speed = 2 + idx * 0.9;

      ctx.beginPath();
      for (var x = x0; x <= x1; x += 2) {
        var p = (x - x0) / (x1 - x0);
        var envelope = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.4 + idx * 0.9));
        var y = baseY + Math.sin(p * Math.PI * 7 + t * speed) * amp * envelope;
        if (x === x0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.strokeStyle = colors[idx];
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = 0.65;
      ctx.shadowColor = colors[idx];
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
    ctx.strokeRect(W * 0.47, H * 0.12, W * 0.5, H * 0.76);
  }

  function startFrontend() {
    active = 'frontend';
    body.classList.add('fx-active', 'fx-frontend');
    openLayer('mode-frontend', 'radial-gradient(circle at 30% 50%, rgba(0, 34, 48, 0.96), rgba(2, 5, 10, 0.97))');
    showCenter('FRONTEND PERFORMANCE // LIVE TELEMETRY', 'fx-top', 200);
    sizeCanvas();

    var started = 0;
    startLoop(function (time) {
      if (!started) started = time;
      drawFrontend(time, started);
    });

    later(stopFx, 5200);
  }

  /* ---------- 02 / 网络节点拓扑 ---------- */
  var nodes = [];

  function initNodes() {
    nodes = [];
    var count = Math.min(90, Math.max(45, Math.floor((W * H) / 18000)));
    for (var n = 0; n < count; n += 1) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        r: 1.4 + Math.random() * 2.2,
        hue: Math.random() > 0.72 ? 'pink' : 'cyan'
      });
    }
  }

  function drawBackend(time, started) {
    var t = (time - started) / 1000;

    ctx.fillStyle = 'rgba(3, 5, 11, 0.24)';
    ctx.fillRect(0, 0, W, H);

    var linkDist = Math.min(W, H) * 0.19;

    nodes.forEach(function (node) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 0 || node.x > W) node.vx *= -1;
      if (node.y < 0 || node.y > H) node.vy *= -1;
    });

    for (var a = 0; a < nodes.length; a += 1) {
      for (var b = a + 1; b < nodes.length; b += 1) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDist) {
          var alpha = (1 - dist / linkDist) * 0.42;
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.strokeStyle = nodes[a].hue === 'pink' ? 'rgba(255, 42, 109, ' + alpha + ')' : 'rgba(0, 240, 255, ' + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    nodes.forEach(function (node, idx) {
      var pulse = 0.65 + 0.35 * Math.sin(t * 2 + idx);
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = node.hue === 'pink' ? 'rgba(255, 42, 109, 0.85)' : 'rgba(0, 240, 255, 0.85)';
      ctx.shadowColor = node.hue === 'pink' ? '#ff2a6d' : '#00f0ff';
      ctx.shadowBlur = 12;
      ctx.fill();
    });
    ctx.shadowBlur = 0;

    var pulseR = ((t * 260) % (Math.max(W, H) * 0.55));
    var pulseAlpha = 0.28 * (1 - pulseR / (Math.max(W, H) * 0.55));
    ctx.beginPath();
    ctx.arc(W / 2, H / 2, pulseR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 240, 255, ' + pulseAlpha + ')';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function startBackend() {
    active = 'backend';
    body.classList.add('fx-active', 'fx-backend');
    openLayer('mode-backend', 'radial-gradient(circle at 50% 50%, rgba(0, 20, 34, 0.94), rgba(2, 5, 10, 0.97))');
    showCenter('[DATA SYNC] API & Web Environment Online.', '', 500);
    sizeCanvas();
    initNodes();

    var started = 0;
    startLoop(function (time) {
      if (!started) started = time;
      drawBackend(time, started);
    });

    later(stopFx, 5400);
  }

  /* ---------- 03 / 系统环境扫描 ---------- */
  function startDevtools() {
    active = 'devtools';
    body.classList.add('fx-active', 'fx-devtools', 'fx-tree-flicker');
    openLayer('mode-devtools', 'rgba(3, 8, 12, 0.56)');

    later(function () {
      body.classList.remove('fx-tree-flicker');
      showCenter('Environment Verified: VSCode, Git, PowerShell, Trae.', 'fx-plain', 0);
    }, 2200);

    later(stopFx, 4600);
  }

  /* ---------- 04 / 终端接管与代码雨 ---------- */
  function startRain() {
    rainCanvas = document.createElement('canvas');
    rainCanvas.className = 'fx-rain';
    body.appendChild(rainCanvas);
    rainCtx = rainCanvas.getContext('2d');

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    rainCanvas.width = Math.floor(W * dpr);
    rainCanvas.height = Math.floor(H * dpr);
    rainCanvas.style.width = W + 'px';
    rainCanvas.style.height = H + 'px';
    rainCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var fontSize = 16;
    var cols = Math.floor(W / fontSize);
    rainColumns = [];
    rainDrops = [];

    for (var c = 0; c < cols; c += 1) {
      rainDrops.push(Math.random() * -40);
    }

    var glyphs = '01アイウエオカキクケコサシスセソタチツテトナニヌネノDSHAGENT{}[]<>/$#';

    function drawRain() {
      rainCtx.globalCompositeOperation = 'destination-out';
      rainCtx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      rainCtx.fillRect(0, 0, W, H);
      rainCtx.globalCompositeOperation = 'source-over';

      rainCtx.font = fontSize + 'px monospace';
      rainCtx.fillStyle = 'rgba(61, 220, 151, 0.85)';
      rainCtx.shadowColor = 'rgba(61, 220, 151, 0.6)';
      rainCtx.shadowBlur = 6;

      rainDrops.forEach(function (drop, idx) {
        var x = idx * fontSize;
        var y = drop * fontSize;
        var glyph = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
        rainCtx.fillText(glyph, x, y);

        if (y > H && Math.random() > 0.94) {
          rainDrops[idx] = 0;
        } else {
          rainDrops[idx] = drop + 0.55;
        }
      });

      rainCtx.shadowBlur = 0;
      rainFrame = requestAnimationFrame(drawRain);
    }

    drawRain();
  }

  function startFlood() {
    var terminal = document.getElementById('terminal');
    if (!terminal) return;

    var lines = [
      '[AGENT] boot local harness...',
      '[DSH] loading plugin registry',
      '[OK] workspace /dsh/agents linked',
      '[AGENT] dispatch task#042 -> system.scan',
      '[DSH] routing to local runtime',
      '[OK] memory graph synced (128 nodes)',
      '[AGENT] reading process table...',
      '[WARN] background daemon detected',
      '[DSH] requesting elevated context',
      '[OK] context granted by user',
      '[AGENT] optimizing startup sequence',
      '[DSH] executing workflow batch',
      '[OK] 7 tasks scheduled',
      '[AGENT] listening on local socket',
      '[DSH] handshake complete'
    ];

    var idx = 0;

    function pushLine() {
      if (!active) return;

      var line = document.createElement('div');
      line.className = 'line fx-flood';
      line.textContent = lines[idx % lines.length];
      terminal.appendChild(line);
      terminal.scrollTop = terminal.scrollHeight;
      floodLines.push(line);
      idx += 1;

      if (floodLines.length > 220) {
        var old = floodLines.shift();
        if (old.parentNode) old.parentNode.removeChild(old);
      }

      floodTimer = setTimeout(pushLine, 55 + Math.random() * 70);
    }

    pushLine();
  }

  function startAgent() {
    active = 'agent';
    body.classList.add('fx-active', 'fx-agent');
    openLayer('mode-agent', 'transparent');
    showCenter('[DSH AGENT ACTIVATED]', 'fx-agent-title', 100);
    sizeCanvas();
    startRain();
    startFlood();
    later(stopFx, 5200);
  }

  /* ---------- 05 / 全屏部署发射 ---------- */
  var DEPLOY_STAGES = [
    ['Checkout repo...', 24],
    ['Setup Node...', 46],
    ['Hexo generate...', 72],
    ['Deploy to GitHub Pages...', 91],
    ['Complete.', 100]
  ];

  function startDeploy() {
    active = 'deploy';
    body.classList.add('fx-active', 'fx-deploy');
    openLayer('mode-deploy', 'radial-gradient(circle at 50% 50%, rgba(120, 0, 18, 0.94), rgba(24, 0, 6, 0.98))');

    stage.innerHTML = [
      '<div class="fx-deploy-panel">',
      '  <div class="fx-deploy-title">DEPLOY PIPELINE // HEXO <span>ALERT MODE</span></div>',
      '  <div class="fx-progress"><span class="fx-progress-fill"></span></div>',
      '  <div class="fx-progress-meta"><span class="fx-stage-text">Checkout repo...</span><span class="fx-pct">0%</span></div>',
      '</div>'
    ].join('');

    var fill = stage.querySelector('.fx-progress-fill');
    var stageText = stage.querySelector('.fx-stage-text');
    var pct = stage.querySelector('.fx-pct');

    var step = 0;

    function advance() {
      if (!active) return;
      var item = DEPLOY_STAGES[step];
      stageText.textContent = item[0];
      pct.textContent = item[1] + '%';
      fill.style.width = item[1] + '%';

      if (step === 0) {
        fill.classList.add('hot');
      }

      step += 1;

      if (step < DEPLOY_STAGES.length) {
        setTimeout(advance, 620);
      } else {
        later(function () {
          if (!active) return;
          fill.classList.remove('hot');
          fill.classList.add('done');
          var success = document.createElement('div');
          success.className = 'fx-success';
          success.textContent = 'SUCCESS';
          stage.appendChild(success);
          requestAnimationFrame(function () {
            success.classList.add('show');
          });
          later(stopFx, 1500);
        }, 620);
      }
    }

    advance();
  }

  /* ---------- 事件绑定 ---------- */
  var starters = {
    frontend: startFrontend,
    backend: startBackend,
    devtools: startDevtools,
    agent: startAgent,
    deploy: startDeploy
  };

  document.querySelectorAll('[data-fx]').forEach(function (item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();
      var kind = item.getAttribute('data-fx');
      if (starters[kind]) {
        stopFx();
        setTimeout(starters[kind], 40);
      }
    });
  });

  document.querySelectorAll('[data-home]').forEach(function (item) {
    item.addEventListener('click', function (event) {
      if (active) {
        event.preventDefault();
        stopFx();
      }
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && active) {
      event.preventDefault();
      event.stopPropagation();
      stopFx();
    }
  }, true);

  window.addEventListener('resize', function () {
    if (active === 'frontend' || active === 'backend') {
      sizeCanvas();
    }
  });
})();

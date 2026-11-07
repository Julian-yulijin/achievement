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

  function showCenterHTML(html, extraClass, delay) {
    center.innerHTML = html;
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
    stopTopo();
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

    ctx.clearRect(0, 0, W, H);

    var cx = Math.min(W * 0.255, 430);
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

    var waves = [
      { rgb: '0, 240, 255', line: 'rgba(0, 240, 255, 0.85)', y: 0.26, label: 'CH 01 // LATENCY' },
      { rgb: '124, 118, 255', line: 'rgba(140, 132, 255, 0.8)', y: 0.5, label: 'CH 02 // THROUGHPUT' },
      { rgb: '61, 220, 151', line: 'rgba(61, 220, 151, 0.8)', y: 0.74, label: 'CH 03 // RENDER' }
    ];
    var x0 = W * 0.47;
    var x1 = W * 0.93;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.lineWidth = 1;
    for (var gx = x0; gx <= x1; gx += 48) {
      ctx.beginPath();
      ctx.moveTo(gx, H * 0.15);
      ctx.lineTo(gx, H * 0.86);
      ctx.stroke();
    }

    ctx.font = "9px 'JetBrains Mono', Consolas, monospace";

    waves.forEach(function (wave, idx) {
      var baseY = H * wave.y;
      var amp = H * 0.055;
      var speed = t * (1.1 + idx * 0.22);
      var pts = [];

      for (var x = x0; x <= x1; x += 2) {
        var p = (x - x0) / (x1 - x0);
        var env = 0.35 + 0.65 * Math.abs(Math.sin(t * 0.9 + idx * 1.3));
        var y = baseY
          + Math.sin(p * Math.PI * 8 + speed * 2.1) * amp * env
          + Math.sin(p * Math.PI * 19 - speed * 3.2) * amp * 0.16;
        pts.push({ x: x, y: y });
      }

      var grad = ctx.createLinearGradient(0, baseY - amp * 1.9, 0, baseY + amp * 1.2);
      grad.addColorStop(0, 'rgba(' + wave.rgb + ', 0.2)');
      grad.addColorStop(0.68, 'rgba(' + wave.rgb + ', 0.045)');
      grad.addColorStop(1, 'rgba(' + wave.rgb + ', 0)');

      ctx.beginPath();
      ctx.moveTo(pts[0].x, baseY);
      for (var f = 0; f < pts.length; f += 1) {
        ctx.lineTo(pts[f].x, pts[f].y);
      }
      ctx.lineTo(pts[pts.length - 1].x, baseY);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (var s = 1; s < pts.length; s += 1) {
        ctx.lineTo(pts[s].x, pts[s].y);
      }
      ctx.strokeStyle = wave.line;
      ctx.lineWidth = 1.1;
      ctx.shadowColor = wave.line;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = 'rgba(255, 255, 255, 0.24)';
      ctx.fillText(wave.label, x0, baseY - amp * 2.2);
    });

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.06)';
    ctx.lineWidth = 1;
    ctx.strokeRect(W * 0.45, H * 0.12, W * 0.5, H * 0.76);
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
  var SVG_NS = 'http://www.w3.org/2000/svg';
  var topo = null;
  var MAX_LINKS = 170;

  function stopTopo() {
    if (topo && topo.root && topo.root.parentNode) {
      topo.root.parentNode.removeChild(topo.root);
    }
    topo = null;
  }

  function buildTopo() {
    stopTopo();

    var count = Math.min(62, Math.max(34, Math.floor((W * H) / 30000)));
    var root = document.createElement('div');
    root.className = 'fx-topo';

    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'fx-topo-links');
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'none');

    var defs = document.createElementNS(SVG_NS, 'defs');
    var grad = document.createElementNS(SVG_NS, 'linearGradient');
    grad.setAttribute('id', 'fxLinkGrad');
    grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    grad.setAttribute('x1', '0');
    grad.setAttribute('y1', '0');
    grad.setAttribute('x2', String(W));
    grad.setAttribute('y2', String(H));

    [
      ['0', '0'],
      ['0.5', '0.42'],
      ['1', '0']
    ].forEach(function (stop) {
      var node = document.createElementNS(SVG_NS, 'stop');
      node.setAttribute('offset', stop[0]);
      node.setAttribute('stop-color', '#00f0ff');
      node.setAttribute('stop-opacity', stop[1]);
      grad.appendChild(node);
    });

    defs.appendChild(grad);
    svg.appendChild(defs);

    var lineLayer = document.createElementNS(SVG_NS, 'g');
    svg.appendChild(lineLayer);
    root.appendChild(svg);

    var nodeData = [];
    for (var n = 0; n < count; n += 1) {
      var el = document.createElement('div');
      el.className = 'fx-node';
      el.style.animationDuration = (2.6 + Math.random() * 2.2).toFixed(2) + 's';
      el.style.animationDelay = (-Math.random() * 3).toFixed(2) + 's';
      root.appendChild(el);
      nodeData.push({
        el: el,
        x: 8 + Math.random() * Math.max(1, W - 16),
        y: 8 + Math.random() * Math.max(1, H - 16),
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55
      });
    }

    stage.appendChild(root);
    topo = { root: root, nodes: nodeData, lines: [], layer: lineLayer };
  }

  function updateTopo(t) {
    if (!topo) return;

    var nodes = topo.nodes;
    var linkDist = Math.min(W, H) * 0.2;
    var li = 0;

    nodes.forEach(function (node) {
      node.x += node.vx;
      node.y += node.vy;
      if (node.x < 8 || node.x > W - 8) node.vx *= -1;
      if (node.y < 8 || node.y > H - 8) node.vy *= -1;
      node.el.style.transform = 'translate3d(' + node.x.toFixed(1) + 'px,' + node.y.toFixed(1) + 'px,0)';
    });

    for (var a = 0; a < nodes.length && li < MAX_LINKS; a += 1) {
      for (var b = a + 1; b < nodes.length && li < MAX_LINKS; b += 1) {
        var dx = nodes[a].x - nodes[b].x;
        var dy = nodes[a].y - nodes[b].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist >= linkDist) continue;

        var line = topo.lines[li];
        if (!line) {
          line = document.createElementNS(SVG_NS, 'line');
          line.setAttribute('stroke', 'url(#fxLinkGrad)');
          line.setAttribute('stroke-width', '0.85');
          line.setAttribute('stroke-linecap', 'round');
          topo.layer.appendChild(line);
          topo.lines.push(line);
        }

        line.setAttribute('x1', nodes[a].x.toFixed(1));
        line.setAttribute('y1', nodes[a].y.toFixed(1));
        line.setAttribute('x2', nodes[b].x.toFixed(1));
        line.setAttribute('y2', nodes[b].y.toFixed(1));

        var breath = 0.55 + 0.45 * Math.sin(t * 0.9 + (a + b) * 0.12);
        line.setAttribute('stroke-opacity', ((1 - dist / linkDist) * 0.42 * breath).toFixed(3));
        line.style.display = '';
        li += 1;
      }
    }

    for (var m = li; m < topo.lines.length; m += 1) {
      topo.lines[m].style.display = 'none';
    }
  }

  function startBackend() {
    active = 'backend';
    body.classList.add('fx-active', 'fx-backend');
    openLayer('mode-backend', 'radial-gradient(ellipse at 50% 48%, rgba(2, 20, 30, 0.82), rgba(2, 6, 10, 0.93))');
    showCenterHTML(
      '<span class="fx-title-xl">[DATA SYNC]</span>' +
      '<span class="fx-sub">API &amp; Web Environment Online.</span>',
      'fx-split',
      500
    );
    sizeCanvas();
    buildTopo();

    var started = 0;
    startLoop(function (time) {
      if (!started) started = time;
      updateTopo((time - started) / 1000);
    });

    later(stopFx, 5400);
  }

  /* ---------- 03 / 系统环境扫描 ---------- */
  function startDevtools() {
    active = 'devtools';
    body.classList.add('fx-active', 'fx-devtools', 'fx-tree-flicker');
    openLayer('mode-devtools', 'rgba(3, 8, 12, 0.38)');

    later(function () {
      body.classList.remove('fx-tree-flicker');
      showCenterHTML(
        '<span class="fx-title-xl">Environment Verified</span>' +
        '<span class="fx-sub">VSCODE · GIT · POWERSHELL · TRAE</span>' +
        '<span class="fx-sub">SIGNATURE MATCHED // 4 / 4 MODULES NOMINAL</span>',
        'fx-split',
        0
      );
    }, 2200);

    later(stopFx, 4600);
  }

  /* ---------- 04 / 终端接管与代码雨 ---------- */
  function startRain() {
    rainCanvas = document.createElement('canvas');
    rainCanvas.className = 'fx-rain';
    layer.appendChild(rainCanvas);
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
    showCenterHTML(
      '<span class="fx-title-xl">[DSH AGENT ACTIVATED]</span>' +
      '<span class="fx-sub">LOCAL HARNESS // SESSION ONLINE</span>',
      'fx-split fx-agent-block',
      100
    );
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
    openLayer('mode-deploy', 'radial-gradient(ellipse at 50% 46%, rgba(38, 4, 16, 0.74), rgba(6, 6, 9, 0.94))');

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
    if (!active) return;
    sizeCanvas();
    if (active === 'backend') {
      buildTopo();
    }
  });
})();

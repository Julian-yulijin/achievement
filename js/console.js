/* ============================================================
   Frontend Console — 交互脚本
   A. GitHub 实时看板 (原生 fetch)
   B. 纯前端 CLI 终端
   C. 技能拓扑图 (Canvas)
   无后端、无第三方依赖
   ============================================================ */

(function () {
  "use strict";

  var GITHUB_USER = "Julian-yulijin";

  /* ----------------------------------------------------------
     预置数据（前端字符串 / 数组，不依赖任何接口）
     ---------------------------------------------------------- */
  var PROJECT_NAMES = ["Lotia", "Agent-Workflow", "Calender", "Nihongo", "Xigai"];

  var skillsData = [
    {
      name: "HTML / CSS",
      level: 88,
      thought: "像素级的执念：一个 flex 布局调三遍，直到栅格和呼吸感都对。"
    },
    {
      name: "JavaScript",
      level: 82,
      thought: "事件循环教会我耐心；原生 API 写多了，才真正理解框架在做什么。"
    },
    {
      name: "Git",
      level: 72,
      thought: "分支是时间机器，但 rebase 前一定先备份——这是用眼泪换来的经验。"
    },
    {
      name: "VSCode",
      level: 78,
      thought: "快捷键已经长进肌肉记忆，侧边栏就是我的第二张桌面。"
    },
    {
      name: "Hexo",
      level: 66,
      thought: "静态站的浪漫：一次构建，随手托管，不需要一台服务器也能上线。"
    },
    {
      name: "Node.js",
      level: 42,
      thought: "会写脚本、会用 npm，但后端的世界还需要继续补课。"
    }
  ];

  /* ----------------------------------------------------------
     B. 终端
     ---------------------------------------------------------- */
  var terminal = document.getElementById("terminal");
  var cmdForm = document.getElementById("cmd-form");
  var cmdInput = document.getElementById("cmd-input");
  var statusGhDot = document.getElementById("gh-status-dot");
  var statusGhText = document.getElementById("gh-status-text");
  var history = [];
  var historyIndex = -1;

  function timestamp() {
    var d = new Date();
    function pad(n) {
      return n < 10 ? "0" + n : String(n);
    }
    return pad(d.getHours()) + ":" + pad(d.getMinutes()) + ":" + pad(d.getSeconds());
  }

  function appendLine(text, type, withStamp) {
    var line = document.createElement("div");
    line.className = "term-line" + (type ? " " + type : "");
    if (withStamp) {
      var stamp = document.createElement("span");
      stamp.className = "ts";
      stamp.textContent = "[" + timestamp() + "]";
      line.appendChild(stamp);
    }
    line.appendChild(document.createTextNode(text));
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
    return line;
  }

  function echoCommand(cmd) {
    var line = document.createElement("div");
    line.className = "term-line term-cmd";

    var prompt = document.createElement("span");
    prompt.className = "prompt-inline";
    prompt.textContent = "julian@frontend:~$";

    line.appendChild(prompt);
    line.appendChild(document.createTextNode(" " + cmd));
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  function printHelp() {
    appendLine("Available commands:", "output");
    [
      ["help", "show this help"],
      ["ls projects", "list all projects"],
      ["cd <page>", "go to projects / notes / about"],
      ["cat about", "who am i"],
      ["git push", "simulate a git push"],
      ["clear", "clear the terminal"]
    ].forEach(function (item) {
      appendLine("  " + item[0].padEnd(14, " ") + item[1], "output");
    });
  }

  function printProjects() {
    appendLine(PROJECT_NAMES.join("/ ") + "/", "output");
  }

  function printAbout() {
    appendLine(
      "Frontend Student. Love coding and exploring AI Agents. Let's build something cool.",
      "output"
    );
  }

  function printGitPush() {
    appendLine(
      "Enumerating objects... done. To github.com:Julian-yulijin/achievement.git -> master -> master",
      "output"
    );
  }

  function printWelcome() {
    appendLine(
      "Welcome, Seniors! 很高兴能和大家一起组队，随时准备开工！",
      "welcome"
    );
  }

  function handleCd(rawArg) {
    var basePath = document.body.getAttribute("data-root") || "/";
    var arg = rawArg.replace(/^\.?\//, "").replace(/\/+$/, "").toLowerCase();

    if (arg === "" || arg === "~" || arg === "..") {
      appendLine("cd: return to console...", "info");
      setTimeout(function () {
        window.location.href = basePath;
      }, 360);
      return;
    }

    if (arg === "projects" || arg === "notes" || arg === "about") {
      appendLine("cd: entering /" + arg + "/ ...", "info");
      setTimeout(function () {
        window.location.href = basePath + arg + "/";
      }, 360);
      return;
    }

    appendLine("cd: no such directory: " + rawArg, "error");
    appendLine("     available: projects / notes / about", "muted");
  }

  function runCommand(raw) {
    var cmd = raw.trim();
    if (!cmd) {
      return;
    }

    echoCommand(cmd);
    history.push(cmd);
    historyIndex = -1;

    var normalized = cmd.replace(/\s+/g, " ").toLowerCase();

    if (normalized === "cd" || normalized.indexOf("cd ") === 0) {
      handleCd(cmd.replace(/^cd\b\s*/i, "").trim());
      return;
    }

    if (normalized === "help") {
      printHelp();
    } else if (normalized === "clear") {
      terminal.innerHTML = "";
    } else if (normalized === "ls projects") {
      printProjects();
    } else if (normalized === "cat about") {
      printAbout();
    } else if (normalized === "git push") {
      printGitPush();
    } else if (normalized === "hello" || normalized === "team") {
      printWelcome();
    } else {
      appendLine("bash: command not found: " + cmd, "error");
    }
  }

  cmdForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = cmdInput.value;
    cmdInput.value = "";
    runCommand(value);
  });

  var panelClear = document.getElementById("panel-clear");
  if (panelClear) {
    panelClear.addEventListener("click", function () {
      terminal.innerHTML = "";
      cmdInput.focus();
    });
  }

  cmdInput.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
      e.preventDefault();
      terminal.innerHTML = "";
      return;
    }
    if (e.key === "ArrowUp") {
      if (!history.length) return;
      e.preventDefault();
      if (historyIndex === -1) {
        historyIndex = history.length - 1;
      } else if (historyIndex > 0) {
        historyIndex -= 1;
      }
      cmdInput.value = history[historyIndex];
    } else if (e.key === "ArrowDown") {
      if (historyIndex === -1) return;
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex += 1;
        cmdInput.value = history[historyIndex];
      } else {
        historyIndex = -1;
        cmdInput.value = "";
      }
    }
  });

  terminal.addEventListener("click", function () {
    cmdInput.focus();
  });

  /* 启动日志 */
  var bootLines = [
    ["[BOOT] frontend console v2.3.0 — static build, zero backend", "info"],
    ["[BOOT] runtime: browser / ES2017 / canvas 2d", "muted"],
    ["[HINT] 输入 help 查看指令；对了，试着向学长学姐打个招呼。", "muted"]
  ];

  bootLines.forEach(function (item, i) {
    setTimeout(function () {
      appendLine(item[0], item[1], true);
    }, i * 180);
  });

  /* ----------------------------------------------------------
     A. GitHub 看板
     ---------------------------------------------------------- */
  var ghProfile = document.getElementById("gh-profile");
  var ghRepos = document.getElementById("gh-repos");
  var ghState = document.getElementById("gh-state");
  var ghSync = document.getElementById("gh-sync");

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function setGitHubStatus(online) {
    if (statusGhDot) {
      statusGhDot.classList.toggle("offline", !online);
    }
    if (statusGhText) {
      statusGhText.textContent = online ? "GitHub: online" : "GitHub: offline";
    }
    if (ghState) {
      var dot = ghState.querySelector(".state-dot");
      if (!dot) {
        dot = document.createElement("span");
        dot.className = "state-dot";
        ghState.insertBefore(dot, ghState.firstChild);
      }
      dot.classList.toggle("live", online);
      var label = ghState.querySelector(".state-label");
      if (!label) {
        label = document.createElement("span");
        label.className = "state-label";
        ghState.appendChild(label);
      }
      label.textContent = online ? "live" : "offline";
    }
  }

  function timeAgo(iso) {
    var diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return "刚刚";
    if (diff < 3600) return Math.floor(diff / 60) + " 分钟前";
    if (diff < 86400) return Math.floor(diff / 3600) + " 小时前";
    if (diff < 86400 * 30) return Math.floor(diff / 86400) + " 天前";
    return new Date(iso).toISOString().slice(0, 10);
  }

  function languageColor(lang) {
    var palette = {
      JavaScript: "#fcee0a",
      TypeScript: "#00f0ff",
      HTML: "#ff2a6d",
      CSS: "#9d4edd",
      Vue: "#00ff9c",
      Python: "#3b82f6",
      Java: "#f97316"
    };
    return palette[lang] || "#9d4edd";
  }

  function renderProfile(user) {
    ghProfile.classList.remove("skeleton");
    ghProfile.innerHTML =
      '<img class="gh-avatar" id="gh-avatar" src="' +
      escapeHtml(user.avatar_url) +
      '" alt="' +
      escapeHtml(user.login) +
      ' avatar">' +
      '<div class="gh-meta">' +
      '<div class="gh-name">' +
      escapeHtml(user.name || user.login) +
      ' <span class="gh-login">@' +
      escapeHtml(user.login) +
      "</span></div>" +
      '<p class="gh-bio">' +
      escapeHtml(user.bio || "No bio provided. Code speaks louder.") +
      "</p>" +
      '<div class="gh-stats">' +
      '<div class="gh-stat"><b>' +
      user.public_repos +
      "</b><span>REPOS</span></div>" +
      '<div class="gh-stat"><b>' +
      user.followers +
      "</b><span>FOLLOWERS</span></div>" +
      '<div class="gh-stat"><b>' +
      user.following +
      "</b><span>FOLLOWING</span></div>" +
      "</div></div>";

    var avatar = document.getElementById("gh-avatar");
    if (avatar) {
      avatar.addEventListener("error", function () {
        avatar.alt = "avatar unavailable";
        avatar.src =
          "data:image/svg+xml," +
          encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="62" height="62"><rect width="62" height="62" fill="#0b1019"/><text x="31" y="36" font-family="monospace" font-size="16" fill="#00f0ff" text-anchor="middle">DEV</text></svg>'
          );
      });
    }
  }

  function renderRepos(repos) {
    if (!ghRepos) return;

    var sorted = repos.slice().sort(function (a, b) {
      return new Date(b.pushed_at) - new Date(a.pushed_at);
    });

    if (!sorted.length) {
      ghRepos.innerHTML =
        '<div class="repo-placeholder">该账号暂无公开仓库。</div>';
      return;
    }

    ghRepos.innerHTML = sorted
      .map(function (repo) {
        var lang = repo.language || "Unknown";
        return (
          '<a class="repo-card" href="' +
          escapeHtml(repo.html_url) +
          '" target="_blank" rel="noopener noreferrer">' +
          '<div class="repo-top"><span class="repo-name">' +
          escapeHtml(repo.name) +
          '</span><span class="repo-time">' +
          timeAgo(repo.pushed_at) +
          "</span></div>" +
          '<p class="repo-desc">' +
          escapeHtml(repo.description || "No description yet.") +
          "</p>" +
          '<div class="repo-meta">' +
          '<span><i class="lang-dot" style="background:' +
          languageColor(lang) +
          ";box-shadow:0 0 8px " +
          languageColor(lang) +
          '"></i>' +
          escapeHtml(lang) +
          "</span>" +
          '<span class="repo-stars">★ ' +
          repo.stargazers_count +
          "</span>" +
          "</div></a>"
        );
      })
      .join("");
  }

  function renderGitHubError() {
    if (ghProfile) ghProfile.classList.remove("skeleton");
    var offline =
      "[OFFLINE] GitHub API 暂不可用，请直接访问 github.com/Julian-Yulijin";
    if (ghSync) {
      ghSync.classList.add("error");
      ghSync.textContent = offline;
    }
    if (ghProfile) {
      ghProfile.innerHTML =
        '<div class="gh-loading">[OFFLINE] GitHub API 暂不可用，请直接访问 ' +
        '<a href="https://github.com/Julian-Yulijin" target="_blank" rel="noopener noreferrer">github.com/Julian-Yulijin</a></div>';
    }
    if (ghRepos) {
      ghRepos.innerHTML = "";
    }
    setGitHubStatus(false);
  }

  function getJSON(url) {
    return fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "Julian-Yulijin-Portfolio"
      }
    }).then(function (res) {
      if (!res.ok) {
        var err = new Error("HTTP " + res.status + " " + res.statusText);
        err.status = res.status;
        throw err;
      }
      return res.json();
    });
  }

  function loadGitHub() {
    appendLine("[INFO] fetching data from github api...", "info", true);
    if (ghSync) {
      ghSync.classList.remove("error");
      ghSync.textContent = "> connecting to api.github.com ...";
    }

    var timeout = new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error("request timeout"));
      }, 12000);
    });

    Promise.race([
      Promise.all([
        getJSON(
          "https://api.github.com/users/" +
            encodeURIComponent(GITHUB_USER)
        ),
        getJSON(
          "https://api.github.com/users/" +
            encodeURIComponent(GITHUB_USER) +
            "/repos?per_page=100&sort=pushed"
        )
      ]),
      timeout
    ])
      .then(function (results) {
        var user = results[0];
        var repos = results[1];

        appendLine("[SUCCESS] 200 OK", "success", true);
        if (ghSync) {
          ghSync.classList.remove("error");
          ghSync.textContent = "> 200 OK - Data synced.";
        }
        appendLine(
          "[DATA] " +
            user.public_repos +
            " public repos / " +
            repos.length +
            " fetched via REST v3",
          "muted",
          true
        );

        renderProfile(user);
        renderRepos(repos);
        setGitHubStatus(true);
      })
      .catch(function () {
        renderGitHubError();
      });
  }

  /* ----------------------------------------------------------
     C. 技能拓扑图 (Canvas)
     ---------------------------------------------------------- */
  var canvas = document.getElementById("skills-canvas");
  var tip = document.getElementById("skill-tip");

  if (canvas && ctxSupported(canvas)) {
    initSkillsGraph(canvas, tip);
  }

  function ctxSupported(canvasEl) {
    return !!canvasEl.getContext("2d");
  }

  function initSkillsGraph(canvasEl, tipEl) {
    var ctx = canvasEl.getContext("2d");
    var wrap = canvasEl.parentElement;
    var width = 0;
    var height = 0;
    var dpr = 1;
    var nodes = [];
    var hovered = -1;
    var hoverScale = [];

    skillsData.forEach(function (s, i) {
      hoverScale[i] = 1;
    });

    function levelColor(level) {
      var t = Math.min(1, Math.max(0, level / 100));
      var from = [157, 78, 221];
      var to = [0, 240, 255];
      var r = Math.round(from[0] + (to[0] - from[0]) * t);
      var g = Math.round(from[1] + (to[1] - from[1]) * t);
      var b = Math.round(from[2] + (to[2] - from[2]) * t);
      return "rgb(" + r + "," + g + "," + b + ")";
    }

    function layout() {
      var rect = wrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasEl.width = Math.round(width * dpr);
      canvasEl.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var cx = width / 2;
      var cy = height / 2;
      var radius = Math.min(width * 0.36, height * 0.36);
      radius = Math.max(radius, 88);

      nodes = skillsData.map(function (s, i) {
        var angle = -Math.PI / 2 + (i * Math.PI * 2) / skillsData.length;
        return {
          name: s.name,
          level: s.level,
          thought: s.thought,
          color: levelColor(s.level),
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          angle: angle,
          baseR: 9 + s.level / 8
        };
      });

      nodes.cx = cx;
      nodes.cy = cy;
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      // 背景同心圆
      ctx.save();
      ctx.strokeStyle = "rgba(0, 240, 255, 0.06)";
      ctx.lineWidth = 1;
      [0.55, 0.8, 1.05].forEach(function (k) {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.36 * k, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.restore();

      var cx = nodes.cx;
      var cy = nodes.cy;
      var pulse = 0.5 + 0.5 * Math.sin(time / 900);

      // 连线
      nodes.forEach(function (n, i) {
        var alpha = 0.1 + n.level / 400;
        var grad = ctx.createLinearGradient(cx, cy, n.x, n.y);
        grad.addColorStop(0, "rgba(0, 240, 255, " + (alpha + 0.08) + ")");
        grad.addColorStop(1, "rgba(157, 78, 221, " + alpha + ")");

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = i === hovered ? 2 : 1;
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.x, n.y);
        ctx.stroke();

        // 数据流粒子
        var t = ((time / 2600 + i / skillsData.length) % 1);
        var px = cx + (n.x - cx) * t;
        var py = cy + (n.y - cy) * t;
        ctx.beginPath();
        ctx.fillStyle = "rgba(224, 240, 255, " + (0.18 + 0.5 * Math.sin(Math.PI * t)) + ")";
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      });

      // 中心节点
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 240, 255, 0.08)";
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(0, 240, 255, 0.7)";
      ctx.shadowColor = "rgba(0, 240, 255, 0.6)";
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(cx, cy, 26 + pulse * 4, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 42, 109, " + (0.35 - pulse * 0.2) + ")";
      ctx.stroke();

      ctx.fillStyle = "#00f0ff";
      ctx.font = "600 11px " + getComputedStyle(document.body).fontFamily;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("DEV", cx, cy);
      ctx.restore();

      // 技能节点
      nodes.forEach(function (n, i) {
        var targetScale = i === hovered ? 1.45 : 1;
        hoverScale[i] += (targetScale - hoverScale[i]) * 0.18;
        var scale = hoverScale[i];
        var radius = n.baseR * scale;

        // 外圈脉冲
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius + 5 + pulse * 3, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(0, 240, 255, " + (i === hovered ? 0.5 : 0.12) + ")";
        ctx.lineWidth = 1;
        ctx.stroke();

        // 节点主体
        ctx.save();
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        var nodeGrad = ctx.createRadialGradient(
          n.x - radius * 0.3,
          n.y - radius * 0.3,
          radius * 0.2,
          n.x,
          n.y,
          radius
        );
        nodeGrad.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        nodeGrad.addColorStop(0.25, n.color);
        nodeGrad.addColorStop(1, "rgba(6, 10, 18, 0.9)");
        ctx.fillStyle = nodeGrad;
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 10 + n.level / 6;
        ctx.stroke();
        ctx.restore();

        // 标签
        ctx.save();
        ctx.fillStyle = i === hovered ? "#e0f6ff" : "#9fb3c8";
        ctx.font =
          (i === hovered ? "600 " : "400 ") +
          "11px " +
          getComputedStyle(document.body).fontFamily;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(n.name, n.x, n.y + radius + 8);
        ctx.restore();
      });

      requestAnimationFrame(draw);
    }

    function showTip(node, event) {
      var rect = wrap.getBoundingClientRect();
      var x = (event ? event.clientX - rect.left : node.x);
      var y = node.y - 18;

      tipEl.innerHTML =
        '<div class="tip-name">' +
        escapeHtml(node.name) +
        "</div>" +
        '<div class="tip-level"><div class="tip-bar"><i style="width:' +
        node.level +
        '%"></i></div><span class="tip-pct">' +
        node.level +
        "%</span></div>" +
        '<p class="tip-thought">' +
        escapeHtml(node.thought) +
        "</p>";

      tipEl.style.left = Math.min(Math.max(x, 118), width - 118) + "px";
      tipEl.style.top = Math.max(y, 60) + "px";
      tipEl.classList.add("show");
    }

    function hideTip() {
      tipEl.classList.remove("show");
    }

    function hitTest(mx, my) {
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var r = n.baseR * 1.45;
        if ((mx - n.x) * (mx - n.x) + (my - n.y) * (my - n.y) <= r * r) {
          return i;
        }
      }
      return -1;
    }

    canvasEl.addEventListener("mousemove", function (e) {
      var rect = canvasEl.getBoundingClientRect();
      var mx = e.clientX - rect.left;
      var my = e.clientY - rect.top;
      var idx = hitTest(mx, my);

      if (idx !== hovered) {
        hovered = idx;
        canvasEl.style.cursor = idx >= 0 ? "pointer" : "default";
        if (idx >= 0) {
          showTip(nodes[idx], e);
        } else {
          hideTip();
        }
      } else if (idx >= 0) {
        showTip(nodes[idx], e);
      }
    });

    canvasEl.addEventListener("mouseleave", function () {
      hovered = -1;
      hoverScale = hoverScale.map(function () {
        return 1;
      });
      hideTip();
    });

    canvasEl.addEventListener("click", function (e) {
      var rect = canvasEl.getBoundingClientRect();
      var mx = e.clientX - rect.left;
      var my = e.clientY - rect.top;
      var idx = hitTest(mx, my);
      if (idx >= 0) {
        appendLine("[SKILL] " + nodes[idx].name + " — " + nodes[idx].thought, "info", true);
      }
    });

    var resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        layout();
        hideTip();
      }, 120);
    });

    layout();
    requestAnimationFrame(draw);
  }

  /* ----------------------------------------------------------
     启动
     ---------------------------------------------------------- */
  if (ghProfile && ghRepos) {
    loadGitHub();
  }
})();

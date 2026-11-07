/* ============================================================
   projectData — 项目详情数据
   后续只需要替换这里的文字、仓库链接和 images 路径即可。
   images 路径相对于站点根目录，例如：
   "images/projects/lotia/01-overview.png"
   ============================================================ */

const projectData = {
  lotia: {
    kicker: 'PROJECT 01 / FULL-STACK',
    title: 'Lotia',
    status: 'IN PROGRESS',
    accent: '#00f0ff',
    accentSoft: 'rgba(0, 240, 255, 0.16)',
    description: '从纯前端起步的全栈初探项目。在 AI 的全程指导下，完成了页面搭建、后端初步构建，并跑通了用户注册登录与前后端通信。',
    stack: ['HTML/CSS', 'JavaScript', 'Node.js', 'REST API'],
    experience: [
      {
        label: '学习成果与实践',
        text: '在 AI 辅助下，我完成了从纯静态页面到全栈应用的跨越：\n  1. 学习了 HTML/CSS/JS 的前端搭建方式。\n  2. 成功跑通了前后端通信，实现了注册与登录。\n  3. 深入了解了后端的 API 接口设计、Web 运行环境等具体核心概念。'
      },
      {
        label: '踩坑 01：跨越纯前端到后端的认知壁垒',
        text: '问题：起初对服务器和接口的概念十分模糊，不知道数据如何流转。解决：在 AI 的引导下，通过实际动手写请求，终于弄懂了什么是 Request/Response，理清了 Web 环境的运作机制。'
      },
      {
        label: '踩坑 02：利用 AI 工具排查报错',
        text: '问题：在本地调试时遇到环境配置和跨域网络报错，难以独立定位。解决：学会将报错信息喂给 AI，并按照指导一步步排查，学会了如何高效利用 Prompt 驱动 AI 辅助开发。'
      }
    ],
    repoUrl: 'https://github.com/Julian-Yulijin/Lotia',
    demoUrl: 'https://julian-yulijin.github.io/Lotia/',
    qrUrl: 'https://julian-yulijin.github.io/Lotia/',
    images: [
      {
        path: 'images/projects/lotia/01-interface.png',
        caption: '图 01：Lotia 界面效果'
      },
      {
        path: 'images/projects/lotia/02-debug.png',
        caption: '图 02：前后端交互调试截图'
      }
    ]
  },

  agent: {
    kicker: 'PROJECT 02 / AUTOMATION',
    title: 'Agent-Workflow',
    status: 'ACTIVE',
    accent: '#ff2a6d',
    accentSoft: 'rgba(255, 42, 109, 0.16)',
    description: '从使用 AI 辅助编程，到开发日常提效工具，最终为了更智能地管理电脑，亲手配置并落地了本地 DeepSeek Harness (DSH) Agent 工作流。',
    stack: ['Trae', 'DeepSeek Harness', 'Agent', 'Local Automation'],
    experience: [
      {
        label: '技术演进与实践',
        text: '我的 AI 辅助开发之路经历了三个阶段的跨越：\n  1. 编程辅助：在开发过程中，大量运用 Trae 解决日常代码难题。\n  2. 工具落地：利用 Trae 开发了日常小工具，把 AI 变成了生产力。\n  3. Agent 进阶：为了实现对电脑的深度管理和智能调度，将目光转向 DSH，亲手完成了插件的配置，并成功使用 DSH 来辅助管理电脑。'
      },
      {
        label: '演进 01：从写代码到造工具',
        text: '通过 Trae 跨越了单纯解决报错的阶段，开始将其作为核心开发引擎，独立主导开发了日常所需的 Xigai 和 Calendar 工具。把需求直接转化为实际落地的产品。'
      },
      {
        label: '演进 02：迈向 Agent 自动化',
        text: '不再满足于单一工具的编写，为了实现对电脑的深度管理和复杂任务的智能调度，主动学习并亲手配置了 DSH 环境，完成了从传统开发者向 Agent 编排者视角的转变。'
      }
    ],
    repoUrl: null,
    demoUrl: null,
    qrUrl: null,
    sandbox: true,
    images: [
      {
        path: 'images/projects/agent/01-dsh-console.png',
        caption: '图 01：DSH Agent 运行与任务管理控制台'
      },
      {
        path: 'images/projects/agent/02-trae-tools.png',
        caption: '图 02：利用 DSH 辅助开发的日常工具界面'
      }
    ]
  },

  calender: {
    kicker: 'PROJECT 03 / TOOL',
    title: 'Calender',
    status: 'BUILDING',
    accent: '#9d4edd',
    accentSoft: 'rgba(157, 78, 221, 0.18)',
    description: '基于 TypeScript 开发的本地日程管理工具。完全使用 Trae 辅助生成，用于标注日常生活中的重要事项，纯粹为了便利生活。',
    stack: ['TypeScript', 'Trae'],
    experience: [
      {
        label: '开发模式：AI 驱动与需求落地',
        text: '我对 TypeScript 语言本身并不精通。这个项目的核心不在于手写代码，而在于：\n  1. 需求描述：将日常需要记录重要事项的痛点，转化为清晰的功能需求。\n  2. AI 全量生成：全程依赖 Trae 进行代码编写，我负责审查逻辑、提出修改意见和调试。\n  3. 价值体现：代码由 AI 生成，但我收获了实实在在好用的日程管理工具。'
      },
      {
        label: '实践：理解“提示词即代码”',
        text: '问题：完全不懂语法，无法直接修改报错的代码。解决：不再去死磕 TS 语法，而是把报错信息喂给 Trae，用自然语言要求它修正，学会了将 AI 作为“外包工程师”来主导开发。'
      },
      {
        label: '实践 02：强类型思维的初步感知',
        text: '问题：早期对 TypeScript 的强类型约束不习惯。解决：在借助 Trae 开发的过程中，通过阅读它生成的 Type 定义，逐步感知了接口和数据类型的设计思想。'
      }
    ],
    repoUrl: 'https://github.com/Julian-Yulijin/Calender',
    demoUrl: 'https://julian-yulijin.github.io/calender/',
    qrUrl: 'https://julian-yulijin.github.io/calender/',
    images: [
      {
        path: 'images/projects/calender/01-ui.png',
        caption: '图 01：Calender 本地界面截图'
      },
      {
        path: 'images/projects/calender/02-trae-chat.png',
        caption: '图 02：在 Trae 中辅助开发的对话界面'
      }
    ]
  },

  nihongo: {
    kicker: 'PROJECT 04 / LEARNING TOOL',
    title: 'Nihongo',
    status: 'BUILDING',
    accent: '#fcee0a',
    accentSoft: 'rgba(252, 238, 10, 0.12)',
    description: '完全由 Trae 辅助生成的日语学习与单词背诵工具。用于解决日常日语学习中的痛点，让学习更高效。',
    stack: ['Trae', 'JavaScript'],
    experience: [
      {
        label: '开发理念：用 AI 解决日常痛点',
        text: '和 Calendar 类似，这也是一款完全由 AI 生成的提效小工具。日常背单词容易枯燥，我就把想要的复习逻辑、词库展示效果描述给 Trae，让它直接产出可用的代码。我不写底层实现，我只负责定义产品该长什么样。'
      },
      {
        label: '实践：将生活痛点转化为代码',
        text: '问题：市面上的工具不满足个性化背诵需求。解决：通过与 AI 多轮对话，精准表达想要的交互效果，最终生成了一个完全贴合自己学习习惯的本地工具。'
      },
      {
        label: '实践：纯 AI 驱动的快速迭代',
        text: '问题：如何在不学新语言的情况下实现复杂逻辑？解决：依靠 Trae 强大的代码生成能力，只要需求提得够细，它就能直接交付，让我体验到了“一句话一个功能”的极速迭代。'
      }
    ],
    repoUrl: 'https://github.com/Julian-Yulijin/Nihongo',
    demoUrl: 'https://julian-yulijin.github.io/nihongo/',
    qrUrl: 'https://julian-yulijin.github.io/nihongo/',
    images: [
      {
        path: 'images/projects/nihongo/01-practice.png',
        caption: '图 01：Nihongo 单词背诵界面'
      },
      {
        path: 'images/projects/nihongo/02-structure.png',
        caption: '图 02：开发过程中的代码结构'
      }
    ]
  },

  xigai: {
    kicker: 'PROJECT 05 / TEAM WORK',
    title: 'Xigai',
    status: 'ARCHIVED',
    accent: '#3ddc97',
    accentSoft: 'rgba(61, 220, 151, 0.14)',
    description: '习概课小组展示的静态网站项目。全程使用 Trae 辅助开发，并在此项目中成功实战了基于 GitHub Pull Request (PR) 的团队协作流。',
    stack: ['HTML/CSS', 'Trae', 'GitHub PR'],
    experience: [
      {
        label: '团队协作与工程实战',
        text: '在习概课小组展示中，我自告奋勇承担了网页制作的核心任务：\n  1. 主导开发：虽然我不手写底层代码，但熟练利用 Trae 快速搭建了静态网站的基础框架。\n  2. 团队集成：我负责了整个项目的仓库管理，并在此过程中引入并实操了 GitHub 的 Pull Request 功能。\n  3. 协作闭环：成功将同伴负责的改动拉取到我的分支，进行代码审查与合并，最终融合成一个完整的展示项目。'
      },
      {
        label: '实战 01：跑通 GitHub 协作流',
        text: '问题：团队多人修改同一个项目，容易产生冲突和覆盖。解决：主导了仓库管理，通过提交 Pull Request 来合并同伴代码。深刻理解了分支（Branch）、代码审查与合并（Merge）在团队开发中的关键作用。'
      },
      {
        label: '实战 02：AI 生产力与团队引擎',
        text: '问题：不懂底层代码如何有效推动项目？解决：把 Trae 作为我的“前端外包团队”，快速产出高质量页面。我把精力集中在需求拆解和 Git 版本控制上，撑起了整组的技术底子。'
      }
    ],
    repoUrl: 'https://github.com/Julian-Yulijin/Xigai',
    demoUrl: 'https://julian-yulijin.github.io/xigai/',
    qrUrl: 'https://julian-yulijin.github.io/xigai/',
    images: [
      {
        path: 'images/projects/xigai/01-site.png',
        caption: '图 01：Xigai 展示网页效果图'
      },
      {
        path: 'images/projects/xigai/02-pr-merge.png',
        caption: '图 02：GitHub 上成功合并的 Pull Request 截图'
      }
    ]
  }
};

window.projectData = projectData;

(function () {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const panel = modal.querySelector('.modal-panel');
  const statusEl = document.getElementById('modal-status');
  const kickerEl = document.getElementById('modal-kicker');
  const titleEl = document.getElementById('modal-title');
  const descEl = document.getElementById('modal-desc');
  const stackEl = document.getElementById('modal-stack');
  const linksEl = document.getElementById('modal-links');
  const experienceEl = document.getElementById('modal-experience');
  const galleryEl = document.getElementById('modal-gallery');
  const repoUrlEl = document.getElementById('modal-repo-url');
  const qrEl = document.getElementById('modal-qrcode');
  const copyBtn = document.getElementById('modal-copy');
  const backBtn = modal.querySelector('.modal-back');
  const root = (document.body.dataset.root || '/').replace(/\/?$/, '/');

  let lastFocused = null;

  function makeTag(text) {
    const span = document.createElement('span');
    span.textContent = text;
    return span;
  }

  function renderStack(stack) {
    stackEl.innerHTML = '';
    stack.forEach(function (item) {
      stackEl.appendChild(makeTag(item));
    });
  }

  function renderLinks(data) {
    linksEl.innerHTML = '';

    if (data.repoUrl) {
      const repo = document.createElement('a');
      repo.href = data.repoUrl;
      repo.target = '_blank';
      repo.rel = 'noopener noreferrer';
      repo.className = 'modal-link';
      repo.textContent = 'REPOSITORY ↗';
      linksEl.appendChild(repo);
    }

    if (data.demoUrl) {
      const demo = document.createElement('a');
      demo.href = data.demoUrl;
      demo.target = '_blank';
      demo.rel = 'noopener noreferrer';
      demo.className = 'modal-link';
      demo.textContent = 'LIVE DEMO ↗';
      linksEl.appendChild(demo);
    }
  }

  function renderExperience(items) {
    experienceEl.innerHTML = '';
    items.forEach(function (item) {
      const block = document.createElement('div');
      block.className = 'xp-block';

      const label = document.createElement('span');
      label.className = 'xp-label';
      label.textContent = item.label;

      const text = document.createElement('p');
      text.textContent = item.text;

      block.appendChild(label);
      block.appendChild(text);
      experienceEl.appendChild(block);
    });
  }

  function renderGallery(data) {
    galleryEl.innerHTML = '';

    data.images.forEach(function (image, index) {
      const path = typeof image === 'string' ? image : image.path;
      const captionText = typeof image === 'string'
        ? 'FIG ' + String(index + 1).padStart(2, '0') + ' / ' + path.split('/').pop()
        : image.caption;
      const num = String(index + 1).padStart(2, '0');
      const fig = document.createElement('figure');
      fig.className = 'gallery-item';
      fig.dataset.index = num;

      const img = new Image();
      img.alt = data.title + ' 项目截图 ' + num;
      img.loading = 'lazy';
      img.onerror = function () {
        img.remove();
        fig.classList.add('missing');
      };
      img.src = root + path;

      const caption = document.createElement('figcaption');
      caption.textContent = captionText;

      fig.appendChild(img);
      fig.appendChild(caption);
      galleryEl.appendChild(fig);
    });
  }

  function renderQr(url) {
    qrEl.innerHTML = '';

    const qrBlock = qrEl.closest('.modal-qr');

    if (!url) {
      if (qrBlock) qrBlock.style.display = 'none';
      return;
    }

    if (qrBlock) qrBlock.style.display = '';

    if (typeof QRCode === 'undefined') {
      qrEl.textContent = 'QR unavailable';
      return;
    }

    new QRCode(qrEl, {
      text: url,
      width: 120,
      height: 120,
      colorDark: '#08070f',
      colorLight: '#e6edf3',
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  const sandboxEl = document.getElementById('agent-sandbox');
  const sandboxCode = document.getElementById('sandbox-code');
  const sandboxLog = document.getElementById('sandbox-log');
  const sandboxRun = document.getElementById('sandbox-run');
  const sandboxStatus = document.getElementById('sandbox-status');

  const SANDBOX_BROKEN = [
    '题目：求矩阵 A 的秩。',
    '',
    '公式：\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} (这里故意缺少闭合符号或错误语法)'
  ];

  const SANDBOX_FIXED = [
    '题目：求矩阵 A 的秩。',
    '',
    '公式：\\(\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}\\) (已被 AI 修复)'
  ];

  const SANDBOX_LOGS = [
    ['INFO', 'Reading markdown file...'],
    ['INFO', 'Executing formula_slice.py...'],
    ['WARN', 'Detected broken LaTeX syntax in line 3.'],
    ['AGENT', 'Sending chunk to DeepSeek Harness...'],
    ['SUCCESS', 'Formula fixed by AI!'],
    ['INFO', 'Merging output...'],
    ['SYSTEM', 'Process completed. 0 errors.']
  ];

  let sandboxTimers = [];
  let sandboxRunning = false;

  function clearSandboxTimers() {
    sandboxTimers.forEach(function (id) {
      clearTimeout(id);
    });
    sandboxTimers = [];
  }

  function later(fn, delay) {
    sandboxTimers.push(setTimeout(fn, delay));
  }

  function scrollSandboxLog() {
    sandboxLog.scrollTop = sandboxLog.scrollHeight;
  }

  function renderSandboxCode(lines, state) {
    sandboxCode.innerHTML = '';

    lines.forEach(function (line, index) {
      const row = document.createElement('div');
      row.className = 'sandbox-line';

      const lineNo = document.createElement('span');
      lineNo.className = 'sandbox-ln';
      lineNo.textContent = String(index + 1).padStart(2, '0');

      const text = document.createElement('span');
      text.className = 'sandbox-code-text';
      text.textContent = line || ' ';

      if (index === 2) {
        row.classList.add(state === 'fixed' ? 'fixed' : 'broken');
      }

      row.appendChild(lineNo);
      row.appendChild(text);
      sandboxCode.appendChild(row);
    });
  }

  function resetSandbox() {
    clearSandboxTimers();
    sandboxRunning = false;
    sandboxCode.classList.remove('reading', 'flash-fixed');
    sandboxLog.innerHTML = '';
    sandboxStatus.textContent = 'IDLE';
    sandboxRun.disabled = false;
    sandboxRun.textContent = '[ ▶ RUN DSH AGENT ]';
    renderSandboxCode(SANDBOX_BROKEN, 'broken');
  }

  function finishSandbox() {
    sandboxRunning = false;
    sandboxCode.classList.remove('reading');
    sandboxCode.classList.add('flash-fixed');
    renderSandboxCode(SANDBOX_FIXED, 'fixed');
    sandboxStatus.textContent = 'FIXED';
    sandboxRun.disabled = false;
    sandboxRun.textContent = '[ ▶ RUN AGAIN ]';

    later(function () {
      sandboxCode.classList.remove('flash-fixed');
    }, 900);
  }

  function runSandbox() {
    if (sandboxRunning) return;

    clearSandboxTimers();
    sandboxRunning = true;
    renderSandboxCode(SANDBOX_BROKEN, 'broken');
    sandboxLog.innerHTML = '';
    sandboxCode.classList.remove('flash-fixed');
    sandboxCode.classList.add('reading');
    sandboxStatus.textContent = 'READING';
    sandboxRun.disabled = true;
    sandboxRun.textContent = '[ RUNNING... ]';

    let logIndex = 0;

    function printNextLine() {
      if (logIndex >= SANDBOX_LOGS.length) {
        later(finishSandbox, 320);
        return;
      }

      const entry = SANDBOX_LOGS[logIndex++];
      const line = document.createElement('div');
      line.className = 'sandbox-log-line level-' + entry[0].toLowerCase();

      const tag = document.createElement('span');
      tag.className = 'log-tag';
      tag.textContent = '[' + entry[0] + ']';

      const body = document.createElement('span');
      body.className = 'log-body';

      line.appendChild(tag);
      line.appendChild(body);
      sandboxLog.appendChild(line);
      scrollSandboxLog();

      let charIndex = 0;

      function typeChar() {
        if (charIndex >= entry[1].length) {
          later(printNextLine, 280);
          return;
        }
        body.textContent += entry[1].charAt(charIndex++);
        scrollSandboxLog();
        later(typeChar, 12);
      }

      later(typeChar, 0);
    }

    later(printNextLine, 420);
  }

  if (sandboxRun) {
    sandboxRun.addEventListener('click', runSandbox);
  }

  function openProject(id) {
    const data = projectData[id];
    if (!data) return;

    lastFocused = document.activeElement;

    panel.style.setProperty('--modal-accent', data.accent);
    panel.style.setProperty('--modal-accent-soft', data.accentSoft);

    kickerEl.textContent = data.kicker;
    titleEl.textContent = data.title;
    statusEl.textContent = data.status;
    descEl.textContent = data.description;
    repoUrlEl.textContent = data.qrUrl || data.repoUrl || '';
    copyBtn.textContent = 'COPY URL';

    renderStack(data.stack);
    renderLinks(data);
    renderExperience(data.experience);
    renderGallery(data);
    renderQr(data.qrUrl);

    if (data.sandbox) {
      sandboxEl.hidden = false;
      resetSandbox();
    } else {
      sandboxEl.hidden = true;
      clearSandboxTimers();
      sandboxRunning = false;
    }

    panel.scrollTop = 0;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    window.setTimeout(function () {
      backBtn.focus();
    }, 60);
  }

  function closeProject() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    clearSandboxTimers();
    sandboxRunning = false;

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  document.querySelectorAll('.bento-card[data-project]').forEach(function (card) {
    card.addEventListener('click', function () {
      openProject(card.dataset.project);
    });

    card.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProject(card.dataset.project);
      }
    });
  });

  modal.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', closeProject);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeProject();
    }
  });

  copyBtn.addEventListener('click', function () {
    const url = repoUrlEl.textContent;

    function done() {
      copyBtn.textContent = 'COPIED';
      window.setTimeout(function () {
        copyBtn.textContent = 'COPY URL';
      }, 1600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(fallback);
    } else {
      fallback();
    }

    function fallback() {
      const area = document.createElement('textarea');
      area.value = url;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
        done();
      } catch (err) {
        copyBtn.textContent = 'COPY FAILED';
      }
      area.remove();
    }
  });
})();

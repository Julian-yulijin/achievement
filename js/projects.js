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
    description: '全栈 Web 应用。从纯前端起步，跑通前后端通信与用户注册登录，并在探索 Cloudflare 边缘方案。',
    stack: ['HTML/CSS', 'JavaScript', 'Node.js', 'Cloudflare'],
    experience: [
      {
        label: '工作经历',
        text: '独立完成从页面到接口的完整链路：前端表单校验、注册登录、会话保持，以及部署与边缘网络方案的尝试。'
      },
      {
        label: '踩坑 01',
        text: '问题：前后端字段命名与校验规则不一致。解决：先约定接口 schema，再用统一的请求封装与错误处理兜底。'
      },
      {
        label: '踩坑 02',
        text: '问题：登录态在跨域调试时丢失。解决：明确 CORS 与 Cookie 配置，区分本地和生产环境的域名策略。'
      }
    ],
    repoUrl: 'https://github.com/Julian-Yulijin/Lotia',
    demoUrl: null,
    images: [
      'images/projects/lotia/01-overview.png',
      'images/projects/lotia/02-auth.png',
      'images/projects/lotia/03-architecture.png'
    ]
  },

  agent: {
    kicker: 'PROJECT 02 / AUTOMATION',
    title: 'Agent-Workflow',
    status: 'EXPERIMENTAL',
    accent: '#ff2a6d',
    accentSoft: 'rgba(255, 42, 109, 0.16)',
    description: '基于 DeepSeek Harness 的本地自动化引擎，用 Python 处理复杂 LaTeX 公式并排版题库。',
    stack: ['Python', 'DeepSeek Harness', 'LaTeX', 'Shell'],
    experience: [
      {
        label: '工作经历',
        text: '把重复的题库整理流程拆成可复用的脚本：调用 Agent 解析题目、处理公式，再输出可排版的中间结果。'
      },
      {
        label: '踩坑 01',
        text: '问题：复杂 LaTeX 公式在解析和回填时容易转义错乱。解决：先做公式边界标记，再统一做转义与还原。'
      },
      {
        label: '踩坑 02',
        text: '问题：批处理失败后难以定位具体题目。解决：为每条任务加独立 ID 与日志，失败项单独重试，保证幂等。'
      }
    ],
    repoUrl: 'https://github.com/Julian-Yulijin/Agent-Workflow',
    demoUrl: null,
    images: [
      'images/projects/agent/01-pipeline.png',
      'images/projects/agent/02-agent-run.png',
      'images/projects/agent/03-output.png'
    ]
  },

  calender: {
    kicker: 'PROJECT 03 / TOOL',
    title: 'Calender',
    status: 'BUILDING',
    accent: '#9d4edd',
    accentSoft: 'rgba(157, 78, 221, 0.18)',
    description: '基于 TypeScript 的日程管理工具，用强类型约束数据结构，提升本地工具的健壮性。',
    stack: ['TypeScript', 'HTML/CSS', 'LocalStorage'],
    experience: [
      {
        label: '工作经历',
        text: '从零搭建日程数据模型与增删改查逻辑，用 TypeScript 把时间、状态和视图字段显式建模。'
      },
      {
        label: '踩坑 01',
        text: '问题：日期与时间边界在跨天、跨月时出现错位。解决：统一使用 ISO 时间戳存储，展示层再做本地化格式化。'
      },
      {
        label: '踩坑 02',
        text: '问题：早期类型定义过宽，重构时到处报错。解决：收窄联合类型，先定义领域模型再写组件逻辑。'
      }
    ],
    repoUrl: 'https://github.com/Julian-Yulijin/Calender',
    demoUrl: null,
    images: [
      'images/projects/calender/01-overview.png',
      'images/projects/calender/02-types.png'
    ]
  },

  nihongo: {
    kicker: 'PROJECT 04 / LEARNING TOOL',
    title: 'Nihongo',
    status: 'MAINTAINED',
    accent: '#fcee0a',
    accentSoft: 'rgba(252, 238, 10, 0.12)',
    description: '基于原生 JavaScript 的日语学习辅助工具，解决日常学习中的记忆与复习痛点。',
    stack: ['JavaScript', 'HTML/CSS', 'LocalStorage'],
    experience: [
      {
        label: '工作经历',
        text: '围绕五十音、词汇与复习节奏做轻量交互，尽量不依赖框架，把状态和本地存储控制在可理解的范围。'
      },
      {
        label: '踩坑 01',
        text: '问题：刷新页面后学习进度丢失。解决：把进度序列化到 LocalStorage，并在初始化时做版本兼容。'
      },
      {
        label: '踩坑 02',
        text: '问题：连续操作时状态更新不同步。解决：收拢状态变更入口，避免多个事件各改一份数据。'
      }
    ],
    repoUrl: 'https://github.com/Julian-Yulijin/Nihongo',
    demoUrl: null,
    images: [
      'images/projects/nihongo/01-overview.png',
      'images/projects/nihongo/02-practice.png'
    ]
  },

  xigai: {
    kicker: 'PROJECT 05 / EARLY EXPERIMENT',
    title: 'Xigai',
    status: 'ARCHIVED',
    accent: '#3ddc97',
    accentSoft: 'rgba(61, 220, 151, 0.14)',
    description: '早期 HTML/CSS 实验页面，用来练习布局、配色和响应式基础。',
    stack: ['HTML', 'CSS'],
    experience: [
      {
        label: '工作经历',
        text: '作为最早期的静态页面练习，从手写布局开始理解盒模型、定位与响应式断点。'
      },
      {
        label: '踩坑 01',
        text: '问题：固定宽度布局在小屏上溢出。解决：改用流式宽度与断点，先保证内容可读再谈装饰。'
      },
      {
        label: '踩坑 02',
        text: '问题：样式散落、复用困难。解决：按模块拆分 CSS，并为颜色与间距建立简单变量。'
      }
    ],
    repoUrl: 'https://github.com/Julian-Yulijin/Xigai',
    demoUrl: null,
    images: [
      'images/projects/xigai/01-overview.png',
      'images/projects/xigai/02-responsive.png'
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

    const repo = document.createElement('a');
    repo.href = data.repoUrl;
    repo.target = '_blank';
    repo.rel = 'noopener noreferrer';
    repo.className = 'modal-link';
    repo.textContent = 'REPOSITORY ↗';
    linksEl.appendChild(repo);

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

    data.images.forEach(function (path, index) {
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
      caption.textContent = 'FIG ' + num + ' / ' + path.split('/').pop();

      fig.appendChild(img);
      fig.appendChild(caption);
      galleryEl.appendChild(fig);
    });
  }

  function renderQr(url) {
    qrEl.innerHTML = '';
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
    repoUrlEl.textContent = data.repoUrl;
    copyBtn.textContent = 'COPY URL';

    renderStack(data.stack);
    renderLinks(data);
    renderExperience(data.experience);
    renderGallery(data);
    renderQr(data.repoUrl);

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

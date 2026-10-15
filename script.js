// 개발자 도구 콘솔 인사말
console.log("안녕하세요! 홍길동의 자기소개 사이트에 오신 걸 환영합니다 👋");

// 푸터 연도 자동 표시
document.getElementById("year").textContent = new Date().getFullYear();

// 다크 모드 토글 (선택값은 브라우저에 저장)
const toggle = document.getElementById("theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = theme;
  toggle.textContent = isDark ? "☀️" : "🌙";
  toggle.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
  toggle.setAttribute("aria-pressed", String(isDark));
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {}

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
applyTheme(savedTheme || (darkQuery.matches ? "dark" : "light"));

// 직접 고른 적이 없으면 OS 테마 변경을 따라감
darkQuery.addEventListener("change", (e) => {
  if (!savedTheme) applyTheme(e.matches ? "dark" : "light");
});

toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  savedTheme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// 섹션이 화면에 들어오면 부드럽게 나타나기
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

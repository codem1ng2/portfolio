// 스크롤 시 header 스타일 변경
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;

document.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
        header.classList.add('header--dark');
    } else {
        header.classList.remove('header--dark');
    }
});

// home 섹션의 투명도를 스크롤에 따라 조절
const homeContainer = document.querySelector('#home');
const homeHeight = homeContainer.offsetHeight;
document.addEventListener('scroll', () => {
    homeContainer.style.opacity = 1 - window.scrollY / homeHeight;
});

// 스크롤 시 아래쪽 화살표 버튼의 투명도 조절
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.style.opacity = 1;
    } else {
        arrowUp.style.opacity = 0;
    }
});

// 작은 화면에서 네비게이션 메뉴 토글
const navbarMenu = document.querySelector('.header__menu');
const navbarToggle = document.querySelector('.header__toggle');
navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});
// 네비게이션 메뉴 아이템 클릭 시 메뉴 닫기
navbarMenu.addEventListener('click', () => {
    navbarMenu.classList.remove('open');
});

// 섹션 ID 배열 (smooth scroll 및 메뉴 포커스를 위한 배열)
const sectionIds = ["home", "about", "skills", "work", "license", "contact"];
let currentSectionIndex = 0;
let isScrolling = false; // 현재 스크롤 중인지 확인
const navItems = document.querySelectorAll(".header__menu__item");

// 부드러운 스크롤 애니메이션 함수
function smoothScrollTo(targetPosition) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 600; // 스크롤 애니메이션 시간 (밀리초)
    let startTime = null;

    function animationScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animationScroll);
        } else {
            isScrolling = false; // 스크롤 완료 후 다시 스크롤 가능하도록
        }
    }
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animationScroll);
}

// 네비게이션 포커스 업데이트
function updateNavFocus(index) {
    navItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add("active"); // 포커스 클래스 추가
        } else {
            item.classList.remove("active"); // 다른 항목은 포커스 해제
        }
    });
}

// 네비게이션 아이템 클릭 이벤트 추가
navItems.forEach((item, index) => {
    item.addEventListener("click", (event) => {
        event.preventDefault(); // 기본 클릭 동작 막기
        currentSectionIndex = index; // 현재 인덱스를 클릭한 메뉴의 인덱스로 업데이트
        const targetPosition = document.getElementById(sectionIds[index]).offsetTop;
        smoothScrollTo(targetPosition); // 해당 섹션으로 부드럽게 스크롤
        updateNavFocus(currentSectionIndex); // 클릭한 메뉴에 포커스 업데이트
    });
});

// 스크롤 시 섹션을 부드럽게 이동
window.addEventListener("wheel", (event) => {
    if (isScrolling) return;
    if (event.deltaY > 0) {
        if (currentSectionIndex < sectionIds.length - 1) {
            currentSectionIndex++;
            const targetPosition = document.getElementById(sectionIds[currentSectionIndex]).offsetTop;
            smoothScrollTo(targetPosition);
            isScrolling = true;
        }
    } else {
        if (currentSectionIndex > 0) {
            currentSectionIndex--;
            const targetPosition = document.getElementById(sectionIds[currentSectionIndex]).offsetTop;
            smoothScrollTo(targetPosition);
            isScrolling = true;
        }
    }
    updateNavFocus(currentSectionIndex); // 스크롤할 때 네비게이션 포커스 업데이트
});

// 사용자 수동 스크롤 시 섹션 위치 업데이트
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            currentSectionIndex = sectionIds.indexOf(entry.target.id);
            updateNavFocus(currentSectionIndex); // 관찰 중 네비게이션 포커스 업데이트
        }
    });
}, { threshold: 0.5 });

// 각 주요 섹션에 대해 관찰 시작
sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
});

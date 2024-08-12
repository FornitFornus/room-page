function closeMobileMenuListener(_e: Event): void {
  const hamburgerMenu = document.querySelector(
    '.hamburger.js-click'
  ) as HTMLDivElement;

  if (hamburgerMenu.classList.contains('is-active')) {
    hamburgerMenu.classList.remove('is-active');
  }
}

/**
 * Hamburger menu management.
 */
export const runHamburgerMenu = () => {
  const hamburgerMenu = document.querySelector(
    '.hamburger.js-click'
  ) as HTMLDivElement;

  hamburgerMenu.addEventListener('click', (e) => {
    e.preventDefault();
    hamburgerMenu.classList.toggle('is-active');
    const allLinks = document.querySelectorAll('.main-menu-nav a');

    if (hamburgerMenu.classList.contains('is-active')) {
      allLinks.forEach((element) => {
        element.addEventListener('click', closeMobileMenuListener);
      });
    } else {
      allLinks.forEach((element) => {
        element.removeEventListener('click', closeMobileMenuListener);
      });
    }
  });
};

/**
 * Touch menu activator.
 */
export const touchMenuActivator = () => {
  const menuItems = document.querySelectorAll('.menu-item');
  if (menuItems.length === 0) {
    return;
  }

  const menuItemHoverStateRemover = (e: Event) => {
    if (
      !(
        (e.target as HTMLElement)?.parentNode as HTMLElement
      )?.classList.contains('menu-item') &&
      !(e.target as HTMLElement)?.classList.contains('menu-item-link')
    ) {
      let menuItemsHover = document.querySelectorAll('.menu-item.hover');
      if (menuItemsHover.length !== 0) {
        menuItemsHover.forEach((element) => {
          element.classList.remove('hover');
        });
      }
      window.removeEventListener('touchstart', menuItemHoverStateRemover);
      window.removeEventListener('click', menuItemHoverStateRemover);
    }
  };

  const menuItemHoverStateActivator = (e: Event) => {
    if (
      window.matchMedia('(min-width: 992px)').matches &&
      (e.target as HTMLElement).classList.contains('menu-item-link') &&
      (e.target as HTMLElement).tagName.toLowerCase() === 'a' &&
      !(
        (e.target as HTMLElement)?.parentNode as HTMLElement
      ).classList.contains('hover') &&
      ((e.target as HTMLElement).parentNode as HTMLElement).classList.contains(
        'menu-item'
      )
    ) {
      e.preventDefault();
      ((e.target as HTMLElement)?.parentNode as HTMLElement)?.classList.add(
        'hover'
      );
      window.addEventListener('touchstart', menuItemHoverStateRemover);
      window.addEventListener('click', menuItemHoverStateRemover);
    }
  };

  menuItems.forEach((element) => {
    if (element.querySelector('.main-menu-sub-list') !== null) {
      element.addEventListener('touchstart', menuItemHoverStateActivator);
    }
  });
};

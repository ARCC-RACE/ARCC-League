import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserStore } from '../../../@core/stores/user.store';
import { SettingsData } from '../../../@core/interfaces/common/settings';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>(); // Notes when the subject is destroyed
  userPictureOnly: boolean = false; // If the user picture and username or just picture is displayued
  user: any; // User that is being displayed

  // Themes for the UI modes
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'cosmic';

  // UserMenu object
  userMenu = this.getMenuItems();

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userStore: UserStore,
              private settingsService: SettingsData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  // Gets menu items for the user dropdown
  getMenuItems() {
    const userLink = this.user ?  '/users/current/' : ''; // Assigns user link if it exists
    return [
      { title: 'Profile', link: userLink, queryParams: { profile: true } },
      { title: 'Log out', link: '/auth/logout' },
    ];
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme; // Sets theme

    // Attempts to get theme from database
    this.settingsService.getCurrentSetting().subscribe(theme => {
      this.themeService.currentTheme = theme.themeName ? theme.themeName : 'cosmic';
      this.currentTheme = this.themeService.currentTheme; // Sets theme
      this.themeService.changeTheme(this.currentTheme);
    });

    this.user = this.userStore.getUser(); // Sets user to user form database
    this.userMenu = this.getMenuItems(); // Gets user information from menu

    const { xl } = this.breakpointService.getBreakpointsMap(); // Gets breakpoints mapping
    /**
     * Runs when screen sized changes and tracks if to display the userpicutre only or all user info
     *
     */
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    /**
     * Tracks when the theme is changed, and sets the new theme when it is
     */
    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  /**
   * Marks function as complete
   */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Sets theme to User Database and changes is
   * @param themeName
   */
  changeTheme(themeName: string) {
    this.userStore.setSetting(themeName);
    this.settingsService.updateCurrent(this.userStore.getUser().settings)
      .pipe(takeUntil(this.destroy$))
      .subscribe();

    this.themeService.changeTheme(themeName);
  }

  /**
   * Toggles sidebar
   */
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  /**
   * Navigates home
   */
  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}

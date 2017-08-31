import { SharingPlatformWebPage } from './app.po';

describe('sharing-platform-web App', function() {
  let page: SharingPlatformWebPage;

  beforeEach(() => {
    page = new SharingPlatformWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

import { RobotsUIPage } from './app.po';

describe('robots-ui App', () => {
  let page: RobotsUIPage;

  beforeEach(() => {
    page = new RobotsUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

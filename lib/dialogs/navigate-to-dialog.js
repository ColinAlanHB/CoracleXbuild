'use babel';

import Dialog from './dialog';

export default class NavigateTo extends Dialog {

  constructor() {
    super({
      prompt: '请输入工程名称',
      initialPath: ' ',
      select: false,
      iconClass: 'icon-file-directory',
    });
  }

  onConfirm(path) {
    this.trigger('navigate-to', path);
  }

}

'use babel';

import Dialog from './dialog';

export default class NavigateTo extends Dialog {

  constructor(prompt) {
    super({
      prompt: prompt,
      initialPath: '',
      select: false,
      iconClass: 'icon-file-directory',
    });
  }

  onConfirm(path) {
    this.trigger('navigate-to', path);
  }

}

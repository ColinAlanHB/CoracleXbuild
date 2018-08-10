'use babel';
/** @jsx etch.dom */

import path from 'path';
import etch from 'etch';
import React from 'react';

export default class AboutXBuilder {
  constructor() {
    etch.initialize(this);
  }

  render () {
    return (
      <div className="about">
        <img className="xbuilder-icon" src={path.join(__dirname, '../styles/icon.png')} />
        <h3>XBuilder Studio</h3>
        <span className="version">Version 0.1.6</span>
      </div>
    )
  }

  serialize() {}

  update () {}

  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getTitle(){
    return "关于";
  }
}
